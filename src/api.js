const API_KEY = "87b58af34b829246ce6b3030f91bf01c099098858e7a3d64abfca5fa4b9e8cb0";


export const loadTickers_old = newTicker => {

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
                Object.entries(rawData).map(([key, value]) => [key, value.USD])
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
}



// получить стоимость криптовалютных пар с апишки? (задача решается выше)
// получить стоимость ОБНОВЛЕНИЯ криптовалютных пар с АПИШКИ (задача решается ниже)

const tickersHandlers = new Map();
//создаём Websocket - подключение
const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`);
/**/

const invalidTicker = "INVALID_SUB";

// const loadTickers = () => {
//     //debugger;
//     if (tickersHandlers.size === 0) {
//         return;
//     }
//
//     fetch(
//         /*
//         `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${newTicker.join(
//             ',')}&api_key=${API_KEY}`
//         */
//         `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[...tickersHandlers.keys()].join(
//             ',')}&tsyms=USD&api_key=${API_KEY}`
//     )
//         .then(r => r.json())
//         .then(rawData =>{
//             const updatedPrices = Object.fromEntries(
//                 Object.entries(rawData).map(([key, value]) => [key, value.USD])
//             );
//             Object.entries(updatedPrices).forEach(([currency, newPrice]) =>{
//                 const handlers = tickersHandlers.get(currency) ?? [];
//                 handlers.forEach(fn => fn(newPrice));
//             });
//         });
//          //теперь возвращаем правильную цену а не обратную
// };
const AGGREGATE_INDEX = "5";

socket.addEventListener("message", e =>{
    const { TYPE: type, FROMSYMBOL: currency, PRICE: newPrice, MESSAGE: message,PARAMETER: parameter } = JSON.parse(
        e.data
    );
    if (message === invalidTicker) {
        debugger;
        const oneChast = "5~CCCAGG~";
        const twoChast = "~USD";
        var fooTicker = parameter.replace(oneChast,'');
        fooTicker = fooTicker.replace(twoChast,'');
        console.log([type ,currency, newPrice, message, parameter, fooTicker]);
        this.foolTickers[fooTicker] = fooTicker;
        console.log(tickersHandlers);
    }


    console.log('сообщение о монетке от вебсокета начало');
    console.log(e);
    console.log('сообщение о монетке от вебсокета конец');

    if(type != AGGREGATE_INDEX || newPrice === undefined){
        return;
    }
    const handlers = tickersHandlers.get(currency)??[];
    handlers.forEach(fn => fn(newPrice));
    window.handlers = handlers;
    /*
    console.log('сообщение о монетке от вебсокета начало');
    console.log(e);
    console.log('сообщение о монетке от вебсокета конец');
    */

});
//socket.close();
function sendToWebSocket(message) {
    const stringifiedMessage = message;
    //проверяем открыт ли сокет
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(stringifiedMessage);
        return;
    }

    //соединение открыто
    socket.addEventListener("open", ()=>{
        socket.send(stringifiedMessage);
    },{
        once: true
    });

    //наблюдаем за сообщениями
    /*
    socket.addEventListener("message", e=>{
        console.log(e);
    });
    */



    /*
    const messageUnSubscriber = JSON.stringify({
        "action": "SubRemove",
        "subs": [`5~CCCAGG~${ticker}~USD`]
    });

    socket.addEventListener("open", ()=>{
        socket.send(messageUnSubscriber);
    },{
        once: true
    });
    socket.addEventListener("message", e=>{
        console.log(e);
    });
    socket.close();
    */
}
function subscriberToTickerOnWs(ticker){

    const message = JSON.stringify({
        "action": "SubAdd",
        "subs": [`5~CCCAGG~${ticker}~USD`]
    });
    sendToWebSocket(message);
}

function unsubscribeFromTickerOnWs(ticker){
    const message = JSON.stringify({
        "action": "SubRemove",
        "subs": [`5~CCCAGG~${ticker}~USD`]
    });
    sendToWebSocket(message);
}
/**/
//подписаться на обновление
export const subscribeToTicker = (ticker,callback) => {
    const subscribers = tickersHandlers.get(ticker) || [];
    tickersHandlers.set(ticker, [...subscribers, callback]);
    //подписка на обновление через websocket
    subscriberToTickerOnWs(ticker);
};
//отписаться от обновления
export const unsubscriberFromTicker = (ticker, callback) => {
    const subscribers = tickersHandlers.get(ticker) || [];
    tickersHandlers.set(ticker,
        subscribers.filter(fn => fn != callback));
    unsubscribeFromTickerOnWs(ticker);
};

//setInterval(loadTickers, 20000);

//window.tickers = tickers;
window.tickersHandlers = tickersHandlers;


