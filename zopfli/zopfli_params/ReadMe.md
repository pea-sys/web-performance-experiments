# Zopfli のパラメータ確認

いつも Zopfli を使う際は何もオプションを指定せずに最適化を行って良しとしていたが、パラメータをキチンとセットすれば、もっと最適化できるかざっくり確認してみました。

確認した結果、損失なしで最適化したいのであれば、デフォルトパラメータで問題なし。

全部は確認していません。ツールのデフォルト動作の傾向を掴んで、デフォルトより、よりよいパラメータが選択できる場合はあれば掘り進めていく。  
※プログラムを読めば確実だけど、その根気と技量に自信なし

今回は以下のパラメータを確認

- --lossy_transparent
- --lossy_8bit

改めて、パラメータチェック

```
zopflipng.exe
ZopfliPNG, a Portable Network Graphics (PNG) image optimizer.

Usage: zopflipng [options]... infile.png outfile.png
       zopflipng [options]... --prefix=[fileprefix] [files.png]...

If the output file exists, it is considered a result from a previous run and not overwritten if its filesize is smaller.

Options:
-m: compress more: use more iterations (depending on file size)
--prefix=[fileprefix]: Adds a prefix to output filenames. May also contain a directory path. When using a prefix, multiple input files can be given and the output filenames are generated with the prefix
 If --prefix is specified without value, 'zopfli_' is used.
 If input file names contain the prefix, they are not processed but considered as output from previous runs. This is handy when using *.png wildcard expansion with multiple runs.
-y: do not ask about overwriting files.
--lossy_transparent: remove colors behind alpha channel 0. No visual difference, removes hidden information.
--lossy_8bit: convert 16-bit per channel image to 8-bit per channel.
-d: dry run: don't save any files, just see the console output (e.g. for benchmarking)
--always_zopflify: always output the image encoded by Zopfli, even if it's bigger than the original, for benchmarking the algorithm. Not good for real optimization.
-q: use quick, but not very good, compression (e.g. for only trying the PNG filter and color types)
--iterations=[number]: number of iterations, more iterations makes it slower but provides slightly better compression. Default: 15 for small files, 5 for large files.
--splitting=[0-3]: ignored, left for backwards compatibility
--filters=[types]: filter strategies to try:
 0-4: give all scanlines PNG filter type 0-4
 m: minimum sum
 e: entropy
 p: predefined (keep from input, this likely overlaps another strategy)
 b: brute force (experimental)
 By default, if this argument is not given, one that is most likely the best for this image is chosen by trying faster compression with each type.
 If this argument is used, all given filter types are tried with slow compression and the best result retained. A good set of filters to try is --filters=0me.
--keepchunks=nAME,nAME,...: keep metadata chunks with these names that would normally be removed, e.g. tEXt,zTXt,iTXt,gAMA, ...
 Due to adding extra data, this increases the result size. Keeping bKGD or sBIT chunks may cause additional worse compression due to forcing a certain color type, it is advised to not keep these for web images because web browsers do not use these chunks. By default ZopfliPNG only keeps (and losslessly modifies) the following chunks because they are essential: IHDR, PLTE, tRNS, IDAT and IEND.

```

■ 圧縮率  
※対象画像は本ファイルと同じ階層にあります  
| 対象画像 | デフォルト | lossy_transparent | lossy-8bit |
| -------- | ---------- | ----------------- | ---------- |
| モノクロ | 5.041% | 5.041% | 5.041% |
| カラフル(透過あり) | 88.697% | 90.466% | 88.697% |

■ ログ

- モノクロ

```
zopflipng.exe monocolor.png monocolor_simple.png
Optimizing monocolor.png
Input size: 8392 (8K)
Result size: 423 (0K). Percentage of original: 5.041%
Result is smaller


zopflipng.exe --lossy_transparent monocolor.png monocolor_transparent.png
Optimizing monocolor.png
Input size: 8392 (8K)
Result size: 423 (0K). Percentage of original: 5.041%
Result is smaller


zopflipng.exe --lossy_8bit monocolor.png monocolor_8bit.png
Optimizing monocolor.png
Input size: 8392 (8K)
Result size: 423 (0K). Percentage of original: 5.041%
Result is smaller
```

- カラフル(透過あり)

```
zopflipng.exe transpanrent.png transpanrent_simple.png
Optimizing ranspanrent.png
Input size: 20569 (20K)
Result size: 18244 (17K). Percentage of original: 88.697%
Result is smaller

zopflipng.exe --lossy_8bit transpanrent.png transpanrent_8bit.png
Optimizing Ctranspanrent.png
Input size: 20569 (20K)
Result size: 18244 (17K). Percentage of original: 88.697%
Result is smaller


zopflipng.exe --lossy_transparent transpanrent.png transpanrent_transparent.png
Optimizing transpanrent.png
Input size: 20569 (20K)
Result size: 18608 (18K). Percentage of original: 90.466%
Result is smaller
``
```
