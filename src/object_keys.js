// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
// Object.keys()

// Object.keys()メソッドは、指定されたオブジェクトが持つ★「プロパティの名前の配列」を、通常のループで取得するのと同じ順序で返します。

const object1 = {
  a: "something",
  b: 42,
  c: false
};
console.log(Object.keys(object1)); // ["a", "b", "c"]
console.log("\n");

// Syntax
// Object.keys(obj)

// 引数
// obj...返される事になる、列挙可能なプロパティを持つオブジェクト

// 返り値
// 与えられたオブジェクトの列挙可能なプロパティを表す★文字列（の配列）

// 説明
// プロパティの順序はマニュアルでループして取得した時と同じ順序になる

// 例

// 単純な配列
let arr = ["a", "b", "c"];
console.log(Object.keys(arr)); // ["0", "1", "2"] ※キーが無い場合？はindex（の文字列）が返される

// オブジェクトの様な配列
let obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.keys(obj)); // ["0", "1", "2"]

// キーの順番がランダムなオブジェクトの様な配列
let anObj = { 100: "a", 2: "b", 7: "c" };
console.log(anObj); // {2: "b", 7: "c", 100: "a"}

// getFooは列挙可能では無いプロパティ
let myObj = Object.create(
  {},
  {
    getFoo: {
      value: function() {
        return this.foo;
      }
    }
  }
);
myObj.foo = 1;
console.log(Object.keys(myObj)); // ["foo"]

// ※列挙可能では無いものを含むプロパティを取得したい場合は、
// Object.getOwnPropertyNames()を使う
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
// Object.getOwnPropertyNames() メソッドは、与えられたオブジェクトで発見されたすべての直接のプロパティを含む配列を (シンボルを使用したものを除き、
// 列挙不可能なプロパティを含んで) 返します。

// メモ
// ES2015では、引数がオブジェクトでは無い場合（＝プリミティブ値）、強制的に（文字列に）変換される
// ES5ではエラーが出る
console.log(Object.keys("foo")); // ["0", "1", "2"]
