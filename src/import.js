// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import
// import

// import文は、他のモジュールからエクスポートされたバインディング（関数、オブジェクト、プリミティブ）をインポートするために用います。
// インポートされたモジュールは宣言のあるなしにかかわらずStrictモードで動作します。
// import 文は、type="module" を指定しない限り、埋め込まれたスクリプトでは使えません。

// ■ Syntax
/*
    import defaultExport from "module-name";
    import * as name from "module-name";
    import { export } from "module-name";
    import { export as alias} from "module-name";
    import { export1, export2 } from "module-name";
    import { export1, export2 as alias, [...]} from "module-name";
    import defaultExport, { export[, [...]] } from "module-name";
    import defaultExport,  * as name from "module-name";
    import "module-name";
    var promise = import(module-name);
*/

// defaultExport ... モジュールからのデフォルトのエクスポートを参照する名前

// module-name ... インポートするモジュール名。モジュールがある.jsファイルへの相対又は絶対パス名です。
//                  バンドラーによっては、拡張子を加える事が許される（あるいは求められる）事があります。

// name ... インポートを参照する時の名前空間のように用いられる、モジュールオブジェクトの名前

// export, exportN ... インポートする、エクスポートの名前

// alias, aliasN ... 指定されたインポートを参照する名前

// ■ 説明
// nameパラメーターは、エクスポートを参照する名前空間のように用いられる「モジュールオブジェクト」の名前です。
// exportパラメーターは、名前が付けられたエクスポートをそれぞれ指定します。
// それに対して、import * as name構文は全てをインポートします。
// 構文の意味を明らかにするために、下記に例を示します

// □ モジュールのコンテンツ全てをインポートする
// 下記のコードは、myModuleを現在のスコープに加え、./modules/my-modules.jsのファイルのモジュールからのエクスポート全てを含めます
import * as myModule from "/modules/my-module.js";

// エクスポートにアクセスするには、モジュール名（ここでは”myModule”）を★名前空間として用いる事になります。
// 例えば、上記でインポートされたモジュールがエクスポートにdoAlltheAmazingThings()を含む場合、下記のように呼び出します。
myModule.doAlltheAmazingThings();

// □ モジュールからエクスポートを1つインポートする。
// myExportという名前のオブジェクト又は値が、my-Moduleから暗黙的（モジュール全体がエクスポートされた場合）あるいは
// export文を用いて明示的にエクスポートされると、myExportが現在のスコープに加えられます
import { myExport } from "./modukes/my-module.js";

// □ モジュールから複数のエクスポートをインポートする
// 下記のコードは、fooとbarを現在のスコープに加えます
import { foo, bar } from "./modules/my-module.js";

// □ エクスポートを扱いやすいエイリアスにしてインポートする
// インポートする時にエクスポートの名前を変える事が出来ます
// 例えば下記のコードは、エクスポートをshortNameとして現在のスコープに加えます
import { reallyReallyLongModuleExportName as shortName } from "./modules/my-module.js";

// □ インポートする際に複数のエクスポートの名前を変える
// 下記のコードは、複数のエクスポートを扱いやすいエイリアスにしてモジュールからインポートします。
import {
    reallyReallyLongModuleExportName as shortName,
    anotherLongModuleName as short
} from "./modules/my-module.js";

// □ 付随効果の為だけにモジュールをインポートする
// 付随効果だけの為にモジュール全体をインポートした時は、何もインポートされません
// モジュールのグローバルコードが実行されるだけで、実際の値はインポートされないのです
import "./modules/my-module.js";

// □ デフォルトをインポートする
// デフォルトのexport（オブジェクト、関数、クラス等）にも対応出来ます。
// import文を用いて、そのようなデフォルトをインポートします。

// もっとも単純なやり方はデフォルトを直接インポートします。
import myDefault from "./mpdules/my-module.js";

// また、デフォルトの構文と共に、上記のエイリアス（名前空間または名前付きのインポート）を
// 用いる事も出来ます。その場合は下記のように、デフォルトのインポートを先に宣言しなければなりません
import myDefault, * as myModule from "./modules/my-module.js"; // myModuleは名前空間として使う

// あるいは次のような書き方も出来ます
import myDefault, {foo, bar} from "./modules/my-module.js"; // 特定の名前付きのインポート

// □ 動的にインポートする
// importキーワードを関数として呼び出す事で、モジュールを動的にインポート出来ます。
// この場合、Promiseを返します。
import("./modules/my-module.js").then((module) => {
    // moduleを使った何らかの処理
});

// この方法はawaitキーワードを使えます
let module = await import("./modules/my-module.js");

// ■ 例

// □ 標準的なインポート
// AJAX JSONリクエストの処理を助ける補助モジュールからインポートします。

// モジュール側：file.js
function getJSON(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => callback(this.responseText);
    xhr.open("GET", url, true);
    xhr.send();
}
export function getUsefulContents(url, callback) {
    getJSON(url, data => callback(JSON.parse(data)));
}

// メインプログラム側：main.js
import { getUsefulContents } from "./modules/file.js"; // モジュールとして、files.jsから、getUsefulContents()をインポートする
getUsefulContents("http://www.example.com/", data => { doSomethingUseful(data);});


// □ 動的なインポート
// 下記は、ユーザーの行動（今回はボタンのクリック）を元に、ページ内の何らかの機能を読み込み、そのモジュール内の関数を呼び出す方法を示すものです。
// 方法はこれだけではありません。import()関数はawaitも使えます
const main = document.querySelector("main");
for (const link of document.querySelectorAll("nav > a")) {
    link.addEventListener("click", e => {
        e.preventDefault();
        import("./modules/my-module.js").then((module) => {
            module.loadPageInto(main);
        })
        .catch(err => { 
            main.textContent = err.message
        });
    });
}