<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <!--
        <div class="fixed w-100 h-100 opacity-80 bg-purple-800 inset-0 z-50 flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
        -->
    <div class="container">

      <!--<section>-->
        <!--&lt;!&ndash; Подключаем компонент кнопки &ndash;&gt;-->
        <!--<button-sign/>-->
        <!--<div class="flex">-->
          <!--<div class="max-w-xs">-->
            <!--<label for="wallet" class="block text-sm font-medium text-gray-700"-->
              <!--&gt;Тикер {{ ticker }}-->
            <!--</label>-->
            <!--<div class="mt-1 relative rounded-md shadow-md">-->
              <!--<input-->
                <!--v-model="ticker"-->
                <!--v-on:keydown.enter="ad"-->
                <!--@input="onInput"-->
                <!--type="text"-->
                <!--name="wallet"-->
                <!--id="wallet"-->
                <!--class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"-->
                <!--placeholder="Например DOGE"-->
              <!--/>-->
            <!--</div>-->
            <!--<div-->
              <!--class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap"-->
            <!--&gt;-->
              <!--<span v-for="n in nameT"-->
                    <!--@click ="addDop(n)"-->
                <!--class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"-->
              <!--&gt;-->
                <!--{{n}}-->
              <!--</span>-->

            <!--</div>-->
            <!--<div :style="{display: dispMess}"-->
                     <!--class="text-sm text-red-600">Такой тикер уже добавлен</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<button-->
          <!--v-on:click="ad"-->
          <!--type="button"-->
          <!--class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"-->
        <!--&gt;-->
          <!--&lt;!&ndash; Heroicon name: solid/mail &ndash;&gt;-->
          <!--<svg-->
            <!--class="-ml-0.5 mr-2 h-6 w-6"-->
            <!--xmlns="http://www.w3.org/2000/svg"-->
            <!--width="30"-->
            <!--height="30"-->
            <!--viewBox="0 0 24 24"-->
            <!--fill="#ffffff"-->
          <!--&gt;-->
            <!--<path-->
              <!--d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"-->
            <!--&gt;</path>-->
          <!--</svg>-->
          <!--Добавить-->
        <!--</button>-->
      <!--</section>-->
      <add-ticker @add-ticker="ad"
                  :disabled="tooManyTickersAdded"
                  :nameT="nameT"
                  @add-get-api="getApi"
                  @add-ticker-onInput="onInput"
                  @add-ticker-addDop="addDop"
                  :dispMess="dispMess"
      />

      <template v-if="tickers.length">
         <div><p>Фильтр:<input v-model="filter" /></p>
             <button class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              v-if="page > 1"
              @click="page = page - 1"
             >Назад</button>
             <button class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              v-if="hasNextPage"
              @click="page = page + 1"
             >Вперёд</button>
         </div>
        <hr class="w-full border-t border-gray-600 my-4" />
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div
            v-for="t in filteredTickers"
            v-bind:key1="t"
            :key="t.name"
            @click="select(t)"
            :class="{
              'border-4': sel === t,
              'bg-white': foolTickers.includes(t.name)===false,
              'bg-red-100': foolTickers.includes(t.name)===true
            }"

            class=" overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
          >
            <div class="px-4 py-5 sm:p-6 text-center">
              <dt class="text-sm font-medium text-gray-500 truncate">
                WTF - USD {{ t.name }}
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                {{ t.price }}
              </dd>
            </div>
            <div class="w-full border-t border-gray-200"></div>
            <button
              @click.stop="handleDelete(t)"
              class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
            >
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#718096"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path></svg
              >Удалить
            </button>
          </div>
        </dl>
        <hr class="w-full border-t border-gray-600 my-4" />
        <section v-if="sel" class="relative">
          <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">
            {{ sel.name }} - USD
          </h3>   <!-- ref - это возможность получить ссылку на объект,который отрисовали в шаблоне, их вешают и на dom-узлы и на компоненты
            ref - не реагируют на изменение (не реактивны)
            ref - нужны тогда, когда вы не можете это получить средствами vue например информация о конкретном dom узле(его ширина,высота,  ит.д.)
            ref доступен только после того как элемент смонтирован ref не должны использоваться в computed-->
          <div class="flex items-end border-gray-600 border-b border-l h-64" ref="graph">
            <div
              v-for="(bar, idx) in normalizeGraph"
              :key="idx"
              :style="{ height: `${bar}%` }"
              class="bg-purple-800 border w-10 h-24"
            ></div>
          </div>
          <button
            type="button"
            class="absolute top-0 right-0 "
            @click="sel = null"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:svgjs="http://svgjs.com/svgjs"
              version="1.1"
              width="30"
              height="30"
              x="0"
              y="0"
              viewBox="0 0 511.76 511.76"
              style="enable-background: new 0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z"
                  fill="#718096"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
          </button>
        </section>
      </template>

    </div>
  </div>

  <modal-m
          @add-openclose="openclose"
          :openmodal="openmodal"
          :closemodal="closemodal"

  >
    <template v-slot:headmodal>Новый заголовок</template>
    <template v-slot:maincontent>Новый текст для модального окна !!!</template>
    <template v-slot:footButton><modal-button
            @add-openclose="openclose"
            :openmodal="openmodal"
            :closemodal="closemodal"
            @ok="onopen"
            @close="onclose"
    /></template>
  </modal-m>

</template>

<script>

  import { /*loadTickers,*/ subscribeToTicker, unsubscriberFromTicker, FOOtick } from "./api";
  import PlusSignIcon from './components/PlusSign.vue';
  import ButtonSign from './components/AddButton.vue';
  import AddTicker from './components/AddTicker.vue';
  import ModalM from './components/ModalWindow.vue';
  import ModalButton from './components/ModalButton';
  //import {openmodal, closemodal, openclose} from './components/ModalButton';

  export default {
  name: "App",
  //data() - описываю те данные компонента, которые могут быть
    components: {
      AddTicker,
      PlusSignIcon,
      ButtonSign,
      ModalM,
      ModalButton
    },
  data() {
    return {
      ticker: "",
      //tickers: ['1','2','3','4'],
      tickers: [
        /*
              {name: 'DEMO1', price:'-'},
              {name: 'DEMO2', price:'-'},
              {name: 'DEMO3', price:'-'},
              {name: 'DEMO4', price:'3'}*/
      ],
      sel: null, //состояние
      graph: [],
      nameT: ['BTC','DOGE','BCH','CHD'],
      nameUse:[],
      dispMess:"none",
      dataALL:[],
      page: 1,
      filter:"",
      foolTickers:[],
      maxGraphElements: 1,
      openmodal:'block',
      closemodal:'none'
      //hasNextPage: true,
    };
    //methods - функция
  },
    //событие жизненного цикла
    created(){
        const windowData = Object.fromEntries(
            new URL(window.location).searchParams.entries()
        );

        if (windowData.filter){
            this.filter = windowData.filter;
        }

        if(windowData.page){
            this.page = windowData.page;
        }

        const tickerData = localStorage.getItem('cryptonomicon-list');
/**/
        if (tickerData) {
            this.tickers = JSON.parse(tickerData);
            this.tickers.forEach(ticker => {
              subscribeToTicker(ticker.name , /*(price)=>{
                console.log("ticker price changed to", price, ticker.name);
              });*/
                      newPrice => this.updateTicker(ticker.name, newPrice)
              );

            });
        }/**/
        FOOtick(n=>this.updateFoolTickers(n));

      //this.updateFoolTickers('');
        //setInterval(this.updateTickers,20000);
      //setInterval(loadTickers());
    },

    mounted() {
      window.addEventListener("resize", this.calculateMaxGraphElements);
    },

    beforeUnmount() {
      window.removeEventListener("resize",this.calculateMaxGraphElements);
    },
    //computed -это поля не методы они не могут принимать значения

  computed: {
  /*
    maxGraphElements() {
      return this.$refs.graph.clientWidth / 38;
    },
    */
    tooManyTickersAdded(){
      return this.tickers.length>5;
    },
      startIndex() {
          return (this.page - 1) * 6;
      },
      endIndex() {
          return (this.page * 6);
      },
      endPageConst() {
          return this.tickers.filter(ticker => ticker.name.includes(this.filter)).length;
      },
      filteredTickers() {
          //const start = (this.page - 1) * 6;
          //const end = this.page * 6;
          //const endPage = this.tickers.filter(ticker => ticker.name.includes(this.filter)).length;

          //this.hasNextPage = endPage <= end ? false : true;
          //return this.tickers.filter(ticker => ticker.name.includes(this.filter)).slice(start,end);
          return this.tickers.filter(ticker => ticker.name.includes(this.filter)).slice(this.startIndex,this.endIndex);

      },
      hasNextPage() {
          return this.endIndex < this.endPageConst;

      },

      normalizeGraph() {
          const maxValue = Math.max(...this.graph);
          const minValue = Math.min(...this.graph);

          return this.graph.map(
              (price) => 5 + ((price - minValue) * 95) / (maxValue - minValue)
          );
      },
      pageStateOptions() {
          return{
              filter: this.filter,
              page: this.page
          }
      }

  },

  //методы
  methods: {
    calculateMaxGraphElements() {
      //делаем проверку что не выбрали тикер для графика
      if (!this.$refs.graph) {
        return;
      }
      this.maxGraphElements = this.$refs.graph.clientWidth / 38;

      //уменьшаем график
      while(this.graph.length > this.maxGraphElements) {
        console.log(this.maxGraphElements);
        this.graph.shift();
      }
    },

    updateFoolTickers(nameTicker='FOO'){
      //this.foolTickers[nameTicker]=nameTicker;
      //this.foolTickers['FOO']='FOO';
      this.foolTickers.push(nameTicker);
      window.foolTickers = this.foolTickers;
    },
    updateTicker(tickerName, price) {
      /*
      if(price == undefined){
        debugger;
      }*/
      //получаем (с помощью ref) dom-object моего графика
      //debugger;
      //console.log('updateTicker', this.$refs.graph);
      //console.log('uppppppppp');
      this.tickers
              .filter(t => t.name === tickerName)
              .forEach(t =>{
                if (t === this.sel) {
                  this.graph.push(price);
                  /*
                  if(this.maxGraphElements == 1){
                    this.calculateMaxGraphElements();
                  }
                  */
                  while(this.graph.length > this.maxGraphElements) {
                    this.graph.shift();
                  }

                }
                //if(t=== this.se)
                t.price = price;
              });
    },
      /*
      filteredTickers() {
          const start = (this.page - 1) * 6;
          const end = this.page * 6;
          const endPage = this.tickers.filter(ticker => ticker.name.includes(this.filter)).length;

          this.hasNextPage = endPage <= end ? false : true;
          return this.tickers.filter(ticker => ticker.name.includes(this.filter)).slice(start,end);

      },*/
    formatPrice(price) {
      if(price === "-"){return price;}
      return price > 1 ? price.toFixed(2) : price.toPrecision(3);
    },
  /*
    async updateTickers(newTicker){
        if (!this.tickers.length) {
          return;
        }
            const data = await loadTickers(this.tickers.map(t=>t.name));
            //console.log(this.tickers.map(t=>t.name));
            //console.log(data);
            this.tickers.forEach(ticker => {
              const price = data[ticker.name.toUpperCase()];
              ticker.price = price ? this.formatPrice(price) : '-';

            });

    },
        */

    addDop(l=null) {
      l= l.toUpperCase();
      var get = this.nameUse.indexOf(l);
      if (get === -1) {
        this.nameUse.push(l);
        this.dispMess = "none";
        const newTicker = {
          name: l,
          price: "-",
        };
        this.tickers.push(newTicker);
        subscribeToTicker(newTicker.name ,
                newPrice => this.updateTicker(newTicker.name, newPrice)
        );

      } else {
        this.dispMess = "block";
      }

      //console.log(this.tickers);
      //console.log(l);
      //console.log(this.ticker);

      //сохраняем данные чтобы не потерялись при перезагрузки
      localStorage.setItem('cryptonomicon-list', JSON.stringify(this.tickers));
    },
    onInput(ee) {
      const e = ee.target.value.toUpperCase();

      const getBitoc = this.dataALL.indexOf(e);
      var startInd;
      if ((getBitoc > 0) && (getBitoc < this.dataALL.length - 3)) {
        startInd = getBitoc - 1;
      } else if (getBitoc == 0) {
        startInd = 0;
      } else if (getBitoc > (this.dataALL.length-3)) {
        startInd = this.dataALL.length - 5;
      }

      for (var index=0; index < this.nameT.length; ++index) {
        this.nameT[index] =  this.dataALL[startInd];
        ++startInd;
      }
      console.log(getBitoc);
      this.nameUse.indexOf(e) === -1 ? this.dispMess = "none" : this.dispMess = "block";
    },

    ad(ticker) {
      //переменная
      this.ticker = ticker;
      const newTicker = {
        name: this.ticker.toUpperCase(),
        price: "-",
      };
      //debugger;
      if (this.nameUse.indexOf(this.ticker.toUpperCase()) == -1) {
        this.tickers.push(newTicker);
        this.nameUse.push(this.ticker.toUpperCase());

        //сохраняем данные чтобы не потерялись при перезагрузки
        localStorage.setItem('cryptonomicon-list', JSON.stringify(this.tickers));

        //subscribeToTicker(this.ticker.name,()=>{});
        subscribeToTicker(newTicker.name , /*(price)=>{
                console.log("ticker price changed to", price, ticker.name);
              });*/
                newPrice => this.updateTicker(newTicker.name, newPrice)
        );
        alert(newTicker);
        this.ticker = "";
        this.filter="";


      } else {
        this.dispMess = "block";
      }

    },
    handleDelete(tickerToRemove) {
      this.tickers = this.tickers.filter((t) => t != tickerToRemove);
      this.nameUse = this.nameUse.filter((t) => t != tickerToRemove.name);
      unsubscriberFromTicker(tickerToRemove.name);
      localStorage.setItem('cryptonomicon-list', JSON.stringify(this.tickers));
      if (this.sel === tickerToRemove) {
          this.sel = null;
      }
    },
    select(ticker) {
      this.sel = ticker;
      //$nextTick() - метод во vue ждёт обновление dom
      //код ниже это callback
      /*
      this.$nextTick(() => {
        this.calculateMaxGraphElements();
      });*/
      //код ниже это promise
      this.$nextTick().then(this.calculateMaxGraphElements
      );

    },
    async getApi() {
        const f = await fetch(
                `https://min-api.cryptocompare.com/data/all/coinlist?summary=true`
        );
        const data = await f.json();

        for (var key in data.Data) {
          this.dataALL.push(key);
        }
        this.dataALL.sort();

        console.log(this.dataALL);

    },
    openclose(){
      if (this.openmodal === 'block') {
        this.openmodal='none';
        this.closemodal='block';
      } else {
        this.openmodal='block';
        this.closemodal='none';
      }
      console.log('действие произошло');

    },
    onopen(){
      this.openmodal='none';
      this.closemodal='block';
    },
    onclose(){
      this.openmodal='block';
      this.closemodal='none';
    }
  },
    //watch - отслеживает изменение переменных
    //в watch - выносят логику когда что-то меняют на что-то, то исполни что-то
    watch:{
      sel() {
          this.graph = [];
      },
        endPageConst() {
            if (this.endPageConst==this.startIndex && this.page >1) {
                this.page -= 1;
            }
        },

        filter(){
            this.page = 1;
        },

        pageStateOptions(v) {
            window.history.pushState(
                null,
                document.title,
                `${window.location.pathname}?filter=${v.filter}&page=${v.page}`
            );
        },
        FOOtick(){
          this.foolTickers[FOOtick] = FOOtick;
        }
    }

};
</script>

<style src="./app.css"></style><!--
<style src="./bootstrap.min.css"></style>
-->