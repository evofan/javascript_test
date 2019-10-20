// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/yield
// yield
// yieldキーワードはジェネレーター関数の一時停止と再開で利用します。（function* または legacy generator function）。
function* foo2(index) {
  while (index < 2) {
    yield index++;
  }
}
const iterator = foo2(0);
console.log(iterator.next().value); // 0
console.log(iterator.next().value); // 1
console.log("");

// ■ Syntax
// [rv] = yield[expression];
//
// expression ... iteratorプロトコル経由で取得したジェネレーター関数を定義します。省略した場合はundefinedが返る
//
// rv ... ジェネレーターの実行を再開するnext()メソッドに渡したオプションの値が返る

// ■ 説明
//
// yieldキーワードはジェネレーター関数の実行を一時停止し、ジェネレーター関数の呼び出し元にyieldキーワードに続く値を返します。
// これは、returnキーワードのジェネレーター版と考える事が出来ます。
//
// yieldキーワードは、valueとdoneの2つの属性を持つiterableResultオブジェクト返します。
// 「value」属性には、yield式を評価した結果が入り、「done」属性にはfalseが代入されています（←falseはジェネレーター関数は完全に終了してない事を示す）
//
// yield式によって、実行が停止されると、ジェネレーターのnext()メソッドが呼び出されるまで、ジェネレーターのコード実行は一時的に停止します。
// ジェネレータのnext()メソッドが呼ばれる度に、ジェネレーターの実行が再開され、次の内のいずれかに達するまで実行されます。
//
// ・ジェネレーターを再び停止して、ジェネレーターの新しい値を返すyield。
//   →再度next()が呼ばれると、yieldの直後から実行が再開されます。
//
// ・ジェネレーターから例外をスローする為に使用されるthrow。
//  →完全にジェネレーターの実行を停止し、例外がスローされた時に通常そうであるように、呼び出し元で実行が再開されます。
//
// ・ジェネレーター関数の終わり。
//  →この場合、ジェネレーターの実行は終了し、valueにundefinedが、doneにtrueが代入されたIterableResultオブジェクトが呼び出し元に返ります
//
// ・returnステートメント
//  →この場合、ジェネレーターの実行は終了し、valueがreturnステートメントで指定した値で、doneがtrueのIterableResultオブジェクトが呼び出し元に返ります。
//
// ジェネレーターのnext()メソッドにオプション値が渡された場合、その値はジェネレーターの現在のyield操作の返り値となります。
//
// ジェネレーターのコードパス、yield演算子、値をGenerator.prototype.next()に渡す事で新しい開始値を指定する機能によって、ジェネレーターは大きな力と制御を提供します。

// ■ 例
// 次のコードはジェネレーター関数の定義例です。
function* countAppleSales() {
  let saleList = [3, 7, 5];
  for (let i = 0; i < saleList.length; i++) {
    yield saleList[i];
  }
}
// 一度ジェネレーター関数を定義すると、以下に示すようにイテレーターを構築する事で使用出来ます。
let appleStore = countAppleSales(); // Generator {} オブジェクトが生成されたのみ、関数は実行されない
console.log(appleStore.next()); // {value: 3, done: false}
console.log(appleStore.next()); // {value: 7, done: false}
console.log(appleStore.next()); // {value: 5, done: false}
console.log(appleStore.next()); // {value: undefined, done: true}
console.log("");
