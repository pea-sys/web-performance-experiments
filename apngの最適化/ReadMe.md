# アニメーション PNG の最適化

基本的にアニメーションファイルは webp や gif より png の方がサイズが小さいようなので、アニメーション png そのものを圧縮するケースと、アニメーション gif を アニメーション png に変換する際に圧縮するケースを試してみます。  
[参考]  
[GIF vs APNG vs WebP](http://littlesvr.ca/apng/gif_apng_webp.html)

## ■1. GIF ファイルが既にある場合

[ツール格納場所]  
https://gif2apng.sourceforge.net/  
ライセンスは zlib です。

[ヘルプ確認]

```
gif2apng.exe

gif2apng 1.9

Usage: gif2apng [options] anim.gif [anim.png]

-z0  : zlib compression
-z1  : 7zip compression (default)
-z2  : zopfli compression
-i## : number of iterations, default -i15
-kp  : keep the palette
```

[対象 gif]

※対象 gif は全て gifsicle の O2 オプションで最適化済み

- Sample1

![animated-frog-image-0015](https://user-images.githubusercontent.com/49807271/210549813-0bbd1040-28f7-41ff-9bf3-0d3ffd064ca6.gif)

- Sample2

![6071f379722289 5ccbece45c3d0](https://user-images.githubusercontent.com/49807271/210552378-5f57d670-deb4-468e-b67e-ade03a1c7ee8.gif)

- Sample3  
  ![Wikipedia_construction_puzzle_3D](https://user-images.githubusercontent.com/49807271/210551108-feec9858-a908-4942-8a1c-824713bfe4dd.gif)

[測定結果]

| Target  | Original(KB) | NoOption | z0   | z1   | z2   | kp   |
| ------- | ------------ | -------- | ---- | ---- | ---- | ---- |
| Sample1 | 10.9         | 9.31     | 10.3 | 9.31 | 9.16 | 9.66 |
| Sample2 | 56.3         | 6.73     | 6.73 | 6.73 | 6.47 | 7.5  |
| Sample3 | 139          | 84.7     | 89.9 | 84.7 | 84.3 | 90.5 |

## ■2. APNG ファイルが既にある場合

apngopt が使えます。  
apngopt は アニメーションピング の最適化ツールです。
最初は同ページの APNG Assembler を使おうと思いましたが、インターフェースが分かりづらいので止めました。  
ツールはこちらから入手可能です。  
https://apngasm.sourceforge.net/  
ライセンスは zlib です。  
apng が既にある場合はこちらで最適化可能ですが、
今回は gif2apng.exe である程度最適化したファイルに対して実験したので旨味は少なかったです。

[ヘルプ確認]

```
apngopt.exe

APNG Optimizer 1.4

Usage: apngopt [options] anim.png [anim_opt.png]

-z0  : zlib compression
-z1  : 7zip compression (default)
-z2  : zopfli compression
-i## : number of iterations, default -i15
```

※ちなみに z3 は z0 と同じ動きになりました。

[測定結果]

| Target  | Original(KB) | NoOption | z0   | z1   | z2   |
| ------- | ------------ | -------- | ---- | ---- | ---- |
| Sample1 | 10.3         | 9.27     | 10.2 | 9.27 | 9.13 |
| Sample2 | 6.73         | 6.5      | 7.14 | 6.5  | 6.23 |
| Sample3 | 90.5         | 91.4     | 97.2 | 91.4 | 90.9 |
