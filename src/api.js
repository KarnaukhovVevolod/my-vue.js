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

import { updateFoolTickers } from "./App_crypto";

// получить стоимость криптовалютных пар с апишки? (задача решается выше)
// получить стоимость ОБНОВЛЕНИЯ криптовалютных пар с АПИШКИ (задача решается ниже)

const tickersHandlers = new Map();
//создаём Websocket - подключение
const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`);
/**/

const invalidTicker = "INVALID_SUB";

var priceUsdBtc = 1;
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

const functionwe = new Map();

var FOTicker = [];

var hardFOTicker = [];
var convert = [];
export const FOOtick = (callback)=>{
    functionwe.set(1,callback);
};
/*
const handlers = tickersHandlers.get(currency)??[];
handlers.forEach(fn => fn(newPrice));
*/
/*
export const subscribeToTicker = (ticker,callback) => {
    const subscribers = tickersHandlers.get(ticker) || [];
    tickersHandlers.set(ticker, [...subscribers, callback]);
    //подписка на обновление через websocket
    subscriberToTickerOnWs(ticker);
};*/

//создаём Broadcast Channel API
//const bc = new BroadcastChannel('test_channel');


socket.addEventListener("message", e =>{
    const { TYPE: type, FROMSYMBOL: currency, PRICE: newPrice, MESSAGE: message,PARAMETER: parameter } = JSON.parse(
        e.data
    );
    //вкладки общаются между собой с помощью  Broadcast Channel API
    //создаём сообщение в канале
    //bc.postMessage('This is a test message.');

    //вкладки общаются между собой с помощью shared worker



    //вкладки общаются между собой с помощью localStorage
    if (message === invalidTicker) {
        //debugger;
        const oneChast = "5~CCCAGG~";
        const twoChast = "~USD";
        const freeChast = "~BTC";
        var fooTicker = parameter.replace(oneChast,'');
        fooTicker = fooTicker.replace(twoChast,'');
        fooTicker = fooTicker.replace(freeChast, '');
        //console.log([type ,currency, newPrice, message, parameter, fooTicker]);
        //FOTicker.set(fooTicker,fooTicker);
        if( FOTicker.includes(fooTicker) ) {
            //debugger;
            const hand = functionwe.get(1);
            hardFOTicker.push(fooTicker);
            hand(fooTicker);
            FOTicker = FOTicker.filter(function(f){return f != fooTicker});
            localStorage.setItem('ALL_full_tickers',hardFOTicker);
        } else {
            FOTicker.push(fooTicker);
            sudscriberToTickerOnWsBTC(fooTicker);
        }

        //console.log(tickersHandlers);

        //window.foolTickers = this.foolTickers;
        //updateFoolTickers(fooTicker);
    }


    console.log('сообщение о монетке от вебсокета начало');
    console.log(e);
    console.log('сообщение о монетке от вебсокета конец');

    if(type != AGGREGATE_INDEX || newPrice === undefined){
        return;
    }
    var newPriceUSD = 1;
    if (currency==='BTC') {
        priceUsdBtc = newPrice;

        FOTicker.forEach((element)=>{
            if (convert[element] != undefined) {
                const handlers = tickersHandlers.get(element)??[];
                handlers.forEach(fn => fn(newPrice*convert[element]));
                localStorage.setItem(element, newPrice*convert[element]);
            }
        });
        var listTickers = localStorage.getItem('cryptonomicon-list');
        listTickers = JSON.parse(listTickers);
        var filtTickerBTC = listTickers.filter(function(val){
            return val.name == 'BTC';
        });
        if (typeof(filtTickerBTC[0]) === "undefined") {
            return;
        }
        //if()
    }
    if(FOTicker.includes(currency)){
        convert[currency]= newPrice;
        FOTicker.indexOf(currency);
        newPriceUSD = priceUsdBtc;
        var listTickers = localStorage.getItem('cryptonomicon-list');
        listTickers = JSON.parse(listTickers);
        var filtTickerBTC = listTickers.filter(function(val){
            return val.name == 'BTC';
        });
        if (typeof(filtTickerBTC[0]) === "undefined") {
            subscriberToTickerOnWs("BTC")
        }
    }

    const handlers = tickersHandlers.get(currency)??[];
    handlers.forEach(fn => fn(newPrice*newPriceUSD));
    window.handlers = handlers;
    localStorage.setItem(currency, newPrice*newPriceUSD);

    /*
    console.log('сообщение о монетке от вебсокета начало');
    console.log(e);
    console.log('сообщение о монетке от вебсокета конец');
    */

});
socket.close();

//принимаем сообщения по localStorage

window.addEventListener('storage', function(event) {

     const handlers = tickersHandlers.get(event.key)??[];
     const differprice = localStorage.getItem(event.key);
     handlers.forEach(fn => fn(differprice));

    const hand = functionwe.get(1);
    const getLocal = localStorage.getItem('ALL_full_tickers');
    const hardFOTicker = getLocal.split(',');
    window.hardFOTicker = hardFOTicker;

    hardFOTicker.forEach((fn) =>{
        hand(fn);
    });
    console.log(event);
    console.log(event.key);
});


//принимаем сообщение через broadcast channel API
//bc.addEventListener('message', function (e) { console.log(e.data); });


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

function sudscriberToTickerOnWsBTC(ticker){
    const message = JSON.stringify({
        "action": "SubAdd",
        "subs": [`5~CCCAGG~${ticker}~BTC`]
    });
    sendToWebSocket(message);
}

function unsubscribeFromTickerOnWsBTC(ticker){
    const message = JSON.stringify({
        "action": "SubRemove",
        "subs": [`5~CCCAGG~${ticker}~BTC`]
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


    if( FOTicker.includes(ticker) ) {
        unsubscribeFromTickerOnWsBTC(ticker);
    } else {
        unsubscribeFromTickerOnWs(ticker);
    }

    ////////unsubscribeFromTickerOnWs(ticker);
};

//setInterval(loadTickers, 20000);

//window.tickers = tickers;

window.functionwe = functionwe;

window.FOTicker = FOTicker;
window.tickersHandlers = tickersHandlers;


