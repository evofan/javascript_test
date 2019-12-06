// https://developer.mozilla.org/ja/docs/Web/API/Document/createElement
// Document.createElement

// HTMLドキュメントにおいてDocument.createElement()メソッドは、tagNameで指定したHTML要素を生成する、
// あるいはtagNameを認識出来ない場合に HTMLUnknownElementを生成します。XULドキュメントでは、指定したXUL要素を生成します。
// その他のドキュメントでは、null名前空間URIの要素を生成します。
// 要素の名前空間URIを明示的に指定するには、document.createElementNS()を使用します。

// ■ Syntax
// let element = document.crateElement(tagName, [options]);

// ■ 引数
// tagName ... 生成される要素の型を特定する文字列。生成される要素のノード名は、tagNameの値で初期化される
//             このメソッドで修飾名（"html:a"等）を使用しないで下さい。
//             HTMLドキュメントで呼び出すと、createElement()は要素を生成する前にtagNameを小文字に変換します。
//
// options ... isという名前のプロパティを1つ持つ、省略可能なElementCreateOptionsオブジェクトです。
//             isプロパティの値は、前にcustomElements.define()を使用して定義したカスタム要素の名前です。

// ■ 返り値
// 新しいElement

// ■ 例
// この例では、新しいdivを生成し、""div1"のidの要素の前に挿入します。
//
// □ HTML
// <!DOCTYPE HTML>
// <hmtl>
// <head>
// <title>
// <body>
// <div id="div1">The text above has been created dynamically.</div>
// </body>
// <html>

// □ JavaScript
addElement = () => {
  // 新しいdiv要素を追加
  let newDiv = document.createElement("div");

  // 幾つかの内容を追加
  let newContent = document.createTextNode("Hi there and greeings!");

  // テキストノードを新規作成したdivに追加
  newDiv.appendChild(newContent);

  // DOMに新しく作られた要素とその内容を追加
  let currentDiv = document.getElementById("div1");
  let parentDiv = currentDiv.parentNode;
  parentDiv.insertBefore(newDiv, currentDiv); // The node before which the new node is to be inserted is not a child of this node.
  // document.body.insertBefore(newDiv, currentDiv); // The node before which the new node is to be inserted is not a child of this node.
};
document.body.onload = addElement;
