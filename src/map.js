// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map
// Map
// Mapオブジェクトは単純なキー/値 写像（マップ）です。キーあるいは値として任意の値（オブジェクト、プリミティブ値とも）を使う事が出来ます。

// https://linky-juku.com/set-and-mapping/
// 写像とは（←この前に「集合」について理解しておく事）
// 写像とは、ある集合の要素から、他の集合の要素とを対応させること、と言えます。
// ★「全単射」... 2つの集合の要素が1:1で対応しているもの
// ★「全射」... P→Qが可能でも、Q→Pが不可能な場合（↑サイトの図で言うと身長の所）
// 　　　　　　　P→Qの写像は成り立つが、QからPへの写像（逆写像）は成立しない時が全射
// ★「単射」... P→Qの要素が対応していても、QからPへの対応が無い場合（↑サイトの図で言うと165cm）は単射

// 写像の意味を捉えておく事で、ベクトル空間。行列を理解するのに役に立つ

// ■ Syntax
// new Map([iterable])

// □ 引数
// iterable ... 要素が「キー・値」の対（2要素）であるArray又は他の反復処理可能（イテレーブル）なオブジェクト

// ■ 解説
// Mapオブジェクトは、その要素について、挿入順で反復処理を行う事が出来る
// for～ofループを使う事で、[キー（key）, 値（value）]の配列を返す

// ObjectのMap、特にDictionary？のMapはObjectの挿入順にのみマップされる

// □ キーの等価性
// キーの等価性は「same-value」アルゴリズムに基づく
// （NaN !== NaNであるにも関わらず、NaNはNaNと同一とみなされ、他の全ての値は===演算子の動作に従って等しいとみなされる）

// □ オブジェクトとマップの比較
// ObjectsとMapは、両者とも値へのキーを設定したり、それらの値を取り出したり、キーを削除したり、
// また何かがあるキーに格納されているかを判定したりする事が出来る、という点で似ている

// このため、歴史的にObjectはMapとして使われてきた。
// しかし、Mapの使用を望ましくするObjectとMapの重要な違いが存在する

// ・ObjectのキーはStringsとSymbolsであるが、Mapは★「任意の値がキー」となり得る
// ・Mapの大きさはsizeプロパティで簡単に得る事出来るが、Objectは手動で保つ？必要がある
// ・Mapはiterableで直接反復処理を実行出来るが、Objectは何らかの方法でキーを取得しそのキーを元に反復処理をする必要がある
// ・Objectはプロトタイプを持つため、既定のキーがマップ中に存在する。
//  （Object.create(null)で回避出来るが、推奨はしない）
// ・Mapは頻繁に要素を追加したり削除したりする場合、Objectに比べてパフォーマンスが良い場合？がある

// ■ プロパティ
// Map.length ... lengthプロパティはあるが、値は常に0である。
// get Map[@@species] ... 派生クラスを生成するためのコンストラクタ関数
// Map.prototype ... Mapコンストラクタのプロトタイプを表す。全てのMapオブジェクトに追加のプロパティを定義出来る。

// ■ マップインスタンス
// 全てのMapインスタンスは、Map.prototypeを継承する

// □ プロパティ
// Map.prototype.constructor ... インスタンスのプロトタイプを生成する関数を返す（defaultはMap関数）
// Map.prototype.size ... Mapオブジェクト内のkey：valueペアの数を返す

// □ メソッド
// Map.prototype.clear() ... Mapオブジェクトから全てのkey：valueペアを削除する
// Map.prototype.delete(key) ... keyに関連した値を削除し、Map.prototype.has(value)が以前返した値を返す（has(value)はその後falseを返す）
// Map.prototype.entries() ... Mapオブジェクト内の要素に対し、挿入順に[key, value]の配列を含む★新しいiteratorオブジェクトを返す
// Map.prototype.forEach(callback, [thisArg]) ... Mapオブジェクト内のkey：valueペアに対して挿入順に、1回コールバック関数を呼び出して適用する
//                                                 thisArgが渡された場合、callbackに対するthisの値をして使用される
// Map.prototype.get(key) ... keyに関連した値を返す（無い場合はundefinedが返る）
// Map.prototype.has(key) ... Mapオブジェクト内に指定したkey要素があるかをbool値で返す
// Map.prototype.keys() ... Mapオブジェクト内の要素に対し、挿入順にkeysを含む新しいiteratorオブジェクトを返す
// Map.prototype.set(key, value) ... Mapオブジェクト内にkey: vauesペアの値を設定する
// Map.prototype.values() ... Mapオブジェクト内の要素に対し、挿入順にvaluesを含む新しいiteratorオブジェクトを返す
// Map.prototype[@@iterator]() ... Mapオブジェクト内の要素に対し、挿入順に[key, value]の配列を含む新しいiteratorオブジェクトを返す

// ■ 例

// □ Mapオブジェクトの使用
let myMap = new Map();
let keyString = "文字列";
let keyObj = {};
let keyFunc = function() {};

// 値を設定する
myMap.set(keyString, "'String'と関連付けられた値");
myMap.set(keyObj, "'keyObj'と関連付けられた値");
myMap.set(keyFunc, "'keyFunc'と関連付けられた値");

console.log(myMap); // Map(3) {"文字列" => "'String'と関連付けられた値", {…} => "'keyObj'と関連付けられた値", ƒ => "'keyFunc'と関連付けられた値"}
console.log(myMap.size); // 3

// 値を取得する
console.log(myMap.get(keyString)); // 'String'と関連付けられた値
console.log(myMap.get(keyObj)); // 'keyObj'と関連付けられた値
console.log(myMap.get(keyFunc)); // 'keyFunc'と関連付けられた値

console.log(myMap.get("文字列")); // 'String'と関連付けられた値、※keyString === '文字列' であるため
console.log(myMap.get({})); // undefined、※keyObj !== {}であるため
console.log(myMap.get(function() {})); // undefined、※keyFunc !== function() {}であるため

// □ MapのキーとしてのNaNの使用
// NaNもまたキーとして使用する事が出来る。全てNaNは自身と等しくない（NaN !== NaN）にも関わらず、↓の例は動作する。これはNaNが互いに区別出来ない為
let myMap2 = new Map();
myMap2.set(NaN, "Not a Number");

console.log(myMap2.get(NaN)); // Not a Number

let otherNaN = Number("foo");
console.log(myMap2.get(otherNaN)); // Not a Number

// □ for..ofを使用するMapの反復処理
// Mapはfor...ofを用いて反復処理を行う事が出来る
let myMap3 = new Map();
myMap3.set(0, "zero");
myMap3.set(1, "one");
for (let [key, value] of myMap3) {
  console.log(key + " : " + value);
}
// 0 : zero
// 1 : one

for (let key of myMap3.keys()) {
  console.log(key);
}
// 0
// 1

for (let value of myMap3.values()) {
  console.log(value);
}
// zero
// one

for (let [key, value] of myMap3.entries()) {
  console.log(key + " : " + value);
}
// 0 : zero
// 1 : one

// □ forEach()でMapsを反復処理
// MapはforEach()を使用して反復出来る
myMap3.forEach((value, key) => {
  console.log(key + " : " + value);
});
// 0 : zero
// 1 : one

// □ Arrayオブジェクトとの関係
let kvArray = [["キー1", "値1"], ["キー2", "値2"]];
console.log(kvArray); //  [Array(2), Array(2)]

// 通常のMap()コンストラクタを使って、キー・値の二次元配列をマップに変換する（配列→Mapオブジェクト）
let myMap4 = new Map(kvArray);
console.log(myMap4); // Map(2) {"キー1" => "値1", "キー2" => "値2"}

// 特定のキーを指定してその値を取得
console.log(myMap4.get("キー1")); // 値1

// （元：展開演算子？←spread構文（...）が出て来る）
// Array.from()を使って、マップをキー・値の二次元配列に変換する（↑と逆にMapオブジェクト→配列）
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// Array.from() ... Array.from() メソッドは、配列風オブジェクトや反復可能オブジェクトから、新しい、浅いコピーの Array インスタンスを生成します。
console.log(Array.from(myMap4)); // (2) [Array(2), Array(2)]

// あるいはArray.from()を、キー（又は値）のイテレーターに使って、キー（又は値）のみの配列を得る
console.log(Array.from(myMap4.keys())); // (2) ["キー1", "キー2"]
console.log(Array.from(myMap4.values())); // (2) ["値1", "値2"]s
