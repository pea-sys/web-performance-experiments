# CSS の@import の動作確認

CSS の@import は、以下の理由から使用を控えるよう推奨されています。

- http リクエストが余計に発生する
- CSS のパースが終わってからダウンロードが開始されるので遅い(not 並列)。

* キャッシュ出来ない

一応、知識としてはあるものの確認はしたことないので、
念のため動作確認をします。

## ■@import 未使用

css が並列ダウンロードされています。

```html
<link rel="stylesheet" href="style1.css" /> <link rel="stylesheet" href="style2.css" />
```

![www webpagetest org_result_230105_AiDcN0_53P_2_details_](https://user-images.githubusercontent.com/49807271/210722690-2dd1efcc-dd45-4b8a-a570-bb31cd627b9e.png)

## ■@import 使用

ちょっと悪意があるかもしれませんが、html と css それぞれで import します。
css は直列にダウンロードされます。

```html
<style>
  @import url("style1.css");
</style>
```

```css
@import url("style2.css");
h1 {
  color: red;
}
```

![www webpagetest org_result_230105_AiDcAV_52T_1_details_](https://user-images.githubusercontent.com/49807271/210722701-5d2d788a-f82f-4b10-9aa1-5029e1164b72.png)

一応、次のようにすれば並列ダウンロードはされますが、それでも他のデメリットは残ったままなので、特に使用する理由はないですね。

```html
<style>
  @import url("style1.css");
  @import url("style1.css");
</style>
```
