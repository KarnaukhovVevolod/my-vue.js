const API_KEY = "87b58af34b829246ce6b3030f91bf01c099098858e7a3d64abfca5fa4b9e8cb0";


export const loadTickers = newTicker =>

    fetch(
        /*
        `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${newTicker.join(
            ',')}&api_key=${API_KEY}`
        */
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${newTicker.join(
            ',')}&tsyms=USD&api_key=${API_KEY}`

    )
        .then(r => r.json())
        .then(rawData =>
        Object.fromEntries(
            Object.entries(rawData).map(([key,value])=>[key, value.USD])
        )
        );//теперь возвращаем правильную цену а не обратную





    /* как работает код ObjectfromEntries    map*/
        /*{ a: 1 , b: 2 } => [['a', 1], ['b', 2]] => [['a', 1],['b', 0.5]]*/
/*
export const loadTicker = newTicker =>
    fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${newTicker.name}&tsyms=USD&api_key=${API_KEY}`
).then(r => r.json());
*/


// получить стоимость криптовалютных пар с апишки? (задача решается выше)
// получить стоимость ОБНОВЛЕНИЯ криптовалютных пар с АПИШКИ (задача решается ниже)

const tickers = new Map();

//подписаться на обновление
export const subscribeToTicker = (ticker,callback) => {
    const subscribers = tickers.get(ticker) || [];
    tickers.set(ticker, [...subscribers,callback]);
};

//отписаться от обновления
export const unsubscriberToTicker = (ticker,callback) => {
    const subscribers = tickers.get(ticker) || [];
    tickers.set(ticker,
        subscribers.filter(fn => fn != callback);

};


