// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax
// スプレッド構文

// スプレッド構文を使うと、関数呼び出しでは0個以上の引数として、Arrayリテラルでは0個以上の要素として、Objectリテラルでは0個以上のkey-valueのペアとして、
// ArrayやString等のiterableオブジェクトをその場で展開します。

let sum2 = function(x, y, z) {
  return x + y + z;
};

const numbers = [1, 2, 3];
console.log(sum2(...numbers)); // 6
console.log(sum2.apply(null, numbers)); // 6

// [Syntax]

// ■ 関数呼び出し
// myFunction(...iterableObj);

// ■ Arrayリテラル
// [...iterableObj, '4', 'five', 6];

// ■ Object リテラル（ECMAScript2018の新機能）
// let objClone = { ...obj };

// [例]

// ■ 関数呼び出しで使う

// apply()を置き換える
// Array()の要素を引数にして呼び出すにはFunction.prototype.apply()を使うのが一般的
/*
function myFunction(x, y, z) {}
let args = [0, 1, 2];
myFunction.apply(null, args);

// ↑スプレッド構文を使って書いた場合
function myFunction(x, y, z) {}
let args = [0, 1, 2];
myFunction(...args);

// スプレッド構文は、引数の何番目に置いても使える。また複数使っても可
function myFunction(v, w, x, y, z) {}
let args = [0, 1];
myFunction(-1, ...args, 2, ...[3]);
*/

// new()演算子と併用する

let dataFields = [1970, 0, 1]; // 1970 Jan 1
let d = new Date(...dataFields);

// ■ Arrayリテラルで使う

// Arrayリテラルでスプレッド構文を使うと、既にあるArray()を一部とする新しい配列を簡単に作れる
// スプレッド構文を使わない場合、push()、splice()、concat()等を使うコードを書く必要がある
let parts = ["shoulders", "knees"];
let lyrics = ["head", ...parts, "and", "toes"];
console.log(lyrics); // ["head", "shoulders", "knees", "and", "toes"]

// Arrayを複製する
let arr1 = [1, 2, 3];
let arr2 = [...arr1];
arr2.push(4);
console.log(arr2); // [1, 2, 3, 4]

// コピーは1段階の深さで行われるので、次のように多次元配列のオブジェクトをコピーするには適さない
// Object.assign()についても同じ事が言える
let a = [[1], [2], [3]];
let b = [...a];
console.log(b.shift().shift()); // 1
console.log(a); // [Array(0), Array(1), Array(1)] ※aは影響を受ける

// Arrayを連結する
let arr3 = [0, 1, 2];
let arr4 = [4, 5, 6];
arr3 = arr3.concat(arr4);
console.log(arr3); // [0, 1, 2, 4, 5, 6]

// スプレッド構文を使った場合
let arr5 = [0, 1, 2];
let arr6 = [4, 5, 6];
let arr7 = [...arr5, ...arr6];
console.log(arr7); // [0, 1, 2, 4, 5, 6]

// Array.unshiftは既存おの配列の先頭に配列を挿入する為によく使われる
let arr8 = [0, 1, 2];
let arr9 = [4, 5, 6];
Array.prototype.unshift.apply(arr8, arr9);
console.log(arr8); // [4, 5, 6, 0, 1, 2]

// スプレッド構文を使った場合（但し新しい配列を生成してarr10に代入している）
let arr10 = [0, 1, 2, 3];
let arr11 = [4, 5, 6, 7];
arr10 = [...arr11, ...arr10];
console.log("arr10: ", arr10); // arr10: [4, 5, 6, 7, 0, 1, 2, 3]

// ■オブジェクトリテラルで使う（ES2018）

// prototypeを除いた浅いコピーの作成や、マージしたオブジェクトの作成が、
// Object.assing()を使うよりも短いコードで書ける

let obj_1 = { foo: "bar", x: 42 };
let obj_2 = { foo: "baz", y: 13 };

let cloneObj = { ...obj_1 };
console.log(cloneObj); // {foo: "bar", x: 42}

let mergeObj = { ...obj_1, ...obj_2 };
console.log(mergeObj); // {foo: "baz", x: 42, y: 13}

// Object.assign()はsettersをトリガーするが、スプレッド構文はトリガーしない
// スプレッド構文はObject.assign()関数を置き換えたり模倣する事は出来ない

let obj_3 = { foo: "bar", x: 42 };
let obj_4 = { foo: "baz", y: 13 };
const merge = (...objects) => ({ ...objects });

let mergeObj3 = merge(obj_3, obj_4);
console.log(mergeObj3); // {0: {foo: "bar", x: 42}, 1: {foo: "baz", y: 13}}

let mergeObj4 = merge({}, obj_3, obj_4);
console.log(mergeObj4); // {0: {}, 1: {foo: "bar", x: 42}, 2: {foo: "baz", y: 13}}

// ↑の例で、スプレッド構文は期待通りに動かない、レストパラメーターは配列で、オブジェクトリテラルに配列として展開される

// ■ iterableオブジェクトだけに使う
// Obejctリテラルで使う場合を除き、スプレッド構文はiterableオブジェクトだけに使える
// iterableでないオブジェクトでは、TypeError例外となる

// let obj5 = { key1: "value1" };
// let arr12 = [...obj5]; // Uncaught TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))

// ■ 大量の値を展開する場合
// JavaScriptエンジンには引数の個数に上限（65536）があるので、関数呼び出しのスプレッド構文では、その上限を超えないように注意する

// ※レスト構文（レストパラメーター）
// レスト構文はスプレッド構文と全く同じ見た目をしているが、ArrayやObjectの分割代入に使われる
// レスト構文の方は展開するのでなく、1つに集約するので注意

