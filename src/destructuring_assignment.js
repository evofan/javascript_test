// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// 分割代入

// 分割代入 (Destructuring assignment) 構文は、配列から値を取り出して、
// あるいはオブジェクトからプロパティを取り出して別個の変数に代入することを可能にするJavaScriptの式です。
let a, b, rest;
[a, b] = [10, 20];

console.log("a: ", a); // a:  10
console.log("b: ", b); // b:  20

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log("a: ", a); // a:  10
console.log("b: ", b); // b:  20
console.log("rest: ", rest); // rest: [30, 40, 50] ※配列

// Syntax
// ↑の書き方に追加して、
({ a, b } = { a: 10, b: 20 });
console.log("a: ", a); // a:  10
console.log("b: ", b); // b:  20

// Satge4(finished proposal)
({ a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 });
console.log("a: ", a); // a:  10
console.log("b: ", b); // b:  20
console.log("rest: ", rest); // rest: {30, 40} ※こっちはオブジェクト

// 説明
// オブジェクトリテラルと配列リテラルによって、幾つかのデータをアドホックに（特別に）まとめられる
let x = [1, 2, 3, 4, 5];
// 分割代入の構文は、★右辺の各要素が代入される変数を、左辺に記入する（これはPerlやPython等の言語に存在する機能と似ている）
let [y, z] = x;
console.log(y); // 1
console.log(z); // 2

// ■ 配列の分割代入

// 簡単な例
let foo = ["one", "two", "three"];
let [one, two, three] = foo;
console.log(one); // one
console.log(two); // two
console.log(three); // three

// 宣言後の割り当て
// 変数の宣言とは別に、分割代入で値を代入
let a2, b2;
[a2, b2] = [1, 2];
console.log(a2); // 1
console.log(b2); // 2

// 既定値の設定
let a3, b3;
[a3 = 5, b3 = 7] = [1];
console.log(a3); // 1 <- 5
console.log(b3); // 7

// 変数の入れ替え
// 複数の変数の値を入れ替える事が出来る
// （分割代入無しで2つの値をスワップするにはテンポラリ変数が必要です）
let a4 = 1;
let b4 = 3;
[a4, b4] = [b4, a4];
console.log(a4); // 3
console.log(b4); // 1

// 関数から返された配列の解析
// 関数は配列を返す事が出来、分割代入を使う事で、返された配列をより完結に記述出来る
let f = function() {
  return [1, 2];
};
let a5, b5;
[a5, b5] = f();
console.log(a5); // 1
console.log(b5); // 2

// 返り値の無視
// 興味を持ってない戻り値を無視出来る
let f2 = function() {
  return [1, 2, 3];
};
let [a6, , b6] = f2();
console.log(a6); // 1
console.log(b6); // 3

// 配列の残余部分を変数に代入する
// 配列を分割する時に、残余パターンを使用して、配列の残りの部分を取り出して変数に代入出来る
let [a7, ...b7] = [1, 2, 3];
console.log(a7); // 1
console.log(b7); // [2, 3]
// let [a7, ...b7,] 末尾にカンマが入ってるとエラーになるので注意
// Uncaught SyntaxError: Rest element must be last element

// 正規表現のマッチからの値を取得
// 正規表現オブジェクトのexec()でマッチした文字列の配列の一部分を取り出せる
let parseProtocol = function(url) {
  let parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
  if (!parsedURL) {
    return false;
  }
  console.log(parsedURL);
  let [, protocol, fullhost, fullpath] = parsedURL;
  return protocol;
};
console.log(parseProtocol("https://developer.mozilla.org/ja/Web/JavaScript")); // "https");
// ["https://developer.mozilla.org/ja/Web/JavaScript", "https", "developer.mozilla.org", "ja/Web/JavaScript", index: 0, input: "https://developer.mozilla.org/ja/Web/JavaScript", groups: undefined]0: "https://developer.mozilla.org/ja/Web/JavaScript"1: "https"2: "developer.mozilla.org"3: "ja/Web/JavaScript"groups: undefinedindex: 0input: "https://developer.mozilla.org/ja/Web/JavaScript"length: 4__proto__: Array(0)
// destructuring_assignment.js:106 https

// ■ オブジェクトの分割代入

// 簡単な例
let obj = { p: 24, q: true };
let { p, q } = obj;
console.log(p); // 24
console.log(q); // true

// 宣言の無い割り当て
let a8, b8;
({ a8, b8 } = { a8: 1, b8: 2 });

// 異なる名前を持つ変数への代入
// オブジェクトから変数を取り出して、オブジェクトのプロパティと異なる名前の変数に代入出来る
let o = { p: 42, q: true };
let { p: foo2, q: bar2 } = o;
console.log(foo2); // 42
console.log(bar2); // true

// 既定値の設定
// オブジェクトから取り出した値がundefinedである時の既定値を、変数に割り当てる事が出来る
let { a9 = 10, b9 = 5 } = { a9: 3 };
console.log(a9); // 3
console.log(b9); // 5

// 異なる名前の変数に代入して既定値を設定する
// （１）オブジェクトから取り出して異なる変数の名前に代入する
// （２）取り出した値がundefinedである場合に規定値を代入する
let { a10: aa = 10, b10: bb = 5 } = { a10: 3 };
console.log(aa); // 3
console.log(bb); // 5

// 関数の引数に対する既定値の設定
// ES5 ver.
function drawES5Chart(options) {
  options = options === undefined ? {} : options;
  let size = options.size === undefined ? "big" : options.size;
  let coords = options.coords === undefined ? { x: 0, y: 0 } : options.coords;
  let radius = options.radius === undefined ? 25 : options.radius;
  console.log(size, coords, radius);
  // now finally do some chart drawing
}
drawES5Chart({
  coords: { x: 18, y: 30 },
  radius: 30
});
// big {x: 18, y: 30} 30

// ES2015 ver.
function drawES2015Chart({
  size = "big",
  coords = { x: 0, y: 0 },
  radius = 25
} = {}) {
  // ※この最後の = {}がある事で、引数が無しでも関数が呼び出せるようになっている（これが無いと最低1つの引数が期待されるので）
  console.log(size, coords, radius);
  // do some chart drawing
}
drawES2015Chart({
  coords: { x: 18, y: 30 },
  radius: 30
});
// big {x: 18, y: 30} 30

// 入れ子になったオブジェクトと配列の分割代入
let metadata = {
  title: "Scratchpad",
  translations: [
    {
      locale: "de",
      localization_tags: "",
      last_edit: "2014-04-14T08:43:37",
      url: "/de/docs/Tools/Scratchpad",
      title: "JavsScript-Umgebung"
    }
  ],
  url: "/en-US/docs/Tools/Scratchpad"
};

let {
  title: englishtitle, // rename
  translations: [
    {
      title: localeTitle // rename
    }
  ]
} = metadata;
console.log(englishtitle); // Scratchpad
console.log(localeTitle); // JavsScript-Umgebung

// イテレーターでの分割代入の利用
let people = [
  {
    name: "Mike Smith",
    family: {
      mother: "Jane Smith",
      father: "Harry Smith",
      sister: "Samantha Smith"
    },
    age: 35
  },
  {
    name: "Tom Jones",
    family: {
      mother: "Nora Jones",
      father: "Richard Jones",
      brother: "Howard Jones"
    },
    age: 25
  }
];
for (let {
  name: n,
  family: { father: f }
} of people) {
  console.log("Name: " + n + ", Father: " + f);
}
// Name: Mike Smith, Father: Harry Smith
// Name: Tom Jones, Father: Richard Jones

// 引数に指定されたオブジェクトの属性への参照
function userId({ id }) {
  return id;
}

function whois({ displayName, fullName: { firstName: name } }) {
  console.log(displayName + " is " + name);
}

let user = {
  id: 42,
  displayName: "jdoe",
  fullName: {
    firstName: "John",
    lastName: "Doe"
  }
};
console.log("userId: " + userId(user)); // userId: 42
whois(user); // jdoe is John

// 計算されたオブジェクトのプロパティの名前と分割代入
// オブジェクトリテラルのような計算されたプロパティの名前も分割代入で使用出来る
let key = "z";
let { [key]: foo3 } = { z: "bar" };
console.log(foo3); // bar

// オブジェクトの分割代入の残余（...resr）
let { a11, b11, ...rest11 } = { a11: 10, b11: 20, c11: 30, d11: 40 };
console.log("a11: " + a11); // a11: 10
console.log("b11: " + b11); // b11: 20
console.log("rest11: ", rest11); // rest11:  {c11: 30, d11: 40}s

// 無効なJavaScript識別子をプロパティ名として使用する
const foo4 = { "fizz-buzz": true };
const { "fizz-buzz": fizzBuzz } = foo4;
console.log(fizzBuzz); // true

// 配列とオブジェクトの分割代入を組み合わせる
const props = [
  { id: 1, name: "Fizz" },
  { id: 2, name: "Buzz" },
  { id: 3, name: "FizzBuzz" }
];
const [, , { name }] = props;
console.log(name); // FizzBuzz
