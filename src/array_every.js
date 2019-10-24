// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/every
// Array.prototype.every()

// every()メソッドは、与えられた関数によって実行されるテストに、配列のすべての要素が通るかどうかをテストします。
// 注: このメソッドは空の配列ではあらゆる条件式に対してtrueを返します。
function isBelowThreshold(currentValue) {
    return currentValue < 40;
}
let array1 = [1,30,39,29,10,13];
console.log(array1.every(isBelowThreshold)); // true


// ■ Syntax
// arr.every(callback[, thisArg]);

// □ 引数
// callback ... 各要素に対して実行する関数。次の3つの引数を取る
// ・element ... 現在処理されている要素
// ・index ... 現在処理されている要素のインデックス
// ・array ... everyが実行されている配列
//
// thisArg ... callbackを実行する時にthisとして使用するオブジェクト

// □ 返り値
// コールバック関数が、配列内の全ての要素についてtruthy値を返した時はtrue。それ以外はfalse

// ■ 説明
// everyは与えられたcallback()を配列に含まれる各要素に対して一度ずつcallbackがfalsy値を返す要素が見つかるまで呼び出します。
// そのような要素が見つかると、everyは直ちにfalseを返します。
// callback()は値が代入されている要素に対してのみ呼び出され、値の無い要素や既に削除された要素には呼び出されません。
// 
// everyは呼び出された配列を変化させない。

// ■ 例
// □ 全ての配列要素の大きさをテストする
// 次の配列内の全ての要素は10より大きいかテストする
function isBigEnough(ele, index, array) {
    return ele >= 10;
}
console.log([12,5,8,103,77,46].every(isBigEnough)); // false
console.log([12, 54, 18, 130, 44].every(isBigEnough)); // true

// □ アロー関数を使う
console.log([12, 54, 18, 130, 44].every(x => x >= 10)); // true
