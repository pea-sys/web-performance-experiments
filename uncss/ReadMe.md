# uncss

使っていない css ルールセットを削除するために
uncss が使用できます。  
https://github.com/uncss/uncss

css の軽量化や保守性向上に使用できます。  
リスト化されているルールセットは削除されません。

[手順]  
※実務では webpack のプラグインを使用した方が良いと思われる

- 1.uncss をインストール

```
npm install -g uncss
```

- 2.ヘルプ確認

```
uncss -h
Usage: uncss [options] <file or URL, ...>
         e.g. uncss https://getbootstrap.com/docs/3.3/examples/jumbotron/ > stylesheet.css

Options:
  -V, --version                       output the version number
  -i, --ignore <selector, ...>        Do not remove given selectors
  -m, --media <media_query, ...>      Process additional media queries
  -C, --csspath <path>                Relative path where the CSS files are located
  -s, --stylesheets <file, ...>       Specify additional stylesheets to process
  -S, --ignoreSheets <selector, ...>  Do not include specified stylesheets
  -r, --raw <string>                  Pass in a raw string of CSS
  -t, --timeout <milliseconds>        Wait for JS evaluation
  -H, --htmlroot <folder>             Absolute paths' root location
  -u, --uncssrc <file>                Load these options from <file>
  -n, --noBanner                      Disable banner
  -a, --userAgent <string>            Use a custom useragent string
  -I, --inject <file>                 Path to javascript file to be executed before uncss runs
  -o, --output <file>                 Path to write resulting CSS to
  -h, --help                          output usage information
```

- 3.ソースを Cloudflare にデプロイ

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>testpage</title>
    <link rel="stylesheet" href="main.css" />
    <link rel="stylesheet" href="responsive.css" />
  </head>

  <body>
    <h1>Loading 2 stylesheets, one main and one starting with @media queries</h1>
    <h1>This text should turn red when the window width is &lt; 480px</h1>
  </body>
</html>
```

main.css

```css
body {
  font-family: Helvetica Neue, Helvetica, Arial;
}

h1 {
  font-weight: normal;
}
h3 {
  font-weight: bold;
}
```

responsive.css

```css
@media (max-width: 480px) {
  h1 {
    color: red;
  }
}
```

- 4.uncss 実行

```
uncss https://uncss.pages.dev/ > stylesheets.css
```

- 5.出力を確認  
  未使用の h3 のスタイルが削除出来ています。

stylesheets.css

```css
/*** uncss> filename: https://uncss.pages.dev/main.css ***/
body {
  font-family: Helvetica Neue, Helvetica, Arial;
}

h1 {
  font-weight: normal;
}
/*** uncss> filename: https://uncss.pages.dev/responsive.css ***/
@media (max-width: 480px) {
  h1 {
    color: red;
  }
}
```

軽く動かしてみたい時は次のページも利用できます。  
https://uncss-online.com/
