<template>

    <button :style="{
             display:openmodal}"
            class="border-b" @click="close"> -Ok- </button>
    <button @click="open" :style="{display:closemodal}"> Открыть модальное Окно</button>

</template>

<script>
    export default {
        name: "ModalButton",

        props: {
            openmodal: {
                type: String,
                required: false
            },
            closemodal: {
                type: String,
                required: false
            },
        },
        emits: {
            ok: null,
            close: null
        },

        methods: {
            openclose(){
                this.$emit('add-openclose')
            },
            close(){
                this.$emit('ok')
            },
            open(){
                this.$emit('close')
            }
        },
        /*
        data(){
            return {
                openmodal: 'block',
                closemodal: 'none',
            }
        },
        methods:{
            openclose(){
                if (this.openmodal ==='block') {
                    this.openmodal='none';
                    this.closemodal='block';
                } else {
                    this.openmodal='block';
                    this.closemodal='none';
                }
                console.log('действие произошло');

            }

        }*/
    }
</script>

<style scoped>

</style>