// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction
// GeneratorFunction
// GeneratorFunctionコンストラクターは新しいジェネレーター関数オブジェクトを生成します。 JavaScriptでは、あらゆるジェネレーター関数は実際にGeneratorFunctionオブジェクトです。

// GeneratorFunctionはグローバルオブジェクトではない事に注意して下さい。次のコードを評価する事によって得られます。
Object.getPrototypeOf(function*() {}).constructor;

// ■ Syntax
// new GeneratorFunction([arg1[,arg2, ///argN]], ] functionBody);

// □ 引数
//
// arg1, arg2, ... argN
// 正式な引数名として関数によって使われる名称
// 正当なJavaScript識別子か、カンマで分割されている文字列のリストに一致する文字で無ければなりません。
// 例えば、"x"、"theValue"、"a, b"等です。
//
// functionBody
// 関数定義から成るJavaScriptを含む文字列

// ■ 説明
//
// GeneratinFunctionコンストラクターで生成されたジェネレーター関数オブジェクトは、関数が生成された際にパースされます。
// これは、function* expression（＝function* ○○○）を持ったジェネレーター関数を宣言してコードで呼び出すよりも効率が良いです。
// というのも、そのような関数は、コードの残りの部分でパースされるからです。
//
// 関数に渡された全ての引数は、通された順番の通りに、生成される関数内の引数の識別子の名称として使われます。
//
// (new 演算子を用いずに)関数としてGeneratorFunctionコンストラクターを呼び出す事は、コンストラクターを呼び出すのと同じ効果を持っています。

// ■ プロパティ
//
// ・GeneratorFunction().length ... GeneratorFunctionコンストラクターの長さプロパティ。値は常に1です。
//
// ・GeneratorFunction.prototype ... 全てのジェネレーター関数オブジェクトにプロパティの追加を許します。

// ■ GeneratorFunctionプロトタイプオブジェクト
// □ プロパティ
// ・GeneratorFnuction.constructor ... この初期値は、GeneratorFunction.
// ・GeneratorFunction.prototype.protortpe ... この値は、%GeneratorPrototype%.

// ■ GeneratorFunctionインスタンス
// GeneratorFunctionインスタンスは、GeneratorFunction.prototypeからメソッドとプロパティを継承します。
// 全てのコンストラクターと同様に、全てのGeneratorFunctionインスタンスに変更を加える為にコンストラクターのプロトタイプオブジェクトを変更出来ます。

// ■ 例
// □ GeneratorFunctionコンストラクターからジェネレーター関数を生成します。
let GeneratorFunction = Object.getPrototypeOf(function*() {}).constructor;
let g = new GeneratorFunction("a", "yield a * 2");
let iterator_gf = g(10);
console.log(iterator_gf.next().value); // 20
console.log("");
