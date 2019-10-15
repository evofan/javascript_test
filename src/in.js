// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/in
// in
// in 演算子は、★「指定されたプロパティが指定されたオブジェクトにある場合に trueを返す」。

// Syntax
// prop in objectName

// 引数
//

// 返り値
// prop ... プロパティ名、又は配列のインデックスを表す「文字列式」又は「シンボル」※文字列式で無い時は強制的にシンボルに強制変換される
// objectName ... 検査するオブジェクトの名前

// 説明（使用例）

// Arrays
let trees = ["redwood", "bay", "cedar", "oak", "maple"];
console.log("0 in trees: ", 0 in trees); // 0 in trees:  true、インデックス0があるか？
console.log("'0' in trees: ", "0" in trees); // '0' in trees:  true ↑と同じ？
console.log("3 in trees: ", 3 in trees); // 3 in trees:  true、インデックス3があるか？
console.log("6 in trees: ", 6 in trees); // 6 in trees:  false、インデックス6があるか？
console.log("");

console.log("'bay' in trees: ", "bay" in trees); // 'bay' in trees:  false、※値でなくインデックスを指定する為
console.log("'length' in trees: ", "length" in trees); // 'length' in trees:  true、※「length」はArrayのプロパティ名なのでtrue
console.log("");

console.log("Symbol.iterator in trees: ", Symbol.iterator in trees); // Symbol.iterator in trees:  true、※配列はiterableなのでtrue
console.log("");

// 定義済みオブジェクト
console.log("'PI' in Math: ", "PI" in Math); // 'PI' in Math:  true
console.log("");

// ユーザー定義オブジェクト
let mycar = { make: "Honda", model: "Accord", year: "1998" };
console.log("'make' in mycar: ", 'make' in mycar); // 'make' in mycar:  true
console.log("'model' in mycar: ", 'model' in mycar); // 'model' in mycar:  true
console.log("");

// in演算子の右側には、オブジェクトを指定する必要がある（文字列リテラルは不可）
let color1 = new String("green");
console.log("'green' in color1: ", 'green' in color1); // 'green' in color1:  false
// let color2 = "red";
 // console.log("'red' in color2: ", 'red' in color2); // Uncaught TypeError: Cannot use 'in' operator to search for 'red' in red
console.log("");

// ■ 削除済みあるいは未定義状態のプロパティへのinの使用
// □ delete演算子で削除されたプロパティについて、in演算子はfalseを返す
delete mycar.make;
console.log("'make' in mycar（after deleted）: ", 'make' in mycar); // 'make' in mycar（after deleted）:  false

delete trees[3];
console.log("trees: ", trees); // trees:  (5) ["redwood", "bay", "cedar", empty, "maple"]
console.log("3 in trees（after deleted）: ", 3 in trees); // 3 in trees（after deleted）:  false
console.log("");

// □ undefinedを設定しているが、削除されていないプロパティについて、in演算子はtrueを返す
mycar.make = undefined;
console.log("mycar: ", mycar); // mycar:  {model: "Accord", year: "1998", make: undefined}
console.log("'make' in mycar（set undefined）: ", 'make' in mycar); // 'make' in mycar（set undefined）:  true

trees[3] = undefined;
console.log("trees: ", trees); // trees:  (5) ["redwood", "bay", "cedar", undefined, "maple"]
console.log("3 in trees（set undefined）: ", 3 in trees); // 3 in trees（set undefined）:  true
console.log("");

// □ 継承されたプロパティ
// プロトタイプチェーンのプロパティについて、in演算子はtrueを返す
console.log("'toString' in {}: ", 'toString' in {}); // 'toString' in {}:  true

