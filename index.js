// API URL for exchange rates
const apiKey = 'YOUR_API_KEY';  // You need to get your own API key from a currency conversion API provider
const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`; // A free API URL (Note: This API might need a valid key or authentication)

// Fetch and populate currency options dynamically
async function fetchCurrencyData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        const fromCurrencySelect = document.getElementById("fromCurrency");
        const toCurrencySelect = document.getElementById("toCurrency");

        // Populate currency options
        currencies.forEach(currency => {
            const optionFrom = document.createElement("option");
            optionFrom.value = currency;
            optionFrom.innerText = currency;
            fromCurrencySelect.appendChild(optionFrom);

            const optionTo = document.createElement("option");
            optionTo.value = currency;
            optionTo.innerText = currency;
            toCurrencySelect.appendChild(optionTo);
        });
    } catch (error) {
        console.error("Error fetching currency data:", error);
    }
}

// Currency conversion logic
document.getElementById("convertBtn").addEventListener("click", async function() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (amount === "" || isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const rates = data.rates;
        
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];

        // Convert the amount to the target currency
        const convertedAmount = (amount / fromRate) * toRate;

        // Display the result
        document.getElementById("result").innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        console.error("Error during conversion:", error);
        document.getElementById("result").innerText = "Error in conversion!";
    }
});

// Initialize by fetching currency data
fetchCurrencyData();
