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

console.log("Iterated over sequence of size: ", result_ite.value);

console.log("");

// 引数
//

// 返り値
//

// 例
//
