//データ参照を集中させることでキューイング量を増やす
var computed,
  tmp = "",
  bodystyle = document.body.style;

computed = document.defaultView.getComputedStyle(document.body, "");

console.time("timer2");
for (i = 0; i < 1000; i++) {
  tmp = computed.backgroundColor;
  tmp = computed.backgroundImage;
  tmp = computed.backgroundAttachment;
  bodystyle.color = "green";
  bodystyle.color = "red";
  bodystyle.color = "white";
}
console.timeEnd("timer2");
