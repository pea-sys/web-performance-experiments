# レンダーツリーのキューイングをフラッシュするプロパティ群

特定のプロパティを参照すると
レンダーツリーの変更用キューイングを即座に吐き出す。
キューイングはため込まれることで最適化されるので、頻繁に吐き出されると最適化が効かない。

以下のデータ参照が該当する。

DOM のレイアウトプロパティへのアクセス

- offsetTop、offsetLeft、offsetWidth、offsetHeight
- scrollTop、scrollLeft、scrollWidth、scrollHeight
- clientTop、clientLeft、clientWidth、clientHeight
- getComputedStyle()
- DOM のスタイルプロパティへのアクセスや変更全般
- DOM ツリーへのアクセスや操作

■ 測定の結果

「サンプル 1 の処理時間 ≒ サンプル 2 の処理時間 \* 100」

[サンプル 1]
等間隔でキューイングフラッシュ

```js
var computed,
  tmp = "",
  bodystyle = document.body.style;

computed = document.defaultView.getComputedStyle(document.body, "");
console.time("timer1");
for (i = 0; i < 1000; i++) {
  bodystyle.color = "red";
  tmp = computed.backgroundColor;
  bodystyle.color = "white";
  tmp = computed.backgroundImage;
  bodystyle.color = "green";
  tmp = computed.backgroundAttachment;
}
console.timeEnd("timer1");
```

![sample1](https://user-images.githubusercontent.com/49807271/216176275-976a75c3-4bc6-4ba0-b241-daedad735ac5.png)

[サンプル 2]
キューイングとフラッシュを分割

```js
var computed,
  tmp = "",
  bodystyle = document.body.style;

computed = document.defaultView.getComputedStyle(document.body, "");

console.time("timer2");
for (i = 0; i < 1000; i++) {
  tmp = computed.backgroundColor;
  tmp = computed.backgroundImage;
  tmp = computed.backgroundAttachment;
  bodystyle.color = "green";
  bodystyle.color = "red";
  bodystyle.color = "white";
}
console.timeEnd("timer2");
```

![sample2](https://user-images.githubusercontent.com/49807271/216176279-7a63c1e6-5faa-4978-8ed3-66c847b53bcb.png)
