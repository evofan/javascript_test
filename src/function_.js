// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/function*
// function*
// function* 宣言 (末尾にアスタリスクが付いたfunctionキーワード)は、 Generatorオブジェクトを返すジェネレーター関数を定義します。
function* generator(i) {
  yield i;
  yield i + 10;
}
let gen = generator(10);
console.log(gen); // generator {<suspended>}
// console.log(gen()); // Uncaught TypeError: gen is not a function
console.log(typeof gen); // object ← iteratorオブジェクト
console.log(gen.next().value); // 10
console.log(gen.next().value); // 20
console.log("");
// ジェネレーター関数は、GeneratorFunctionコンストラクタを使用して定義する事も出来ます

// ■ Syntax
// function* name([param[,param[, ...param]]]) {
//      statements
// }
//
// name ... 関数名
//
// param ... 関数に渡される引数名。引数は255個まで持つ事が可能
//
// statements ... 関数本体に含まれる命令文

// ■ 解説
// ジェネレーターは、★処理を抜け出す事も、後から復帰する事も出来る関数★です
// ジェネレーターのコンテキスト（変数の値）は復帰しても保存されます

// ★ジェネレーター関数を呼び出しても関数はすぐに実行されません
// 代わりに、★関数の為のiteratorオブジェクトが返されます
//
// ★iteratorのnext()メソッドが呼ばれると、ジェネレーター関数の処理は、
// イテレーターから返された値を特定する最初のyield演算子か、他のジェネレーター関数に委任するyield*に達するまで実行されます
// ※yield: 算出する
//
// ★next()メソッドはyieldされた値を含むvalueプロパティと、ジェネレーターが最後の値を持つかを真偽値で示すdoneプロパティを持つオブジェクトを返す
// ★引数付きでnext()を呼ぶとジェネレーター関数の実行が再開され、処理が停止していたyield式をnext()の引数で置き換えます。
//
// return文は、ジェネレーターで、（ジェネレーターが）実行された時、ジェネレーターをdone()にします。
// 値がreturn（返却）されたら、valueとして返されます
// 値を返されたジェネレーターは、それ以降は値をyieldしません

// ■ 例

// □ 単純な例
function* idMaker() {
  let index = 0;
  while (index < index + 1) {
    yield index++;
  }
}
let gen2 = idMaker(); // この段階ではイテレーターオブジェクトを返すだけ
console.log(gen2.next().value); // 0、ジェネレーター関数の実行を実行し、yield演算子を実行する
console.log(gen2.next().value); // 1、ジェネレーター関数の実行を実行し、yield演算子を実行する
console.log(gen2.next().value); // 2、ジェネレーター関数の実行を実行し、yield演算子を実行する
console.log(gen2.next().value); // 3、ジェネレーター関数の実行を実行し、yield演算子を実行する
console.log("");

// □ yieldを使用した例
function* anotherGenerator3(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}
function* generator3(i) {
  yield i;
  yield* anotherGenerator3(i); // 別のジェネレーター関数を呼び出し
  yield i + 10;
}
let gen3 = generator3(10);
console.log(gen3.next().value); // 10 ... yield iの値を返す
console.log(gen3.next().value); // 11 ... anotherGenerator3()のyieldが開始
console.log(gen3.next().value); // 12
console.log(gen3.next().value); // 13 ... anotherGenerator3()のyieldが終了
console.log(gen3.next().value); // 20 ... yield i+10の値を返す
console.log("");

// □ 引数をジェネレーターにパースさせる
function* logGenerator() {
  console.log(0);
  console.log(1, yield);
  console.log(2, yield);
  console.log(3, yield);
}
let gen4 = logGenerator();
// 最初のnext()の呼び出しで、関数の最初から、
// 最初のyield文の前まで実行される
gen4.next();
gen4.next("prezel");
gen4.next("california");
gen4.next("mayonnaise");
console.log("");
// 0
// 1 "prezel"
// 2 "california"
// 3 "mayonnaise"

// □ ジェネレーターにおけるreturn文
function* yieldAndReturn() {
  yield "Y";
  return "R";
  yield "unreachable"; // returnした後は普通の関数では実行されないが、、Generatorでも実行されない
}
let gen5 = yieldAndReturn(); // iterableオブジェクト作成
console.log(gen5.next()); // {value: "Y", done: false}
console.log(gen5.next()); // {value: "R", done: true}
console.log(gen5.next()); // {value: undefined, done: true}
console.log("");

// □ ジェネレーターをコンストラクタにする事は出来ません
// function* f() {};
// let obj = new f; // Uncaught TypeError: f is not a constructor

// □ 関数式中で定義されたジェネレーター、同じ様に機能する
const foo = function*() {
  yield 10;
  yield 20;
};
const bar = foo();
console.log(bar); // foo {<suspended>}
console.log(bar.next()); // {value: 10, done: false}
console.log(bar.next()); // {value: 20, done: false}
console.log(bar.next()); // {value: undefined, done: true}
console.log("");