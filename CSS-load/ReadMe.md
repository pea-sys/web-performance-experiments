# CSS のロードパターン

CSS の読込み方法の違いによるパフォーマンスを計測してみます。
サンプルページは以下とします。  
https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_templates_band&stacked=h

ここでは、ファーストビューやクリティカル css,表示崩れ云々の条件  
を抜き、単純に記法によるパフォーマンスの違いを確認します。
2022 年 10 月 22 日時点での記録です。  
結論としては、ファーストビュー以外の css はプリロードし、  
それ以外は同期的にロードしましょう。で良いと思います。

## ■default

CSS の読み込みは次のようになっています。  
CSS の読み込みや解析が終わるまでは、レンダリングがブロックされます。

```html
<head>
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <style>
    body {
      font-family: "Lato", sans-serif;
    }
    .mySlides {
      display: none;
    }
  </style>
</head>
```

ウォーターフォール

![default_waterfall](https://user-images.githubusercontent.com/49807271/197320087-e30583c7-21d7-47c1-8d76-2ef756a0528d.png)

メトリクス

![default_,metrix](https://user-images.githubusercontent.com/49807271/197320083-b3bc8ef6-498a-4b00-916d-bee7045eb43a.png)

## ■preload

css の非同期読込みを行います。
レンダリングブロックはされないが、ファーストビューに影響与える css には使用できない

```html
<head>
  <title>W3.CSS Template</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preload" href="https://www.w3schools.com/w3css/4/w3.css" as="style" />
  <link rel="preload" href="https://fonts.googleapis.com/css?family=Lato" as="style" />
  <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" as="style" />
  <style>
    body {
      font-family: "Lato", sans-serif;
    }
    .mySlides {
      display: none;
    }
  </style>
</head>
```

ウォーターフォール

![preload_waterfall](https://user-images.githubusercontent.com/49807271/197320088-a11dc7ff-e9e2-4ec1-acdd-73b82487088b.png)

メトリクス

![preload_metrix](https://user-images.githubusercontent.com/49807271/197320089-2b51f68d-5c8e-46b2-bf23-1fafa3437470.png)
レンダリングは 2 秒から 1 秒に短縮されてます。

## ■body

使う機会はなさそうだが、body でも header と同様に css が読み込めます。

```html
<body>
  ・・・
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <style>
    body {
      font-family: "Lato", sans-serif;
    }
    .mySlides {
      display: none;
    }
  </style>
  ・・・
</body>
```

ウォーターフォール
![body_waterfall](https://user-images.githubusercontent.com/49807271/197325069-51d0d32c-8788-4906-9286-5ef4ed2c2d0a.png)

メトリクス
![body_metrix](https://user-images.githubusercontent.com/49807271/197325071-252b387c-d795-4907-81ef-ddebb98fd2b1.png)

CLS が高くなっていて、視覚的な安定性が低いとされています。
ページの読み込みの最中にコンテンツがどれだけ移動したかを表します。
レンダリングの開始は早いけど、コンテンツが移動してしまっては意味がないように思います。

## ■import

scss との混同等のデメリットがあることから非推奨とされています。  
パフォーマンス上のデメリットに関しては、多少ファーストバイトが大きい所以外は分かりませんでした。

```html
<head>
  ・・・
  <style>
    @import url("https://www.w3schools.com/w3css/4/w3.css");
    @import url("https://fonts.googleapis.com/css?family=Lato");
    @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    body {
      font-family: "Lato", sans-serif;
    }
    .mySlides {
      display: none;
    }
  </style>
</head>
```

ウォーターフォール  
![import_waterfall](https://user-images.githubusercontent.com/49807271/197328786-bba1c358-5470-48b0-8af6-12b917f8e018.png)

メトリクス  
![import_metrix](https://user-images.githubusercontent.com/49807271/197328788-8c4f84cf-7003-4046-a406-f4461070515d.png)

[参考]  
[fouc sample](https://stevesouders.com/examples/css-fouc.php)
