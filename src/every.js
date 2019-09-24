// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/every
// Array.prototype.every()

// every() メソッドは、与えられた関数によって実行されるテストに、「配列のすべての要素」が「通るかどうか ＝ true or false」をテストします。
// 注: このメソッドは空の配列ではあらゆる条件式に対して true を返します。

let array1 = [1, 30, 39, 29, 10, 13];

function isBelowThreshold(currentValue) {
  return currentValue < 40;
}

console.log(array1.every(isBelowThreshold)); // true

// Syntax
// arr.every(callback[, thisArg])
//
// callback()は3つの引数を取る（element...現在の要素、index...現在にindex、対象の配列）
// thisArgはcallbackを実行する時にthisとして使用されるオブジェクト
// 戻り値：コールバック関数が配列のすべての要素について truthy 値を返した場合は true。それ以外は false。

console.log("");

// 例：全ての配列要素の大きさをテストする
// 配列内の全ての要素が10より大きいかどうかテストする
function isBigEnough(element, index, array) {
  return element >= 10;
}
console.log("全部10より大きい？：", [12, 5, 8, 130, 44].every(isBigEnough)); // false
console.log("全部10より大きい？：", [12, 54, 18, 130, 44].every(isBigEnough)); // true

// アロー関数ver.
console.log("全部10より大きい？：", [12, 5, 8, 130, 44].every(x => x >= 10)); // false
console.log("全部10より大きい？：", [12, 54, 18, 130, 44].every(x => x >= 10)); // true

console.log("");

// Polyfill ... every()が存在しないブラザウでは↓をスクリプトの先頭に入れる事でevery()と同等の内容を実行出来る（考え方）

if (!Array.prototype.every) {
  Array.prototype.every = function(callbackfn, thisArg) {
    "use strict";

    var T, k;

    if (this == null) {
      throw new TypeError("this is null or not defined");
    }

    // [1] O は、this を引数として ToObject に渡し、実行した結果です。
    var O = Object(this);

    // [2] lenValue は、"length" を引数として O の Get 内部メソッドを実行した結果です。
    // [3] len を ToUint32(lenValue) とします。
    var len = O.length >>> 0;

    // [4] IsCallable(callbackfn) が false の場合、TypeError 例外がスローされます。
    if (typeof callbackfn !== "function") {
      throw new TypeError();
    }

    // [5] thisArg が与えられた場合、T は thisArg となり、さもなくば T は undefined となります。
    if (arguments.length > 1) {
      T = thisArg; // self = this的なもの
    }

    // [6] k を 0 とします。
    k = 0;

    // [7] k < len が成り立つ間、繰り返します。
    while (k < len) {
      var kValue;

      // [a] Pk を ToString(k) とします。
      //     これは in 演算子の左オペランドについて暗黙的です。
      // [b] kPresent は、Pk を引数として O の HasProperty 内部メソッドを実行した結果です。
      //     このステップは c と組み合わせられます。
      // [c] kPresent が true の場合、続きます。
      if (k in O) {
        // [i] kValue は、Pk を引数として O の Get 内部メソッドを実行した結果です。
        kValue = O[k];

        // [ii] testResult は、this 値としての T と、kValue、k、0 を含む引数リストを
        //      ともなって、callbackfn の Call 内部メソッドを実行した結果です。
        var testResult = callbackfn.call(T, kValue, k, O);

        // [iii] ToBoolean(testResult) が false の場合、false を返します。
        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    return true;
  };
}
