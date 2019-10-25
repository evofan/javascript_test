// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
// Object.entries()
// Object.entries()メソッドは、引数に与えたオブジェクトが所有する、列挙可能なプロパティの組 [key, value] からなる配列を返します。
// 配列要素の順序は、for...inループによる順序と同じです (両者の違いとして、for-inループではその上プロトタイプチェーン内のプロパティも列挙されます)。
// ★Object.entries()で返される配列の順序は、オブジェクトがどのように定義されたかに依存しません。
// 特定の順序にする必要があるのであれば、Object.entries(obj).sort((a, b) => a[0] - b[0]); のようにして、まず配列を整列する必要があります。
let object1 = {
  a: "something",
  b: 42
};

for (let [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}
// a: something
// b: 42

// ■ Syntax
// Object.entries(obj)

// □ 引数
// obj ... 返される事になる列挙可能な所有プロパティの組[key, value]を持つオブジェクト

// □ 返り値
// 引数に与えたオブジェクトが所有する、列挙可能なプロパティの組[key, value]の配列

// ■ 説明
// Object.entries()は、objectに直接存在する列挙可能なプロパティの組[key, value]が配列要素に対応した配列を返します。
// プロパティの順序はおブジェクト内のプロパティに対してループさせた時の順序と同じになります。

// ■ 例
const object2 = { foo: "bar", baz: 42 };
console.log(Object.entries(object2)); // [ ["foo", "bar"], ["baz", 42] ]

// 配列様オブジェクト
const object3 = { 0: "a", 1: "b", 2: "c" };
console.log(Object.entries(object3)); // [ ["0", "a"], ["1", "b"], ["2", "c"] ]

// ランダムなキー順序を持つ配列様オブジェクト
const object4 = { 100: "a", 2: "b", 7: "c" };
console.log(Object.entries(object4)); // [ ["2", "b"],  ["7", "c"], ["100", "a"] ]

// 列挙可能でないプロパティgetGoo()がある
const object5 = Object.create(
  {},
  {
    getGoo: {
      value() {
        return this.foo;
      }
    }
  }
);
object5.foo = "bar";
console.log(Object.entries(object5)); // [ ["foo", "bar"] ]

// オブジェクトでない引数はオブジェクトへと強制変換される
console.log(Object.entries("ABC")); // [ ["0", "A"], ["1", "B"] ,["2", "C"] ]

// プリミティブには独自のプロパティがないため、プリミティブタイプに対して空の配列を返す
console.log(Object.entries(100)); // []

// Key-Valueを適切に反復処理する
let object6 = { a: 5, b: 7, c: 9 };
for (let [key, value] of Object.entries(object6)) {
  console.log(`${key}: ${value}`); //
}
// a: 5
// b: 7
// c: 9

// または、配列エキストラを使用して
Object.entries(object6).forEach(([key, value]) => {
  console.log(`${key}: ${value}`); //
});
// a: 5
// b: 7
// c: 9

// □ ObjectからMapへの変換
// new Map()コンストラクタはentries()による反復処理に対応しているので、
// Object.entries()を使うとObjectからMapへと簡単に変換出来る
const object7 = { foo: "bar", baz: 42 };
const map = new Map(Object.entries(object7));
console.log(map); // Map {"foo" => "bar", "baz" => 42}

// □ Objectをループする
// Array Destructuring（分割代入）を使って、Objectsを簡単にループ出来る
const object8 = { foo: "bone", baz: 58 };
Object.entries(object8).forEach(([key, value]) =>
  console.log(`${key}: ${value}`)
);
// foo: bone
// baz: 58
