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

// function newQuote(data) {
//   loading()
//   const quote = getQuotes()
//   console.log(quote)
//   if (!quote.author) {
//     authorText.innerText = "Unkonwn";
//   } else {
//     authorText.innerText = quote.author;
//   }
//   if (quote.text.length > 70) {
//     quoteText.classList.add("long-quote");
//   } else {
//     quoteText.classList.remove("long-quote");
//   }
//   quoteText.innerText = quote.text;
//   complete()
// }

// Fetching a quote from API
async function getQuotes() {
  loading()
  const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  const proxyUrl = 'https://limitless-reef-49600.herokuapp.com/'
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data)
    if (!data.quoteAuthor) {
      authorText.innerText = "Unkonwn";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    if (data.quoteText.text) {
      console.log(data.quoteText.text)
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    complete()
  } catch (err) {
    
    loading()
    console.log(err);
  }
  
}

// Sharing on Twitter
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, "_blank");
}

// Adding Event Listeners
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// initializing function
getQuotes();
