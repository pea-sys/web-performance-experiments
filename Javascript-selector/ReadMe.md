# Selector API in Javascript

Javascript の Selector API のパフォーマンスを計測します。
沢山あるリスト要素のうち、奇数行の色を付けます。
Chrome と FireFox で計測した結果として、getElement と SelectorAPI に明確に差は見られませんでした（1 パターンしかやってませんが）  
保守性を考えて、SelectorAPI を使用するスタンスで行こうと思います。

■GetElementsByTagName

```js
var li = document.getElementsByTagName("li");
for (var i = 0; i < li.length; i++) {
  if (i % 2 == 0) li[i].style.background = "yellow";
}
```

■Selector API

```js
var li = document.querySelectorAll("li:nth-child(odd)");
for (var i = 0; i < li.length; i++) {
  li[i].style.background = "red";
}
```

■ 参考  
jQuery のクラスセレクタは約 8~11 倍、getElementById より遅いことがあるぞ （DOM を 10,000 回取得しただけ）
https://qiita.com/benibana2001/items/7b19005cbd452b918060
