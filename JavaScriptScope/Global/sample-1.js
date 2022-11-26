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
