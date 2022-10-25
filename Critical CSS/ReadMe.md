# Critical CSS

ファーストビューに適用される css はクリティカル css と呼ばれます。  
css の同期ロードはレンダリングブロックをするので、非同期でのロードが推奨されていますが、ファーストビューに適用される css に関しては、表示崩れ等起きないように同期で優先的にロードするべきです。  
[Critical Path CSS Generator](https://www.sitelocity.com/critical-path-css-generator)
を使用すると、クリティカル css をインラインにすることが可能になります。  
ただし、サイトのレイアウトによって機能したりしなかったりするので注意が必要です。  
あと、preload についても解析対象外です。

### ■Critial Path CSS Generator 使用なし

css を以下のように適用した場合

```html
<head>
  <link rel="stylesheet" href="styles.css" />
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
</head>
```

ウォーターフォール  
※レンダリングブロックが確認できます
![www webpagetest org_result_221023_AiDcKB_64C_1_details_](https://user-images.githubusercontent.com/49807271/197392526-02950ae4-ba0c-4010-b9ef-15a0d2337d89.png)

メトリクス

![www webpagetest org_result_221023_AiDcKB_64C_](https://user-images.githubusercontent.com/49807271/197392598-7af94863-1b91-480a-993c-8c167703804f.png)

### ■Critial Path CSS Generator 使用あり

まずは ■Critial Path CSS Generator 使用なしのサイトの URL を Critical Path CSS Generator のページに張り付けて解析します。

![www sitelocity com_critical-path-css-generator (1)](https://user-images.githubusercontent.com/49807271/197392472-2b926ac0-2d75-4557-ac4b-a37734276cf0.png)

そうすると、css と javascript が出力されます。
critical css 　と通常の css を　ダウンロードして head タグのリンクに追加します。 javascript は body タグの末尾に張り付けます。
critical_min.css 以外は非同期で読み込めるので非同期にします。

```html
<head>
  <link rel="preload" href="base-31m.pages.dev_app_min.css" as="style" />
  <link rel="stylesheet" href="base-31m.pages.dev_critical_min.css" />
</head>

<body>
  ・・・
  <script>
    var cb = function () {
      var l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = "PATH_TO_COMBINED_CSS_FILE";
      var h = document.getElementsByTagName("head")[0];
      h.parentNode.insertBefore(l, h);
    };
    var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
    if (raf) raf(cb);
    else window.addEventListener("load", cb);
  </script>
</body>
```

これだけです。解析してみましょう。

ウォーターフォール
![www webpagetest org_result_221023_AiDc8H_696_1_details_](https://user-images.githubusercontent.com/49807271/197393669-0a7a9e23-6bc7-45a8-9d33-11cb723f061c.png)

メトリクス
![www webpagetest org_result_221023_AiDc8H_696_](https://user-images.githubusercontent.com/49807271/197393673-15cdcfdc-c526-4d33-996e-0834d9e9cc6d.png)

critical CSS 以外の外部 css 読込みでレンダリングブロックされないようになり、パフォーマンスが向上しています。
