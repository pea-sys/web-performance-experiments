# リフロー

DOM 操作をする場合、以下の 2 つの処理を  
なるべく動作させないように気を付けるとパフォーマンス向上に繋がる。

- リフロー ・・・ ページのレイアウトを計算します。素のリフローは、要素の寸法と位置を再計算し、その要素の子、祖先、および DOM でその後に表示される要素でさらにリフローをトリガーします。

次の場合にリフローが発生します。

- DOM の要素を挿入、削除、または更新する
- 入力ボックスのテキストなど、ページのコンテンツを変更する
- DOM 要素を移動する
- DOM 要素をアニメーション化する
- offsetHeight や getComputedStyle などの要素を測定する
- CSS スタイルを変更する
- 要素のクラス名を変更する
- スタイルシートを追加または削除する
- ウィンドウのサイズを変更する
- スクロール
- フォントの変更
- :hover などの CSS 疑似クラスのアクティブ化 (IE では兄弟の疑似クラスのアクティブ化)
- style 属性のプロパティの設定

[参考]  
https://sites.google.com/site/getsnippet/javascript/dom/repaints-and-reflows-manipulating-the-dom-responsibly

(例)  
ここでは DOM の要素挿入のリフロー、リペイントを確認します。

■ ノード毎に DOM に挿入

```js
var list = [...Array(100000)].map((_, i) => i),
  elem,
  contents;
const startTime = performance.now();
for (var i = 0; i < list.length; i++) {
  elem = document.createElement("div");
  content = document.createTextNode(list[i]);
  elem.appendChild(content);
  document.body.appendChild(elem);
}
console.log("sample-3=" + String(performance.now() - startTime));
```

![4](https://user-images.githubusercontent.com/49807271/205469411-e9472743-83f0-4d20-8b44-8377e0e05f3e.png)

■ ノートをまとめて DOM に挿入

```js
var list = [...Array(100000)].map((_, i) => i),
  elem,
  contents;
const startTime = performance.now();
var fragment = document.createDocumentFragment();
for (var i = 0; i < list.length; i++) {
  elem = document.createElement("div");
  content = document.createTextNode(list[i]);
  fragment.appendChild(content);
}
document.body.appendChild(fragment);
console.log("sample-4=" + String(performance.now() - startTime));
```

![3](https://user-images.githubusercontent.com/49807271/205469413-c90de2e8-fa63-4f1a-9861-f89aa342cc1f.png)

両者ともやってみましたが、リフロー、再描画は非同期で動作しているようで、js 内でストップウォッチ測定しても意味なさそうです。  
代わりに、FireFox のパフォーマンスツールで確認してみました。  
確かに、ノードをまとめて挿入するかどうかでブラウザの負担が大きく変わりそうです。
