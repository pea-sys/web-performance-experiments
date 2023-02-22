# ~~srcset 属性~~Picture 要素による画像切替

srcset 属性による画像切替を試してみます。  
ブラウザのサイズによって、ダウンロードするリソースを切替可能で、
ダウンロードコンテンツの最適化が可能です。  
ただし、この属性は試した結果 ,PC の Chrome では機能せず、FireFox で機能することが確認できました。ネット情報によると PC の Safari では機能せず,iPhone の Safari では機能するらしい。

```html
<!--FireFoxでしか画像切替が効かない-->
<img
  srcset="images/sample_150x100.jpg 150w, images/sample_300x200.jpg 300w, images/sample_600x400.jpg 600w, images/sample_1000x667.jpg 1000w"
  sizes="(max-width: 150px) 150px,
             (max-width: 300px) 300px,
             (max-width: 600px) 600px,
             1000px"
  src="images/sample_1000x667.jpg"
  alt="utsukushigahara"
/>
```

今は picture 要素が主流らしいです・Chrome でも問題なく動作確認できました。

```html
<picture>
  <source media="(max-width: 150px)" srcset="images/sample_150x100.jpg" />
  <source media="(max-width: 300px)" srcset="images/sample_300x200.jpg" />
  <source media="(max-width: 600px)" srcset="images/sample_600x400.jpg" />
  <img src="images/sample_1000x667.jpg" alt="utsukushigahara" />
</picture>
```
