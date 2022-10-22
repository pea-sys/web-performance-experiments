# Redis

ネットワーク接続された永続化可能なインメモリデータベース。  
memcached と異なり、シングルスレッドで動作するので、スケーリングしにくいですが、レプリケーションやスナップショットなどの機能を備えています。  
windows の公式サポートはされていません。

[参考]  
[Windows に Redis をインストールする](https://redis.io/docs/getting-started/installation/install-redis-on-windows/)

[手順]

- 1.Windows ターミナルから Ubuntu を起動

* 2.redis をインストールします

```
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update
sudo apt-get install redis
```

- 3.Redis サーバー起動

```
sudo service redis-server start
Starting redis-server: redis-server.
```

- 4.Redis サーバーに接続

```
redis-cli
127.0.0.1:6379> ping
PONG
```

- 5.各種主要コマンドの動作確認  
  コマンドの説明は[公式ページ](https://redis.io/commands/)参照  
  memcached より圧倒的にコマンドが多いようです。  
  いくつかコマンドを軽く動かしてみます。

  - acl cat・・・使用可能な ACL カテゴリが表示されます。カテゴリ名が指定されている場合、コマンドは指定されたカテゴリ内のすべての Redis コマンドを表示します。

```
127.0.0.1:6379> acl cat
 1) "keyspace"
 2) "read"
 3) "write"
 4) "set"
 5) "sortedset"
 6) "list"
 7) "hash"
 8) "string"
 9) "bitmap"
10) "hyperloglog"
11) "geo"
12) "stream"
13) "pubsub"
14) "admin"
15) "fast"
16) "slow"
17) "blocking"
18) "dangerous"
19) "connection"
20) "transaction"
21) "scripting"
```

カテゴリ指定すると、所属する Redis コマンドが表示されます。

```
127.0.0.1:6379> acl cat keyspace
 1) "scan"
 2) "pexpiretime"
 3) "touch"
 4) "del"
 5) "migrate"
 6) "exists"
 7) "restore-asking"
 8) "expireat"
 9) "swapdb"
10) "pexpireat"
11) "flushdb"
12) "renamenx"
13) "copy"
14) "expiretime"
15) "type"
16) "unlink"
17) "ttl"
18) "object|help"
19) "object|idletime"
20) "object|freq"
21) "object|encoding"
22) "object|refcount"
23) "persist"
24) "pttl"
25) "expire"
26) "rename"
27) "keys"
28) "dump"
29) "flushall"
30) "dbsize"
31) "move"
32) "pexpire"
33) "restore"
34) "randomkey"
```

- acl setuser・・・ユーザー追加
- acl getuser・・・指定ユーザー情報を取得
- acl users・・・全ユーザー名を取得
- acl deluser・・・指定ユーザーを削除

```
127.0.0.1:6379> acl setuser pea
OK
127.0.0.1:6379> acl getuser pea
 1) "flags"
 2) 1) "off"
 3) "passwords"
 4) (empty array)
 5) "commands"
 6) "-@all"
 7) "keys"
 8) ""
 9) "channels"
10) ""
11) "selectors"
12) (empty array)
127.0.0.1:6379> acl users
1) "default"
2) "pea"
127.0.0.1:6379> acl deluser pea
(integer) 1
127.0.0.1:6379> acl users
1) "default"
```

- set・・・データを追加する

* del・・・データを削除する
* get・・・データを取得する

```
127.0.0.1:6379> set key value
OK
127.0.0.1:6379> get key
"value"
127.0.0.1:6379> del key
(integer) 1
```

60 秒間有効

```
set key value EX 60
OK
```

- Setnx・・・キーがなければデータを追加する  
   返り値 1:追加 0:何もしない

```
127.0.0.1:6379> setnx nxkey nxvalue
(integer) 1
127.0.0.1:6379> setnx nxkey nxvalue
(integer) 0
127.0.0.1:6379> get nxkey
"nxvalue"
```

- mset・・・複数データを追加
- mget・・・複数データを取得

```
127.0.0.1:6379> mset key value key1 value1
OK
127.0.0.1:6379> mget key key1
1) "value"
2) "value1"
```

- append・・・キーがあれば、後ろに値を付加する

```
127.0.0.1:6379> set key "Hello"
OK
127.0.0.1:6379> append key " World"
(integer) 11
127.0.0.1:6379> get key
"Hello World"
```

- strlen・・・指定キーの値のバイト数を取得

```
127.0.0.1:6379> strlen key
(integer) 11
```

- rename・・・指定キーの名称変更。変更後の名前と同じキーが存在する場合、既存のキーの値は上書きされます。

```
127.0.0.1:6379> rename key newkey
OK
127.0.0.1:6379> get key
(nil)
127.0.0.1:6379> get newkey
"Hello World"
```

- info・・・サーバーに関する情報と統計を取得

```
127.0.0.1:6379> info
# Server
redis_version:7.0.5
redis_git_sha1:00000000
redis_git_dirty:0
redis_build_id:68bf11aad5b039df
redis_mode:standalone
os:Linux 5.10.102.1-microsoft-standard-WSL2 x86_64
arch_bits:64
monotonic_clock:POSIX clock_gettime
multiplexing_api:epoll
atomicvar_api:c11-builtin
gcc_version:9.4.0
process_id:99
process_supervised:no
run_id:df9ea0b786db7b6ca5dbcbe61f02ab3dac094c60
tcp_port:6379
server_time_usec:1666008412286293
uptime_in_seconds:4864
uptime_in_days:0
hz:10
configured_hz:10
lru_clock:5064028
executable:/usr/bin/redis-server
config_file:/etc/redis/redis.conf
io_threads_active:0

# Clients
connected_clients:1
cluster_connections:0
maxclients:10000
client_recent_max_input_buffer:8
client_recent_max_output_buffer:0
blocked_clients:0
tracking_clients:0
clients_in_timeout_table:0

# Memory
used_memory:1135224
used_memory_human:1.08M
used_memory_rss:11681792
used_memory_rss_human:11.14M
used_memory_peak:1135224
used_memory_peak_human:1.08M
used_memory_peak_perc:100.21%
used_memory_overhead:865080
used_memory_startup:862992
used_memory_dataset:270144
used_memory_dataset_perc:99.23%
allocator_allocated:1426888
allocator_active:1822720
allocator_resident:4681728
total_system_memory:6580776960
total_system_memory_human:6.13G
used_memory_lua:31744
used_memory_vm_eval:31744
used_memory_lua_human:31.00K
used_memory_scripts_eval:0
number_of_cached_scripts:0
number_of_functions:0
number_of_libraries:0
used_memory_vm_functions:32768
used_memory_vm_total:64512
used_memory_vm_total_human:63.00K
used_memory_functions:184
used_memory_scripts:184
used_memory_scripts_human:184B
maxmemory:0
maxmemory_human:0B
maxmemory_policy:noeviction
allocator_frag_ratio:1.28
allocator_frag_bytes:395832
allocator_rss_ratio:2.57
allocator_rss_bytes:2859008
rss_overhead_ratio:2.50
rss_overhead_bytes:7000064
mem_fragmentation_ratio:10.50
mem_fragmentation_bytes:10569456
mem_not_counted_for_evict:0
mem_replication_backlog:0
mem_total_replication_buffers:0
mem_clients_slaves:0
mem_clients_normal:1800
mem_cluster_links:0
mem_aof_buffer:0
mem_allocator:jemalloc-5.2.1
active_defrag_running:0
lazyfree_pending_objects:0
lazyfreed_objects:0

# Persistence
loading:0
async_loading:0
current_cow_peak:0
current_cow_size:0
current_cow_size_age:0
current_fork_perc:0.00
current_save_keys_processed:0
current_save_keys_total:0
rdb_changes_since_last_save:0
rdb_bgsave_in_progress:0
rdb_last_save_time:1666008152
rdb_last_bgsave_status:ok
rdb_last_bgsave_time_sec:0
rdb_current_bgsave_time_sec:-1
rdb_saves:1
rdb_last_cow_size:200704
rdb_last_load_keys_expired:0
rdb_last_load_keys_loaded:2
aof_enabled:0
aof_rewrite_in_progress:0
aof_rewrite_scheduled:0
aof_last_rewrite_time_sec:-1
aof_current_rewrite_time_sec:-1
aof_last_bgrewrite_status:ok
aof_rewrites:0
aof_rewrites_consecutive_failures:0
aof_last_write_status:ok
aof_last_cow_size:0
module_fork_in_progress:0
module_fork_last_cow_size:0

# Stats
total_connections_received:1
total_commands_processed:14
instantaneous_ops_per_sec:0
total_net_input_bytes:394
total_net_output_bytes:173736
total_net_repl_input_bytes:0
total_net_repl_output_bytes:0
instantaneous_input_kbps:0.00
instantaneous_output_kbps:0.00
instantaneous_input_repl_kbps:0.00
instantaneous_output_repl_kbps:0.00
rejected_connections:0
sync_full:0
sync_partial_ok:0
sync_partial_err:0
expired_keys:0
expired_stale_perc:0.00
expired_time_cap_reached_count:0
expire_cycle_cpu_milliseconds:214
evicted_keys:0
evicted_clients:0
total_eviction_exceeded_time:0
current_eviction_exceeded_time:0
keyspace_hits:0
keyspace_misses:0
pubsub_channels:0
pubsub_patterns:0
pubsubshard_channels:0
latest_fork_usec:1275
total_forks:1
migrate_cached_sockets:0
slave_expires_tracked_keys:0
active_defrag_hits:0
active_defrag_misses:0
active_defrag_key_hits:0
active_defrag_key_misses:0
total_active_defrag_time:0
current_active_defrag_time:0
tracking_total_keys:0
tracking_total_items:0
tracking_total_prefixes:0
unexpected_error_replies:0
total_error_replies:0
dump_payload_sanitizations:0
total_reads_processed:15
total_writes_processed:16
io_threaded_reads_processed:0
io_threaded_writes_processed:0
reply_buffer_shrinks:1
reply_buffer_expands:0

# Replication
role:master
connected_slaves:0
master_failover_state:no-failover
master_replid:8f860ffe56005cf1510bff02543d9d3e6e516897
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0

# CPU
used_cpu_sys:5.577647
used_cpu_user:7.833573
used_cpu_sys_children:0.000000
used_cpu_user_children:0.006298
used_cpu_sys_main_thread:5.568081
used_cpu_user_main_thread:7.838672

# Modules

# Errorstats

# Cluster
cluster_enabled:0

# Keyspace
db0:keys=1,expires=0,avg_ttl=0
```

- shutdow・・・サーバを終了

```
127.0.0.1:6379> shutdown
```
