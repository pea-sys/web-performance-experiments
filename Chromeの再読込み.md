# Chrome の再読込み

Chrome ブラウザにてデベロッパーツールを起動した状態で更新ボタンを左クリックで長押しすると、ページの再読込みが 3 パターンあることが分かります。
![1](https://user-images.githubusercontent.com/49807271/188315503-c275b4e0-c167-4b05-9437-fb6241b6947e.jpg)

- 1.通常の再読込み  
  キャッシュを維持してまま、ページを再読込みします。  
  F5 でも可。  
  JavaScript だと次の関数を実行すればいい。

```js
location.reload();
```

- 2.ハード再読込み(スーパーリロード)  
  表示しているページから直接参照しているコンテンツやスクリプトのキャッシュを消去して、ページを再読込みします。  
  例えば、GoogleAdsence とか広告系のキャッシュは生きたまま。  
  Ctrl+F5 でも可。  
  JavaScript からスーパーリロードは出来ない(※2)。

- 3.キャッシュの消去とハード再読込み
  最初にキャッシュが空になり、次にすべてが再ダウンロードされます。  
  ページを完全にリロードしたい場合に使用します。

※1 ちなみに FireFox と Edge でも、同様の操作が可能。  
　 Chromium ベースじゃない Edge だと出来ない。

※2 FireFox だけ javascript でスーパーリロード可能

```js
/*FireFoxのみ*/
location.reload(true);
```

[参考](https://www.thewindowsclub.com/empty-cache-hard-reload-chrome)
