app.component('Timer', {
    data() {
        return {
            hours: '',
            minutes: '',
            seconds: '',
            timer: null,
            name: '',
            image: null,
            imageUrl: null,
            imageSize: '5rem',
            soundUrl: 'C:/Users/juang/OneDrive/Escritorio/Proyecto/SOUNDS/alarma.mp3'
        }
    },
    computed: {
        displayTime() {
            return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
        }
    },
    mounted() {
        
    },
    methods: {
        playSound() {
            this.$refs.audio.play();
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
        startTimer() {
            const totalSeconds = (this.hours * 3600) + (this.minutes * 60) + this.seconds;
            let remainingSeconds = totalSeconds;
            this.timer = setInterval(() => {
                if (remainingSeconds <= 0) {
                    clearInterval(this.timer);
                    alert('¡Time of ' + this.name + ' finished!');
                    playSound();
                } else {
                    remainingSeconds--;
                    this.hours = Math.floor(remainingSeconds / 3600);
                    this.minutes = Math.floor((remainingSeconds % 3600) / 60);
                    this.seconds = remainingSeconds % 60;
                }
            }, 1000);
        }
    },
    template:
        /*html*/
        `
        <div class="item">
            <div>
                <div>
                  <h1>Agregar imagen y nombre</h1>
                  <div>
                    <label for="name">Nombre:</label>
                    <input type="text" id="name" v-model="name">
                  </div>
                  <div>
                    <label for="image">Imagen:</label>
                    <input type="file" id="image" @change="onImageChange">
                    <img :src="imageUrl" :style="{ width: imageSize, height: imageSize }" alt="Imagen">
                  </div>
                </div>
            </div>
            <div class=d-flex>
                <h1>Temporizador de cuenta regresiva personalizado</h1>
                <div>
                    <label for="hours">Horas:</label>
                    <input type="number" id="hours" v-model="hours">
                </div>
                <div>
                    <label for="minutes">Minutos:</label>
                    <input type="number" id="minutes" v-model="minutes">
                </div>
                <div>
                    <label for="seconds">Segundos:</label>
                    <input type="number" id="seconds" v-model="seconds">
                </div>
                <button @click="startTimer">Iniciar</button>
                <p>{{ displayTime }}</p>
                <audio ref="audio" :src="soundUrl"></audio>
            </div>
        </div>
        `
});