<template>
    <section>
        <!-- Подключаем компонент кнопки -->
        <button-sign @click="ad" @mouseover="handleMouseover"  />
        <button v-if="!disabled"
                @click="getApi"
                type="button"
                class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
            <!-- Heroicon name: solid/mail -->
            <!-- добавляем компонент -->
            <!-- <PlusSignIcon /> -->
            <plus-sign-icon />
            Добавить
        </button>

        <div class="flex">
            <div class="max-w-xs">
                <label for="wallet" class="block text-sm font-medium text-gray-700"
                >Тикер {{ ticker }}
                </label>
                <div class="mt-1 relative rounded-md shadow-md">
                    <input
                            v-model="ticker"
                            v-on:keydown.enter="ad"
                            @input="onInput"
                            type="text"
                            name="wallet"
                            id="wallet"
                            class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                            placeholder="Например DOGE"
                    />
                </div>
                <div
                        class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap"
                >
              <span v-for="n in nameT"
                    @click ="addDop(n)"
                    class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
              >
                {{n}}
              </span>

                </div>
                <div :style="{display: dispMess}"
                     class="text-sm text-red-600">Такой тикер уже добавлен</div>
            </div>
        </div>

        <button-sign @click="ad" />

    </section>
</template>

<script>
    import ButtonSign from './AddButton.vue';
    import PlusSignIcon from './PlusSign.vue';
    export default {
        name: "AddTicker.vue",
        components: {
            ButtonSign,
            PlusSignIcon,
        },
        //получает данные с верхнего компонента
        props:{
            //имя
            disabled: {
                type: Boolean,
                required: false,
                default: false
            },
            nameT: {
                type: Object,
                required: false,

            },
            dispMess: {
                type: String,
                required: false
            }


        },
        //emits посмотреть в документации
        emits:{
            "add-ticker": value => typeof(value) === "boolean"
        },
        data(){
            return { ticker:''};

        },
        methods: {
            handleMouseover(){
               console.log('mouse');
            },
            ad(){
                this.$emit("add-ticker", this.ticker);
                this.ticker = "";
            },
            getApi(){
                this.$emit("add-get-api");

            },
            onInput (ee) {
                this.$emit("add-ticker-onInput", ee);
            },
            addDop (l) {
                this.$emit('add-ticker-addDop',l);
            },
        }
    }

</script>

<style scoped>

</style>