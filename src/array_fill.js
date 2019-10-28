// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
// Array.prototype.fill()
// fill()メソッドは、配列中の開始位置から終了位置までの要素を固定値で設定します。その際、終了位置は含まれません。
let array1 = [1, 2, 3, 4];
console.log(array1.fill(0, 2, 4)); // [1, 2, 0, 0]、※位置2から位置4まで0で埋めます
console.log(array1.fill(5, 1)); // [1, 5, 5, 5]、※位置1から5を埋める
console.log(array1.fill(6)); // [6, 6, 6, 6]

// ■ Syntax
// array.fill(value[, start[, end]]);

// □ 引数
// ・value ... 配列に設定する値
// ・start ... 開始する位置、既定値は0
// ・end ... 終了する位置、既定値はthis.length

// □ 返り値
// 変更された配列（元の配列を変更）

// ■ 説明
// fillメソッドは最大3つの引数 value、start、end を取ります。startとendはオプションの引数で、既定値はそれぞれ0とthisオブジェクトのlengthです。
//
// startが負の値の場合、length + startとして扱われます(lengthは配列の長さ)。endが負の値の場合、length + endとして扱われます。
//
// fill()関数はジェネリック関数であり、thisが配列オブジェクトである必要はありません。
//
// https://ufcpp.net/study/csharp/sp2_generics.html
// ジェネリック※（generics：総称性）、 あるいは、総称的プログラミング（generic programming）とも呼ばれますが、
// この機能は、 さまざまな型に対応するために、型をパラメータとして与えて、その型に対応したクラスや関数を生成するもの機能です。
//
// fillメソッドは可変メソッドで、thisオブジェクト自身を変更し、オブジェクト自身のコピーではなく、オブジェクト自身を返します。
//
// fillにオブジェクトを渡した場合、そのオブジェクトへの参照がコピーされ、配列に参照が書き込まれます。

// ■ 例
console.log([1, 2, 3].fill(4)); // 4, 4, 4、OK
console.log([1, 2, 3].fill(4, 1)); // 1, 4, 4、OK
console.log([1, 2, 3].fill(4, 1, 2)); // 1, 4, 4 → 1, 4, 3、※★＞その際、終了位置は含まれません。なので
console.log([1, 2, 3].fill(4, 1, 1)); // 1, 4, 3 → 1, 2, 3、※★＞その際、終了位置は含まれません。←開始位置の指定より優先する
console.log([1, 2, 3].fill(4, 3, 3)); // 1, 2, 3
console.log([1, 2, 3].fill(4, -3, -2)); // 4, 2, 3
console.log([1, 2, 3].fill(4, NaN, NaN)); // 4, 4, 4 → 1, 2, 3、※数字以外で指定した時は無効
console.log([1, 2, 3].fill(4, 3, 5)); // 1, 2, 3
console.log(Array(3).fill(4)); // 4, 4, 4
console.log([].fill.call({ length: 3 }, 4)); // 4,4,4 → { 0: 4, 1: 4, 2: 4, length: 3 }
console.log("");
