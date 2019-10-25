// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/template_strings
// テンプレート文字列
// Template literal は組み込み式を扱うことができる文字列リテラルです。
// 複数行文字列や文字列内挿機能を使用できます。ES2015 / ES6 仕様の以前のエディションでは、"template strings" と呼ばれていました。

// ■ Syntax
// `string text`
//
// `string text line 1
//  string text line 2`
//
// `string text ${expression} string text`
//
// tag `string text ${expression} string text`

// ■ 説明
// テンプレートリテラルは、ダブルクォートや、シングルクォートの代わりにバックティック文字（``）で囲む。
// テンプレートリテラルには、プレースホルダーを含める事が出来ます
// プレースホルダーは、ドル記号と波括弧（${expression}）で示される。
// プレースホルダー内の式と、その間のテキストは関数に渡される。既定の関数はパーツを1つの文字として繋げる。
//
// テンプレートリテラルの前に式がある場合、テンプレートリテラルは「タグ付けされたテンプレートリテラル」と呼ばれる
// この場合、タグ式（通常は関数）はテンプレートリテラルと一緒に呼び出され、アウトプットの前に実行出来る
// テンプレートリテラル内でバックティック文字をエスケープするには、バックティック文字の前にバックスラッシュ（\）を置く。
console.log(`\`` === "`"); // true

// □ 複数行文字列
// ソースに挿入されたあらゆる改行文字列は、テンプレートリテラルに含まれる
// 通常の文字列を使うと、複数行文字列を取得する為に↓の構文を使用する
console.log("string text line 1\n\
string text line 2");
// "string text line 1
// string text line 2"

// テンプレートリテラルの場合↓
console.log(`string text line 1
string text line 2`);
// "string text line 1
// string text line 2"

// □ 式内挿法
// 通常の文字列に式を入れる場合↓
/*
let a = 5;
let b = 10;
console.log("Fifteen is " + (a + b) + " and\nnot " + (2 * a + b) + ".");
*/
// "Fifteen is 15 and
// not 20.

// テンプレートリテラルを使用した場合
/*
var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b} and\nnot ${2 * a + b}.`);
*/
// "Fifteen is 15 and
// not 20."

// □ ネストしたテンプレートリテラル
// テンプレートリテラルの中でテンプレートリテラルが使える
/*
const classes = `header ${ isLargeScreen() ? '' :
 `icon-${item.isCollapsed ? 'expander' : 'collapser'}` }`;
*/

console.log("");
// □ タグ付けされたテンプレートリテラル
var a_2 = 5;
var b_2 = 10;

function tag(strings, ...values) {
  console.log(strings[0]); // "Hello "
  console.log(strings[1]); // " world"
  console.log(values[0]); // 15
  console.log(values[1]); // 50

  return "Bazinga!";
}

tag`Hello ${a_2 + b_2} world ${a_2 * b_2}`;
// "Bazinga!" ←出ない
/*
Hello 
  world 
15
50
*/

// □ Raw string
// タグ関数に渡される第1引数では特別なrawプロパティが利用でき、エスケープシーケンスが処理されない、入力された通りの生の文字列を参照できます。
function tag2(strings, ...values) {
  console.log(strings.raw[0]);
}
tag2`string text line 1 \n string text line 2`; // string text line 1 \n string text line 2

// 加えて、 String.raw() メソッドはデフォルトテンプレート関数のように未加工の文字列を生成するために存在し、文字列連結を行います。
// String.raw`Hi\n${2+3}!`;
// "Hi\n5!"

// □ タグ付けされたテンプレートとエスケープシーケンス
/*
ES2016 での振る舞い
ECMAScript 2016 時点では、タグ付けされたテンプレートの以下のエスケープシーケンスには、次のようなルールが適用されます。

・Unicode のエスケープシーケンスは "\u" で始まること。例: \u00A9
・Unicode のコードポイントのエスケープは "\u{}" で示すこと例: \u{2F804}
・16進数のエスケープは "\x" で始まること。例: \xA9
・8進数のリテラルのエスケープは "\" で始まり、その後数字が続くこと。例: \251

このルールのもとでは、下に示す例のようなタグ付けされたテンプレートが問題となります。
なぜなら、ECMAScript の文法に従ってこのテキストを解釈しようとすると、
パーサーはUnicodeの有効のエスケープシーケンスを探そうとするも、不正な構文が検出されてしまうからです。
*/
