# cssnano による css 最適化

cssnano は PostCSS エコシステムの上に書かれたモジュール式圧縮ツールです。
css をスペースの削除等の単純な最適化や  
ショートハンド化等の複雑な最適化などを行うことが出来ます。

[手順]

- 1.cssnano と postcss をインストールします。

```
npm install cssnano postcss --save-dev
```

- 2.PostCSS CLI をインストールします。

```
npm install --save-dev postcss-cli
```

- 3.プロジェクトルートフォルダに postcss.config.js を作成

```js
module.exports = {
  plugins: [
    require("cssnano")({
      preset: "default",
    }),
  ],
};
```

- 4.css を用意

input.css

```css
/* normalize selectors */
h1::before,
h1:before {
  /* reduce shorthand even further */
  margin: 10px 20px 10px 20px;
  /* reduce color values */
  color: #ff0000;
  /* remove duplicated properties */
  font-weight: normal;
  font-weight: normal;
  /* reduce position values */
  background-position: bottom right;
  /* normalize wrapping quotes */
  content: "© " attr(href) " ©";
}
/* correct invalid placement */
@charset "utf-8";
```

- 5.postcss 実行

```
npx postcss input.css > output.css
```

- 6.出力結果の確認

```css
@charset "utf-8";
h1:before {
  background-position: 100% 100%;
  color: red;
  content: "© " attr(href) " ©";
  font-weight: 400;
  margin: 10px 20px;
}
```

473byte から 133byte に減りました。
