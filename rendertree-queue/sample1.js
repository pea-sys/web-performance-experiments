var computed,
  tmp = "",
  bodystyle = document.body.style;

computed = document.defaultView.getComputedStyle(document.body, "");
console.time("timer1");
for (i = 0; i < 1000; i++) {
  bodystyle.color = "red";
  tmp = computed.backgroundColor;
  bodystyle.color = "white";
  tmp = computed.backgroundImage;
  bodystyle.color = "green";
  tmp = computed.backgroundAttachment;
}
console.timeEnd("timer1");
