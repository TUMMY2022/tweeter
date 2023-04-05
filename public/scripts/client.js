/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
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
