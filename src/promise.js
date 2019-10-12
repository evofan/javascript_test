// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise
// Promise

// Promise オブジェクトは非同期処理の最終的な完了処理（もしくは失敗）およびその結果の値を表現します。
// ※ここではPromiseのコンストラクタと、そのようなオブジェクトとメソッド・プロパティを説明するので、
// ※使用方法については「Promiseの使用」を読む
// 通常コンストラクタは、Promiseに対応してない関数をラップする為に使われる

let promise2 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve("fooo");
    }, 300);
});

promise2.then(function(value) {
    console.log(value);
});

console.log(promise2);
// Promise {<pending>} ↓
// Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: "fooo"}
// fooo


// ■ Syntax
// new Ptomise(executor)

// 引数
// executor ... 2つの引数resolveとrejectを取る関数
// executorはresolve関数と、reject関数が渡されており、Promiseが実装されるとすぐに実行される。
// （Promiseコンストラクタがオブジェクトと返すより早く実行される）

// resove関数とreject関数が呼び出されると、Promiseに対してそれぞれresolve(解決)、reject(拒否)を行う))

// executorは、通常、非同期の作業を開始して、完了した際にresolve関数（成功時）又はreject関数（エラー時）を呼び出す
// executor関数でエラーが投げられた場合はrejectされる


// ■ 解説
// Promiseインターフェースは、作成時点では分からなくてもよい値へのプロキシである
// Promiseを用いる事で、非同期のアクションに対し、成功や失敗のハンドラーを関連付ける事が出来る
// これにより、非同期メソッドは未来のある時点で値を持つPromiseを返す＝同期メソッドと同じに扱える？

// Promiseの状態は以下のいずれかになる
// ・pending： 初期状態。成功も失敗もしていない
// ・fulfilled： 処理が成功して完了した事を意味します
// ・rejected： 処理が失敗した事を意味します

// pending状態のPromiseは、何らかんも値を持つfulfilled状態、もしくは何らかの理由（エラー）を持つrejected状態に変わる
// そのどちらになっても、then()メソッドによって関連付けられたハンドラーが呼ばれる
// （対応するハンドラーがアタッチされた時、既にPromiseが成功又は失敗していても、そのハンドラーは呼ばれる＝よって
//  非同期処理とその関連付けられたハンドラーとの競合は発生しない？）

// Promise.prototype.then()メソッドと、Promise.prototype.catch()メソッドもまたPromiseを返すので、これらをチェーンする事が出来る。

// 「チェーンの流れの図」


// ■ プロパティ
// Promise.length ... 長さを表し、常に１（コンストラクタの引数の数）
// Ptomise.prototype ... Promiseコンストラクタのプロトタイプ


// ■ メソッド
// Promise.all(iterable) ... 全て（複数）のPromiseが解決されるか、拒否されるまで待つ。
                             // 返却されたPromiseが「解決」なら、複数のPromiseが含まれるiterableで定義された通りの順番で入った集合知に値によって解決される
                             // 拒否された場合は、iterableの中で最初に拒否されたPromiseの理由で拒否される

// Promise.allSettled(iterable) ... 全て（複数）のPromiseが完了（解決or拒否）するまで待つ
                                    // 結果はそれぞれのPromiseの結果を記述するオブジェクト配列で返される

// Promise.race(iterable) ... Promiseの内、1つが解決又は拒否されるまで待つ。
                              // 解決 → iterableの中で最初に解決されたPromiseの値によって解決される
                              // 拒否 → 最初に拒否されたPromiseの理由によって拒否される

// Promise.reject() ... 与えられた理由で拒否された新しいPromiseオブジェクトを返す

// Promise.resolve() ... 与えられた値で解決された新しいPromiseオブジェクトを返す
                        // もし値がiterable（つまりthenメソッドを持っている）ならば、返されるPromiseはそのthenrableを辿り、その結果を採用する
                        // itrableでなければ、返されるPromiseは与えられた値で解決する
                        // 一般的にある値がPromiseかどうか分からない場合は、Promise.resolve(value)を使ってPromiseにして扱います


// ■ Promiseプロトタイプ

// □ プロパティ
// Promise.prototype.consutructor ... インスタンスのプロトタイプを生成した関数を返す。デフォルトはPromise関数

// □ メソッド
// Promise.prototype.catch(onRejected) ... プロミスに失敗ハンドラコールバックを付加する。呼ばれるとコールバックの戻り値、又は、新しいプロミスを返す

// Promise.prototype.then(onFufilled) ... プロミスに成功ハンドラと失敗ハンドラを付加する。呼ばれたハンドラの戻り値によって解決している新しいプロミスを返す


// ■ Promiseを作成する
// Promiseオブジェクトはnewキーワードとコンストラクターで作成される。コンストラクターはexecutor関数と呼ばれる引数を取る。
// executor関数は2つの関数を引数として取る。1つ目の関数（resolve）は成功時に呼ばれ、タスクの結果を値として返す。
// 2つ目の関数（reject）はタスクが失敗した時に呼ばれ、失敗した理由（エラーオブジェクト）を返す
const myFirstPromise = new Promise((resolve, reject) => {
    // 最終的にいずれかを呼び出す非同期処理を実行します。
    // resolve(someValue); // fulfilled
    // 又は
    // reject("failure reason"); // rejected
});

// Promise機能を持つ関数を作るには、単純にPromiseオブジェクトを返すようにする
function myAsybcFunction(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onLoad = () => resolve(xhr.responseText); // ※resolveを返す
        xhr.onError = () => reject(xhr.statusText); // ※rejectを返す
        xhr.send();
    });
}

// ■ 例

// □ 基本的な使用
let myFirstPromise2 = new Promise((resolve, reject) => {
    // 非同期で行っていたことが成功した場合にresolve（...）を呼び出し、失敗した場合にreject（...）を呼び出します。
    // この例では、setTimeout（...）を使用して非同期コードをシミュレートします。
    // 実際には、おそらくXHRまたはHTML5 APIのようなものを使用することになります。
    setTimeout(function() {
        resolve("Success!"); // わーい！ すべてが私たちに行きました
    }, 1000);
});

myFirstPromise2.then((successMessage) => {
    // successMessageは、上記のresolve（...）関数で渡したものです。
    // 文字列である必要はありませんが、成功メッセージのみである場合は、おそらくそうです。
    console.log("Yay! " + successMessage); // Yay! Success!
});


// □ 応用例
// 以下の例はPromiseの仕組みを示したものです。
// testPromiseメソッドは<button>をクリックする度に呼び出されます。
// testPromiseメソッドは、Window.setTimeout()を用いて、1秒から3秒のランダムな時間の後、メソッドがこれまでに呼ばれた回数で成功するPromiseを作成する
// Promise()コンストラクターはPromiseを作成する為に使用される

// Promiseの成功は、p1.then()で設定されたコールバックによって記録される。
// この記録から、メソッドの同期処理部分が、Promiseによる非同期処理からどのように分離されているか分かる
// 'use strict';
let promiseCount = 0;

function testPromise() { // カウントを引数で渡さずglobalを参照でOK？
    let thisPromiseCount = ++promiseCount;
    
    let log = document.getElementById("log");
    log.insertAdjacentHTML("beforeend", thisPromiseCount + "）開始（<small>同期処理開始</small><br />）");

    // 新しいPromiseを作成、1～3秒後に結果を返す
    let p1 = new Promise(

        // excutor関数はpromiseの成功又は失敗に応じて呼ばれる
        (resolve ,reject) => {
            log.insertAdjacentHTML("beforeend", thisPromiseCount + "）Promise開始（<small>非同期処理開始</small>）<br />");
            
            // 非同期を作成する為の一例です
            window.setTimeout(
                function() {
                    // 約束を果たしました
                    resolve(thisPromiseCount);
                }, Math.random() * 2000 + 1000);
        }
    );

    // Promiseが成功した時に何をするのかを決める
    // then()で成功した時
    // catch()で失敗した時
    p1.then(
        // メッセージと値を記録する
        function(val) {
           log.insertAdjacentHTML("beforeend", val + "）Promise成功（<small>非同期処理成功</small>）<br />"); 
    }).catch(
        // 失敗した理由を記録する
        (reason) => {
            console.log("Handle rejected promise（ " + reason + "）here.");
    });

    log.insertAdjacentHTML("beforeend", thisPromiseCount + "）Promiseは作成されました（<small>同期処理終了</small><br />）");

}

// ■ XHRによる画像の読み込み
// https://github.com/mdn/js-examples/tree/master/promises-test