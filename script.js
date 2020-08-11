const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// showing loader

function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hiding loader
function complete(){
  if(!loader.hidden){
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// get quote from api
async function getQuote(){
  loading();
  const proxyUrl = 'https://tranquil-everglades-16767.herokuapp.com/'
  const apiUrl = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`;
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    if(data.quoteAuthor === ''){
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    quoteText.innerText = data.quoteText;
    if(data.quoteText.length >= 120){
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    complete();
  } catch (error) {
    getQuote();
    console.log(error)
  }
}

// tweet quote function
function tweetQuote(){
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank')
}

//event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// load quote
getQuote();