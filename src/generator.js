// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Generator
// Generator
// Generator オブジェクトは、ジェネレーター関数によって返され、iterableプロトコルとiteratorプロトコルの両方に従います。

// ■ Syntax
// function* gen() {
//  yield 1;
//  yield 2;
//  yield 3;   
// }
// let g = gen(); // "Generator {}"

// ■ メソッド
// ・Generator.prototype.next()
// yield式によって得られる値を返す

// ・Generator.prototype.return()
// 与えられた値を返し、ジェネレーターを終了します

// ・Generator.prototype.throw()
// エラーをジェネレーターにスローします。
// （ジェネレーター内でキャッチされない限り、そのジェネレーターも終了します）

// ■ 例
// □ 無限イテレーター
/*
function* idMaker() {
    let index = 0;
    while(true) {
        yield index++;
    }
}
let gen = idMaker(); // "Generator {}"
*/

// ■ レガシージェネレーターオブジェクト
// レガシージェネレータのサポートはFirefox58から削除されています。(2018年1月23日リリース) (バグ 1083482)。
