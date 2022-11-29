# Gifsicle を使ってみる

Gifsicle は Gif アニメーションで連続するフレームで変化しないピクセル部分を削除して容量を削減できます。  
ライセンスは GPL2.0 です。  
Gifsickle は gif 最適化だけでなく、gif アニメーションの作成や編集に必要なほぼすべての機能を備えています。

[手順]

- 1.公式サイトからプログラムをダウンロード  
  gif 最適化ツールの gifsicle と、gif 比較ツールの gifdiff とそれらのドキュメントが同梱されています。  
   http://www.lcdf.org/gifsicle/

- 2.適当にサイズ削減する gif を入手  
  https://maplab-icon.com/blog-entry-722.html

* 3.gitsicle のヘルプ確認  
  最適化する場合は-O3 オプションを使えば良さそうです。  
  レベルについての説明はないのでドキュメントを見る必要があります。

> -O1・・・各画像の変更部分のみを保存します。これがデフォルトです。  
> -O2
> また、透明度を使用してファイルをさらに縮小します。  
> -O3
> いくつかの最適化方法を試してください (通常は遅くなりますが、より良い結果になることもあります)。

```
gifsicle.exe --help
'Gifsicle' manipulates GIF images. Its most common uses include combining
single images into animations, adding transparency, optimizing animations for
space, and printing information about GIFs.

Usage: gifsicle.exe [OPTION | FILE | FRAME]...

Mode options: at most one, before any filenames.
  -m, --merge                   Merge mode: combine inputs, write stdout.
  -b, --batch                   Batch mode: modify inputs, write back to
                                same filenames.
  -e, --explode                 Explode mode: write N files for each input,
                                one per frame, to 'input.frame-number'.
  -E, --explode-by-name         Explode mode, but write 'input.name'.

General options: Also --no-OPTION for info and verbose.
  -I, --info                    Print info about input GIFs. Two -I's means
                                normal output is not suppressed.
      --color-info, --cinfo     --info plus colormap details.
      --extension-info, --xinfo --info plus extension details.
      --size-info, --sinfo      --info plus compression information.
  -V, --verbose                 Prints progress information.
  -h, --help                    Print this message and exit.
      --version                 Print version number and exit.
  -o, --output FILE             Write output to FILE.
  -w, --no-warnings             Don't report warnings.
      --no-ignore-errors        Quit on very erroneous input GIFs.
      --conserve-memory         Conserve memory at the expense of speed.
      --multifile               Support concatenated GIF files.

Frame selections:               #num, #num1-num2, #num1-, #name

Frame change options:
  --delete FRAMES               Delete FRAMES from input.
  --insert-before FRAME GIFS    Insert GIFS before FRAMES in input.
  --append GIFS                 Append GIFS to input.
  --replace FRAMES GIFS         Replace FRAMES with GIFS in input.
  --done                        Done with frame changes.

Image options: Also --no-OPTION and --same-OPTION.
  -B, --background COL          Make COL the background color.
      --crop X,Y+WxH, --crop X,Y-X2,Y2
                                Crop the image.
      --crop-transparency       Crop transparent borders off the image.
      --flip-horizontal, --flip-vertical
                                Flip the image.
  -i, --interlace               Turn on interlacing.
  -S, --logical-screen WxH      Set logical screen to WxH.
  -p, --position X,Y            Set frame position to (X,Y).
      --rotate-90, --rotate-180, --rotate-270, --no-rotate
                                Rotate the image.
  -t, --transparent COL         Make COL transparent.

Extension options:
      --app-extension N D       Add an app extension named N with data D.
  -c, --comment TEXT            Add a comment before the next frame.
      --extension N D           Add an extension number N with data D.
  -n, --name TEXT               Set next frame's name.
      --no-comments, --no-names, --no-extensions
                                Remove comments (names, extensions) from input.
Animation options: Also --no-OPTION and --same-OPTION.
  -d, --delay TIME              Set frame delay to TIME (in 1/100sec).
  -D, --disposal METHOD         Set frame disposal to METHOD.
  -l, --loopcount[=N]           Set loop extension to N (default forever).
  -O, --optimize[=LEVEL]        Optimize output GIFs.
  -U, --unoptimize              Unoptimize input GIFs.
  -j, --threads[=THREADS]       Use multiple threads to improve speed.

Whole-GIF options: Also --no-OPTION.
      --careful                 Write larger GIFs that avoid bugs in other
                                programs.
      --change-color COL1 COL2  Change COL1 to COL2 throughout.
  -k, --colors N                Reduce the number of colors to N.
      --color-method METHOD     Set method for choosing reduced colors.
  -f, --dither                  Dither image after changing colormap.
      --gamma G                 Set gamma for color reduction [2.2].
      --lossy[=LOSSINESS]       Alter image colors to shrink output file size
                                at the cost of artifacts and noise.
      --resize WxH              Resize the output GIF to WxH.
      --resize-width W          Resize to width W and proportional height.
      --resize-height H         Resize to height H and proportional width.
      --resize-fit WxH          Resize if necessary to fit within WxH.
      --scale XFACTOR[xYFACTOR] Scale the output GIF by XFACTORxYFACTOR.
      --resize-method METHOD    Set resizing method.
      --resize-colors N         Resize can add new colors up to N.
      --transform-colormap CMD  Transform each output colormap by shell CMD.
      --use-colormap CMAP       Set output GIF's colormap to CMAP, which can
                                be 'web', 'gray', 'bw', or a GIF file.
```

- 3.gitsicle で最適化します  
  サイズは 120KB から 103KB に減少しています。

```
gifsicle.exe -O2 snow-man-animated-1.gif > snow-man-animated-2.gif
```

今回の gif 画像はレベル 2 とレベル 3 でサイズに差はありませんでした。

```
gifsicle.exe -O3 snow-man-animated-1.gif > snow-man-animated-3.gif
```

- 4.gifdiff のヘルプ確認  
  バイナリでの比較ではなく、外観での比較になります。

```
gifdiff.exe --help
'Gifdiff' compares two GIF files (either images or animations) for identical
visual appearance. An animation and an optimized version of the same animation
should compare as the same. Gifdiff exits with status 0 if the images are
the same, 1 if they're different, and 2 if there was some error.

Usage: gifdiff.exe [OPTION]... FILE1 FILE2

Options:
  -q, --brief                   Don't report detailed differences.
  -w, --ignore-redundancy       Ignore differences in redundant frames.
  -B, --ignore-background       Ignore differences in background colors.
  -h, --help                    Print this message and exit.
  -v, --version                 Print version number and exit.
```

- 4.結果を比較します  
  何も出力がない場合は一致しています

```
gifdiff.exe -q snow-man-animated-1.gif snow-man-animated-2.gif
```

- 5.ちなみに一致していない場合は次のような出力になります

```
gifdiff.exe -q snow-man-animated-1.gif Santa-Claus-animated-1.gif
GIF files snow-man-animated-1.gif and Santa-Claus-animated-1.gif differ

```
