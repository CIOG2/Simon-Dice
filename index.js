const btnEmpezar = document.getElementById('boton-empezar');
const bodycolor = document.getElementById('body-color');
const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const ULTIMO_NIVEL = 10;


class Juego{
    constructor(){
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarSecuencia(); 
        setTimeout(() => {
            this.siguenteNivel();   
        }, 1000);
    }

    inicializar() {
        this.siguenteNivel2 = this.siguenteNivel.bind(this);
        this.elegirColor = this.elegirColor.bind(this);
        btnEmpezar.classList.add('hide');
        this.nivel = 1;
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    generarSecuencia() {
        //fill funciona para darles un valor a los numeros en este caso 0,
        //porque si los numeros no estan asignados el metodo map
       this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n  => Math.floor(Math.random() * 4));
    }

    siguenteNivel() {
        this.subNivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }

    transformarNumeroAColor(num) {
        switch (num) {
            case 0:
                return 'celeste';

            case 1:
                return 'violeta';

            case 2:
                return  'naranja';  

            case 3:
                return 'verde';
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0;

            case 'violeta':
                return 1;

            case 'naranja':
                return  2;  

            case 'verde':
                return 3;
        }
    }

    iluminarSecuencia() {
        for(let i = 0; i < this.nivel; i++){
           const color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(() => this.iluminarColor(color), 1000 * i);
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light')
         
        setTimeout(() => this.apagarColor(color), 350);
    }

    apagarColor(color){
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }
    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev) {
        const nombreDelColor = ev.target.dataset.color;
        const numeroDelColor = this.transformarColorANumero(nombreDelColor);
        this.iluminarColor(nombreDelColor);
        
             if(numeroDelColor === this.secuencia[this.subNivel]){
            this.subNivel++;
                                
             if(this.subNivel === this.nivel){
                this.nivel++;

                this.eliminarEventosClick();
                
                if(this.nivel === (ULTIMO_NIVEL + 1)){
                    this.ganoElJuego();
                }else{
                    setTimeout(this.siguenteNivel2, 1500)
                }
            }
        }else {
            this.perdioElJuego();
        }
    }

    ganoElJuego() {
        swal('Easy', 'Felicidades, Ganaste el juego!', 'success')
        .then(() => {
            this.inicializar();
            btnEmpezar.classList.remove('hide');
            setTimeout(() => {
                btnEmpezar.classList.remove('hide');
            }, 1000);
        })
    }

    perdioElJuego() {
        swal('Sigue intentandolo', 'perdiste :(', 'error')
        .then(() => {
            this.eliminarEventosClick();
            this.inicializar();
            setTimeout(() => {
                btnEmpezar.classList.remove('hide');
            }, 1000);
        })
    }
}

function empezarJuego(){
    window.juego = new Juego();
}