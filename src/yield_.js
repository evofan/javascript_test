// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/yield*
// yield*
// yield* 式は別のジェネレーターや反復可能なオブジェクトに委任するために使用されます。
function* func1() {
  yield 42;
}
function* func2() {
  yield* func1();
}

let iterator_1 = func2();
console.log(iterator_1.next().value); // 42
console.log("");

// ■ Syntax
// yield* [[expression]]
//
// expression ... 反復可能なオブジェクトを返す式

// ■ 説明
// yield*式はオペランドを反復し、それによって返されたそれぞれの値をもたらします。
//
// yield*式自体の値は、イテレーターが閉じた時（つまりdone: trueの時）に返される値です。

// ■ 例
// □ 別のジェネレーターに委任する
// 次のコードでは、g1()によってもたらせる値は、g2()で得られているものとちょうど同じ様に、next()の呼び出しから返されます。
function* g1() {
  yield 2;
  yield 3;
  yield 4;
}
function* g2() {
  yield 1;
  yield* g1();
  yield 5;
}

let iterator_2 = g2();

console.log(iterator_2.next()); // {value: 1, done: false}
console.log(iterator_2.next()); // {value: 2, done: false}
console.log(iterator_2.next()); // {value: 3, done: false}
console.log(iterator_2.next()); // {value: 4, done: false}
console.log(iterator_2.next()); // {value: 5, done: false}
console.log(iterator_2.next()); // {value: undefined, done: true}
console.log("");

// □ 他の反復可能なオブジェクト
// ジェネレーターオブジェクトの他に、yield*は反復可能な他の種類のもの、例えば、配列・文字列・引数オブジェクトをyield出来ます。
function* g3() {
  yield* [1, 2];
  yield* "34";
  yield* Array.from(arguments);
}

let iterator_3 = g3(5, 6);

console.log(iterator_3.next()); // {value: 1, done: false}
console.log(iterator_3.next()); // {value: 2, done: false}
console.log(iterator_3.next()); // {value: "3", done: false}
console.log(iterator_3.next()); // {value: "4", done: false}
console.log(iterator_3.next()); // {value: 5, done: false}
console.log(iterator_3.next()); // {value: 6, done: false}
console.log(iterator_3.next()); // {value: undefined, done: true}
console.log("");

// □ yield*式自体の値
// yield*は式であり、文ではありません。その為、値に評価されます。
function* g4() {
  yield* [1, 2, 3];
  return "foo";
}

let result_4;

function* g5() {
  result_4 = yield* g4();
}

let iterator_5 = g5();

console.log(iterator_5.next()); // {value: 1, done: false}
console.log(iterator_5.next()); // {value: 2, done: false}
console.log(iterator_5.next()); // {value: 3, done: false}
console.log(iterator_5.next()); // {value: undefined, done: true}

console.log(result_4); // fooを表示
console.log("");
