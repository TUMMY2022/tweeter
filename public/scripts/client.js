/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
$(document).ready(function() {
  $("#tweet-error").hide();
  $("#tweet-form").hide();

	$("#write-new-tweet, #btn-top-page").click(function(event){
		event.preventDefault();
		$("html, body").animate({ scrollTop: "0" })
    $("#tweet-form").show();
		$("#tweet-input").focus();
	});
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $("#tweets-container").empty();
  for (const tweet of tweets) {
    const renderedTweet = createTweetElement(tweet);
    $("#tweets-container").prepend(renderedTweet);
  }
}

const createTweetElement = function(tweet) {
  const { content, user, created_at } = tweet;
  const { avatars, handle, name } = user;

  const escape = function (str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  return `
  <article class="tweet">
    <header class="tweet-header">
      <div class="tweet-header-user">
        <img src="${avatars}" alt="tweet user avatar"></img>
        <p>${name}</p>
      </div>
      <h2 class="tweet-header-handle">${handle}</h2>
    </header>
    <p class="tweet-content">
      ${escape(content.text)}
    </p>
    <hr>
    <footer class="tweet-footer">
      <p class="tweet-footer-timestamp">
      ${timeago.format(created_at)}
      </p>
      <div class="tweet-footer-icons">
        <i class="far fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="far fa-heart"></i>
      </div>
    </footer>
  </article>`;
};

//loads tweets
const loadTweets = () => {
  $.get("/tweets", (tweet) => {
    renderTweets(tweet);
  });
};
loadTweets();

const errorDisplay = function(errorText) {
  const error = $("#tweet-error");
  error.slideDown("slow").text(errorText);
  setTimeout(()=>{
    error.hide(300);
  }, 3000);
};
$("#tweet-form").on("submit", function (event) {
  event.preventDefault();
  const lengthTweet = $("#tweet-input").val().length;
  if (!lengthTweet) {
    return errorDisplay("🛑 TOO SHORT!  Please write something readable 🛑 ");
  }
  if (lengthTweet > 140) {
    return errorDisplay("🛑 TOO LONG! Please respect our limit of 140 chars 🛑");
  }
  let tweet = $(this).serialize();
  $.post("/tweets/", tweet, (err, data) => {
    loadTweets();
    const input = $("#tweet-input");
    input.val("").focus();
    $("#tweet-counter").html("140");
  });
});
});

