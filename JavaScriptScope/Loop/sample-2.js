var values = [...Array(20000000)].map((_, i) => i);
console.log(values.length);
const startTime2 = performance.now();
var length = values.length;
for (let step = 0; step < length; step++) {
}
console.log("sample-2=" + String(performance.now() - startTime2));
