var list = [...Array(100000)].map((_, i) => i),
    elem,
    contents;
const startTime = performance.now();
for (var i = 0; i < list.length; i++) {
    elem = document.createElement('div');
    content = document.createTextNode(list[i]);
    elem.appendChild(content);
    document.body.appendChild(elem);
}
console.log("sample-3=" + String(performance.now() - startTime));