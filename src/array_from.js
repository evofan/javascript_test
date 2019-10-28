// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// Array.from()
// Array.from()メソッドは、★配列風オブジェクトや反復可能オブジェクトから、新しい、浅いコピーの Arrayインスタンスを生成します。
console.log(Array.from("foo")); // ["f", "o", "o"]
console.log(Array.from([1, 2, 3], x => x + x)); // [2, 4, 6]
console.log("");

// ■ Syntax
// Array.from(arrayLike[, mapFn[, thisArg]])

// □ 引数
// ・arrayLike ... 配列に変換する配列風オブジェクト又は反復可能オブジェクト、関数内で{}で生成する場合も（すぐmap()適用）
// ・mapFn() ... 配列の全ての要素に対して呼び出されるMap関数
// ・thisArg ... mapFn()を実行する時にthisとして使用される値

// □ 返り値
// ”新しい”arrayインスタンス

// ■ 説明
// Array.from() は、以下のものからArrayを生成します。
// ・配列風オブジェクト (length プロパティおよびインデックス付けされた要素を持つオブジェクト) もしくは
// ・反復可能オブジェクト (Map や Set のような要素を取得するオブジェクト)

// Array.from() は任意の引数 mapFn()を持ちます。これは、作成した配列 (もしくは、サブクラスオブジェクト) のすべての要素に対して
// map関数を実行出来ます。より明確に言うと、中間配列を生成しない事を除いて、Array.from(obj, mapFn, thisArg) は
// Array.from(obj).map(mapFn, thisArg) と同じ結果です。
// 中間配列は、適切な型に合うように丸められた値を持つ必要があるため、typed arrays(型付き配列、Int8Array等)のような配列サブクラスにとっては特に重要です。

// from() メソッドの length プロパティは 1 です。

// ES2015 では、class構文により定義済みクラスとユーザー定義クラスの両方をサブクラス化する事が出来ます。
// 結果として、Array.fromのような静的メソッドは Array のサブクラスに「継承」され、Array ではなくサブクラスのインスタンスを生成します。

// ■ 例

// □ String からの配列の生成
console.log(Array.from("ABC")); // ["A", "B", "C"]

// □ Set からの配列の生成
const set1 = new Set(["foo", "bar", "baz", "foo"]);
console.log(Array.from(set1)); // ["foo", "bar", "baz"]

// □ Map からの配列の生成
const map1 = new Map([[1, 2], [2, 4], [4, 8]]);
console.log(Array.from(map1)); // [ [1, 2], [2, 4], [4, 8] ]

const mapper1 = new Map([["1", "a"], ["2", "b"]]);
console.log(Array.from(mapper1.values())); // ["a", "b"]
console.log(Array.from(mapper1.keys())); // ["1", "2"]

// □ 配列風オブジェクト (引数) からの配列の生成
function f1() {
  return Array.from(arguments);
}
console.log(f1(1, 2, 3)); // [1, 2, 3]

// □ アロー関数と Array.from の使用
// 要素を操作するためにマップ関数として、アロー関数を使用
console.log(Array.from([1, 3, 5], x => x * 2)); // [2, 6, 10]

// 連番の生成
// 配列のそれぞれの場所が、"undefined"で初期化されるため、以下の"v"の値は"undefined"になる
// ★配列長さx5 → undefined埋め → map(currentValue, index)でundefinedにindex番号を上書き
console.log(Array.from({ length: 5 }, (v, i) => i)); // [0, 1, 2, 3, 4]

// □ 連番の生成 (範囲指定)
// ★連番の生成関数（ClojureやPHP等でよくrange()と呼ばれるカスタム関数）
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

// 0～4の範囲の数値を生成
console.log(range(0, 4, 1)); // [0, 1, 2, 3, 4]

// 1～10の範囲の数値を、2毎に生成
console.log(range(1, 10, 2)); // [1, 3, 5, 7, 9]

// Array.from()を使用して、順番通りになるようアルファベットを生成
console.log(
  range("A".charCodeAt(0), "Z".charCodeAt(0), 1).map(x =>
    String.fromCharCode(x)
  )
);
// (26) ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

console.log("");
