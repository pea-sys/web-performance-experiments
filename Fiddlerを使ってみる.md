# Fiddler を使ってみる

Fiddler は HTTP 通信に特化したパケットキャプチャツールです。他のパケットキャプチャツールとしては WireShark が有名ですが、こちらは情報量が多すぎて、用途によっては使いづらい場面があります。

今回の作業手順は次のサイトの内容を参考にかいつまんで進めています。(元のページの方が親切かつ分かりやすく詳細です。)  
https://kennyshroff.com/it/dev/telerik-fiddler/

[環境]

- Windows10 64bit

[手順]

- 1.次の URL から Fiddler のダウンロードします。
  https://www.telerik.com/fiddler/fiddler-classic

  ※[ライセンス](https://www.telerik.com/purchase/license-agreement/fiddler-enterprise-support)はきちんと読みましょう。

* 2.ダウンロードしたセットアップを実行して、Fiddler をインストール　　成功すると、次の画面が表示されます。  
  ![1](https://user-images.githubusercontent.com/49807271/204114715-d0b06413-5553-4e89-bf30-f421c39f4877.png)

# HTTPS 通信のキャプチャ設定

- 3.Fiddler を起動します。  
  初回起動時に警告メッセージが表示されるので「Cancel」で閉じます。

* 4.ツール画面のタブから「Tools」＞「Options」を選択します。  
  ![2](https://user-images.githubusercontent.com/49807271/204116827-7c2e4758-885a-48b9-8984-e3af16be4c3c.png)

* 5.HTTPS タグの Decrypt HTTPS traffuc にチェックを入れて
  証明書をインストールします。  
  Ignore server certification errors (unsafe)にチェックを入れます。
  ![3](https://user-images.githubusercontent.com/49807271/204117139-2e2a79d2-ef0d-45af-b839-56899c4110f4.png)

* 6.Actions ボタンを押し,Trust Root Certificate を選択します。  
  Fiddler 用 Root 証明書をインストールすることで、HTTPS が解析可能になります。

### ■ オプション

- フィルター  
  特定のクライアントやネットワークのキャプチャを行いたい場合は、Fileter から設定可能です。
  ![4](https://user-images.githubusercontent.com/49807271/204119765-8166daac-60bb-4457-914f-bd91b671d791.png)

- コンポーザー  
  HTTP リクエストを手動で作成するコンポーザー機能があります。
  1 から作る方法とキャプチャ済みのパケットを修正する方法があります。

他にも色々できるようなのですが、徐々に勉強して追記していこうと思います。
