var values = [...Array(20000000)].map((_, i) => i);
var orig = "foo    ";

function trim_old(text) {
  text = text.replace(/^\s+/, "");
  for (var i = text.length - 1; i >= 0; i--) {
    if (/\S/.test(text.charAt(i))) {
      text = text.substring(0, i + 1);
      break;
    }
  }
  return text;
}

const startTime = performance.now();
var length = values.length;
for (let step = 0; step < length; step++) {
  orig.trim();
}
console.log("sample-1=" + String(performance.now() - startTime));

const startTime2 = performance.now();
for (let step = 0; step < length; step++) {
  trim_old(orig);
}
console.log("sample-2=" + String(performance.now() - startTime2));
