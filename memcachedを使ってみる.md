# memcached

Memcached は、高性能な分散メモリオブジェクトキャッシュシステムです。キャッシュはオンメモリにのみ保持されるので、memcached を再起動すると、キャッシュは消えます。  
データベースへの問い合わせ結果をキャッシュすることで、データベースへのアクセス回数を減らしたり、高速化のために利用されています。
マルチスレッドで動くのでスケーリングしやすいです。

[参考]

- [memcached の仕組みと新機能](https://atmarkit.itmedia.co.jp/ait/articles/0807/30/news124_2.html)

* [redis と memcached の違い](https://yakst.com/ja/posts/3243)

[手順]

- 1.memchached は現時点では公式に Windows でサポートはされていませんが、OSS なので windows 用のバイナリは別途入手可能です。  
   次の URL から「memcached-x.x.x-win64-mingw.zip」をダウンロードします。

  https://github.com/jefyt/memcached-windows/releases

  - 2.解凍ファイルを好みのディレクトリに配置します。
  - 3.memcached をインストール

  ```
  memcached.exe -d install
  ```

  - 4.memcaced を起動

  ```
  memcached.exe -d start
  ```

  - 5.telnet で接続(default port は 11211)  
    ※Windows10 の場合、telnet クライアントを有効化する必要あり

  ```
  telnet 127.0.0.1 11211
  ```

* 6.telnet クライアントで stat と入力

```
STAT pid 2448
STAT uptime 238
STAT time 1665890051
STAT version 1.6.8
STAT libevent 2.1.12-stable
STAT pointer_size 64
STAT rusage_user 0.000000
STAT rusage_system 0.156250
STAT max_connections 1024
STAT curr_connections 2
STAT total_connections 3
STAT rejected_connections 0
STAT connection_structures 3
STAT response_obj_oom 0
STAT response_obj_count 1
STAT response_obj_bytes 16384
STAT read_buf_count 2
STAT read_buf_bytes 32768
STAT read_buf_bytes_free 0
STAT read_buf_oom 0
STAT reserved_fds 20
STAT cmd_get 0
STAT cmd_set 0
STAT cmd_flush 0
STAT cmd_touch 0
STAT cmd_meta 0
STAT get_hits 0
STAT get_misses 0
STAT get_expired 0
STAT get_flushed 0
STAT delete_misses 0
STAT delete_hits 0
STAT incr_misses 0
STAT incr_hits 0
STAT decr_misses 0
STAT decr_hits 0
STAT cas_misses 0
STAT cas_hits 0
STAT cas_badval 0
STAT touch_hits 0
STAT touch_misses 0
STAT auth_cmds 0
STAT auth_errors 0
STAT bytes_read 7
STAT bytes_written 0
STAT limit_maxbytes 67108864
STAT accepting_conns 1
STAT listen_disabled_num 0
STAT time_in_listen_disabled_us 0
STAT threads 4
STAT conn_yields 0
STAT hash_power_level 16
STAT hash_bytes 524288
STAT hash_is_expanding 0
STAT slab_reassign_rescues 0
STAT slab_reassign_chunk_rescues 0
STAT slab_reassign_evictions_nomem 0
STAT slab_reassign_inline_reclaim 0
STAT slab_reassign_busy_items 0
STAT slab_reassign_busy_deletes 0
STAT slab_reassign_running 0
STAT slabs_moved 0
STAT lru_crawler_running 0
STAT lru_crawler_starts 765
STAT lru_maintainer_juggles 285
STAT malloc_fails 0
STAT log_worker_dropped 0
STAT log_worker_written 0
STAT log_watcher_skipped 0
STAT log_watcher_sent 0
STAT bytes 0
STAT curr_items 0
STAT total_items 0
STAT slab_global_page_pool 0
STAT expired_unfetched 0
STAT evicted_unfetched 0
STAT evicted_active 0
STAT evictions 0
STAT reclaimed 0
STAT crawler_reclaimed 0
STAT crawler_items_checked 0
STAT lrutail_reflocked 0
STAT moves_to_cold 0
STAT moves_to_warm 0
STAT moves_within_lru 0
STAT direct_reclaims 0
STAT lru_bumps_dropped 0
END
```

- 7.各種コマンド動作を確認します。

  - 構文(set,add,replace,append,prepend)

  ```
  <コマンド> <key> <flags> <exptime> <bytes>
  <data>
  ```

  - 構文(get,delete)

  ```
  <コマンド> <key>
  ```

  ***

### [パラメータ]

key・・・データの保存場所を表すキー  
 flags・・・アプリケーション固有の 32bit の値  
 exptime・・・キャッシュの有効秒数(0 は期限なし)  
 bytes・・・格納データのバイト数  
 data・・・格納する値

---

set・・・指定したキーのデータを登録する。既にキーがある場合は更新する。

```
set key 0 600 5
value
STORED
```

get・・・指定したキーのデータを取得

```
get key
VALUE key 0 5
value
END
```

少し時間をおいて実行したら消えていました

```
get key
ERROR
```

add・・・指定キーがなければデータを追加する。ある場合は失敗する。

```
add key 0 600 5
value
STORED
```

replace・・・指定キーがあれば更新する。ない場合は失敗する。

```
replace key 0 600 7
replace
STORED

get key
VALUE key 0 7
replace
END
```

append・・・指定キーがあれば値の後ろにデータを追記する  
prepend・・・指定キーがあれば値の前にデータを追記する

```
append key 0 600 1
+
STORED
prepend key 00 600 1
-
STORED
get key
VALUE key 0 9
-replace+
END
```

delete・・・指定キーがあれば削除する

```
delete key
DELETED
get key
END
```

inct・・・指定キーがあれば値を加算する  
decr・・・指定キーがあれば値を減算する

```
set year 0 0 4
2022
STORED
incr year 5
2027
decr year 3
2024
```

flush_all・・・全てのキャッシュの利用期限を越えたことにして、アクセス不可にします。メモリは解放されません。

```
flush_all
OK
```

quit・・・サーバーとの接続を切断します

```
quit


ホストとの接続が切断されました。
```

これ以外にも cas という利用価値が高そうなコマンドもありましたが、  
クライアントを複数起動するのが億劫になったため省略しています。

公式非推奨ですが、NoReply モードなるものも用意されています。
パフォーマンスを何がなんでも改善したい場合のモノだと思いますが、
memcached で NoReply を使わないといけない状況は、実際ほぼ皆無かと思います。
