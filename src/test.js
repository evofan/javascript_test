        // Javascriptにシンボルを導入する最初の動機は、プライベートプロパティを有効にすることでした。
        // 残念ながら、彼らは最終的に大幅にダウングレードされました。
        // それらは、Object.getOwnPropertySymbolsまたはプロキシを使用するなどのリフレクションを介して検索できるため、プライベートではなくなりました。
        //
        // それらは現在、一意のシンボルとして知られ、それらの唯一の用途は、プロパティ間の名前の衝突を避けることです。
        // たとえば、ECMAScript自体は、特定のメソッドを介して拡張フックを導入できるようになりました。
        // これらのメソッドは、ユーザー名と衝突する危険を冒すことなく、オブジェクトに（たとえば、反復プロトコルを定義するため）置く事が出来ます。

        // シンボルは真のプライバシーを保証するものではありませんが、オブジェクトのパブリックプロパティと内部プロパティを分離するために使用出来ます。
        // プライベートプロパティを持つためにSymbolを使用出来る例を見てみましょう。

        // オブジェクトのプロパティがプライベートではない例を見てみましょう。
        let Pet = (function() {
          function Pet(type) {
            this.type = type;
          }
          Pet.prototype.getType = function() {
            return this.type;
          }
          return Pet;
        })();
        let a = new Pet("dog");
        console.log(a.getType()); // dog
        // 外で変更出来てしまう
        a.type = null;
        console.log(a.getType()); // null
        // 上記では、Petクラスプロパティタイプはプライベートではありません。
        // プライベートにするには、クロージャーを作成する必要があります。
        // 以下の例は、クロージャーを使用してタイプをプライベートにする方法を示しています。

        let Pet2 = (function() {
          function Pet2(type) {
            this.getType = function() {
              return type;
            };
          }
          return Pet2;
        })();
        let b = new Pet2("dog");
        console.log(b.getType()); // dog
        // プライベートを保つ
        b.type = null;
        console.log(b.getType()); // dog ※上書きされない
        // 上記のアプローチのデメリット：作成された各Petインスタンスに対して、
        // パフォーマンスを損なう可能性のある追加のクロージャーを導入しています。
        
        // 次に、Symbolを紹介します。これにより、
        // 余分な不要なクロージャーを使用せずにプロパティをプライベートにすることが出来ます。
        // 以下のコード例：
        let Pet3 = (function() {
          let typeSymbol = Symbol("type");
          function Pet3(type) {
            this[typeSymbol] = type;
          }
          Pet3.prototype.getType = function() {
            return this[typeSymbol]
          }
          return Pet3;
        })();
        let c = new Pet3("dog");
        console.log(c.getType()); // dog
        // プライベートを保つ
        c.type = null;
        console.log(c.getType()); // dog
        
        console.log("");