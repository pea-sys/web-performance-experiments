# prerender を試す

link 先ページを事前に読込み、高速表示にします。  
事前読込みをしても、リンク先にアクセスしてもらわないと、無駄なリソース読込みになるので
事前読込みリンクのヒット率が高い場合に限り、使用することが推奨されています。  
ChromeDevTool が開いていると動作しません。

```html
<link rel="prerender" href="//example.com/next-page.html" />
```

※今回は動作確認に httpvshttps を使用させていただいています。

- 1.prerender なし  
  ![www httpvshttps com_](https://user-images.githubusercontent.com/49807271/212058705-01f10ca5-38cc-4b2b-9747-b0787e9f4460.png)

- 2.prerender あり  
  ![www httpvshttps com_ (1)](https://user-images.githubusercontent.com/49807271/212058709-abd7da47-c908-43f0-9acb-55971d1a3740.png)
