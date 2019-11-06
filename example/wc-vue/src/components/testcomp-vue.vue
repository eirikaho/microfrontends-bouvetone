<style scoped>

    #vue-component {
        border-style: solid;
        border-color: #41b883;
    }

</style>

<template>

    <div id="vue-component">
        <h2>En Vue-basert Web Component</h2>
        <p>Intern teller = <b>{{counter}}</b></p>
        <p>Ekstern teller = <b>{{externalCounter}}</b></p>
        <button v-on:click="counter += 1">Intern +1</button>
        <button v-on:click="dispatch">Ekstern +1</button>
    </div>

</template>

<script>

    export default {
        name: 'TestComp',

        mounted() {
            window.addEventListener('js:clicked', this.handleChange);
            window.addEventListener('react:clicked', this.handleChange);
            window.addEventListener('angular:clicked', this.handleChange);
        },

        destroyed() {
            window.removeEventListener('js:clicked', this.handleChange);
            window.removeEventListener('react:clicked', this.handleChange);
            window.removeEventListener('angular:clicked', this.handleChange);
        },

        data() {
            return {
                counter: 0,
                externalCounter: 0
            }
        },

        methods: {
            handleChange: function () {
                console.log('Vue-komponent: Event mottatt: clicked');
                this.externalCounter += 1;
            },

            dispatch: function () {
                console.log('Vue-komponent: Event dispatched: vue:clicked');
                window.dispatchEvent(new CustomEvent('vue:clicked', {
                    bubbles: true,
                }));
            }
        }
    }

</script>
