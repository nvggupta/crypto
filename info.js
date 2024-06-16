
const urlParams = new URLSearchParams(window.location.search);
const coinId = urlParams.get('id');


const infoName = document.getElementById('info-name');
const rupee = document.getElementById('rupee');
const dollor = document.getElementById('dollor');
const euro = document.getElementById('euro');
const pound = document.getElementById('pound');
const description = document.getElementById('description');


async function fetchCoinDetails(id) {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
    if (response.ok) {
      const coinData = await response.json();
      console.log(coinData);
      displayCoinDetails(coinData);
    } else {
      console.error('Error fetching coin details');
    }
  } catch (error) {
    console.error('Error fetching coin details:', error);
  }
}

function displayCoinDetails(data) {
 
  infoName.textContent = `${data.name} (${data.symbol.toUpperCase()})`;
  

  rupee.textContent = `₹ ${data.market_data.current_price.inr}`;
  dollor.textContent = `$ ${data.market_data.current_price.usd}`;
  euro.textContent = `€ ${data.market_data.current_price.eur}`;
  pound.textContent = `£ ${data.market_data.current_price.gbp}`;
  
  description.textContent = data.description.en || 'Description not available';
}


fetchCoinDetails(coinId);
