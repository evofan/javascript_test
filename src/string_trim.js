// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/trim
// String.prototype.trim()

// trim()メソッドは、文字列の両端の空白を削除します。
// このコンテクストでの空白には、空白文字（スペースやタブ、ノーブレークスペース等）と全ての改行文字（LFやCRなど）を含みます。
let greeting = "    Hello World!   ";
console.log(greeting); //     Hello World!   
console.log(greeting.trim()); // Hello World!

// Syntax
// str.trim() 

// 返り値
// 呼び出し元の文字列の両端から空白を取り除いた新しい文字列です。

// 説明
// trim()メソッドは両端の空白を取り除いた文字列を返します。trim()はその文字列自身の値には影響を与えません（非破壊メソッド）。

// 例
// trim()を使う
let org = "  foo    ";
console.log(org.trim()); // foo

