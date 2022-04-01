<template>
    hello
    <div id="app" >
        <ul v-if="response">
            <li v-for ="user in response">
                {{user.name}}
            </li>
        </ul>

    </div>
</template>

<script>
    import {getCurrentInstance} from 'vue';//библиотека во vue возвращает this текущего компонента
    /*
    async function loadResponse(){
        const users = await fetch('https://jsonplaceholder.typicode.com/users').then(
            r => r.json()
        );
        return {users};
    }*/
    async function loadResponse(){
        const users = await fetch('https://jsonplaceholder.typicode.com/users').then(
            r => r.json()
        );
        return users;
    }
    export default {
        name: "App",
        data(){
            return {
                //users: null
                response: null
            }
        },
        /*
        async created(){
            this.users = await fetch('https://jsonplaceholder.typicode.com/users').then(
                r => r.json()
            );
            console.log('after')
        },*/
        /* другой пример */

        async created(){
            console.log('before');
            console.log(getCurrentInstance());
            this.response = await loadResponse();
            console.log('after');
            console.log(getCurrentInstance());
        },
        /* другой пример */
        /*
        created(){
            console.log(getCurrentInstance());
            console.log('before');
            loadResponse().then( (r)=>{
                this.response = r;
            } );
            console.log(getCurrentInstance());
            console.log('after');

        },*/


        methods: {

        },
    }
</script>

<style scoped>

</style>