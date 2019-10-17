// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...of
// for...of

// for...of 文は、反復可能オブジェクト、たとえば組込みの String, Array, 配列風オブジェクト (例えば arguments や NodeList), TypedArray, Map, Set,
// およびユーザー定義の反復可能オブジェクトなどに対して、反復的な処理をするループを作成します。
// これはオブジェクトのそれぞれの識別可能なプロパティの値に対して、実行される文を表す独自の反復フックを呼び出します。
const array1 = ["a", "b", "c", "d"];

for (let element of array1) {
  console.log(element);
}
// a
// b
// c
// d

// ■ Syntax

// for ( variable of iterableObj) {
//    statement
// }

// variable ... 反復処理の各回において、異なるプロパティの値がvariableに割り当てられる。const, let, varで宣言可能
// iterable ... 反復処理が行われる、反復可能（イテレーブル）なプロパティを持つオブジェクト

// ■ 例

// □ Arrayでの反復処理
const iterable1 = [10, 20, 30];
for (const val of iterable1) {
  console.log(val);
}
// 10
// 20
// 30

// 変数宣言にletの場合
for (let val of iterable1) {
  val += 1;
  console.log(val);
}
// 11、ブロック内で変数が再割り当てされる
// 21
// 31

// □ Stringでの反復処理
const iterable2 = "あいうえお";
for (let val of iterable2) {
  console.log(val);
}
// あ
// い
// う
// え
// お

// □ TypedArrayでの反復処理
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
// TypedArray ... TypedArrayオブジェクトは背後にあるバイナリーデータバッファーの、配列状のビューを表します。※8ビット長・2の補数方式の符号付き整数値等
const iterable3 = new Uint8Array([0x00, 0xff]);
for (let val of iterable3) {
  console.log(val);
}
// 0
// 255

// □ Mapでの反復処理
const iterable4 = new Map([["a", 1], ["b", 2], ["c", 3]]);
for (let val of iterable4) {
  console.log(val);
}
// ["a", 1]
// ["b", 2]
// ["c", 3]
// 2つの要素の内の後ろの値を取得（{"a":1}ならkey: valueだけど、["a",1]でもkey, value？）
for (let [a, b] of iterable4) {
  console.log(b);
}
// 1
// 2
// 3

// □ setでの反復処理
const iterable5 = new Set([1, 1, 2, 2, 3, 3]);
for (let val of iterable5) {
  console.log(val);
}
// 1
// 2
// 3

// □ argumentオブジェクトでの反復処理
// argumentオブジェクトで反復処理をすると、ある関数に全ての引数を渡す事が出来る
(function() {
  for (let el of arguments) {
    console.log(el);
  }
})(1, 2, 3, 4);
// 1
// 2
// 3
// 4

// □ DOMコレクションでの反復処理
// NodeListのようなDOMコレクションでの反復処理
// 注: これは以下のものに対応しているプラットフォームでのみ動作します。
// implemented NodeList.prototype[Symbol.iterator]
/*
const articleparagraphs = document.querySelectorAll("article > p");
for (let paragraph of articleparagraphs) {
    paragraph.classList.add("read");
}
*/

console.log("");

// □ 反復処理の終了
// for...ofループ内では、break, throw, returnを発生させる事で反復処理を中断させる事が出来る（その場合、反復子は閉じられる→次の処理に行く）
function* foo() {
  yield 1;
  yield 2;
  yield 3;
}

for (let o of foo()) {
  console.log(o); // 1（※のみ実行されて表示）
  break; // 反復子を閉じ、ループ外の実行が継続される
}
console.log("done"); // done

console.log("");

// □ ジェネレーターでの反復処理
// ジェネレーター（反復可能オブジェクトを生成する関数）で反復処理をする事が出来る
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}
for (let num of fibonacci()) {
  console.log(num);
  // 1000で繰り返しを終了する
  if (num > 1000) {
    break;
  }
}
// 1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597
// ジェネレーターを（for...ofで）再利用してはならない。ループを一旦抜けると閉じられ、そこで繰り返してもそれ以上の結果は算出されないので
/*
for (let num of fibonacci()) {
  console.log("再利用中... ", num); // MDNだと「Nerver Called」だけど実際は呼ばれる？
}
*/
// 再利用中...  7.283601309201629e+306
// 再利用中...  1.1785114478791467e+307
// 再利用中...  1.9068715787993096e+307
// 再利用中...  3.085383026678456e+307
// 再利用中...  4.992254605477766e+307
// 再利用中...  8.077637632156222e+307
// 再利用中...  1.3069892237633987e+308
// 再利用中...  Infinity

console.log("");

// □ イテレーターの同期
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};
for (let val of range) {
  console.log(val);
  
}
// 1
// 2
// 3
// 4
// 5

console.log("");

// □ その他の反復可能オブジェクトでの反復処理
// 明示的にiterableプロトコルを実装しているオブジェクトで反復処理が出来る
const iterable6 = {
  [Symbol.iterator]() {
    return {
      i: 0,
      next() {
        if (this.i < 3) {
          return { value: this.i++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};
for (let val of iterable6) {
  console.log(val);
}
// 0
// 1
// 2

console.log("");

// ■ for...ofとfor...inの違い
// for...inは、オブジェクトの全ての列挙可能なプロパティに対し、順序不同で繰り返し処理を行う
// for...ofは、反復可能なオブジェクトが定義した順序で値を反復処理する
// ↓違い
Object.prototype.objCustom = function() {}; // 全てのObjcetオブジェクトがobjCustomを継承
Array.prototype.arrCustom = function() {}; // 全てのArrayオブジェクトがarrCustomを継承
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain
// 継承とプロトタイプチェーン

const iterable7 = [3, 5, 7];
iterable7.foo = "hello!";

for (let i in iterable7) {
  console.log(i);
}
// 0
// 1
// 2
// foo
// arrCustom
// objCustom
// ※配列の要素である3,5,7やfooは列挙可能なプロパティで無い事に注意＝★プロパティでは無く値

for (let i in iterable7) {
  if (iterable7.hasOwnProperty(i)) {
    // 継承したものは除く＝自身のプロパティ、fooは自分の、customは継承されたもの
    console.log(i);
  }
}
// 0
// 1
// 2
// foo

for (let i of iterable7) {
  console.log(i);
}
// 3
// 5
// 7
// ※ofは反復可能なオブジェクトとして定義している順序で値を反復処理して出力する＝オブジェクトの要素の3、5、7が表示される＝プロパティは表示されない
