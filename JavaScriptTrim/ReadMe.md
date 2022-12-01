# JavaScriptTrim

JavaScript でネイティブのトリム関数が追加されたので  
従来の自前の trim 関数との速度比較を行います

- ネイティブ=701msec
- 正規表現=2792msec

```js
var values = [...Array(20000000)].map((_, i) => i);
var orig = " foo    ";

const startTime = performance.now();
var length = values.length;
for (let step = 0; step < length; step++) {
  orig.trim();
}
console.log("native=" + String(performance.now() - startTime));

const startTime2 = performance.now();
for (let step = 0; step < length; step++) {
  orig.replace(/\s+/g, "");
}
console.log("regex=" + String(performance.now() - startTime2));
```
