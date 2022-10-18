# Http リクエストの圧縮状況確認

2 つのサイトで http リクエストの圧縮程度を確認します。

## ■HTTP Compression Test

[HTTP Compression Test](http://www.gidnetwork.com/tools/gzip-test.php)にアクセスして、
確認したいサイトの URL を貼り付けて、[Test]ボタンを押下。

![www whatsmyip org_http-compression-test__url=aHR0cHM6Ly9naXRodWIuY29tL3BlYS1zeXM=](https://user-images.githubusercontent.com/49807271/195596407-1214f0b0-c0b7-4ab5-a2a6-f285f35bbd6d.png)

結果は次のように出力されます。

```
Uncompressed Page Size: 254.3 KB
Compressed Page Size: 34.8 KB
Savings: 86.3%
```

## ■GIDNetwork

[GIDNetwork](https://www.whatsmyip.org/http-compression-test/?url=aHR0cHM6Ly9naXRodWIuY29tLw==)にアクセスして、確認したいサイトの URL を貼り付けて、[Check]ボタンを押下。

![www gidnetwork com_tools_gzip-test php](https://user-images.githubusercontent.com/49807271/195599756-eebd7f96-7b5f-4b1c-a7a5-98d6d18618c2.png)

結果は次のように出力されます。

```
Web page compressed?	Yes
Compression type?	gzip
Size, Markup (bytes)	260,372
Size, Compressed (bytes)	35,603
Compression %	86.3
```
