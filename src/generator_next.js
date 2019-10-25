// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Generator/next
// Generator.prototype.next()
// doneとvalueの２つのプロパティを持ったオブジェクトを返します。
// ジェネレータに値を送るためにnextメソッドに引数が提供されております。

// ■ Syntax
// gen.next(value)

// □ 引数
// value ... ジェネレータに送る値

// □ 戻り値
// 2つのプロパティを持ったオブジェクト
// ・done(boolean) ... イテレーターが反復配列の末端を過ぎてたら（反復が完了してたら）、true値になる
//                     この場合、valueは任意の方法でイテレーターのreturn valueを明示する
//
//                     イテレーターがシーケンス内の次の値を生成出来たら、false値になる
//                     これは、全くdoneプロパティを明示しないのと同等になる
// ・value ... イテレーターによって返される値。doneがtrueの時は省略する事が出来る

console.log(" --- Generator.prototype.next() --- ");

// ■ 例
// □ next()を使う
// 次の例では、next()メソッド返す簡単なジェネレータとオブジェクトを示す
function* gen_gn() {
  yield 1;
  yield 2;
  yield 3;
}
let g_01 = gen_gn();
console.log(g_01.next()); // {value: 1, done: false}
console.log(g_01.next()); // {value: 2, done: false}
console.log(g_01.next()); // {value: 3, done: false}
console.log(g_01.next()); // {value: undefined, done: true}
console.log(g_01.next()); // {value: undefined, done: true} ※完了後はdone: trueをずっと返す
console.log("");

// □ ジェネレータに値を送る
// ↓の例では、next()は値（引数）と共に呼ばれる。
// 最初の呼び出しでは何も記録されない＝ジェネレーターが何も得てないため
function* gen_gne() {
  while (true) {
    let value = yield null;
    console.log(value);
  }
}
let g_02 = gen_gne();
console.log(g_02.next(1)); // {value: null, done: false}
console.log(g_02.next(2)); // 2, {value: null, done: false}
console.log(g_02.next(3)); // 3, {value: null, done: false}

console.log(" --- ");
