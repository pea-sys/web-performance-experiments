# Last-Modified Header 動作確認

弱いキャッシュの 1 つである Last-Modified Header の動作確認を行います。  
サーバに対し、コンテンツの最終更新日時を問い合わせ、キャッシュ済みコンテンツの最終更新日時と同じである場合、
コンテンツをダウンロードします。

---

[環境]

- OS:Windows10

* クライアント : GoogleChrome

* サーバ : Apache

---

[手順]

- 1.Apache でテストします。バージョン確認。

```
httpd -v
Server version: Apache/2.4.54 (Win64)
Apache Lounge VS17 Server built:   Nov 10 2022 11:16:17
```

- 2.Apache の設定ファイル httpd.conf を確認。
  以下の行がコメントアウトされていたら、コメント解除します。

```
ServerName www.example.com:80
```

- 3.設定ファイルの文法チェック

```
httpd -t
Syntax OK
```

- 4.次の URL にアクセスし、「It,Works!」と表示されていれば OK。  
  http://localhost/

* 5.apache サーバを停止

```
httpd -k -stop
```

- 6.Etag が有効だと Last-Modified が使用されないので、
  Etag を返さないようにします。  
   httpd.conf に以下の行を追加。

```
FileETag None
```

- 7.設定ファイルの文法チェック

```
httpd -t
Syntax OK
```

- 8.ルートディレクトリの index.html を置き換えます

- 9.アクセスします。
  ヘッダーは次のようになっています

```
リクエスト URL: http://localhost/images/workstation.png
リクエスト メソッド: GET
ステータス コード: 200 OK
リモート アドレス: [::1]:80
参照ポリシー: strict-origin-when-cross-origin
```

```
Accept-Ranges: bytes
Connection: Keep-Alive
Content-Length: 3249
Content-Type: image/png
Date: Mon, 09 Jan 2023 04:03:23 GMT
Keep-Alive: timeout=5, max=100
Last-Modified: Mon, 09 Jan 2023 01:26:53 GMT
Server: Apache/2.4.54 (Win64)
```

- 10.もう一度アクセスします。  
  レスポンスコード 304 になり、コンテンツは返されません。

```
リクエスト URL: http://localhost/images/workstation.png
リクエスト メソッド: GET
ステータス コード: 304 OK
リモート アドレス: [::1]:80
参照ポリシー: strict-origin-when-cross-origin
```

```
Accept-Ranges: bytes
Connection: Keep-Alive
Date: Mon, 09 Jan 2023 04:29:44 GMT
Keep-Alive: timeout=5, max=100
Last-Modified: Mon, 09 Jan 2023 01:26:53 GMT
Server: Apache/2.4.54 (Win64)
```

- 11.次に png ファイルを更新してからアクセスします。  
  レスポンスコードが 200 になり、コンテンツがセットされています。Last-Modified の日付も更新されています。

```
リクエスト URL: http://localhost/images/workstation.png
リクエスト メソッド: GET
ステータス コード: 200 OK
リモート アドレス: [::1]:80
参照ポリシー: strict-origin-when-cross-origin
```

```
Accept-Ranges: bytes
Connection: Keep-Alive
Content-Length: 3028
Content-Type: image/png
Date: Mon, 09 Jan 2023 04:38:09 GMT
Keep-Alive: timeout=5, max=100
Last-Modified: Mon, 09 Jan 2023 04:33:46 GMT
Server: Apache/2.4.54 (Win64)
```

[参考]
[Apache 2.4 Web サーバで 304 Not Modified が返ってこない]
(http://www.magicvox.net/archive/2017/02141015/
