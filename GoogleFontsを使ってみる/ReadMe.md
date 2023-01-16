# Google Font を使ってみる

Web フォントの１つである Google Font を使ってみます。  
Web フォントは、どんな環境でも同じフォントで表示可能な仕組みです。
フォント利用時には著作権等の確認が必要です。

[手順]

- 1.GoogleFont のページにアクセスします  
  https://fonts.google.com/

- 2.使用したいフォントを選択
  ![1](https://user-images.githubusercontent.com/49807271/205519971-f14af847-59cc-4833-b4c2-561b6c049697.png)

- 3.今回は Zen Docs を選択  
  任意のテキストを入力し、プレビューが確認できます。
  ![2](https://user-images.githubusercontent.com/49807271/205523399-7b1b36aa-ff41-49b7-9ea0-84d0ed4d7351.png)

* 4.右上のプラスボタンを押すと、埋め込みリンクが表示されます。  
  ![3](https://user-images.githubusercontent.com/49807271/205523577-8e2e880c-0497-4767-a4cb-76a27852dd0e.png)

* 5.HTML 文書に埋め込みます。  
  最近流行りの ChatGPT に HTML を作成してもらいました。  
  ![4](https://user-images.githubusercontent.com/49807271/205523657-a2f92fb7-440d-4e32-b249-06ec0e1b4d70.png)

* 6.HTML の head 内にリンクを埋め込みます。  
  preconnect で事前接続することで、ロードを素早く完了できます。

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap" rel="stylesheet" />
    <title>Hello World</title>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

また、フォントロード部分で必要な文字セットを指定することでダウンロード量を減らすこともできます。

```
<link href="https://fonts.googleapis.com/css2?family=Zen+Dots&text=HelloWorld" rel="stylesheet" />
```

下図はコンテンツダウンロードサイズの比較です。
左がテキスト指定なし、右がテキスト指定あり

![1](https://user-images.githubusercontent.com/49807271/210678820-27c468fb-e78a-429b-bd8d-5447dca22070.png)

- 7.css でフォントをあてたい要素を記述します

```css
h1 {
  font-family: "Zen Dots", cursive;
}
```

- 8.html から css を読み込みます

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="styles.css" />
    <title>Hello World</title>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

- 9.これで完成

![1](https://user-images.githubusercontent.com/49807271/205528342-a53b04e0-a000-45d0-a457-38ff434f7816.png)

web フォントが反映されるまでは、デフォルトフォントで表示されるので、ちらつきが気になります(FOUT と言うらしい)。

font がロード出来たタイミングで wf-active クラスが付加されるとのことで、FOUT は次の css で回避できるそう。

```css
html {
  visibility: hidden;
}
html.wf-active {
  visibility: visible;
}
```

しかし、私の環境では、いくら待っても文字が表示されませんでした。

- 10.ちらつきを消すためには web フォントのリンクから display=swap を削除すれば解決しました。  
  font-display:swap は、フォントを利用できるまでテキストを表示しておくパラメータのようでした。

■ 削除前

```html
<link href="https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap" rel="stylesheet" />
```

■ 削除後

```html
<link href="https://fonts.googleapis.com/css2?family=Zen+Dots" rel="stylesheet" />
```

# おまけ

■css で web フォントをロードする

- css でフォントをロードする場合は font-face を利用する  
  font はスタイルで定義した方が綺麗だと思います。  
  font-face 自体はダウンロードを行わず、ページでスタイルを使用している場合のみダウンロードが発生します。  
  インライン css にすることで最もロードは早くなるのでベストプラクティスと言えそうです。
  外部ファイルにする場合は、preload した方が良いと思います。  
  また、フォーマットは圧縮率が最も高い woff2 が推奨されています。

```css
@font-face {
  font-family: "Zen Dots";
  src: url("https://fonts.googleapis.com/css2?family=Zen+Dots") format("woff2");
}
```

UnicodeRange によるサブセット化はダウンロードサイズが変わらない等の話も聞くので試していません。  
自前でサブセットを作って配置しておくのが良いかもしれない。
以下のサイトで公開されているツールは woff2 まで変換できそうです。  
https://opentype.jp/subsetfontmk.htm  
静的コンテンツを解析してサブセットを作成する OSS もありました。  
https://github.com/Munter/subfont  
Web 業界の人ではないので、どれが業界標準かは分からない。
