const input = document.getElementById("input");
const search = document.getElementById("coin-Search");
const coinSection = document.getElementById("coin-section");



search.addEventListener('click', () => {
    showResult(input.value);
    
});

async function showResult(input) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${input}`);
        if (response.ok) {
            const data = await response.json();
            console.log(data["coins"]);
            addCoins(data["coins"]);
        } else {
            console.log("Error occurred");
        }
    } catch (e) {
        console.log("Error occurred", e);
    }
}

const createNewElement = (name, symbol, slNO, image) => {
    const div = document.createElement('div');
    div.className = "coin-result";
    div.innerHTML = `
        <div class="info">
            <span class="slno">${slNO}</span>
            <img src="${image}" alt="" />
            <span class="name">${name} (${symbol})</span>
        </div>
        <a href="info.html"><button id="more-info${slNO}" class="show-result">More Info</button></a>
    `;
    return div;
};

const clearAll = () => {
    coinSection.innerHTML = "";
};

const addCoins = (coins) => {
    clearAll();
    coins.forEach((element, index) => {
        const newElement = createNewElement(element.name, element.symbol, index + 1, element.large);
        coinSection.appendChild(newElement);
    });
   
};

const addEventListeners = () => {
    document.querySelectorAll(".show-result").forEach(button => {
        button.addEventListener('click', (event) => {
            const coinId = event.target.getAttribute('data-id');
            window.location.href = `details.html?id=${coinId}`;
        });
    });
};