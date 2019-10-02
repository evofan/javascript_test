// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/create
// Object.create()

// Object.create() メソッドは、既存のオブジェクトを新しく生成されるオブジェクトのプロトタイプとして使用して、
// 新しいオブジェクトを生成します。

const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(`My Name is ${this.name}。私は人間か？=${this.isHuman}`);
  }
};

const me = Object.create(person);

me.name = "山田太郎"; // 「name」は「me」に設定されたプロパティですが、「person」には設定されていません
me.isHuman = true; // 継承されたプロパティは上書き可能

me.printIntroduction(); // My Name is 山田太郎。私は人間か？=true

// Syntax
// Object.create(proto, [propertiesObject])

// 引数
// protp ... 新たに生成されるオブジェクトのプロトタイプになるオブジェクト
// propertiesObject ... 省略可。指定されてた場合、そのown propertyが追加される

// 返り値
// 指定したプロトタイプオブジェクトと、プロパティを持つ新しいオブジェクト

// 例
// Object.create()を用いた継承

// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

// superclass method
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info("Shape moved");
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
// Object.prototype.constructorをRectangleに設定しない場合、
// Shape（parent）のprototype.constructorを取得します。
// それを避けるため、prototype.constructorをRectangle（子）に設定します。

let rect = new Rectangle();

console.log("rectは instance of Rectangleか？ ", rect instanceof Rectangle); // true
console.log("rectは instance of Shapeか？", rect instanceof Shape); // true
rect.move(1, 1); // Shape moved

console.log("");

// 複数のオブジェクトから継承したい場合は、ミックスインが可能です。
/*
function MyClass() {
  SuperClass.call(this);
  OtherSuperCall(this);
}

// 1つのクラスを継承する
MyClass.prototype = Object.create(SuperClass.prototype);

// もう一方をミックスイン
Object.assign(MyClass.prototype, OtherSuperCall.prototype);

// コンストラクタを再アサイン
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
   // do something
};
*/

console.log("");

// Object.create()で第二引数のPropertiesObjectを指定した場合
let o;

// プロトタイプをnullにしてオブジェクトを生成
o = Object.create(null);

o = {};

// 次と同等です
let o2 = Object.create(Object.prototype);
console.log(o === o2); // false？
console.log(typeof o === typeof o2); // true

console.log("");

// いくつかのオブジェクトを作成する例
// サンプルプロパティ。 （2番目のパラメーターはキーを*プロパティ記述子*にマップします）
let o3 = Object.create(Object.prototype, {
  // fooは通常の「値プロパティ」です
  foo: {
    writable: true,
    configurable: true,
    value: "hello"
  },
  // barは、getter-and-setter（アクセサ）プロパティです
  bar: {
    configurable: false,
    get: function() {
      return 10;
    },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }

    /* ES2015アクセサーを使用すると、コードは次のようになります。
    get() { return 10; },
    set(value) {
      console.log('Setting `o.bar` to', value);
    } */
  }
});
console.log("o3: ", o3);
/*
  o3:  {
    foo: "hello"}
    bar: 10
    foo: "hello"
    get bar: ƒ ()
    set bar: ƒ (value)
    __proto__: Object
*/

console.log("");

let o4;
function Constructor() {
  o4 = new Constructor();
  // 下と同等
  let o5 = Object.create(Constructor.prototype);
  console.log(o4 === o5);
  console.log(typeof o4 === typeof o5);
  //もちろん、実際の初期化コードがある場合
  // Constructor関数で、
  // Object.create（）はそれを反映できません
}
// console.log(Constructor()); // Uncaught RangeError: Maximum call stack size exceeded

console.log("");

// プロトタイプが新しい空の新しいオブジェクトを作成します
// 値42の単一のプロパティ「p」をオブジェクトとして追加します。
let o6 = Object.create({}, { p: { value: 42 } });
// デフォルトではプロパティは書き込み不可です。
// 列挙可能または構成可能：
o6.p = 24;
console.log("o6.p: ", o6.p); // o6.p:  42、※上書きされない

o6.q = 12;
for (prop in o6) {
  console.log(prop); // q
}

console.log(delete o6.p); // false

// ES3プロパティを指定します
let o7 = Object.create(
  {},
  {
    p: {
      value: 42,
      writable: true,
      enumerable: true,
      configurable: true
    }
  }
);
// ↑は次と同等です：
// o7 = Object.create({p: 42})

console.log("");

// カスタムオブジェクトと Null オブジェクト

// 完全にカスタムオブジェクトから作成された新しいオブジェクト（特にnullオブジェクトから作成されたオブジェクトは
// 基本的にNOメンバーを持つカスタムオブジェクトです）は、
// 予期しない動作をする可能性があります。
// 一般的なオブジェクトプロパティの変換/検出ユーティリティ関数は、エラーを生成したり、
// 単に情報を失ったりする可能性があるため（特にエラーを無視するサイレントエラートラップを使用している場合）、
// デバッグ時には特にそうです。 たとえば、次の2つのオブジェクトがあります。

let oco = Object.create({}); // 通常のオブジェクトを作成します
let ocn = Object.create(null); // 「null」オブジェクトを作成します
console.log(oco); // {} -- 普通のようです
console.log(ocn); // {} -- こちらも普通のようです

oco.p = 1; // 通常のobjに単純なプロパティを作成します
ocn.p = 0; // 「null」オブジェクトに単純なプロパティを作成します

console.log(oco); // {p: 1} -- まだ普通のようです
console.log(ocn); // {p: 0} -- ここでもまだ普通のようです。 ちょっと待って...

// 上記に示すように、これまでのところすべてが正常に見えます。
// ただし、これらのオブジェクトを実際に使用しようとすると、それらの違いがすぐに明らかになります。

console.log("oco is: " + oco); // oco is: [object Object]
// console.log("ocn is: " + ocn); // Uncaught TypeError: Cannot convert object to primitive value

// 多くの最も基本的な組み込み関数のほんの一部をテストすると、問題の大きさがより明確に示されます。

console.log("");

// console.log(alert(oco)); // [object, Object]
// console.log(alert(ocn)); // Uncaught TypeError: Cannot convert object to primitive value

console.log(oco.toString()); // [object Object]
// console.log(ocn.toString()); // Uncaught TypeError: ocn.toString is not a function

console.log(oco.valueOf()); // {p: 1}
// console.log(ocn.valueOf()); // Uncaught TypeError: ocn.valueOf is not a function

console.log(oco.hasOwnProperty("p")); // true
// console.log(ocn.hasOwnProperty("p")); // Uncaught TypeError: ocn.hasOwnProperty is not a function

console.log(oco.constructor); // ƒ Object() { [native code] }
console.log(ocn.constructor); // undefined

console.log("-");

// 前述のように、これらの違いにより、単純に見える問題でさえデバッグがすぐに失敗する可能性があります。例えば：

// 単純な一般的なデバッグ機能：
// 最上位のプロパティ名を表示：指定されたオブジェクトの値のペア
function ShowProperties(b) {
  for (var i in b) {
    console.log(i + ": " + b[i] + "\n");
  }
}

// そのような単純な結果ではありません：（特に、サイレントエラートラップがエラーメッセージを隠した場合）
let ob8 = {};
ob8.po = oco;
ob8.pn = ocn;
// 上記のテストオブジェクトをプロパティ値として使用して複合オブジェクトを作成します

// トップレベルのプロパティを表示する
// console.log(ShowProperties(ob8)); // po: [object Object]
// Uncaught TypeError: Cannot convert object to primitive value
// ★最初のプロパティのみが表示されることに注意してください。

console.log("--");

//（しかし、同じオブジェクトが単に異なる順序で作成された場合-少なくともいくつかの実装では...）

let ob9 = {};
ob9.pn = ocn;
ob9.po = oco; // 同じ複合オブジェクトを再度作成しますが、同じプロパティを異なる順序で作成します

// トップレベルのプロパティを表示する
// console.log(ShowProperties(ob9)); // Uncaught TypeError: Cannot convert object to primitive value
// ★どちらのプロパティも表示されないことに注意してください。

// このような異なる順序は、ここのような異種の固定コーディングを介して静的に発生する場合がありますが、
// 入力および/またはランダム変数に依存する実行時に、
// そのようなプロパティを追加するコードブランチが実際に実行される順序を介して動的に発生する場合があることに注意してください。
// 繰り返しますが、実際の反復順序は、順序メンバーが追加されても保証されません。

console.log("---");

// いくつかの非解決策
// 不足しているオブジェクトメソッドの良い解決策はすぐにはわかりません。
// 欠落しているオブジェクトメソッドを標準オブジェクトから直接追加しても機能しません。

let ocn2 = Object.create(null); //「null」オブジェクトを作成します（以前と同じ）

ocn2.toString = Object.toString; // 新しいオブジェクトにはメソッドがないため、標準オブジェクトから直接割り当ててみてください

console.log(ocn2.toString); // ƒ toString() { [native code] }
console.log(ocn2.toString == Object.toString); // true

// console.log(ocn2.toString()); // Uncaught TypeError: Function.prototype.toString requires that 'this' be a Function

// 新しいオブジェクトには実際のプロトタイプがなく（これが実際にこれらすべての問題の原因である）、
// 直接追加できないため、新しいオブジェクトの「プロトタイプ」に欠落しているobject-methodを直接追加しても機能しません。

console.log("----");

let ocn3 = Object.create(null); //「null」オブジェクトを作成します（以前と同じ）

// ocn3.prototype.toString = Object.toString; // Uncaught TypeError: Cannot set property 'toString' of undefined

console.log((ocn3.prototype = {})); // {}
console.log((ocn3.prototype.toString = Object.toString)); // ƒ toString() { [native code] }

// console.log(ocn3.toString()); // Uncaught TypeError: ocn3.toString is not a function

// 標準オブジェクトを新しいオブジェクトのプロトタイプとして使用して、欠落しているオブジェクトメソッドを追加しても機能しません。

console.log("-----");

let ocn4 = Object.create(null); //「null」オブジェクトを作成します（以前と同じ）
Object.setPrototypeOf(ocn4, Object); // 新しいオブジェクトのプロトタイプを標準オブジェクトに設定します
// console.log(ocn4.toString()); // Uncaught TypeError: Function.prototype.toString requires that 'this' be a Function

console.log("------");

// いくつかのOKソリューション
// 繰り返しますが、欠落しているオブジェクトメソッドを標準オブジェクトから直接追加しても機能しません。/
// ただし、ジェネリックメソッドを直接追加すると、次のようになります。

let ocn5 = Object.create(null); //「null」オブジェクトを作成します（以前と同じ）

ocn5.toString = toString; // 新しいオブジェクトにはメソッドがないため、汎用バージョンから直接割り当てます

console.log(ocn5.toString()); // [object Object]
console.log("ocn is: " + ocn5); // ocn is: [object Object]

let ob10 = {};
ob10.pn = ocn5;
ob10.po = oco; // 複合オブジェクトを作成します（以前と同じ）

// トップレベルのプロパティを表示する
console.log(ShowProperties(ob10));
// pn: [object Object]
// po: [object Object]
// undefined

// ただし、一般的なプロトタイプを新しいオブジェクトのプロトタイプとして設定すると、さらに効果的です。

console.log("-------");

let ocn6 = Object.create( null );
Object.setPrototypeOf(ocn6, Object.prototype); // 新しいオブジェクトのプロトタイプを「汎用」オブジェクトに設定します（標準オブジェクトではありません）

//（上記のすべての文字列関連関数に加えて、これも追加します:)

console.log(ocn6.valueOf()); // {}
console.log(ocn6.hasOwnProperty("x")); // false
console.log(ocn6.constructor); // ƒ Object() { [native code] }

// ...およびObject.prototypeの残りのすべてのプロパティとメソッド。

// 示されているように、この方法で変更されたオブジェクトは、通常のオブジェクトと非常によく似ています。
