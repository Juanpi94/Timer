app.component('Timer2', {
    data() {
        return {
            nombre: '',
            imagenUrl: 'https://example.com/imagen.jpg',
            horas: 0,
            minutos: 0,
            segundos: 0,
            temporizador: null
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        iniciar() {
            this.temporizador = setInterval(() => {
                if (this.segundos === 59) {
                    this.segundos = 0;
                    if (this.minutos === 59) {
                        this.minutos = 0;
                        this.horas++;
                    } else {
                        this.minutos++;
                    }
                } else {
                    this.segundos++;
                }
            }, 1000);
        },
        pausar() {
            clearInterval(this.temporizador);
        },
        detener() {
            clearInterval(this.temporizador);
            this.horas = 0;
            this.minutos = 0;
            this.segundos = 0;
        },
        reiniciar() {
            this.detener();
            this.iniciar();
        },
        aumentar(minutos) {
            this.minutos += minutos;
            if (this.minutos > 59) {
                this.horas += Math.floor(this.minutos / 60);
                this.minutos = this.minutos % 60;
            }
        },
        disminuir(minutos) {
            this.minutos -= minutos;
            if (this.minutos < 0) {
                this.horas += Math.floor(this.minutos / 60) - 1;
                this.minutos = 60 + (this.minutos % 60);
            }
        }
    },
    template:
        /*html*/
        `
        <div class="card">
            <div class="card-header">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model="nombre">
            </div>
            <div class="card-body">
                <img :src="imagenUrl" alt="Imagen">
                <div class="tiempo">
                    <span>{{ horas.toString().padStart(2, '0') }}</span>:
                    <span>{{ minutos.toString().padStart(2, '0') }}</span>:
                    <span>{{ segundos.toString().padStart(2, '0') }}</span>
                </div>
                <div class="botones">
                    <button @click="iniciar">Iniciar</button>
                    <button @click="pausar">Pausar</button>
                    <button @click="detener">Detener</button>
                    <button @click="reiniciar">Reiniciar</button>
                    <button @click="aumentar(60)">+1h</button>
                    <button @click="aumentar(10)">+10m</button>
                    <button @click="aumentar(5)">+5m</button>
                    <button @click="aumentar(2)">+2m</button>
                    <button @click="aumentar(1)">+1m</button>
                    <button @click="disminuir(1)">-1m</button>
                    <button @click="disminuir(2)">-2m</button>
                    <button @click="disminuir(5)">-5m</button>
                    <button @click="disminuir(10)">-10m</button>
                </div>
            </div>
        </div>
        `
});