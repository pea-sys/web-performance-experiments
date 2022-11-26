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
