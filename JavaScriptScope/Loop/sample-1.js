var values = [...Array(20000000)].map((_, i) => i);
console.log(values.length);
const startTime = performance.now();
for (let step = 0; step < values.length; step++) {
}
console.log("sample-1=" + String(performance.now() - startTime));
