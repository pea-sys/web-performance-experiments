# JS & CSS Minifier

VSCode の JS & CSS Minifier を試します。
JS & CSS Minifier は、名前の通り、JavaScript と CSS の軽量化を行う。
軽量化は Minify と呼ばれ、Minify したファイルは、ファイル名に min が付加されることが多いです。  
HTML は Minify できません(する必要性がないことの方が多い)

- 1.VSCode の拡張機能で JS & CSS Minifier をダウンロードします。

![1](https://user-images.githubusercontent.com/49807271/194815576-cd092d18-1cb3-4338-a0a5-7671342d1c1c.png)

- 2.VSCode で css や javascript を開き、画面左下の Minify ボタンを押下  
  ![2](https://user-images.githubusercontent.com/49807271/194816449-0d7e08d6-926a-4fcb-8d18-918543352f78.png)

- 3.Minify の結果がコンソール出力されます。

```
[sample.css]: OK - 31.64% smaller
	[Warnings]: 1
		- Invalid character(s) 'Inc.
Footer navigation
Terms
Privacy
' at ../../../../source/repos/web-performance-experiments/JS-CSS-Minifier/sample.css:56:15. Ignoring.
[sample.js]: OK - 60.01% smaller
```

sample.css を Minify すると、sample.min.css  
sample.js を Minify すると、sample.min.js  
といった形でファイルが生成されます。
