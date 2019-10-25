// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/entries
// Array.prototype.entries()
// entries()メソッドは、配列内の各要素に対するkey/valueペアを含む新しいArrayIteratorオブジェクトを取得します。
let array1 = ["a", "b", "c", "d"];
let iterator1 = array1.entries();
console.log(iterator1.next().value); // [0, "a"]
console.log(iterator1.next().value); // [1, "b"]
console.log("");

// ■ Syntax
// a.entries()

// □ 戻り値
// 新しいArray Iteratorオブジェクトを返す

// ■ 例

// □ for...loopを使う
let array2 = ["a", "b", "c"];
let iterator2 = array2.entries();
for (let e of iterator2) {
  console.log(e);
}
// [0, "a"]
// [1, "b"]
// [2, "c"]
