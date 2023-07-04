const superman ={
    nombre: 'Clack',
    apellido: 'Kent',
    poder: 'Todos los poderes',
    getNombre(){
        return `${this.nombre} ${this.apellido} ${this.poder}`
    }
}
/*
forma numero 1 de hacer desestructuracion
console.log(superman.getNombre());
*/

/*
forma numero 2 de hacer desestructuracion
const nombre = superman.nombre;
const apellido = superman.apellido;
const poder = superman.poder;

console.log(nombre, apellido, poder);
*/
/*
forma numero 3 de hacer desestructuracion
const { nombre, apellido, poder, edad = 48} = superman;

console.log(nombre,apellido,poder,edad);
*/

function ImprimirHero({nombre, apellido, poder, edad = 25 }){
    nombre= 'Logan';
    console.log(nombre, apellido, poder, edad);
}

//ImprimirHero(superman);

const Heroe=['Iron Man', 'Batman', 'Pokemon'];

const [ , , h3 ] = Heroe;

console.log(h3);