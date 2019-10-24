// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
// Array.prototype.includes()

// includes() メソッドは、特定の要素が配列に含まれているかどうかをtrueまたはfalseで返します。
// 与えられた要素が見つかるかどうかを計算するために、 SameValueZero (ゼロの同値) アルゴリズムを使用します。
let array1 = [1, 2, 3];
console.log(array1.includes(2)); // true

let pets1 = ["cat", "dog", "bat"];
console.log(pets1.includes("cat")); // true
console.log(pets1.includes("at")); // false
console.log("");

// ■ Syntax
// arr.includes(valueToFind[, fromindex]);

// □ 引数
// ・valueToFind ... 配列内を検索する値、※文字列の場合、大文字と小文字を区別する
// ・fromindex ... 既定値は0。値が正の場合は前から、負の場合は後ろから検索開始になる

// □ 返り値
// true or false ... ゼロの値を検索した場合、-0、0、+0は全て0とみなされてtrueになる（sameValueZeroアルゴリズムを使用する為）

// ■ 例
console.log([1, 2, 3].includes(2)); // true
console.log([1, 2, 3].includes(4)); // false
console.log([1, 2, 3].includes(3, 3)); // false
console.log([1, 2, 3].includes(3, -1)); // true、※マイナスがついてるので後ろから1番目から検索
console.log([1, 2, NaN].includes(NaN)); // true
console.log("");

// □ fromIndexが配列の長さと同じか大きい場合
// fromIndexの値が配列の長さと同じか大きい場合は、配列を検索せずにfalseを返す
let array2 = ["a", "b", "c"];
console.log(array2.includes("c", 3)); // false
console.log(array2.includes("c", 100)); // false
console.log("");

// □ 補正されたインデックスが0より小さい場合
// fromIndexの値が0より小さい場合、serchElemenを検索する配列中の起点として補正されたインデックスを算出する
// 補正されたインデックスが0より小さい場合、配列の全てを検索する

// 配列の長さは3
// fromIndexは-100
// 補正されたインデックスは3+（-100）= -97
let array3 = ["a", "b", "c"];
console.log(array3.includes("a", -100)); // true、0より小さいので、全てを検索
console.log(array3.includes("b", -100)); // true、0より小さいので、全てを検索
console.log(array3.includes("c", -100)); // true、0より小さいので、全てを検索
console.log(array3.includes("a", -2)); // false
console.log(array3.includes("b", -0)); // true
console.log(array3.includes("b", -1)); // false
console.log("");

// □ Arrayではないオブジェクトでincludes()を使う
// includes()は意図的に一般化されている。元の値が配列である必要が無いため、他の配列風オブジェクトにも適用出来る
// ↓はincludes()が関数のargumentsオブジェクトに対して使用された場合の例
(function() {
  console.log([].includes.call(arguments, "a")); // true
  console.log([].includes.call(arguments, "d")); // false
})("a", "b", "c");
