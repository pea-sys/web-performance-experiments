# ETag の最適化

Etag はエンティティタグの意味で、キャッシュされているコンポーネントの有効性を検証するためにウェブサーバとブラウザが使用する仕組みです。  
Web サーバが ETag を付加しますが、同じファイルでも Web サーバによって付加される情報が異なるので、確認が必要になります。  
複数のサーバでホストしている場合、ETag が想定通りの動作をせずに邪魔になる場合があります。

## ■Netlify

netlify に同じ HTML で２つのプロジェクトをアップロードします。
ETag の情報が異なっています。

- デプロイ先 A

```
etag: "2d91b7b7c05856c83a0a40f4d87f12c3-ssl"
server: Netlify
```

- デプロイ先 B

```
etag: "8ba9d06fc6b4451cd35f4a508b615dea-ssl"
server: Netlify
```

## ■cloudFlare

cloudFlare に同じ HTML で２つのプロジェクトをアップロードします。
ETag の情報が一致しています。

- デプロイ先 A

```
etag: "4e3f7c4d511af136d5aadf6f2954a875"
・・・
server: cloudflare
```

- デプロイ先 B

```
etag: "4e3f7c4d511af136d5aadf6f2954a875"
・・・
server: cloudflare
```

Netlify のようにコンテンツ以外の情報を含んだハッシュ値を ETag に設定する Web サーバにホスティングする場合、ヘッダーサイズを減らしたい場合、ハッシュ値生成ルールの透明性を把握できない場合などに ETag を外したい場合がある。  
外し方は web サーバによって異なりますが、apache なら設定の書き換えになります。  
Netlify も cache の設定はリポジトリ直下に設定ファイルを配置することになりますが、ETag の外し方は正直分かりませんでした。 もしかしたら外せないのかもしれない。  
AWS の S3 はコンテンツベースの ETag なので、自動スケーリングが活きます。

[参考]  
[ETag とは](https://qiita.com/OmeletteCurry19/items/a84d6a7c91df50e7dcd6)
