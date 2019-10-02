// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// map() メソッドは、与えられた「★関数を配列のすべての要素に対して呼び出し」、その結果からなる「★新しい配列を生成」します。

let array1 = [1, 4, 9, 16];
const map1 = array1.map(x => x * 2);
console.log("map1: ", map1); // [2, 8, 18, 32]

// [Syntax]
// let new_array = arr.map(function callback(currentValue, [index], [array]) {
//    // 新しい配列の要素を返す
// }, [thisArg]);

// [引数]
// callback() ... 新しい配列の要素を生成する為の関数、次の3つの引数を取る
//  currentValue ... 現在処理中の要素の値
//  index ... （オプション）現在処理中の要素の配列内におけるインデックス
//  array ... （オプション）mapが実行されている配列
//
// thisArg ... （オプション）callback()を実行する時にthisとして扱う値

// [返り値]
// 与えられた関数を配列内の全ての要素に対して実行し、その結果からなる新しい配列

// [解説]
// mapは与えられたcallback関数を配列の順番通りに、各要素に対して一度ずつ呼び出し、
// その結果から新しい配列を作成する

// callback()は値が代入されているが配列のインデックスに対してのみ呼び出される
// （undefinedが代入されているものは含む、値が代入されてないものや、削除されたインデックスは含まない）

// thisArgが与えられた場合、callback()の呼び出しの度にそれがthisとして使われる
// （引数が省略された場合は、thisはundfinedになる）
// 最終的には、関数における通常のthisを決定するルール（https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/this）によって決まる

// map()は呼び出された元の配列を変更しない

// map()が呼び出された後に元の配列が変更されても影響を受けない

// map()が呼び出された配列がまばらである場合、結果の配列も同じインデックスを空白に保つ

// [例]
// ■ 数値の配列を平方根の配列にマッチングする
let numbers = [1, 4, 9];
let roots = numbers.map(function(num) {
  return Math.sqrt(num);
});
console.log("numbers: ", numbers); // numbers: [1, 4, 9]
console.log("roots: ", roots); // roots: [1, 2, 3]

// ■ map()を使用して配列内のオブジェクトを再フォーマット
let kvArray = [
  { key: 1, value: 10 },
  { key: 2, value: 20 },
  { key: 3, value: 30 }
];
let reformattedArray = kvArray.map(obj => {
  let rObj = {};
  rObj[obj.key] = obj.value;
  return rObj;
});
console.log("reformattedArray: ", reformattedArray);
// reformattedArray: [
//  {1: 10}
//  {2: 20}
//  {3: 30}
// ]

// ■ 引数を含む関数を利用して、数値配列をマッピングする
// 1つの引数を必要とする関数を使用する時に、map()がどのように動作するかを示している
let numbers2 = [1, 4, 9, 16];
let roots2 = numbers2.map(function(elment) {
  return Math.sqrt(elment);
});
console.log("roots2: ", roots2); // roots2: [1, 2, 3, 4]

// ■ 汎用的なmap()の使用
let map2 = Array.prototype.map;
let word_code = map2.call('Hello World', function(x) {
    return x.charCodeAt(0); // String.prototype.charCodeAt() ... 与えられたindexに位置する文字のUTF-16コード（0-65535）を表す
});
console.log("word_code: ", word_code); // word_code: [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]

// ■ 汎用的なmap()の使用：querySelectorAll
let elems = document.querySelectorAll("select option:checked");
let value = Array.prototype.map.call(elems, function(obj) {
    return obj.value;
});

// ■ トリッキーな使用例
// コールバック関数は第一引数だけを指定するケースが殆どだが、意図しないケースがあるので注意
let num2 = ["1", "2", "3"].map(parseInt);
console.log("num2: ", num2); // num2:  (3) [1, NaN, NaN]
// ↓の処理をしているので
// parseInt(string, radix) -> map(parseInt(value, index))
/*
    first iteration (index is 0): parseInt("1", 0); // 1
    second iteration (index is 1): parseInt("2", 1); // NaN
    third iteration (index is 2): parseInt("3", 2); // NaN
*/

// 解決策
function returnInt(element) {
    return parseInt(element, 10);
}

let num3 = ["1", "2", "3"].map(returnInt);
console.log("mum3: ", num3); // mum3: [1, 2, 3]

let num4 = ["1", "2", "3"].map(str => parseInt(str));
console.log("num4: ", num4); // num4: [1, 2, 3]

let num5 = ["1", "2", "3"].map(Number);
console.log("num5: ", num5); // num5: [1, 2, 3]

// parseInt()と違って、Number()はfloat又は解決した指数表表現を返す
let num6 = ["1.1", "2.2e2", "3e300"].map(Number);
console.log("num6: ", num6); // num6: [1.1, 220, 3e+300]

// ■ undefinedを持つ配列のマッピング
let numbers3 = [1, 2, 3, 4];
let filteredNumbers = numbers3.map(function(num, index) {
    if (index < 2) {
        return num;
    }
    return ""; // undefined以外を指定したい場合
});
console.log("filteredNumbers: ", filteredNumbers); // filteredNumbers: [1, 2, undefined, undefined] // なにも指定しないと該当しない場合はundefinedが返る

// ポリフィル
// 省略