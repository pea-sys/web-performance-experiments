# minify-xml を使ってみる

xml を minify する minify-xml を使ってみる

[手順]

- 1. minify-xml をインストールします

```
npm install minify-xml -g
```

- 2. minify-xml を実行します  
     出力先を指定しない場合は、minify 結果を返します。

```
minify-xml sample.xml
<?xml version="1.0" encoding="UTF-8"?><root><element><sub-element>value</sub-element></element></root>
```

出力先を指定する場合は、出力先に minify 結果を書き込みます。

```
minify-xml sample.xml --output sample.min.xml
Writing to sample.min.xml
```
