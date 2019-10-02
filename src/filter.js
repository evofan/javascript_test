// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// filter() メソッドは、引数として与えられたテスト「★関数を各配列要素に対して実行」し、それに「★合格した全ての配列要素からなる★新しい配列を生成」します。

let words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

const result = words.filter(word => word.length > 6);

console.log("result: ", result); // result: ["exuberant", "destruction", "present"]

// Syntax
// let newArray = arr.filter(callback(element, [index], [array]), [thisArg])

// 引数
// callback ... 配列内の各要素に対して実行するテスト関数。この関数がtrue→要素を残す、false→要素を削除する
//  element ... 配列内の現在の要素
//  index ... 配列内の現在の要素のインデックス
//  array ... filterメソッドを実行している配列
// thisArg ... callbackを実行する時にthisとして使う値

// 返り値
// テスト関数をパスした要素からなる★新しい配列、1つのパスしなかった時も★空の配列[]が返る

// 説明
// filter()は与えられたcallback関数を配列内の各要素に対し一度ずつ実行し、
// callbackが真と評価される値を返した全てのインデックスからなる新しい配列を生成する。
//
// callbackは値が代入されている配列のインデックスに対してのみ呼び出される。
// （つまり削除されたインデックスや、まだ値が代入されていないインデックスに対しては呼び出されない）

// callbackは3つの引数と共に呼び出される
// 1.配列の要素の値
// 2.配列の要素のインデックス
// 3.走査されている配列オブジェクト

// filterに引数thisArgが与えられた場合、そのオブジェクとはcallback関数内のthisとして使われる
// （そうでない場合はundefinedがthisとして使われる）
// callback関数内の最終的なthis値は関数内のthisを決定する一般的なルール（https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/this）
// に従って決められる

// filter()は呼び出された元の配列を変更（破壊）しない

// filter()が呼び出された後に追加された配列要素に対してはcallbackを実行しない

// 例
// ■小さい値（10未満）を全て取り除く
let isBingEnough = function(value) {
  return value >= 10;
};
let filtered = [12, 5, 8, 130, 44].filter(isBingEnough);
console.log(filtered); // [12, 130, 44] ※5, 8が取り除かれている

// ■JSONの不正な内容（0や数値以外の値）を取り除く
let arr1 = [
  // テスト用JSONデータ
  { id: 15 },
  { id: -1 },
  { id: 0 },
  { id: 3 },
  { id: 12.2 },
  {},
  { id: null },
  { id: NaN },
  { id: "undefined" }
];
let invalidEntries = 0;
// 数値かどうかを判別
function isNumber(obj) {
  return obj !== undefined && typeof obj === "number" && !isNaN(obj); // 未定義で無く、且つ数値、且つ数値以外の値では無い、場合に値を返す
}
// 不正な値かどうか判別
function filterByID(item) {
  if (isNumber(item.id) && item.id !== 0) {
    // 数値且つ0で無いならtrue
    return true;
  }
  invalidEntries++; // 不正な値としてカウント
  return false;
}
let arrById = arr1.filter(filterByID); // IDをフィルターするコールバックを実行

console.log("Filtered Array\n", arrById);
// Filtered Array
// {id: 15}
// {id: -1}
// {id: 3}
// {id: 12.2}

console.log("Number of Invalid Entries = ", invalidEntries); // Number of Invalid Entries =  5

// ■配列内の検索としてfilter()を使用
let fruits = ["apple", "banana", "orange", "grapes", "mango"];

// 検索条件（クエリ）に基づいて配列項目をフィルターする
function filterItems(arr, query) {
    return arr.filter(function(el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) !== -1; // String.prototype.indexOf()、見つからない場合-1を返す
    })
}
console.log(filterItems(fruits, 'ap')); // ["apple", "grapes"]
console.log(filterItems(fruits, 'an')); // ["banana", "orange", "mango"]

// ES2015ver.
const filterItems2 = (arr, query) => arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1); // returnも省略可
console.log(filterItems2(fruits, 'an')); // (3) ["banana", "orange", "mango"]

// Polyfill
// ※省略
