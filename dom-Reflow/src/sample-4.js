var list = [...Array(100000)].map((_, i) => i),
    elem,
    contents;
const startTime = performance.now();
var fragment = document.createDocumentFragment()
for (var i = 0; i < list.length; i++) {
    elem = document.createElement('div');
    content = document.createTextNode(list[i]);
    fragment.appendChild(content);
}
document.body.appendChild(fragment);
console.log("sample-4=" + String(performance.now() - startTime));