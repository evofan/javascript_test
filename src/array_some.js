// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/some
// Array.prototype.some()
// some()メソッドは、配列の少なくとも1つの要素が、渡された関数によって実施されるテストに通るかどうかをテストします。
// 注: このメソッドは空の配列ではあらゆる条件式に対してfalseを返します。
let array1 = [1, 2, 3, 4, 5];
let even = ele => ele % 2 === 0;
console.log(array1.some(even)); // true

// ■ Syntax
// array.some(callback[, thisArg]);

// □ 引数
// ・callback ... 各要素に対して実行する関数（3つの引数を取る）
//   ・element ... 現在処理されている要素
//   ・index ... 現在処理されている要素のインデックス
//   ・array ... some()が実行されている配列
//
// ・thisArg ... callbackを実行する時にthisとして使用するオブジェクト

// □ 戻り値
// コールバック関数がいずれかの配列要素でtruthyを返した場合はtrue、それ以外はfalse

// ■ 説明
// some()は与えられたcallback関数を、配列に含まれる要素に対して一度ずつ、callback()が真の値を返す要素が見つかるまで呼び出し
// 真の値を返す要素が見つかると、some()は直ちにtrueを返し、見つからなかった場合はfalseを返す
// callback()は値が代入されている配列のインデックスに対してのみ呼び出される
// （既に削除されたインデックスや、値が代入されてないインデックスに対しては呼び出されない）
// some()は元の配列を変更しない

// ■ 例
// □ 配列要素の値をテストする
// 次の例は、配列の要素のどれかが10より大きいかどうかをテストする
function isBiggerThan10(element, index, array) {
  return element > 10;
}
console.log([2, 5, 8, 1, 4].some(isBiggerThan10)); // false
console.log([12, 5, 3, 0, 7].some(isBiggerThan10)); // true

// □ 配列要素をアロー関数を使ってテストする
console.log([2, 5, 8, 1, 4].some(x => x > 10)); // false
console.log([12, 5, 3, 0, 7].some(x => x > 10)); // true
console.log("");

// □ ある値が配列に存在するかどうかチェックする
// includes()メソッドをまねて、↓の関数は配列にその要素が存在する場合にtrueを返す
let fruits_ary = ["apple", "banana", "mango", "guava"];
function checkAvailability(arr, val) {
  return arr.some(function(arrVal) {
    return val === arrVal;
  });
}
console.log(checkAvailability(fruits_ary, "kela")); // false
console.log(checkAvailability(fruits_ary, "banana")); // true

// □ ある値があるかどうかをアロー関数を使ってチェックする
function checkAvailability2(arr, val) {
  return arr.some(arrVal => val === arrVal);
}
console.log(checkAvailability2(fruits_ary, "kela")); // false
console.log(checkAvailability2(fruits_ary, "banana")); // true
console.log("");

// □ 任意の値をBooleanに変換する
let TRUETHY_VALUES = [true, "true", 1];
function getBoolean(value) {
  "use strict";

  if (typeof value === "string") {
    value = value.toLowerCase().trim();
  }

  return TRUETHY_VALUES.some(t => t === value);
}

console.log(getBoolean(false)); // false
console.log(getBoolean("false")); // false
console.log(getBoolean(1)); // true
console.log(getBoolean("1")); // false
console.log(getBoolean("true")); // true
