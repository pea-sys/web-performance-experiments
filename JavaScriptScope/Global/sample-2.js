function createChildFor(elemntId) {
  (doc = document), (element = doc.getElementById(elemntId)), (newElement = doc.createElement("div"));
  element.appendChild(newElement);
}
{
  const startTime = performance.now();
  for (let step = 0; step < 2000000; step++) {
    createChildFor("parent");
  }
  console.log("sample-2=" + String(performance.now() - startTime));
}
