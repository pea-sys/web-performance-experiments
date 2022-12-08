var element = document.getElementById("list");
var fragment = document.createDocumentFragment();
var ary = [...Array(100000)].map((_, i) => i);

ary.forEach(function (ary) {
  var li = document.createElement("li");
  li.textContent = ary;
  fragment.appendChild(li);
});

element.appendChild(fragment);
