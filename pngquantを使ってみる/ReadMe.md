# pngquant を使ってみる

pngquant は非可逆圧縮用のコマンドライン ユーティリティおよびライブラリです。

- https://pngquant.org/
- https://github.com/kornelski/pngquant  
  ライセンス：GPL3.0(社内利用なら問題なし)

以下でいくつか動作確認をしていますが、結論としては

- lossless で最適化するのであれば、zopfli のみ使用
- loss ありで最適化するのであれば、pngquant→zopfli の順で使用  
  ※zopfli と同様 apng を壊すので、pngqunat に渡さないように気を付ける必要あり

---

まずは、コマンドパラメータを確認します。

```
pngquant.exe
pngquant, 2.17.0 (September 2021) (Rust), by Kornel Lesinski, Greg Roelofs.

usage:  pngquant [options] [ncolors] -- pngfile [pngfile ...]
        pngquant [options] [ncolors] - >stdout <stdin

options:
  --force           overwrite existing output files (synonym: -f)
  --skip-if-larger  only save converted files if they're smaller than original
  --output file     destination file path to use instead of --ext (synonym: -o)
  --ext new.png     set custom suffix/extension for output filenames
  --quality min-max don't save below min, use fewer colors below max (0-100)
  --speed N         speed/quality trade-off. 1=slow, 4=default, 11=fast & rough
  --nofs            disable Floyd-Steinberg dithering
  --posterize N     output lower-precision color (e.g. for ARGB4444 output)
  --strip           remove optional metadata (default on Mac)
  --verbose         print status messages (synonym: -v)

Quantizes one or more 32-bit RGBA PNGs to 8-bit (or smaller) RGBA-palette.
The output filename is the same as the input name except that
it ends in "-fs8.png", "-or8.png" or your custom extension (unless the
input is stdin, in which case the quantized image will go to stdout).
If you pass the special output path "-" and a single input file, that file
will be processed and the quantized image will go to stdout.
The default behavior if the output file exists is to skip the conversion;
use --force to overwrite. See man page for full list of options.
```

新しめのバージョンは Rust 製のようです。  
Help を見る限りでは、lossless で減色したい場合、以下で良さそうです。

```
pngquant.exe  --speed 1  --verbose  --ext .png --force <targetfile>
```

ただし、これだと zopfli で実行するだけのものと差異がほとんど発生しないため、
不可逆である程度の品質を保ちたい場合、以下のようにすると良いでしょう。

```
pngquant.exe  --speed 1  --verbose  --quality 85-100 --ext .png --force <targetfile>
```

まだ、検証段階なので--force --ext .png は指定しません。  
<targetfile>は./\*.png みたいにディレクトリも対象にできます。  
早速実験してみます。

| 対象画像 | 減色前(KB) | 減色後(KB) | 減色+Zopfli 後(KB) |
| -------- | ---------- | ---------- | ------------------ |
| 8bit     | 1.58       | 1.58       | 1.52               |
| 16bit    | 17.8       | 13.4       | 11.5               |
| 24bit    | 4.17       | 105        | 94.1               |

※本測定結果より後述の測定結果の方が参考になりそうです

- 8bit(256 色)

![8bit-color](https://user-images.githubusercontent.com/49807271/210291534-ef0e421c-c509-481f-993f-431e84dbabde.png)

```
pngquant.exe --speed 1 --verbose C:\Users\user\source\repos\pngquantを使ってみる\8bit-color.png
C:\Users\user\source\repos\pngquantを使ってみる\8bit-color.png:
  read 2KB file
  made histogram...256 colors found
  eliminated opaque tRNS-chunk entries...0 entries transparent
  mapped image to new colors...MSE=0.000 (Q=100)
  writing 256-color image as C:\Users\user\source\repos\pngquantを使ってみる\8bit-color-fs8.png
Quantized 1 image.
```

- 16bit(65536 色)  
  ![16bit-color](https://user-images.githubusercontent.com/49807271/210291551-0129b521-9a74-49ac-b745-86f5b2226ba5.png)

```
pngquant.exe --speed 1 --verbose C:\Users\user\source\repos\pngquantを使ってみる\16bit-color.png
C:\Users\user\source\repos\pngquantを使ってみる\16bit-color.png:
  read 18KB file
  used gAMA and cHRM chunks to transform image to sRGB colorspace
  made histogram...6129 colors found
  selecting colors...2%
  selecting colors...19%
  selecting colors...38%
  selecting colors...61%
  selecting colors...86%
  selecting colors...100%
  moving colormap towards local minimum
  eliminated opaque tRNS-chunk entries...0 entries transparent
  mapped image to new colors...MSE=16.304 (Q=52)
  writing 256-color image as C:\Users\user\source\repos\pngquantを使ってみる\16bit-color-fs8.png
Quantized 1 image.
```

- 24bit(1,677 万色)

![24bit-color](https://user-images.githubusercontent.com/49807271/210291595-6740f43e-b9e6-4db6-9a5f-fb9e6005b902.png)

```
pngquant.exe --speed 1 --verbose C:\Users\user\source\repos\pngquantを使ってみる\24bit-color.png
C:\Users\user\source\repos\pngquantを使ってみる\24bit-color.png:
  read 5KB file
  used gAMA and cHRM chunks to transform image to sRGB colorspace
  made histogram...353953 colors found
  selecting colors...6%
  selecting colors...43%
  selecting colors...87%
  selecting colors...100%
  moving colormap towards local minimum
  eliminated opaque tRNS-chunk entries...0 entries transparent
  mapped image to new colors...MSE=68.442 (Q=4)
  writing 256-color image as C:\Users\user\source\repos\pngquantを使ってみる\24bit-color-fs8.png
  copied 1KB of additional PNG metadata
Quantized 1 image.
```

1pixcel 毎に異なる色が割り当てられているパレットでは png の圧縮効果も薄く、オリジナル画像の最適化には勝てませんでした。  
次にパレットではなく、ある程度 同色 pixcel が固まっている一般的な画像を対象にテストしてみます。

| 対象画像       | 減色前(KB) | Zopfli のみ(KB) | 減色のみ(KB) | 減色+Zopfli 後(KB) |
| -------------- | ---------- | --------------- | ------------ | ------------------ |
| 32bit          | 222        | 213             | 61.7         | 57.4               |
| 24bit          | 97.9       | 97.9            | 39.4         | 36.5               |
| 8bit(透過あり) | 5.66       | 3.99            | 4.35         | 3.99               |

[32bit]  
![globe-scene-fish-bowl-pngcrush](https://user-images.githubusercontent.com/49807271/210296821-05aecadd-d842-49c8-9c90-7afd1d4035ce.png)

※この素敵な画像は、Diana Todd が Paint Shop Pro を含むさまざまな 2D および 3D ツールを使用して作成しました

```
pngquant.exe --speed 1  --verbose C:\Users\user\source\repos\pngquantを使ってみる\globe-scene-fish-bowl-pngcrush.png
C:\Users\user\source\repos\pngquantを使ってみる\globe-scene-fish-bowl-pngcrush.png:
  libpng warning: cHRM: invalid chromaticities
  read 223KB file
  made histogram...62811 colors found
  selecting colors...4%
  selecting colors...33%
  selecting colors...66%
  selecting colors...100%
  moving colormap towards local minimum
  eliminated opaque tRNS-chunk entries...198 entries transparent
  mapped image to new colors...MSE=7.114 (Q=76)
  writing 256-color image as C:\Users\user\source\repos\pngquantを使ってみる\globe-scene-fish-bowl-pngcrush-fs8.png
Quantized 1 image.
```

[24bit]  
![24_bit](https://user-images.githubusercontent.com/49807271/210301963-fc865d55-c8ee-4c13-a6e0-002652c81e68.png)

```
pngquant.exe --speed 1 --verbose C:\Users\user\source\repos\pngquantを使ってみる\24_bit.png
C:\Users\user\source\repos\pngquantを使ってみる\24_bit.png:
  read 98KB file
  made histogram...57368 colors found
  selecting colors...4%
  selecting colors...33%
  selecting colors...66%
  selecting colors...100%
  moving colormap towards local minimum
  eliminated opaque tRNS-chunk entries...0 entries transparent
  mapped image to new colors...MSE=5.917 (Q=80)
  writing 256-color image as C:\Users\user\source\repos\pngquantを使ってみる\24_bit-fs8.png
Quantized 1 image.
```

[8bit(透過あり)]  
![pengbrew_160x160](https://user-images.githubusercontent.com/49807271/210299944-25293dca-d36f-4e31-aedd-5c2ae786f827.png)

```
pngquant.exe --speed 1 --verbose C:\Users\user\source\repos\pngquantを使ってみる\black817-480x360-3.5.png
C:\Users\user\source\repos\pngquantを使ってみる\black817-480x360-3.5.png:
  read 180KB file
  made histogram...57799 colors found
  selecting colors...4%
  selecting colors...33%
  selecting colors...66%
  selecting colors...100%
  moving colormap towards local minimum
  eliminated opaque tRNS-chunk entries...226 entries transparent
  mapped image to new colors...MSE=20.617 (Q=42)
  writing 256-color image as C:\Users\user\source\repos\pngquantを使ってみる\black817-480x360-3.5-fs8.png
Quantized 1 image.
```

余談：  
MSPaint で png を編集するとビット深度が自動的に変更されるので注意。8bit 画像を編集して保存すると 24bit になります・
