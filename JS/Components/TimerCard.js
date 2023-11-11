app.component('Timer', {
    data() {
        return {
            hours: 0,
            minutes: 0,
            seconds: 0,
            sav_hours: 0,
            sav_minutes: 0,
            sav_seconds: 0,
            timer: null,
            isBlock: false,
            name: "",
            image: null,
            imageUrl: null,
        }
    },
    computed: {
        displayTime() {
            return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
        }
    },
    mounted() {
        t
        const tiempoGuardado = localStorage.getItem('tiempo');
        if (tiempoGuardado) {
            const tiempo = JSON.parse(tiempoGuardado);
            this.hours = tiempo.hours;
            this.minutes = tiempo.minutes;
            this.seconds = tiempo.seconds;
        }
    },
    methods: {
        cambiarValor() {
            this.isBlock = !this.isBlock;
        },

        onImageChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.image = file;
                this.imageUrl = reader.result;
            };
        },

        iniciar() {
            this.sav_hours = this.hours;
            this.sav_minutes = this.minutes;
            this.sav_seconds = this.seconds;
            const totalSeconds = (this.hours * 3600) + (this.minutes * 60) + this.seconds;
            let remainingSeconds = totalSeconds;
            this.timer = setInterval(() => {
                if (remainingSeconds <= 0) {
                    clearInterval(this.timer);
                    alert('¡Time of ' + this.name + ' finished!');
                    if (this.sav_hours != 0 && this.sav_minutes != 0 && this - sav_seconds != 0) {
                        this.hours = this.sav_hours;
                        this.minutes = this.sav_minutes;
                        this.seconds = this.sav_seconds;
                    }
                } else {
                    remainingSeconds--;
                    this.hours = Math.floor(remainingSeconds / 3600);
                    this.minutes = Math.floor((remainingSeconds % 3600) / 60);
                    this.seconds = remainingSeconds % 60;
                }
                localStorage.setItem('tiempo', JSON.stringify(tiempo));
            }, 1000);
        },

        pausar() {
            clearInterval(this.timer);
        },

        detener() {
            clearInterval(this.timer);
            this.hours = this.sav_hours;
            this.minutes = this.sav_minutes;
            this.seconds = this.sav_seconds;
            localStorage.removeItem('tiempo');
        },

        reiniciar() {
            this.detener();
            this.hours = this.sav_hours;
            this.minutes = this.sav_minutes;
            this.seconds = this.sav_seconds;
            this.iniciar();
        },

        aumentar(minutes) {
            this.minutes += minutes;
            if (this.minutes > 59) {
                this.pausar();
                this.hours += Math.floor(this.minutes / 60);
                this.minutes = this.minutes % 60;
                this.iniciar();
            }
            const tiempo = {
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds
            };
            localStorage.setItem('tiempo', JSON.stringify(tiempo));
        },

        disminuir(minutes) {
            this.minutes -= minutes;
            if (this.minutes < 0) {
                this.hours += Math.floor(this.minutes / 60) - 1;
                this.minutes = 60 + (this.minutes % 60);
            }
            const tiempo = {
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds
            };
            localStorage.setItem('tiempo', JSON.stringify(tiempo));
        },
    },
    template:
        /*html*/
        `
        <div class="m-2 p-2 item bg-black bg-opacity-50 rounded-4 justify-content-center border">
            <div class="mb-2 d-flex w-100 h-25">
                <div class="p-2 me-1 w-25 bg-black bg-opacity-50 rounded-4">
                    <input v-model="name" v-if="!isBlock" class="text w-100 h-100 text-center text-info rounded-3 border-0 bg-dark bg-opacity-50" type="text">
                    <h4 v-model="name" v-if="isBlock" class="text text-info">{{ name }}</h4>
                </div>
                <div class="p-2 w-75 d-flex justify-content-around align-items-center bg-black bg-opacity-50 rounded-4">
                    <button class="btn btn-info fw-bold ms-2" type="button" @click="iniciar"><i class="fa-solid fa-play"></i></button>
                    <button class="btn btn-info fw-bold ms-2" type="button" @click="pausar"><i class="fa-solid fa-pause"></i></i></button>
                    <button class="btn btn-info fw-bold ms-2" type="button" @click="detener"><i class="fa-solid fa-stop"></i></button>
                    <button class="btn btn-info fw-bold ms-2" type="button" @click="reiniciar"><i class="fa-solid fa-clock-rotate-left"></i></button>
                    <button class="btn btn-info fw-bold ms-2" type="button" @click="cambiarValor" v-if="!isBlock"><i class="fa-solid fa-lock-open"></i></button>
                    <button class="btn btn-info fw-bold ms-2" type="button" @click="cambiarValor" v-if="isBlock"><i class="fa-solid fa-lock"></i></button>
                    <button class="btn btn-info fw-bold ms-2" v-bind:disabled="isBlock" type="button"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            <div class="w-100 h-75 d-flex">
                <div class="w-25 bg-black bg-opacity-50 rounded-4">
                    <img class="ajust-img p-2 rounded-4" :src="imageUrl" alt="Imagen">
                    <input class="w-100" type="file" v-if="!imageUrl" id="image" @change="onImageChange">
                </div>
                <div class="w-75 ms-1 p-1 bg-black bg-opacity-50 rounded-4">
                    <div class="p-1 text-info d-flex justify-content-between h-50 w-100 ">
                        <div class="d-flex w-25 m-1">
                            <label class="p-2 bg-black rounded-start-4 bg-opacity-75 d-flex align-items-center"
                                for="hours">H:</label>
                            <input v-bind:disabled="isBlock" class="text-center text-info rounded-end-4 border-0 bg-dark bg-opacity-25"
                                max="23" min="0" type="number" id="hours" v-model="hours">
                        </div>
                        <div class="d-flex w-25 m-1">
                            <label class="p-2 bg-black rounded-start-4 bg-opacity-75 d-flex align-items-center"
                                for="minutes">M:</label>
                            <input v-bind:disabled="isBlock" class="text-center text-info rounded-end-4 border-0 bg-dark bg-opacity-75"
                                max="59" min="0" type="number" id="minutes" v-model="minutes">
                        </div>
                        <div class="d-flex w-25 m-1">
                            <label class="p-2 bg-black rounded-start-4 bg-opacity-75 d-flex align-items-center"
                                for="seconds">S:</label>
                            <input v-bind:disabled="isBlock" class="text-center text-info rounded-end-4 border-0 bg-dark bg-opacity-75"
                                max="59" min="0" type="number" id="seconds" v-model="seconds">
                        </div>
                    </div>
                    <hr class="m-0">
                    <div class="h-50 mt-2 w-100">
                        <div class="p-1 w-100 d-flex btn-group-sm justify-content-around">
                            <button class="btn btn-info fw-bold ms-2" @click="aumentar(1)" type="button">+1m</button>
                            <button class="btn btn-info fw-bold ms-2" @click="aumentar(10)" type="button">+10m</button>
                            <button class="btn btn-info fw-bold ms-2" @click="aumentar(60)" type="button">+1h</button>
                            <button class="btn btn-info fw-bold ms-2" @click="disminuir(1)" type="button">-1m</button>
                            <button class="btn btn-info fw-bold ms-2" @click="disminuir(10)" type="button">-10m</button>
                            <button class="btn btn-info fw-bold ms-2" @click="disminuir(60)" type="button">-1h</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
});