# PageSpeedModule を使ってみる

PageSpeed モジュールは、サイトを自動的に最適化するサーバーモジュールです。

今回は次のサイトの手順を実施して、使用感を確かめます。
ほぼ、このままの内容を下に転載しています。

- [【自動化】PageSpeed Module で Web サイトのパフォーマンスチューニング #1 インストール編](https://dev.classmethod.jp/articles/challenge-mod-pagespeed-install/)

[手順]

- [1] aws の ec2 インスタンス(AMI, t2micro)を起動  
  ![1](https://user-images.githubusercontent.com/49807271/194540523-0d5c501b-c766-4564-a4cd-aa294f3d21b1.png)

- [2] インバウンド SSH とアウトバウンド HTTPS を許可します。  
   また、Elastic IP Address は実際に使う場合には割り当てた方が良いでしょうが、今回は省略します。

- [3] ec2 instance connet でアクセスして、apache をインストール

```
sudo yum install httpd
```

- [4]以下のページからインストールするパッケージの URL をコピーし、インストールします。  
  ※既にインストールされていました  
  https://www.modpagespeed.com/doc/download

```
wget https://dl-ssl.google.com/dl/linux/direct/mod-pagespeed-stable_current_x86_64.rpm
sudo yum install at
```

```
Package at-3.1.13-24.amzn2.x86_64 already installed and latest version
```

- [5] apache サーバを再起動

```
sudo  service httpd restart
Redirecting to /bin/systemctl restart httpd.service
```

- [6] テスト用の html ファイル作成

```
sudo vi /var/www/html/index.html
```

ファイルの中身

```html
<html>
<head>
        <title>PageSpeed Module Test</title>
</head>
<body>
        <h1>Hello World</h1>
        <button name="Hi!" disabled="disabled">
</body>
</html>
```

- [7].pagespeed.conf の編集

```
vi /etc/httpd/conf.d/pagespeed.conf
```

84 行目のコメントを外します。

```
# Turn on mod_pagespeed. To completely disable mod_pagespeed, you
    # can set this to "off".
    ModPagespeed on
・・・
ModPagespeedEnableFilters collapse_whitespace,elide_attributes
```

- [8]http サーバを再起動

```
sudo service httpd restart
```

- [9]インターネットから ec2 にアクセスして、ソースを確認する
  スペースが削除されて、html サイズが縮小している。

```html
<html>
<head>
<title>PageSpeed Module Test</title>
</head>
<body>
<h1>Hello World</h1>
<button name="Hi!" disabled>
</body>
</html>
```

※?ModPagespeed=off を付けるとそのリクエスト時のみ Pagespeed Module をオフにすることができます。

---

[設定可能な Fileter](https://www.modpagespeed.com/doc/filters)
