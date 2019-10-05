// Array.prototype.reduce()
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

// reduce()は配列の各要素に対して（引数で与えられた）reducer関数を実行して、単一の値にします。
// reducer ... 還元者、減速機、accumulator ... 蓄積者、累算器

let array1 = [1, 2, 3, 4, 5];
let reducer = (accumulator, currentValue) => accumulator + currentValue;

console.log(array1.reduce(reducer)); // 15
console.log(array1.reduce(reducer, 6)); // 21

// reducer関数は4つの引数を取る
// （１）アキュムレータ、accumulator、累積値
// （２）現在値、currentValue
// （３）現在のインデックス、currentIndex
// （４）ソースの配列、array

// reducer関数の戻り値はアキュムレータに代入され、配列内の各要素に反復してこの値を記憶する。最終的に単一の値になる

// Syntax
// arr.reduce(callback, initialValue)

// 引数
// callback() ... 次の4つの引数を取り、配列内の各要素に対して実行されるコールバック関数
//  accumulator ... ★コールバックの戻り値を累積する。累積値は1つ前の戻り値、又はinitialValueになる。
//  currentValue ... 現在処理されている配列の要素
//  currentIndex ... （オプション）現在処理されている配列要素のインデックス。initialValueが指定された場合はインデックス0から、指定が無い場合は1から開始する
//  array ...（オプション）reduceが呼ばれた配列
// initialValue ...（オプション）callbackの最初の呼び出しの時に、★最初の引数として使用される。★設定が無い場合、配列の最初の要素が使用される。
//                   空の配列をinitialValue無しでreduce()を実行すると、TypeErrorをthrowする

// 返り値
// 累積されて得られた1つの値

// 詳細
// コールバックが初めて呼び出された時
// （1）initilaValueがある場合 ... accumulatorはinitialValueと等しくなり、currentValueはソース配列の最初の値と等しくなる。indexは0から開始する。
// （2）initialValueが無い場合 ... accumulatorは配列の最初の値と秘匿しくなり、currentValueは2番目の値と等しくなる。indexは1から開始する。

// initialValueを指定しない場合、次の3種類の結果が発生しうる為、通常はinitialValueを指定する方が安全である
let maxCallback = (acc, cur) => Math.max(acc.x, cur.x);
let maxCallback2 = (max, cur) => Math.max(max, cur);

// reduce() without initialValue、初期値無しで
let pattern1 = [{ x: 22 }, { x: 42 }].reduce(maxCallback);
console.log("pattern1: ", pattern1); // pattern1:  42

let pattern2 = [{ x: 22 }].reduce(maxCallback);
console.log("pattern2: ", pattern2); // pattern2:  {x: 22}

// let pattern3 = [].reduce(maxCallback); // Uncaught TypeError: Reduce of empty array with no initial value

// usage map and reduce; // より良いソリューション、空の配列または大きな配列にも機能
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Infinity
let pattern4 = [{ x: 22 }, { x: 42 }]
  .map(el => el.x)
  .reduce(maxCallback2, -Infinity); // Infinity: 正の無限大（∞）、-Infinity: 負の無限大
console.log("pattern4: ", pattern4); // pattern4:  42

// reduce()はどう動くか、※内部の遷移詳細
let sample = [0, 1, 2, 3, 4].reduce(
  function(accumulator, currentValue, currentIndex, array) {
    return accumulator + currentValue;
  } /* ,[initialValue]無し*/
);
console.log("sample: ", sample); // sample:  10

// コールバックは4回呼び出され、各回の引数の内容は以下のようになっている
// | callback() |  accumulator |  currentValue | currentIndex |    array    | 戻り値 |
//     初回　            0              1              1         [0,1,2,3,4]     1      ※initialValueが無いので、indexは1スタート
//     ２回目            1              2              2         [0,1,2,3,4]     3
//     ３回目            3              3              3         [0,1,2,3,4]     6
//     ４回目            6              4              4         [0,1,2,3,4]     10
//
// 1:initialValueが無いので、最初のコールバックで、accumulatorは配列の最初の値と等しくなり（=０）、currentValueは配列の2番目の値（1）になる。indexは1から開始になる。戻り値（累積値は）は現在の値：1を加算して1
// 2:前回の戻り値1がaccumulatorの値、currentValueは前回のindexから+1してindex2の値：2、currentIndexは：2、戻り値はaccumulatorの1+currentValueの2=3
// 3:accumulator = 前の戻り値3、currentは3、indexは3、戻り値は3+3=6
// 4:accumulator=6、current=4、index=4、戻り値=6+4=10

// ↑をアロー関数で記述した場合
/*
[0, 1, 2, 3, 4].reduce(
  (accumulator, currentValue) => accumulator + currentIndex
);
*/

// ↑↑をinexValueの値を設定して動かした場合
let sample2 = [0, 1, 2, 3, 4].reduce(
  (accumulator, currentValue, currentIndex, array) => {
    return accumulator + currentValue;
  },
  10
);
console.log(sample2); // 20

// コールバックは4回呼び出され、各回の引数の内容は以下のようになっている
// | callback() |  accumulator |  currentValue | currentIndex |    array    | 戻り値 |
//     初回　           10              0              0         [0,1,2,3,4]    10      ※initialValueが有るので、indexは0スタート
//     ２回目           10              1              1         [0,1,2,3,4]    11
//     ３回目           11              2              2         [0,1,2,3,4]    13
//     ４回目           13              3              3         [0,1,2,3,4]    16
//     ５回目           19              4              4         [0,1,2,3,4]    20
//
// 1:initialValueが有るので、最初のコールバックで、accumulatorは配列のindexValueの値（=1０）、currentValueは配列の1番目の値（0）になる。indexは0から開始になる。戻り値（累積値は）は現在の値：0を加算して10
// 2:前回の戻り値10がaccumulatorの値、currentValueは前回のindexから+1してindex1の値：1、currentIndexは：1、戻り値はaccumulatorの10+currentValueの1=11
// 3:accumulator = 前の戻り値11、currentは2、indexは2、戻り値は11+2=13
// 4:accumulator=13、current=3、index=3、戻り値=13+3=16
// 5:accumulator=16、current=4、index=4、戻り値=16+4=20

// 例
// ■ 配列内の値の合計値を出す
let sum1 = [0, 1, 2, 3].reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);
console.log("sum1: ", sum1); // sum1:  6

// ↑をアロー関数を使用して書いた場合
let sum2 = [0, 1, 2, 3].reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
console.log("sum2: ", sum2); // sum2:  6

// ■ オブジェクトの配列の値の合計を出す
// オブジェクトの配列に含まれた値の合計値を出すには、全ての項目を関数内で取得出来るようにするために、★initialValueを指定する必要がある
let initialValue3 = 0;
let sum3 = [{ x: 1 }, { x: 2 }, { x: 3 }].reduce(function(
  accumulator,
  currentValue
) {
  return accumulator + currentValue.x;
},
initialValue3);
console.log("sum3: ", sum3); // sum3:  6

// ↑をアロー関数で書いた場合
let initialValue4 = 0;
let sum4 = [{ x: 1 }, { x: 2 }, { x: 3 }].reduce(
  (accumulator, currentValue) => accumulator + currentValue.x,
  initialValue4
);
console.log("sum4: ", sum4); // sum4:  6

// ■ 二次元配列を一次元配列にする
let flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(
  accumulator,
  currentValue
) {
  return accumulator.concat(currentValue);
},
[]);
console.log("flattened: ", flattened); // flattened: [0, 1, 2, 3, 4, 5]

// ↑をアロー関数で書いた場合
let flattened2 = [[0, 1], [2, 3], [4, 5]].reduce(
  (accumulator, currentValue) => accumulator.concat(currentValue),
  []
);
console.log("flattened2: ", flattened2); // flattened2: [0, 1, 2, 3, 4, 5]

// ■★ オブジェクトの値のインスタンスを数える
// in演算子
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/in
// in 演算子は、指定されたプロパティが指定されたオブジェクトにある場合にtrueを返しますs
// prop in objectName
let names1 = ["Alice", "Bob", "Tiff", "Bruce", "Alice"]; // Array.prototype.reduce()なのでObjectには適用出来ない
let countedNames1 = names1.reduce(function(allNames, name) {
  // accumulatorがオブジェクト、currentValueがname、indexValueが{}
  if (name in allNames) {
    // name = 配列のindex、既にその名前のプロパティがあればカウントを+1、初なら1を設定
    allNames[name]++; // accumulator（累積値）であるallNamesオブジェクトのnameプロパティ
    console.log(allNames);
  } else {
    allNames[name] = 1; // 配列names1の要素"Alice"に対して1を設定、文字列に対して1を設定？=>initialValueで{}を与えているので、
    console.log(allNames);
  } // 配列の1要素の文字列→オブジェクトのキーになる？そのキーに対してvalue:1を設定？
  return allNames;
}, {}); // indexValueがオブジェクト
console.log("countedNames1: ", countedNames1); // countedNames1:  {Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}
// {Alice: 1}
// {Alice: 1, Bob: 1}
// {Alice: 1, Bob: 1, Tiff: 1}
// {Alice: 1, Bob: 1, Tiff: 1, Bruce: 1}
// {Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}

// ■★ プロパティによってオブジェクトをグループ化する
let people1 = [
  // ※中の要素がオブジェクトの配列
  { name: "Alice", age: 21 },
  { name: "Max", age: 20 },
  { name: "Jane", age: 20 }
];
/**
 * 渡されたオブジェクトを元に、特定のキーでグループ化した新たなオブジェクトを作る
 * @param { array } objectArray 新しく作るオブジェクトの元になるオブジ
 * @param { string } property 新しく作るオブジェクトのキーにする、現在のオブジェクトのプロパティ名
 * @returns
 */
function groupBy(objectArray, property) {
  return objectArray.reduce(function(acc, obj) {
    // acc: accumulator, obj: currentValue（indexValue={}）、Alice～Janeのオブジェクト
    let key = obj[property]; // keyは現在のオブジェクトの値のプロパティ名"age"の値
    console.log("key: ", key); // 20-21
    if (!acc[key]) {
      // アキュムレータに累積されたオブジェクトのキーが無ければ」
      acc[key] = []; // 空の配列を代入
    }
    console.log("obj: ", obj); //
    acc[key].push(obj); // キー名をオブジェクトに追加？
    console.log("acc: ", acc); // object
    console.log(typeof acc); //
    return acc;
  }, {}); // initialValueはデータの形式によって、プリミティブ値（Number）、Array[]、Object{} => 累積値はオブジェクトで返す
}
// key:  21
// obj:  {name: "Alice", age: 21}
// acc:  {21: Array(1)}
// key:  20
// obj:  {name: "Max", age: 20}
// acc:  {20: Array(1), 21: Array(1)}
// key:  20
//
// acc:  {20: Array(2), 21: Array(1)}
// obj:  {name: "Jane", age: 20}
let groupedPeople = groupBy(people1, "age");
console.log("groupedPeople: ", groupedPeople);
// groupedPeople:  {20: [{name: "Max", age: 20}, {name: "Jane", age: 20}], 21: [{name: "Alice", age: 21}]}

// ■ スプレッド演算子とinitialValueを使ってオブジェクトの配列に含まれる配列を結合させる
// friends ... オブジェクトの配列
// ここで、オブジェクトフィールド「books」-お気に入りの本のリスト
let friends = [
  { name: "Anna", books: ["Bible", "Hary Potter"], age: 21 },
  { name: "Bob", books: ["War and peace", "Romeo and Juliet"], age: 26 },
  { name: "Alice", books: ["The Load of the Rings", "The Shining"], age: 18 }
];

// all books ... 全ての友人の本を含むリスト＋initialValueに含まれる追加リスト
let allbooks = friends.reduce(
  function(accumulator, currentValue) {
    return [...accumulator, ...currentValue.books];
  },
  ["Alphabet"]
);
console.log("allbooks: ", allbooks); // allbooks: ["Alphabet", "Bible", "Hary Potter", "War and peace", "Romeo and Juliet", "The Load of the Rings", "The Shining"]

// ■ 配列内の重複要素を削除する

let myArray1 = [
  "a",
  "b",
  "a",
  "b",
  "b",
  "c",
  "e",
  "e",
  "c",
  "d",
  "d",
  "d",
  "d"
];
var myOrderedArray = myArray1.reduce(function(accumulator, currentValue) {
  if (accumulator.indexOf(currentValue) === -1) {
    accumulator.push(currentValue);
  }
  return accumulator;
}, []); // indexValueとして空配列を渡す
console.log("myOrderedArray: ", myOrderedArray); // myOrderedArray:  (5) ["a", "b", "c", "e", "d"]

// ■ シーケンス上のpromiseを動かす
// promiseをチェーン方式で返すことができる関数の配列からpromiseを実行します
//
function runPromiseInsSequence(arr, input) {
  return arr.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(input)
  );
}

// promise function 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// promise function 3
// .then（）によって解決されたプロミスにラップされます
function f3(a) {
  return a * 3;
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

const promiseArr = [p1, p2, f3, p4]; // functionを4つ続けて実行
runPromiseInsSequence(promiseArr, 10).then(console.log); // 1200

console.log("");

// ■パイプによって関数を実行する
// 構成に使用するビルディングブロック
const double = x => 2 * x; // 引数を2倍
const triple = x => 3 * x; // 引数を3倍
const quadruple = x => 4 * x; // 引数を4倍

// パイプ機能を可能にする機能構成
const pipe = (...functions) => input =>
  functions.reduce(
    (acc, fn) => fn(acc),
    input // indexValue
  );

// 特定の値を乗算するための合成関数
const multiply6 = pipe(
  double,
  triple
);
const multiply9 = pipe(
  triple,
  triple
);
const multiply16 = pipe(
  quadruple,
  quadruple
);
const multiply24 = pipe(
  double,
  triple,
  quadruple
);

// usage
console.log(multiply6(6)); // 36（12 + 18）
console.log(multiply9(9)); // 81（27 + 54）
console.log(multiply16(16)); // 256（148 + 112？）
console.log(multiply24(10)); // 240（40 + 50 + 60？）
console.log("");

// ■ reduceを使ってmapメソッドを書く
if (!Array.prototype.mapUseingReduce) {
  Array.prototype.mapUseingReduce = function(callback, thisArg) {
    return this.reduce(function(mappedArray, currentValue, index, array) {
      mappedArray[index] = callback.call(thisArg, currentValue, index, array);
      return mappedArray;
    }, []);
  };
}
let result = [1, 2, , 3].mapUseingReduce(
  (currentValue, index, array) => currentValue + index + array.length
);
console.log("result: ", result); // result: [5, 7, empty, 10]

// ポリフィル
// 省略