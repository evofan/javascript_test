// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export
// export

// export文は、モジュールから関数、オブジェクト、プリミティブ値をエクスポートする為のJavaScriptモジュールを作成する時に使用し、
// これらは別のプログラムからimport文で利用する事が出来ます。

// エクスポートされたモジュールは、宣言のあるなしにかかわらずstrict モードで動作します。エクスポート文は、埋め込みスクリプトでは使えません。

// ■ Syntax
// 3種類のエクスポート方法があります。
// （１）名前付きエクスポート（モジュール当たり0個以上のエクスポート）
// （２）デフォルトエクスポート（モジュール当たり1個のエクスポート）
// （３）混合エクスポート

/*
// 個々のエクスポート
export let name1, name2, ..., nameN;
export let name1 = ..., name2 = ..., ..., nameN;
export function functionName() {...};
export class ClassName {...};

// エクスポートリスト
export { name1, name2, .., nameN };

// エクスポート時の名前変更
export { variables1 as name1, variables2 as name2, ..., nameN };

// 名前を変更して分割代入をエクスポートする
export const { name1, name2: bar } = o;

// 既定のエクスポート
export default expression;
export default function(){} // class, function* も使用可
export default function name1(){} // class, function* も使用可
export default { name1 as default, ... };

// モジュールのアグリゲート
export * from ..;
export { name1, name2, .., nameN } from ..,;
export { import1 as name1, import2 as name2, .., nameN } from ..;
export { default } from

nameN （別のスクリプトで、importを使用してインポート出来るようにする為）エクスポートする識別子です。
*/

// ■ 解説
// エクスポート方法は、★「名前付き」と★「デフォルト」の2種類があります。
// 名前付きエクスポートはモジュール毎に複数持てますが、デフォルトエクスポートは1つに限ります。
// それぞれのエクスポート方法は、上記の構文の1つに対応します

// □ 名前付きエクスポート：
// 事前に宣言された機能のエクスポート
export { myFunction, myVariable };

// 個別の機能のエクスポート（var, let, const, function, classがエクスポート可能）
export let myVariable = Math.sqrt(2);
export function myFunction() {};

// □ デフォルトエクスポート
// デフォルトとして事前に定義された機能のエクスポート
export { myFunction as default };

// 個別の機能をデフォルトとしてエクスポート
export default myFunction(){};
export default class {};

// 名前付きエクスポートは、様々な値をエクスポートするのに役立ちます。
// インポートする時は、対応するオブジェクトと同じ名前を使用しなければなりません

// 一方デフォルトエクスポートは、以下のように任意の名前を使用出来ます。
// ファイル名：test.js
let k;
export default k = 12;

// 他のファイル
import m from "./test"; // kがデフォルトになるので、インポートするkの代わりに他の変数を使用する必要がある？
console.log(m); // 12

// 名前付きの競合を防ぐために、名前付きエクスポートの名前を変更する事も出来ます。
export {
    myFunction as function1,
    myVariable as variable
}

// 親モジュールでサブモジュールをまとめれば、そのモジュールからインポートする事が出来るようになります。
// parentModule.js
export { myFunction, myVariable } from "./childModule1.js";
export { myClass } from "./childModule2.js";

// 最上位モジュールで
import { myFunction, myVariable, myClass } from "parentModule.js";


// ■ 例

// □ 名前付きエクスポートの使用
// module.jsモジュールの中で、以下のコードをインクルードする事が出来ます。

// "my-module.js"モジュール
function cube(x) {
    return x * x * x;
}

const foo = Math.PI + Math.SQRT2;

let graph =  {
    options: {
        color: "white",
        thickness: "2px"
    },
    draw: function() {
        console.log("From graph draw function");
    }
}

export { cube, foo, graph };

// HTMLページの中に含まれる最上位モジュールの中では、次のようにする事が出来ます
import { cube, foo, graph } from "./my-module.js";

graph.options = {
    color: "blue",
    thickness: "3px"
};

graph.draw();
console.log(cube(3)); // 27
console.log(foo); // 4.555806215962888

// 以下の点に注意する必要があります

// ・このスクリプトをHTMLの<script>要素でtype="module"を指定したものに入れる必要があり、そうすれば適切にモジュールとして認識され扱われる
// ・file://のURLでモジュールを実行する事は出来ない → CORSエラーになる

// □ デフォルトエクスポートの使用
// 値を一つエクスポートしたい、あるいはモジュールでフォールバック先の値を持ちたい場合は、デフォルトエクスポートを使用すると良い

// my-module.js
export default function cube(x) {
    x* x * x;
}

// 別のスクリプトから、デフォルトエクスポートをインポートする
import cube from "my-module.js";
console.log(cube(3));
