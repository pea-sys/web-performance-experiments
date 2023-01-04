# zopfli(ツオップリ) を使ってみる

zopfli は OSS の圧縮ライブラリです。  
deflate(可逆圧縮)であることが特徴で、png や zip 形式のデータを、loss less で更に圧縮することが可能です。
圧縮パラメータを探索して、効率的な圧縮パラメータを決める仕組みのようです。機械学習に応用できそうです。

[手順]

- 1.次のページのリリースからバイナリをダウンロード  
  https://github.com/garyzyg/zopfli-windows/releases

* 2.解凍すると、次のファイルが展開されます

  - zopflipng.exe
  - zopfli.exe

* 3.試しに zopflipng を実行してみます。  
  出力ファイル名や圧縮試行回数,8bit 圧縮などのパラメータがあります。

```
C:\Users\user\Downloads\zopflipng.exe
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
```

- 4.試しに zopflipng で圧縮します。

```
C:\Users\user>C:\Users\user\Downloads\zopflipng.exe --iterations=10 C:\Users\user\Downloads\cat.png C:\Users\user\Downloads\cat_zopfli.png
Optimizing C:\Users\user\Downloads\cat.png
Input size: 38216 (37K)
Result size: 26243 (25K). Percentage of original: 68.670%
Result is smaller
```

データを保ったまま、30%減となり、思いのほか圧縮できました。

- 5.次は zopfli で gzip 等も圧縮できます。  
  ここではヘルプを見るだけで終わりにします。

```
C:\Users\user\Downloads\zopfli.exe -h
Usage: zopfli [OPTION]... FILE...
  -h    gives this help
  -c    write the result on standard output, instead of disk filename + '.gz'
  -v    verbose mode
  --i#  perform # iterations (default 15). More gives more compression but is slower. Examples: --i10, --i50, --i1000
  --gzip        output to gzip format (default)
  --zlib        output to zlib format instead of gzip
  --deflate     output to deflate format instead of gzip
  --splitlast   ignored, left for backwards compatibility
```
