# Redirect を減らす

リンク URL の末尾に/を入れ忘れることにより、Redirect が発生することがあります。

### [リダイレクト]

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>Title</title>
    <meta http-equiv="refresh" content="3;url=https://www.yahoo.com/lifestyle/horoscope" />
  </head>
  <body></body>
</html>
```

ウォーターフォール  
リンク先アクセスに 1.3 秒掛かっています
![redirect_waterfall](https://user-images.githubusercontent.com/49807271/197900017-95e71f67-f6d4-4d87-bb44-974663277eb1.png)

### [ダイレクト]

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>Title</title>
    <meta http-equiv="refresh" content="3;url=https://www.yahoo.com/lifestyle/horoscope/" />
  </head>
  <body></body>
</html>
```

ウォーターフォール
リンク先アクセスに 1.1 秒程度掛かっています。
![direct_waterfall](https://user-images.githubusercontent.com/49807271/197900009-76e5df9a-f031-4363-9e4d-2cef70ae8960.png)

### [ホスト]

ちなみに URL がホスト名で終わる場合は/が末尾になくても、リダイレクトは発生しない

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>Title</title>
    <meta http-equiv="refresh" content="3;url=https://www.yahoo.com" />
  </head>
  <body></body>
</html>
```

ウォーターフォール  
![www webpagetest org_result_221025_BiDc0B_S3T_2_details_](https://user-images.githubusercontent.com/49807271/197901598-a7132e87-2703-4aab-8620-bbdcbc4dcb1f.png)
