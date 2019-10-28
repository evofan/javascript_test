// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// Array.prototype.find()
// find()メソッドは、提供されたテスト関数を満たす配列内の「最初の要素の値」を返します。
let array1 = [5, 12, 8, 130, 122];
let found1 = array1.find(ele => ele > 10);
console.log(found1); // 12

// ・配列内で見つかった要素の値でなく「添字」が必要な場合は。findIndex()を使用して下さい。
// ・「値の添字」を検索する必要性がある場合は、Array.prototype.indexOf()を使用して下さい。
// （findIndex()と似てますが、それぞれの要素の等価性はテスト関数ではなく値でチェックされる）
// ・配列内に値が存在するかどうかを調べる必要がある場合は、Array.prototype.includes()を使用して下さい。

// ■ Syntax
// arr.find(callback(element[, index[, array]])[, thisArg])

// □ 引数
// ・callback ... 配列内の各要素に対して実行する関数で、次の3つの関数を取る
//  ・element .... 配列内で現在処理されている要素
//  ・index ...... 配列内で現在処理されている要素の添字（位置）
//  ・array ...... find()を呼び出した元の配列
//
// ・thisArg ... callback内でthisとして使われるオブジェクト

// □ 戻り値
// 配列の中で、提供されたテスト関数を満足する「最初の要素の値」
// 見つからなかった場合は「undefinedを返す」

// ■ 解説
// find()メソッドは、配列のそれぞれの添字に対して一度ずつ、callback関数を実行し、callback関数がtruthyな値を返すまで繰り返します。
// その場合、 find()は直ちにその要素の値を返します。そうでなければ、find()はundefinedを返します。
//
// callbackは、値が割り当てられているものに限らず、配列中のすべての添字に対して呼び出されます。
// すなわち、疎配列（要素が一部存在しない配列、undefinedでなくemptyの要素）では値が割り当てられているもののみを呼び出すメソッドに比べて効率的ではないことを意味します。
//
// thisArg引数がfind()に与えられた場合、 callbackの呼び出しのたびに、その内部でthis値として使用されます。この引数を省略した場合はundefinedが使用されます。
//
// find()は、呼び出した配列を変更(mutate)しませんが、 callback()で提供された関数は変更する可能性があります。
// その場合、find()によって処理される各要素は、最初にcallback()が呼び出される前に設定されます。したがって、
// ・callbackはfind()の呼び出しが始まった後に追加された要素に対しては実行されません。
// ・配列の、既存のまだ呼び出していない要素が callbackによって変更された場合、 callbackに渡される値はfind()がその要素の添字を処理した時点での値になります。
// ・削除された要素も処理されます。

// ■ 例

// □ 配列内のオブジェクトをプロパティの一つで検索
const inventory = [
  { name: "apples", quantity: 2 },
  { name: "bananas", quantity: 0 },
  { name: "cherries", quantity: 5 }
];
function isCherries(fruit) {
  return fruit.name === "cherries";
}
console.log(inventory.find(isCherries)); // {name: "cherries", quantity: 5}

// □ アロー関数と分割（代入構文）の使用
const inventory2 = [
  { name: "apples", quantity: 2 },
  { name: "bananas", quantity: 0 },
  { name: "cherries", quantity: 5 }
];
let result2 = inventory2.find(({ name }) => name === "cherries");
console.log(result2); // {name: "cherries", quantity: 5}

// □ 配列内の素数の検索
function isPrime(element, index, array) {
  let start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}
console.log([4, 6, 8, 12].find(isPrime)); // undefined ※値が見つからないので
console.log([4, 5, 8, 12].find(isPrime)); // 5
console.log("");

// ↓は、存在せずに削除された要素が処理される事、コールバックに渡される値が処理時点での値である事を示している
// 添字が2,3,4も位置に要素が無い配列を宣言
const array2 = [0, 1, , , , 5, 6];

// 値が割り当てられているものに限らず、全ての添字を表示
array2.find((value, index) => {
  console.log("Visited index: ", index, " with value: ", value);
});
// Visited index:  0  with value:  0
// Visited index:  1  with value:  1
// Visited index:  2  with value:  undefined
// Visited index:  3  with value:  undefined
// Visited index:  4  with value:  undefined
// Visited index:  5  with value:  5
// Visited index:  6  with value:  6

console.log("");

// 削除されたものも含めて、全ての添字を表示
array2.find((value, index) => {
  // 初回で要素5を削除
  if (index === 0) {
    console.log("Deleting array[5] with value ", array2[5]);
    delete array2[5];
  }
  // 要素5は削除されても処理される
  console.log("Visited index: ", index, " with value: ", value);
});
// Deleting array[5] with value  5
// Visited index:  0  with value:  0
// Visited index:  1  with value:  1
// Visited index:  2  with value:  undefined
// Visited index:  3  with value:  undefined
// Visited index:  4  with value:  undefined
// Visited index:  5  with value:  undefined
// Visited index:  6  with value:  6
console.log("");
