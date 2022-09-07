# Lighthouse

Lighthouse は、Web ページの品質を向上させるためのオープンソースの自動化ツールです。  
パフォーマンス、アクセシビリティ、プログレッシブ Web アプリ、SEO などの監査があります。

Lighthouse は、コマンド ラインから、または Node モジュールとして、Chrome DevTools で実行できます。  
Lighthouse に監査する URL を指定すると、Lighthouse はページに対して一連の監査を実行し、ページのパフォーマンスに関するレポートを生成します。そこから、失敗した監査を、ページを改善する方法の指標として使用します。各監査には、監査が重要である理由とその修正方法を説明する参照ドキュメントがあります。

## Node CLI での利用

- 1.バージョン確認

Node 14 LTS (14.x) 以降がインストールされているか確認

```
C:\Users\user>node
Welcome to Node.js v16.15.1.
Type ".help" for more information.
```

- 2.インストール

```
npm install -g lighthouse
```

- 3.lighthouse でパフォーマンス計測します

```
lighthouse https://airhorner.com/
```

- 4.実行結果はコマンドプロンプトにズラズラ表示されますが、最後の方に HTML 出力パスが示されます。

```
  LH:Printer html output written to C:\Users\user\airhorner.com_2022-09-06_22-47-35.report.html +270ms
  LH:CLI Protip: Run lighthouse with `--view` to immediately open the HTML report in your browser +4ms
  LH:ChromeLauncher Killing Chrome instance 7212 +2ms
```

こんな感じの HTML ファイルが出力されます。  
![_C__Users_user_airhorner com_2022-09-06_22-47-35 report html (1)](https://user-images.githubusercontent.com/49807271/188659900-61add53e-9da0-4896-9dc6-0b46739f9368.png)

上部のスコアはそれぞれ

- Perfomance - 速度や UI の位相ずれに関する評価
- Accessibility - アクセスのしやすや。障害者やクローラー等にとっても理解しやすい情報が含まれているかどうかの評価
- Best Practice -Web サイトのセキュリティ面と Web 開発の最新の標準に従っているかどうかの評価
- SEO - 検索エンジンがどの程度ページを解釈できるかどうかの評価
- PWA - PWA の要件を満たしているかどうか

を意味します。

ちなみに json で出力すると、サービスで読込み共有可能
json フォーマットの場合、出力先指定なしだと標準出力になる。

```
lighthouse https://airhorner.com/  --output json --output-path=./lighthouse-results.json
```

そして、json 形式のパフォーマンス測定結果をレポート化してくれる[サービス](https://googlechrome.github.io/lighthouse/viewer/)が google から提供されています。  
ページにアクセスすると次の表示になるので中央に json ファイルをドラッグオンドロップします。

![googlechrome github io_lighthouse_viewer_](https://user-images.githubusercontent.com/49807271/188835704-603df957-9f33-47b9-8405-eece36811502.png)

先ほどの HTML 出力と同様の結果が得られます。

[公式ドキュメント](https://developer.chrome.com/docs/lighthouse/overview/)
