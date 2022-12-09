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
