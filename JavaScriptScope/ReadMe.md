# JavaScript のスコープ管理

### OREILLY の Perfomance Best Practices for Web Developers の実験

---

javascript の実行コンテキストのローカル変数オブジェクトはスコープチェーンの最上部に来る。一方グローバルオブジェクトは最後尾にある。オブジェクトを検索する際に、スコープチェーンの上部程アクセスが早いため、複数回参照するオブジェクトはローカル変数にした方がパフォーマンスが上がる可能性が高いです。

■A.関数内で同じグローバルオブジェクトに 2 回アクセス(2716msec)

```js
function createChildFor(elemntId) {
  var element = document.getElementById(elemntId),
    newElement = document.createElement("div");
  element.appendChild(newElement);
}
{
  const startTime = performance.now();
  for (let step = 0; step < 2000000; step++) {
    createChildFor("parent");
  }
  console.log("sample-1=" + String(performance.now() - startTime));
}
```

■B.関数内でグローバルオブジェクトに 1 回アクセス(2124msec)

```js
function createChildFor(elemntId) {
  (doc = document), (element = doc.getElementById(elemntId)), (newElement = doc.createElement("div"));
  element.appendChild(newElement);
}
{
  const startTime2 = performance.now();
  for (let step = 0; step < 2000000; step++) {
    createChildFor("parent");
  }
  console.log("sample-2=" + String(performance.now() - startTime2));
}
```

With 句を使用した場合には、自動的にスコープチェーンが１つ深くなるため使用を避けた方が良い。下記例では速度は 200 倍近く異なります。

■A.With 句を使用(1631msec)

```js
var person = {
  name: "Nicholas",
  age: 30,
};
function displayInfo() {
  with (person) {
    var tmp = name + " is " + age;
  }
}
const startTime = performance.now();
for (let step = 0; step < 2000000; step++) {
  displayInfo();
}
console.log("sample-1=" + String(performance.now() - startTime));
```

■B.With 句を未使用(7msec)

```js
var person = {
  name: "Nicholas",
  age: 30,
};
function displayInfo() {
  var p = person;
  var tmp = p.name + " is " + p.age;
}
const startTime2 = performance.now();
for (let step = 0; step < 2000000; step++) {
  displayInfo();
}
console.log("sample-2=" + String(performance.now() - startTime2));
```

同じ理屈で書籍では、ループ条件もローカル変数にした方が良いとありましたが、僅かにキャプチャした方が早いがほとんど差はないように見える。恐らく、出版後に javascript がかしこくなったのだと思う。
for-in に関しては、for と比較して 100 倍近く遅い。

■ ループ継続条件がオブジェクトプロパティ(15ms-22ms)

```js
var values = [...Array(20000000)].map((_, i) => i);
console.log(values.length);
const startTime = performance.now();
for (let step = 0; step < values.length; step++) {}
console.log("sample-1=" + String(performance.now() - startTime));
```

■ ループ継続条件がローカル変数(15ms-22ms)

```js
var values = [...Array(20000000)].map((_, i) => i);
console.log(values.length);
const startTime2 = performance.now();
var length = values.length;
for (let step = 0; step < length; step++) {}
console.log("sample-2=" + String(performance.now() - startTime2));
```

■for-in ループ(14558ms)

```js
var values = [...Array(20000000)].map((\_, i) => i);
console.log(values.length);
const startTime3 = performance.now();
for (var step in values) {
}
console.log("sample-3=" + String(performance.now() - startTime3));
```
