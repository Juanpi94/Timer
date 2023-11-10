const app = Vue.createApp({
    data() {
        return {
            isBlock: false,
        }
    },
    mounted: function () {

    },
    methods: {
        cambiarValor() {
            this.isBlock = !this.isBlock;
          }
    },
});