# CSS Sprite

CSS Sprite とは.CSS でスプライト画像を扱うテクニックのことを指します。  
スプライト画像とは複数の画像を 1 枚にまとめた画像ファイルのことです。
javascript のバンドルのように、１つのファイルにまとめることで、http リクエストを減らす目的のために使用されます。  
とはいえ、スプライト画像が大きくなりすぎてもパフォーマンス低下を招くので、アイコン等のサイズの小さい画像のみをスプライト画像にするというケースが多いです。  
欠点は、画像の管理や利用の手間が増える、alt 属性が使えない点です。 HTTP プロトコルのバージョンによって、スプライト画像を使うべきかどうかの判断基準が変わる場合もあります。

[手順]  
ここではフリー素材のアイコンをスプライト画像にします。

- 1.スプライト画像を生成するツールは Web 上に沢山存在します。  
  今回はこちらを使用します。  
  https://jcthepants.github.io/Retina-CSS-Sprite-Generator/

* 2.上記 web サイトにアクセスしたら、mode を ratina から normal に変更  
  ![1](https://user-images.githubusercontent.com/49807271/195966784-8f5a41cb-dac7-4a6d-86e5-e9f8b47b7627.png)

* 3.スプライト画像にしたい画像をドラッグオンドロップするとスプライト画像と css が生成されます。  
  スプライト画像のサイズは指定した方が良いかもしれません。  
  画像を右クリックでダウンロードします。
  ![jcthepants github io_Retina-CSS-Sprite-Generator_ (1)](https://user-images.githubusercontent.com/49807271/195970001-2703dec3-3402-47ea-b66b-3990e7b24b9b.png)

スプライト css

```css
.icon {
  background: url("../images/icons.png") no-repeat top left;
  width: 32px;
  height: 32px;
}
.icon1 {
  background-position: 0 0;
}
.icon2 {
  background-position: 0 -32px;
}
.icon3 {
  background-position: 0 -64px;
}
.icon4 {
  background-position: 0 -96px;
}
.icon5 {
  background-position: 0 -128px;
}
.icon6 {
  background-position: 0 -160px;
}
```

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" href="css/style.css" />
    <title>CSS Spriteのサンプル</title>
  </head>
  <body>
    <div class="icon icon1"></div>
    <div class="icon icon2"></div>
    <div class="icon icon3"></div>
    <div class="icon icon4"></div>
    <div class="icon icon5"></div>
    <div class="icon icon6"></div>
  </body>
</html>
```

- 4.スプライト画像を Zopfli で最適化します。

```
zopflipng.exe --iterations=15 "icons.png" "icons.min.png"
Optimizing
icons.png
Input size: 4504 (4K)
Result size: 2404 (2K). Percentage of original: 53.375%
Result is smaller
```

- 5.css の参照パスを書き換えます。

```css
background: url("../images/icons.min.png") no-repeat top left;
```

- 6.html.index を開くと一回の http リクエストで全ての画像がダウンロードされています。  
  ![_C__Users_user_source_repos_web-performance-experiments_CSS%20Sprite_sample_src_index html](https://user-images.githubusercontent.com/49807271/195987853-5afdd0d3-9285-4438-8a8d-e0ae0ca11762.png)

## パフォーマンス比較

スプライト CSS の有無でパフォーマンスを比較してみます。

### [スプライト無]

■ リクエスト

- Request 1:  
  https://aquamarine-gumption-3405c5.netlify.app/
- Request 2:  
  https://aquamarine-gumption-3405c5.netlify.app/css/style.css
- Request 3:  
  https://aquamarine-gumption-3405c5.netlify.app/images/icon1.min.png
- Request 4:  
  https://aquamarine-gumption-3405c5.netlify.app/images/icon2.min.png
- Request 5:  
  https://aquamarine-gumption-3405c5.netlify.app/images/icon3.min.png
- Request 6:  
  https://aquamarine-gumption-3405c5.netlify.app/images/icon4.min.png
- Request 7:  
  https://aquamarine-gumption-3405c5.netlify.app/images/icon5.min.png
- Request 8:  
  https://aquamarine-gumption-3405c5.netlify.app/images/icon6.min.png
- Request 9:  
  https://aquamarine-gumption-3405c5.netlify.app/favicon.ico

■ ウォーターフォール

![original_waterfall](https://user-images.githubusercontent.com/49807271/196561653-ea407975-ddca-4a7a-a961-663161dd81ca.png)

■ メトリクス

![original_metrix](https://user-images.githubusercontent.com/49807271/196561650-618444ad-5ec0-4424-abe8-bb1ca069d873.png)

### [スプライト有]

■ リクエスト

- Request 1:  
  https://creative-rolypoly-9d4c58.netlify.app/
- Request 2:  
  https://creative-rolypoly-9d4c58.netlify.app/css/style.css
- Request 3:  
  https://creative-rolypoly-9d4c58.netlify.app/images/icons.min.png
- Request 4:  
  https://creative-rolypoly-9d4c58.netlify.app/favicon.ico

■ ウォーターフォール

![sprite_waterfall](https://user-images.githubusercontent.com/49807271/196561657-5d22d3a1-95fd-4fba-9a62-8e897d5660b2.png)

■ メトリクス

![sprite_metrix](https://user-images.githubusercontent.com/49807271/196561656-b8e860aa-7f26-4dd7-b0a5-5cfb4aa49877.png)

### [比較結果]

http/2 の並列ダウンロードが効いているおかげで大してパフォーマンスに差は出ませんでした。メンテナンスコストを考えると敢えて使用する理由はないかもしれません。
