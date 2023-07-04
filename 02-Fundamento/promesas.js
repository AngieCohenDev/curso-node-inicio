const empleados = [
    {
        id: 1,
        name: 'Camila'
    },
    {
        id: 2,
        name: 'Jake'
    },
    {
        id: 3,
        name: 'Andrea'
    },
]

const salarios = [
    {
        id: 1,
        salario: 20000
    },
    {
        id: 2,
        salario: 1000
    },
]

const getEmpleado = (id) =>{
    return new Promise((resolve, reject ) => {

        const empleado = empleados.find( e => e.id === id)?.name;
        (empleado)
        ? resolve(empleado)
        :reject(`EL id ${id} no esta asociado a ningun empleado`);      
    });

}

const getSalario = (id) =>{
    return new Promise((resolve, reject) => {
        const salario = salarios.find(e => e.id === id)?.salario;
        (salario)
        ? resolve(salario)
        :reject(` No hay salario asosiado al id ${id}`);
    })
}

const id = 3;
/*
getEmpleado(   id)
    .then(empleado => console.log(empleado))
    .catch(err => console.error(err));

getSalario(id)
    .then(salario => console.log(salario))
    .catch(err => console.error(err));
*/

let nombre;
getEmpleado(id)
    .then (empleado =>{ 
        nombre = empleado;
        return getSalario(id)
    })
    .then(salario => console.log('EL empleado:', nombre, 'tiene un salario de:', salario))
    .catch(err => console.error(err));