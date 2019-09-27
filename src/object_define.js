// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
// Object.defineProperty()

// 静的メソッドの Object.defineProperty() は、ある「オブジェクトに新しいプロパティを直接定義」したり、
// 「オブジェクトの既存のプロパティを変更」したりして、そのオブジェクトを返します。

const object1 = {};

Object.defineProperty(object1, "property1", {
	value: 42,
	writable: false
});

object1.property1 = 77; // 書き込み禁止の為、上書き不可
console.log(object1.property1); // 42

// ■Syntax
// Object.defineProperty(obj, prop, descriptor)

// ■引数
// obj ... プロパティを定義するオブジェクト
// prop ... 定義or変更するプロパティ名
// descriptor ... 定義or変更されるプロパティのディスクリプタ（記述子）

// ■戻り値
// 渡されたオブジェクトをそのまま返す

// ■解説
// ・このメソッドで、あるオブジェクトのプロパティを明示的に追加または変更する事が出来る
// ・通常のプロパティ追加 ＝＞ プロパティ列挙 (for...in ループや Object.keys メソッド) に現れ、値は変更可能で、また削除も可能
// ・＝＞この命令では既定値では変更不可能（変更可）
// ・プロパティのディスクリプタ（記述子）は、データディスクリプタとアクセサディスクリプタの2つ
// ・データ記述子は値を持つプロパティ
// ・アクセ記述子は関数のgetterとsetterで表されるプロパティ（データはこれと↑のどちらかの形になる）
// ・ディスクリプタはオブジェクトで表現される

// ■ディスクリプタの共通して持てるキー
//
// configurable：trueである場合、記述子の変更や、プロパティの削除が出来る
// default: false
//
// enumerable：trueの場合、列挙可能なオブジェクトとして表示される
// default: false

// ■データディスクリプタの時に持てるキー
//
// value：プロパティの値
// default: undefined
//
// writable：trueの場合、プロパティの値を代入で変更出来る
// default: false

// ■アクセサディスクリプタの時に持てるキー
//
// get：プロパティのゲッターとなる関数
// default: undefined
//
// set：プロパティのセッターとなる関数
// default: undefined

// __proto__を使うやり方
let obj = {};
let descriptor = Object.create(null); // 意図しないキーの継承を防ぐ

// デフォルトの挙動により、継承不能、変更不能、書き替え不能なプロパティとなる
descriptor.value = "static";
Object.defineProperty(obj, "key", descriptor);

// 明示的な指定
Object.defineProperty(obj, "key", {
	enumerable: false,
	configurable: false,
	writable: false,
	value: "static"
});

// 同じオブジェクトを再利用
function withValue(value) {
	let d =
		withValue.d ||
		(withValue.d = {
			enumerable: false,
			writable: false,
			configurable: false,
			value: null
		});

	// 値の代入で重複操作を防ぐ
	if (d.value !== value) d.value = value;

	return d;
}
// 使い方
Object.defineProperty(obj, "key", withValue("static"));

// freezeが利用出来るならそれを使ってオブジェクトのプロトタイプのプロパティの追加・削除を防げる
(Object.freeze || Object)(Object.prototype);

// ■例

// □プロパティの生成
// オブジェクトに指定されたプロパティが存在しない時、新たなプロパティを生成する
// 記述子を省略した場合、default値が適用される

let obj2 = {}; // 新しいオブジェクトの作成

// データディスクリプタにより、definePropertyを用いてオブジェクトを追加する例
let prop = "a";
Object.defineProperty(obj2, prop, {
	value: 37,
	writable: true,
	enumerable: true,
	configurable: true
});
console.log(obj2.a); // 37

// アクセサディスクリプタにより、definePropertyを用いてオブジェクトを追加する例
let bValue = 38;
Object.defineProperty(obj2, "b", {
	get() {
		return bValue;
	}, // ES2015のショートハンド、get function() {}と同じ
	set(newValue) {
		bValue = newValue;
	},
	enumerable: true,
	configurable: true
});
console.log(obj2.b); // 38

// データとアクセサディスクリプタを混在は不可
/*
Object.defineProperty(obj2, 'conflict', { // Uncaught TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>
    value: 0x9f91102,
    get() { return 0xdeadbeef;}
});
*/

// □プロパティの変更

// witable属性がfalseの時に、そのプロパティは書き替え可
let obj3 = {};

Object.defineProperty(obj3, "a", {
	value: 7,
	writable: false
});

console.log(obj3.a); // 7
obj3.a = 25; // エラーは出ないが、
console.log(obj3.a); // 7のまま、代入文では動作負荷

// strict mode
/*
(function() {
    'use strict';
    let obj = {};
    Object.defineProperty(obj, "b", {
        value: 2,
        writable: false
    });
    obj.b = 3; // Uncaught TypeError: Cannot assign to read only property 'b' of object '#<Object>'
    return obj.b;
}());
*/

// Enumerable属性
let obj4 = {};
Object.defineProperty(obj4, "a", {
	value: 1,
	enumerable: true
});
Object.defineProperty(obj4, "b", {
	value: 2,
	enumerable: false
});
Object.defineProperty(obj4, "c", {
	value: 3
}); // 設定しない時はdefaultの enumerable: false

obj4.d = 4; // 代入で直接プロパティを生成する時、enumerableはtrue

Object.defineProperty(obj4, Symbol.for("e"), {
	value: 5,
	enumerable: true
});

Object.defineProperty(obj4, Symbol.for("f"), {
	value: 6,
	enumerable: false
});

for (let i in obj4) {
	console.log(i, obj4[i]); // a 1, d 4
}

console.log(Object.keys(obj4)); // (2) ["a", "d"]

console.log(obj4.propertyIsEnumerable("a")); // true
console.log(obj4.propertyIsEnumerable("b")); // false
console.log(obj4.propertyIsEnumerable("c")); // false
console.log(obj4.propertyIsEnumerable("d")); // true
console.log(obj4.propertyIsEnumerable(Symbol.for("e"))); // true
console.log(obj4.propertyIsEnumerable(Symbol.for("f"))); // false

let p = { ...obj4 };
console.log(p.a); // 1
console.log(p.b); // undefined
console.log(p.c); // undefined
console.log(p.d); // 4
console.log(p[Symbol.for("e")]); // 5
console.log(p[Symbol.for("f")]); // undefined

// Configurable属性…configurable属性はプロパティをオブジェクトから削除出来るかどうか、プロパティの属性（valueとwritable以外）を変更出来るかを制御

let obj5 = {};

Object.defineProperty(obj5, "a", {
	get() {
		return 1;
	},
	configurable: false
});

/*
Object.defineProperty(obj5, "a", {
    configurable: true // Uncaught TypeError: Cannot redefine property: a
});
*/

/*
Object.defineProperty(obj5, "a", {
    enumerable: true // Uncaught TypeError: Cannot redefine property: a
});
*/

/*
Object.defineProperty(obj5, "a", {
    set() {} // Uncaught TypeError: Cannot redefine property: a
});
*/

/*
Object.defineProperty(obj5, "a", {
    get() {return 1;} // Uncaught TypeError: Cannot redefine property: a
});
*/

/*
Object.defineProperty(obj5, "a", {
    value: 12 // Uncaught TypeError: Cannot redefine property: a
});
*/

console.log(obj5.a); // 1

delete obj5.a; // configurable属性がfalseのため、削除不可（エラーは出ない）

console.log(obj5.a); // 1

// □プロパティ及び既定値の追加、値の割り当てにドット表記を用いた場合と、Object.defineProperty()を用いた場合とでは違いがある。

let obj6 = {};

// ■ポリフィル
// （省略）
