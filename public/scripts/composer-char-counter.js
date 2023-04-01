$(document).ready(function() {
  $("#tweet-input").on('input', function() {
    const inputLength  = $(this).val().length;
    const TheLength = 140;
    const countChars = TheLength - inputLength ;
    const counter = $(this).siblings("output");
    counter.text(countChars);

    if (countChars < 0) {
     counter.css("color", "red");
    } else {
      counter.css("color", "black");
    }
  });
});