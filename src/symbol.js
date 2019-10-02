// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// Symbol
// Symbol() 関数は、symbol 型の値を返します。
// これはビルトインオブジェクトを公開するための静的プロパティを持ち、グローバル symbolレジストリーを公開するための静的メソッドを持つので、
// ビルトインオブジェクトクラスのようにも見えますが、コンストラクタとしての機能を持たず、"new Symbol()" はサポートされていません。

// Symbol()関数は常に一意の値を返します。★symbol値はオブジェクトのプロパティ識別子として使われます。
// symbol型はこの目的のためだけに使われます。目的や使用方法の詳細を知りたい場合、
// MDN用語集：Symbol（https://developer.mozilla.org/ja/docs/Glossary/Symbol）を見てください。

// symbolデータ型は、プリミティブデータ型です。

const symbol1 = Symbol();
const symbol2 = Symbol(42);
const symbol3 = Symbol("foo");

console.log(typeof symbol1); // symbol
console.log(symbol3.toString()); // Symbol(foo)
console.log(Symbol("foo") === Symbol("foo")); // false

// Syntax
// Symbol([description]) ... 任意でdebug用の文字列を渡す事が出来る

// 説明
let sym1 = Symbol();
let sym2 = Symbol("foo");
let sym3 = Symbol("foo");

console.log(sym2 === sym3); // false]
console.log(Symbol("foo") === Symbol("foo")); // false

// let sym4 = new Symbol(); // Uncaught TypeError: Symbol is not a constructor

console.log("");

// Symbolラッパーオブジェクトを作りたい場合は、newでなくObject()を使う
let sym4 = Symbol("foo");
console.log(typeof sym4); // symbol
let symObj = Object(sym4);
console.log(typeof symObj); // object

console.log("");

// グローバルSymbolレジストリの共有symbol
// globalスコープでSymbolを使いたい場合、Symbol.for()やSynbol.keyFor()を使う？

// オブジェクトのsymbolプロパティを探す
// Object.getOwnPropertySymbols()は、symbolの配列を返すが、
// 全てのオブジェクトは初期値ではsymbolの配列を持たない（空）なので注意

// ■ プロパティ
// Symbol.length ... 値が0
// Symbol.prototype ... Symbolコンストラクタの為のプロトタイプ

// 予約されたsymbol ... 言語の振る舞いを表すビルトインシンボルを持っている
// ・反復用途
//  Symbol.iterator ... オブジェクトの為の既定のイテレーターを返すメソッド、for～ofで使用される
//  Symbol.asyncIterator ... オブジェクトのデフォルトのAsyncIteratorを返すメソッド。for await ofｄ使用される

// ・正規表現用途のsymbol
//  Symbol.match ... 文字列にマッチするメソッドや、オブジェクトが正規表現として使用出来るか決定する為に使われる。String.prototype.match()で使われる
//  Symbol.replace ... マッチした文字列の部分を置き換えるメソッド。String.prototype.replace()で使われる
//  Symbol.search ... 正規表現にマッチする文字列のインデックスを返すメソッド。String.prototype.search()で使われる
//  Symbol.split ... 正規表現にマッチするインデックスで文字列を分割するメソッド。String.prototype.split()で使われる

// ・その他のsymbol
//  Symbol.hasInstance ... コンストラクターオブジェクトがオブジェクトがそのインスタンスかどうか確認する為に使用するメソッド。instanceOfで使用される
//  Symbol.isConcatSpreadable ... オブジェクトが配列要素にフラット化出来るかを示す真偽値。Array.ptototype.concat()で使用される
//  Symbol.unscopables ... プロパティの値を示す文字列の配列です。これらは関連するオブジェクトをバインドするwith環境から除外されます
//  Symbol.species ... 派生オブジェクトを生成するために使われるコンストラクタ関数
//  Symbol.toPrimitive ... オブジェクトをプリミティブ値に変換する関数
//  Symbol.toStringTag ... オブジェクトの既定の説明に使われる文字列値。Object.prototype.toString()で使用される

// ■ メソッド
// Symbol.for(key) ... 与えられたkeyで存在するシンボルを検索し、見つかれば返す。もしくはグローバルSymbolレジストリーにこのkeyで新しいsymbolを生成する
// Symbol.keyFor(sym) ... グローバルSymbolレジストリから、与えられたsymbolの為の共有symbol Keyを取得する

// Symbolプロトタイプ
// 全てのSymbolじゃ、Symbol.prototypeを継承する

// 例：symbolと一緒にtypeof演算子を使用する
// typeof演算子は、symbolを識別する為に役立つ
// typeof Symbol() === "symbol";
// typeof Symbol("foo") === "symbol";
// typeof Symbol.iterator === "symbol";

// Symbol型変換
// symbolの型変換作業を行う時に、幾つかの点に注意する
//  ・symbolをnumberに変換 → TypeError
//  ・緩い等価演算子では、Object(sym) == symはtrueを返す
//  ・Symbol("foo") + "bar"はTypeError(symbolをstringに変換出来ません))をスローする。これは例えば新しいstringプロパティを暗黙的に生成するのを防ぐ
//  ・安全なString(sym)変換は動作するが、new String(sym)はTypeErrorをスローする

// Symbolとfor...inによる反復
// Symbolはfor...inによるイテレートでは取得出来ない。またObject.getOwnPropertyNames()はsymbolオブジェクトプロパティを返さない。取得するにはObject.getOwnPropertySymbols()を使う
let obj = {};

obj[Symbol("a")] = "a";
obj[Symbol.for("b")] = "b";
obj["c"] = "c";
obj.d = "d";

for (let i in obj) {
    console.log(i); // c, d
}

// SymbolとJSON.stringify();
// JSON.stringify()を使用する時、Symbolをキーとしたプロパティは無視されるので注意
console.log(JSON.stringify({[Symbol("foo")]: "foo"})); // {}

console.log("");

// プロパティキーとしてのSymbolラッパーオブジェクト
// プロパティキーとして、symbolラッパーオブジェクトを使う時、このオブジェクトはラッパーされたsymbolを強制される
let sym5 = Symbol("bar");
let obj5 = {[sym5]: 1};
console.log(obj5[sym5]); // 1
console.log(obj5[Object(sym5)]); // 1
