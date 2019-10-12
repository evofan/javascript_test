import { fail } from "assert";

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Using_promises
// Promiseを使う

// Promise は非同期処理の最終的な完了もしくは失敗を表すオブジェクトです。
// 多くの人々は既存の用意されたPromiseを使う事になるため、このガイドでは、Promiseの作成方法の前に、関数が返すPromiseの使い方から説明します。

// 本質的に、Promiseはコールバックを関数に渡すかわりに、関数が返したオブジェクトに対してコールバックを登録するようにする、というものです。

// 例えば createAudioFileAsync()という非同期に音声ファイルを生成する関数を考えましょう。
// この関数はコンフィグオブジェクトと2つのコールバック関数を受け取り、片方のコールバックは音声ファイルが無事作成されたときに呼び出され、
// もう一つはエラーが発生したときに呼び出されます。

// 以下のコードは createAudioFileAsync()を使用したものです。

function successCallback(result) {
    console.log("オーディオファイル準備完了： ", result);
}

function failureCallback(error) {
    console.log("オーディオファイル生成失敗： ", error);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback);

// ↑をpromiseを使った場合
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);

// ↑の元のコード
const promise = createAudioFileAsync(audioSettings);
promise.then(successCallback, failureCallback);

// ↑を非同期関数呼び出し（aynchronnous function call）と呼ぶ。


// ■ 保証
// Promiseでは旧来のコールバックと異なり、以下が保証される
// ・コールバックは決して現在のJavaScriptのイベントループの完了前には呼び出されない
// ・非同期処理が完了or失敗した後にthen()によりコールバック登録した場合でも、それらのコールバックは↑の挙動になる
// ・then()を何回呼び出して複数のコールバックを登録してもよく、追加したコールバックも追加順に独立して実行される


// ■ Promiseチェーン
// Promiseチェーンを作成する事で、★「複数の非同期処理を順番に実行し、前の処理が完了してからその結果を次の処理で行う」という事が出来る

// 例
const promise = doSomething();
const promise2 = promise.then(successCallback, failureCallback);

// ↑別の書き方
const promise2 = doSomething().then(successCallback, failureCallback);

// Promiseが無い時代の書き方
doSomething(function(result) {
    doSomethingElse(result, function(new_result) {
        doThirdthing(new_result, function(final_result) {
            console.log("Got the Final Result: " + final_result);
        }, failureCallback)
    }, failureCallback)
}, failureCallback);

// Promiseを使えば、戻り値のPromiseにコールバックを付与してチェーンとして記述出来る
// then()関数の引数はオプションであり、catch(failureCallback)はthen(null, failureCallback)の短縮形
doSomething().then(function(result) {
    return doSomethingElse(result);
})
.then(function(new_result) {
    return doThirdthing(new_result)
})
.then(function(final_result) {
    console.log("Got the Final Result: " + final_result);
})
.catch(failureCallback);

// ↑をアロー関数（+テンプレートリテラル）を使って記述した場合
// コールバック関数から、処理結果を返す（次のメソッドに引数で渡す）のを忘れないようにする（そうしないと次の関数で結果を利用出来ない為）
doSomething()
.then(result => doSomethingElse(result))
.then(new_result => doThirdthing(new_result))
.then(final_result => {
    console.log(`Got the Final Result: ${final_result}`);
})
.catch(failureCallback);

// .cathch後のチェーン
// catchの後にチェーンする事も可能
new Promise((resolve, reject) => {
    console.log("Initialize:");
    resolve();
})
.then(() => {
    throw new Error("Something failed");
    console.log("Do that");
})
.catch(()=>{
    console.log("Do that");
})
.then(()=>{
    console.log("Do this whatever happend before");
});

// ↑は下記のテキストを出力する
// Initialize
// Do that
// Do this whatever happend before
// ※ Do thishは「Something failed」がスローされた場合そこで処理が止まるの出力されない


// ■ エラーの伝播
// Promiseチェーンではコールバック（失敗時）は1回で済む
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdthing(newResult))
.then(finalResult => console.log(`Got the final result: ${finalResult}`))
.catch(failureCallback)

// 基本的に、Promiseチェーンでは例外が発生するとチェーン（連鎖）が止まり、
// 代わりにチェーンを辿ってcatchハンドラーを探す
// この振る舞いは↓同期的なコードと類似している

try {
    const result = syncDoSomething();
    const newResult = syncDoSomethingElse(result);
    const finalResult = syncDoThirdthing(newResult);
    console.log(`Got the final result: ${finalResult}`);
} catch(error) {
    failureCallback(error);
}

// ES2017のaync/awaitを使えば完全に似たコードになる
async function foo() {
    try {
        const result = syncDoSomething();
        const newResult = syncDoSomethingElse(result);
        const finalResult = syncDoThirdthing(newResult);
        console.log(`Got the final result: ${finalResult}`);
    } catch(error) {
        failureCallback(error);
    }
}

// async / awaitはPromiseの上に成り立つ、
// 例えば上記のdoSomething()はこれまでと同じPromiseを返す関数になる。
// 詳しくは↓
// https://developers.google.com/web/fundamentals/primers/async-functions
// 非同期関数 - Promise をわかりやすくする

// Promiseは例外やプログラミングエラーを含むすべてのエラーを取らえる事で、
// callback連鎖の問題を解決する


// ■ Promiseの失敗イベント
// Promiseが失敗するたびにglobalスコープに2つのイベントが送られる
// ・rejectionhandled ... Promiseが失敗した後に、それがcatchハンドラー等によってハンドルされた後に送られる
// ・unhandlerrejection ... Promiseが失敗した後に、ハンドラーが存在しない時に送られる

// これらのイベントを使えば、Promiseのエラーハンドラーのフォールバックを指定出来る
// globalにあるので、どこで発生したかに関わらず処理出来る

// Node.js用のコードを書いている時に、Promiseが失敗した時の処理を↓のように書ける
window.addEventListener("unhandledrejection", event => {
    // ここで該当のPromiseを、event.promiseを使って、
    // event.reasonで取得して調べる事が出来る
    event.preventDefault(); // JavaScriptのdefaultの動作を防ぐ
}, false);


// ■ 古いコールバックAPIをラップするPromiseの作成
// Promiseは、コンストラクタを使って1から作成する事も出来る
// これは古いAPIをラップする時にのみ必要となる

// 古い形式のコールバック（成功・失敗を返す、例：setTimeOut()）
setTimeout(() => saySomething("10 second passed"), 10000);
// ↑の場合はエラーが出ても捉えられない
// ので、ベストプラクティスは、これらの関数を低いレベルでラップした上で直接呼ばないようにする

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
wait(10000).then(() => saySomething("10 seconds")).catch(failureCallback);

// ■ 合成（Composition）

// Promise.resolve()と、Promise.reject()はそれぞれ既にresolve()もしくはrejectされた
// Promiseを手動で作成するショートカットで、たまに役に立つ事がある

// Promise.all()とPromise.race()は同時並行で実行中の非同期処理を合成する為のツールである
// 以下のように記載する事で、複数の処理を並行に実行し、全てが終了するのを待つ事が出来る

// 複数の処理を並行に開始し、全てが終了するのを待つ
Promise.all([func1(), func2(), func3()])
.then(([result1, result2, result3]) => { /* result1, result2, result3が使える  */});

// 逐次実行をする直列的な合成
[func1, func2].reduce((accumulator, current_value) => accumulator.then(current_value),Promise.resolve())
.then(result3 => { /* result3が使える */ });

// 基本的に、これは非同期関数の配列を、
// Promise.resolve().them(func1).then(func2).then(func3);と同等のPromise()チェーンへとreduce()している

// このような処理は、以下のように関数型プログラミングでよくある、再利用可能な合成関数にする事が出来る
const transformData = composeAsync(func1, func2, func3);
const result3 = transformData(data);

// ES2017では、直列的な合成はもう少し簡単に書ける
let result;
for (const f of [func1, func2, func3]) {
    result = await f(result);
}
// 最終的な結果（result3）が使える


// ■ タイミング
// 想定外な事態とならない用に、例え既にresolveされたPromiseであっても、thenに渡される関数が同期的に呼ばれる事は無い
Promise.resolve().then(()=>console.log(2));
console.log(1); // 1, 2

// 渡された関数はすぐに実行されるのではなく、マイクロタスクキューに入る
// 現在のイベントループの終わりにこのキューは空にされ、この関数が実行される(＝かなり早い段階)
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait().then(()=>console.log(4));
Promise.resolve().then(()=>console.log(2)).then(()=>console.log(3));
console.log(1); // 1 ,2, 3, 4

// ■ ネスト
// 単純なPromiseチェーンならば、ネストは不用意な合成の結果生まれるものなので、
// ネストせず、平らにしておくのがベストである

// ネストするのは、catchステートメントのスコープを制限する為の制御構造である
// （正確にはcatchはそのネストされたスコープ内しかキャッチしない）

doSomethingCritical()
.then(result => doSomethingOptical(result)
    .then(opticalResult => doSomethingExtra())
    .catch(e => {}))
.then(() => moreCriticalStuff())
.catch(e => console.log("Critical failure: " + e.message));
// 内側のcatchは、doSomethingOpticalとdoSomethingExtraからの失敗のみをキャッチする（キャッチした後はmoreCriticalStuffへと処理が続く）
// doSomethingCriticalが失敗した場合、エラーは最後のcatchによってのみキャッチされる

// ■ よくある間違い
// Promiseチェーンを合成する時に、以下の様な間違いに気を付ける必要がある

// 間違いを3つ探して下さい

doSomething().then(function(result) {
    doSomethingElse(result)
    .then(newResult => doThirdthing(newResult));    
}).then(() => doFourthThing());

doSomething().then(function(result) {
    doSomethingElse(result) // 内側のチェーンがPromiseを返していない+不必要なネスト
    .then(newResult => doThirdthing(newResult));    
}).then(() => doFourthThing());
// チェーンの最後をcatch()で終わらせていない

//（１）チェーンを適切に構成出来ていない
// doFourthThing()は、doSomethingElse()やdoSomethingElse()の終了を待たずに並列に実行されてしまう

//（２）不必要にネストしている
// 内側のエラーハンドラーが制限される
// 参考：
// https://stackoverflow.com/questions/23803743/what-is-the-explicit-promise-construction-antipattern-and-how-do-i-avoid-it
// What is the explicit promise construction antipattern and how do I avoid it?
// ↓
// Promise Anti-patterns
// http://taoofcode.net/promise-anti-patterns/

// （３）チェーンをcacch()で終わらせていない
// ＝失敗がキャッチされない

// ★イディオムとして、★Promiseチェーンは常にreturnするか、catchで終わらせ、新しいPromiseを得るたびにすぐreturnしてチェーンを平らにする
doSomething()
.then(function(result) {
    return doSomethingElse(result);
})
.then(newResult => doThirdthing(newResult))
.then(()=>doFourthThing())
.catch(error => console.log(error));

// ※ () => xは、() => { return x }の短縮形である事に注意、※一行の時は{}を省略可、returnのみ時はreturn表記を省略可
