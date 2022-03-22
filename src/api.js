export const loadTicker = tickerName =>
    fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${newTicker.name}&tsyms=USD&api_key=87b58af34b829246ce6b3030f91bf01c099098858e7a3d64abfca5fa4b9e8cb0`
).then(r => r.json());