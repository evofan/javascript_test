// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/values
// Object.values()

// Object.values() メソッドは引数に与えたオブジェクトが所有する列挙可能なプロパティの★値（なのでキーは取得しない）からなる配列を返します。
// 配列要素の順序は for...in ループによる順序と同じです（両者の違いとして、★for-inループではその上プロトタイプチェーン内のプロパティも列挙されます）。

const object1 = {
  a: "something",
  b: 42,
  c: false
};
console.log(Object.values(object1)); // Array(3) ["something", 42, false]

// Syntax
// Object.values(obj)

// 引数
// obj...返される事になる、列挙可能なプロパティを持つオブジェクト

// 返り値
// 与えられたオブジェクトの列挙可能なプロパティ（配列）

// 説明
// プロパティの順序はマニュアルでループして取得した時と同じ順序になる

// 例

let obj = { foo: "bar", baz: 42 };
console.log(Object.values(obj)); // ["bar", 42]

// 配列様オブジェクト
let obj2 = { 0: "a", 1: "b", 2: "c" };
console.log(Object.values(obj2)); // ["a", "b", "c"]

// ランダムなキーを持つ配列様オブジェクト
let obj3 = { 100: "a", 2: "b", 7: "c" }; // ["b", "c", "a"]
console.log(Object.values(obj3));

// 列挙可能でないプロパティがあった場合
let my_obj = Object.create(
  {},
  {
    getFoo: {
      vale: function() {
        return this.foo;
      }
    }
  }
);
my_obj.foo = "bar";
console.log(Object.values(my_obj)); // ["bar"] ※getFooは取得されない

// オブジェクトで無い引数だった場合はオブジェクトへと強制変換される
let f_str = "ABC";
console.log(Object.values(f_str)); // ["A", "B", "C"]
console.log(Object.keys(f_str)); // ["0", "1", "2"]

