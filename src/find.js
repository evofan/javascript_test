// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// Array.prototype.find()

// find() メソッドは配列の要素に指定されたテスト関数を適用していき、テストを満たす「最初の要素」の「値」を返します。
// 見付からない場合は undefined を返します。

// 配列の中から該当する値を返す
let array1 = [5, 12, 8, 130, 44];
let found1 = array1.find(function(elment) {
  return elment > 10;
});
console.log("found1: ", found1); // found1:  12、★最初の値なので、12を返して終了

let found2 = array1.find(function(elment) {
  return elment > 200;
});
console.log("found2: ", found2); // found2:  undefined、★見つからない場合はundefinedを返して終了

// Syntax
// arr.find(callback[, thisArg])
//
// callback()は最大3つの引数を取る（element...現在の配列内の要素、現在の配列内のインデックス、findを呼び出した元の配列）
// thisArg...callback()が実行される時にthisとして扱われるオブジェクト

// 例：プロパティの1つによって配列内のオブジェクトを検索します
let inventory = [
  { name: "apples", quantity: 2 },
  { name: "bananas", quantity: 0 },
  { name: "cherries", quantity: 5 }
];

function isCherries(fruit) {
  return fruit.name === "cherries";
}

console.log(inventory.find(isCherries)); // {name: "cherries", quantity: 5}

// Using ES2015 arrow function
const result = inventory.find(fruit => fruit.name === "cherries"); // 同じ物があった場合に返す例
console.log("result", result); // Object { name: "cherries", quantity: 5 }

// 例：配列内の素数を検索する、※prime number = 素数
function isPrime(element, index, array) {
  // ※コールバックが取る3つの引数
  let start = 2;
  while (start <= Math.sqrt(element)) {
    // Math.sqrt = 平方根を求める
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}
console.log("isPrime: ", [4, 6, 8, 12].find(isPrime)); // isPrime:  undefined
console.log("isPrime: ", [4, 6, 5, 8, 12].find(isPrime)); // isPrime:  5

console.log("");

// 次の例は、存在しない要素と削除された要素が訪問され、コールバックに渡される値が訪問されたときの値である事を示しています。

// インデックス2、3、4に要素のない配列を宣言します
let array2 = [0, 1, , , , 5, 6];

// 値が割り当てられたインデックスだけでなく、すべてのインデックスを表示します
array2.find(function(value, index) {
  console.log("訪問したインデックス：" + index + " と、その値：" + value);
});
/*
    訪問したインデックス：0 と、その値：0
    訪問したインデックス：1 と、その値：1
    訪問したインデックス：2 と、その値：undefined
    訪問したインデックス：3 と、その値：undefined
    訪問したインデックス：4 と、その値：undefined
    訪問したインデックス：5 と、その値：5
    訪問したインデックス：6 と、その値：6
*/

console.log("");

// 削除済みを含むすべてのインデックスを表示します
array2.find(function(value, index) {
  // 最初の反復で要素5を削除します
  if (index === 0) {
    console.log("値を持つarray2[5]を削除しています：" + array2[5]);
    delete array2[5];
  }
  // エレメント5は、削除されたにもかかわらずまだ訪問されています
  console.log("訪問したインデックス：" + index + " と、その値：" + value);
});
/*
    値を持つarray2[5]を削除しています：5
    訪問したインデックス：0 と、その値：0
    訪問したインデックス：1 と、その値：1
    訪問したインデックス：2 と、その値：undefined
    訪問したインデックス：3 と、その値：undefined
    訪問したインデックス：4 と、その値：undefined
    訪問したインデックス：5 と、その値：undefined
    訪問したインデックス：6 と、その値：6
*/

console.log("");

console.log("自分サンプル：深い階層にある特定のデータを判別する");

obj = {
  name: "Silvia",
  speed: 100,
  break: false,
  accel: true,
  passenger: [{ wife: 1 }, { children: 2 }, { cat: 1 }],
  year: 1997
};
let isCat = obj.passenger.find(element => element.cat);
console.log("isCat: ", isCat); // isCat:  {cat: 1}
let isDog = obj.passenger.find(element => element.dog);
console.log("isDog: ", isDog); // isDog:  undefined

console.log("");

