const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Loader functions 
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Generating a new quote
function newQuote() {
  loading()
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) {
    authorText.innerText = "Unkonwn";
  } else {
    authorText.innerText = quote.author;
  }
  if (quote.text.length > 70) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.innerText = quote.text;
  complete()
}

// Fetching a quote from API
async function getQuotes() {
  loading()
  const apiUrl = "http://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    loading()
    alert(err);
  }
}

// Sharing on Twitter
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, "_blank");
}

// Adding Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// initializing function
getQuotes();

