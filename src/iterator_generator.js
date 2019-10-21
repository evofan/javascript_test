// https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Iterators_and_Generators
// イテレーターとジェネレーター

// コレクション内の各アイテムに対する処理は非常に一般的な操作です。
// JavaScriptでは簡単なforループから map()、filter() に至るまで、コレクションに対する反復処理の複数の方法を提供します。
// それはイテレーターとジェネレータと呼ばれ、コア言語の内部に反復処理が直接的に取り入れられており、
// for...ofループの動作を簡単にカスタマイズ出来る仕組みをもたらします。

// ■ イテレーター
// JavaScriptでは、イテレーターはシーケンスおよび潜在的には終了時の戻り値を定義するオブジェクトです。
// より具体的に言うと、イテレーターは、次の2つのプロパティを持つオブジェクトを返すnext()メソッドを
// 持つ事によって、イテレータプロトコルを実装するオブジェクトです。
// すなわち、シーケンスの次の値である「value」プロパティ、最後の値まで消費したらtrueとなる「done」プロパティです。
// doneプロパティと並行してvalueプロパティが存在する場合は、それがイテレーターの戻り値となります。

// イテレーターオブジェクトが作成されると、next()を繰り返し呼び出す事によって、明示的に反復する事が出来ます。
// イテレーターを反復する事を、「★イテレーターを消費する」と言います。
// 一般的に1回しか実行出来ないためです。
// 終了値が返された後、さらにnext()を呼び出しても、単に {done: true} を返し続けます。

// Javascriptで最も一般的なイテレーターは配列イテレーターで、配列の各値を順番に返します。
// 全てのイテレーターを配列として表現出来るとは想像するのは容易ですが、これは真実ではありません。
// 配列は完全に割り当てなければなりませんが、イテレーターは必要なだけで消費されるため、
// 0からInfinityまでの整数の範囲など、無限のサイズのシーケンスを表現出来ます。

// ここでは、それを行う事が出来る例を示します。
// start (包括) から end (排他) までの一連の整数を定義する単純な範囲のイテレーターの作成を可能にします。
// 最終的な戻り値は、作成したシーケンスのサイズです。

function makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start;
  let iterationCount = 0;

  const rangeIterator = {
    next: function() {
      let result;
      if (nextIndex < end) {
        result = {
          value: nextIndex,
          done: false
        };
        nextIndex += step;
        iterationCount++;
        return result;
      }
      return { value: iterationCount, done: true };
    }
  };
  return rangeIterator; // 自分自身を返す？
}
// このイテレーターを使うと次のようになる
let it = makeRangeIterator(1, 10, 2);
let result_ite = it.next();
while (!result_ite.done) {
  console.log(result_ite.value);
  result_ite = it.next();
}
// 1
// 3
// 5
// 7
// 9

console.log("Iterated over sequence of size: ", result_ite.value); // 5

// ■ ジェネレーター関数
// カスタムイテレーターは、便利なツールですが、その作成には内部状態を明示的に維持する必要があるため、慎重なプログラミングが必要です。
// ジェネレーター関数は、強力な代替手段を提供します。
// 実行が連続していない単一の関数を記述する事によって反復アルゴリズムを定義出来ます。
// ジェネレーター関数はfunction*構文を使用して記述されます。
// 最初に呼び出されると、ジェネレーター関数は、コードを実行せず、ジェネレーターと呼ばれるある種のイテレーターを返します。
// ジェネレーターのnext()メソッドを呼び出す事によって値が消費されると、ジェネレーター関数はyieldキーワードを検出するまで実行します。

// この関数は、必要な回数だけ呼び出す事が出来、毎回新しいジェネレーターを返しますが、各ジェネレーターは1回のみ反復する事が出来ます。

// 上の例を適用してみましょう。このコードの動作は同じですが、実装は書くのも読むのもはるかに容易になります。
function* makeRangeIterator2(start = 0, end = Infinity, step = 1) {
  let n = 0;
  for (let i = start; i < end; i += step) {
    n += 1;
    yield i;
  }
  return n;
}

// ■ 反復可能オブジェクト
// オブジェクトは、for...of構文でループされる値など反復動作を定義する場合、反復可能オブジェクトです。
// ArrayやMapのような組み込み型の中にはデフォルトの反復動作を持つものがありますが、他の型（Object等）は持っていません

// 反復可能なオブジェクトにするには、オブジェクトは@@iteratorメソッドを実装する必要があります。
// つまりオブジェクト（又はプロトタイプチェーン上のオブジェクトの1つに）にSymbol.iteratorキーを持つプロパティが必要です。

// 反復可能オブジェクトを1回でも2回以上でも反復する事が出来ます。どちらが当てはまるかは、
// プログラマに任されています。一度しか反復する事が出来ない反復可能オブジェクト（例えば、ジェネレータ）は、通常@@iteratorメソッドからthisを返します。
// 何も繰り返し可能なものは、@@iteratorの各呼び出しで新しいイテレーターを返す必要があります。

// □ ユーザー定義の反復可能オブジェクト
// 以下のようにして反復可能オブジェクトを自作する事が出来ます。
let myIterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
};

for (let value of myIterable) {
  console.log(value);
}
// 1
// 2
// 3
console.log([...myIterable]); // [1, 2, 3]

// □ ビルトイン反復可能オブジェクト
// String、Array、TypedArray、Map、Setは全てビルトイン反復可能オブジェクトです。
// これらのオブジェクトは全て、そのプロトタイプオブジェクトにSymbol.iterator()メソッドを備えているためです。

// □ 反復可能オブジェクトが必要な構文
// for-ofループ、yield*等の文字や式は、反復可能なオブジェクトを必要とします。
for (let value of ["a", "b", "c"]) {
  console.log(value);
}
// "a"
// "b"
// "c"
console.log([..."abc"]); // ["a", "b", "c"]
console.log("");

function* gen_b() {
  yield* ["a", "b", "c"];
}
gen_b().next(); // ジェネレーターオブジェクトを作成のみ
[a, b, c] = new Set(["a", "b", "c"]);
console.log(a); // a
console.log("");

// ■ 高度なジェネレーター
// ジェネレーターは要求に応じて、yield文により生成される値を計算しており、多くの計算が必要な一連のデータを効率的に表現したり、
// 前出の通り、無限のシーケンスを表現したりする事を可能にします

// ジェネレーターの内部状態を変更するの為の値をnext()メソッドで受け入れる事も出来ます。
// next()に渡された値はyieldが受け取ります。最初next()の呼び出しに値を渡しても常に無視される事に注意して下さい。

// 以下のフィボナッチ数列ジェネレーターでは数列を再起動するのに、next(x)を使っています。
function* fibonacci() {
  let fn1 = 0;
  let fn2 = 1;
  while (true) {
    let current = fn1;
    fn1 = fn2;
    fn2 = current + fn1;
    let reset = yield current;
    if (reset) {
      fn1 = 1;
      fn2 = 2;
    }
  }
}

let sequence = fibonacci();
console.log(sequence.next().value); // 0
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 2
console.log(sequence.next().value); // 3
console.log(sequence.next().value); // 5
console.log(sequence.next().value); // 8

console.log(sequence.next().value); // 13
console.log(sequence.next().value); // 21
console.log(sequence.next().value); // 34
console.log("");
console.log(sequence.next(true).value); // 1

console.log(sequence.next().value); // 2
console.log(sequence.next().value); // 3
console.log(sequence.next().value); // 5
console.log(sequence.next().value); // 8

// ジェネレーターのthrow()メソッドを呼び出して発生すべき例外値を渡す事で、
// ジェネレーターに例外を強制的に発生させる事が出来ます。
// これにより、まるで停止中のyieldがthrow value文に替わったかのように、ジェネレーターが停止した際の状況に応じて例外が発生します。

// 例外がジェネレーター内部で補足されない場合は、throw()を通してその例外が呼び出し元へと伝播し、
// その後next()を呼び出した結果のdoneプロパティはtrueとなります。

// またジェネレーターは、与えられた値を返して、ジェネレーター自身の処理を終了させるreturn(value)メソッドを持っています
