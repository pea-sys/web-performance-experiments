var values = [...Array(20000000)].map((_, i) => i);
console.log(values.length);
const startTime3 = performance.now();
for (var step in values) {
}
console.log("sample-3=" + String(performance.now() - startTime3));
