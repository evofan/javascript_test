// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
// Object.assign()

// Object.assign() メソッドは、すべての列挙可能（enumerable）なプロパティの値を、
// 1つ以上のコピー元オブジェクトからコピー先オブジェクトにコピーするために使用されます。
// 戻り値としてコピー先オブジェクトを返します。
//
// assign = 代入

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log("target: ", target); // target:  {a: 1, b: 4, c: 5}
console.log("returnedTarget: ", returnedTarget); // returnedTarget:  {a: 1, b: 4, c: 5}

// ■ Syntax
// Object.assign(target, ...source)

// ■ 引数
// target ... コピー先オブジェクト
// soource ... コピー元オブジェクト

// ■ 戻り値
// コピー先オブジェクト

// ■ 解説
// ・コピー先オブジェクトのプロパティで同名の物が既にある場合は、上書きされる
// ・Object.assign()は、コピー元のオブジェクトから列挙可能（enumerable）且つ、直接所有（has）のプロパティだけをコピーする
// ・コピー元からGet、コピー先にSetを使うので、プロパティの代入（assign）になる＝単なるコピーや新しく定義するのとは違う
// ・コピー元にgetterがある場合、このメソッドではなく、Object.getOwnPropertyDescriptor()とObject.defineProperty()を使う

// ・コピー元がnullやundefinedでも例外を投げない

// ■ 例

// □ オブジェクトの複製
let obj1 = { a: 1 };
let copy1 = Object.assign({}, obj1);
console.log("ccopy1: ", copy1); // ccopy1:  {a: 1}

// □ 深い複製（deep copy）についての注意
// Object.assign()、プロパティの値（not 参照）をコピーする為（シャローコピー）、deep copyをする場合は別の手段で行う
(function test() {
  "use strict";

  let obj1 = { a: 0, b: { c: 0 } };
  let obj2 = Object.assign({}, obj1);
  console.log("obj2: ", JSON.stringify(obj2)); // obj2:  {"a":0,"b":{"c":0}}

  obj1.a = 1;
  console.log(obj1); // {a: 1, b: {"c":0 }}
  console.log(obj2); // {a: 0, b: {"c":0 }} // 参照でなく値渡しなので、元のデータを変更しても反映されない

  obj2.a = 2;
  console.log(obj1); // {a: 1, b: {"c":0 }}
  console.log(obj2); // {a: 2, b: {"c":0 }} // コピー先を変更してもコピーは変更されない

  obj2.b.c = 3;
  console.log(obj1); // {a: 1, b: {c: 3}}
  console.log(obj2); // {a: 2, b: {c: 3}} // bの値は参照なのでコピー元も変更される？

  // Deep Clone
  let obj3 = { a: 0, b: { c: 0 } };
  let obj4 = JSON.parse(JSON.stringify(obj3));
  obj3.a = 4;
  obj3.b.c = 4;
  console.log(JSON.stringify(obj4)); // {"a":0,"b":{"c":0}} // 但しfuntionやundefinedがある場合はこの方法では不可

  // ↑の駄目な場合の例
  let obj5 = {
    a: undefined,
    b: function() {
      console.log("b");
    }
  };
  let obj6 = JSON.stringify(obj5);
  console.log(obj6); // {} 値（プロパティ）がなくなってしまう
})();

// □ オブジェクトの合成
let o1 = { a: 1 };
let o2 = { b: 2 };
let o3 = { c: 3 };

let obj2 = Object.assign(o1, o2, o3);
console.log(obj2); // {a: 1, b: 2, c: 3}
console.log(o1); // {a: 1, b: 2, c: 3} 戻り値だけでなく、コピー先オブジェクト（target）自体が変化する？

// □ 同じプロパティを持つオブジェクトの合成
let o4 = { a: 1, b: 1, c: 1 };
let o5 = { b: 2, c: 2 };
let o6 = { c: 3 };

let obj3 = Object.assign({}, o4, o5, o6);
console.log(obj3); // {a: 1, b: 2, c: 3} // 引数でより後にあるオブジェクトが同じプロパティを持ってると上書きされる

// □ シンボル型のプロパティのコピー
let o7 = { a: 1 };
let o8 = { [Symbol("foo")]: 2 };

let obj4 = Object.assign({}, o7, o8);
console.log(obj4); // {a: 1, Symbol(foo): 2}
console.log(Object.getOwnPropertySymbols(obj4)); // [Symbol(foo)]

// □ プロトタイプチェーン上のプロパティと列挙可能（enumerable）でないプロパティはコピー不可
let obj5 = Object.create(
  { foo: 1 },
  {
    // fooはObj5のプロトタイプチェーン

    bar: {
      value: 2 // barは列挙可能でないプロパティ
    },

    baz: {
      value: 3,
      enumerable: true // 列挙可能に変更
    }
  }
);

let copy2 = Object.assign({}, obj5);
console.log(copy2); // {baz: 3}

// □ プリミティブはオブジェクトでラップされる？
let o10 = "abcde";
let o11 = true;
let o12 = 10;
let o13 = Symbol("foo");

let obj6 = Object.assign({}, o10, null, o11, o12, undefined, o13);
console.log(obj6); // {0: "a", 1: "b", 2: "c", 3: "d", 4: "e"} // null・undefinedは無視される、文字列をラップ時だけ、直接所有で列挙可能なプロパティとなる
for (let i in obj6) {
  console.log(i, obj6[i]); // 0 a, 1 b, 2 c, 3 d, 4 e
}

// □ 例外が発生すると実行中のコピー作業が中段される
let target2 = Object.defineProperty({}, "foo", {
  value: 1,
  writable: false
}); // target2.fooは読み取り専用のプロパティ

try {
  Object.assign(target2, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3 }, { baz: 4 });
} catch {
  console.log("error");
}
// Uncaught TypeError: Cannot assign to read only property 'foo' of object '#<Object>'
// ↑例外が発生

console.log(target2.bar); // 2
console.log(target2.foo2); // 3
console.log(target2.foo); // 1、ここで例外が発生
console.log(target2.foo3); // undefined、assign()が終了したので、foo3はコピーされない
console.log(target2.baz); // undefined、三番目のコピー元もコピーされない

// □ アクセサのコピー
let obj7 = {
  foo: 1,
  get bar() {
    return 2;
  }
};

let copy3 = Object.assign({}, obj7);
console.log(copy3); // {foo: 1, bar: 2} ※barの値は、obj.barのgetterの戻り値

console.log("");

// 記述子（ディスクリプタ＝キーワード）を完全にコピーする代入関数
// ※descriptor = 記述子、デスクリプター《対象の類別・索引に用いる記号》
function completeAssign(target, ...sources) {
  
  sources.forEach(source => {
    let descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {}); // 最後の引数？

    // by default, Object.assign() copies enumerable Symbols too
    Object.getOwnPropertySymbols(source).forEach(sym => {
      let descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });

    Object.defineProperties(target, descriptors);
  });

  return target;
}

let copy4 = completeAssign({}, obj7);
console.log(copy4); // {foo: 1} bar: 2, foo: 1, get bar: ƒ bar(), __proto__: Object

// ポリフィル
// （省略）
