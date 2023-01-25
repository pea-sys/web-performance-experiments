# UserTiming API を使ってみる

UserTimingAPI を使用することで任意の処理にかかる時間を測定できます。  
perfomance.mark により、指定ラベルでタイムスタンプを記憶します。

```js
perfomance.mark("LabelName");
```

performance.measure により、ラベル間の時差や js 解析開始時点からの時間を測定します。

```js
performance.measure("LabelName2-LabelName1", "LabelName1", "LabelName2");
```

何が便利かというと、Chrome の DevTool でタイミングが可視化できるところだと思います。

![ss](https://user-images.githubusercontent.com/49807271/210197815-6fc7a912-56e5-47d0-8bee-c455dcef2cf4.png)
