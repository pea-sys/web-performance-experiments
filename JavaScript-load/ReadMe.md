# JavaScript のロードパターン

whatwg に分かりやすい図があるので抜粋します。
![html spec whatwg org_multipage_scripting html (2)](https://user-images.githubusercontent.com/49807271/196290968-e1503b24-bcc1-483e-982d-9a184a26ee7f.png)

※今回は module 抜きで、上 3 つを WepPageTest で計測して、実態を確認します。

試した感想としては、基本的には body タグの最後に script タグ を置くのがベストプラクティスということになりそう。  
defer を書かないことで HTML も軽量化できる。

## ■default

- HTML

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
```

- ウォーターフォール

jquery のロード時にレンダリングブロックしているため × マークが確認できます。
![default_waterfall](https://user-images.githubusercontent.com/49807271/196442698-378742c2-df5b-4ef1-89ae-593cd688ff96.png)

- メトリクス

![default_,metrix](https://user-images.githubusercontent.com/49807271/196459068-cdc66e62-64e6-4cdc-81b1-619b884ccaa2.png)

## ■async

- HTML

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js" async></script>
```

- ウォーターフォール  
  レンダリングブロックが解消されています。

![async_waterfall](https://user-images.githubusercontent.com/49807271/196442691-cf0941f6-af7a-4a0d-ba35-269425b7fd31.png)

- メトリクス

![async_metrix](https://user-images.githubusercontent.com/49807271/196458102-fe95e734-180d-4589-9696-af59a3b94ea9.png)

## ■defer

- HTML

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js" defer></script>
```

- ウォーターフォール  
  レンダリングブロックが解消されています。

![defer_waterfall](https://user-images.githubusercontent.com/49807271/196442700-56835ffa-ebe0-4147-b18c-311e80c4524b.png)

- メトリクス

![defer_metrix](https://user-images.githubusercontent.com/49807271/196459851-6daf54de-9851-4942-b24e-ee94a9e6478d.png)

## ■default(script タグを Body 末尾に移動)

- ウォーターフォール  
  レンダリングブロックが解消されています。

![last_default](https://user-images.githubusercontent.com/49807271/196464150-852ed09a-4b86-49f7-a4a5-062a9a58c08d.png)

- メトリクス

![last_default_matrix](https://user-images.githubusercontent.com/49807271/196464717-45a6b3a3-d6f7-450e-92f0-43664bd36847.png)
