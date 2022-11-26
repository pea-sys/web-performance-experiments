var person = {
  name: "Nicholas",
  age: 30,
};
function displayInfo() {
  with (person) {
    var tmp = name + " is " + age;
  }
}
const startTime = performance.now();
for (let step = 0; step < 2000000; step++) {
  displayInfo();
}
console.log("sample-1=" + String(performance.now() - startTime));
