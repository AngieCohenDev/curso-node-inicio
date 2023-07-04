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

const getUsuarioInfo = async(id) =>{

    try{
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);

        return `El salario del empleado ${empleado} es de ${salario}`;
    }
    catch(error){
        throw error;
    }
}

const id = 6;

getUsuarioInfo(id)
    .then(msg => {
        console.log('TODO BIEN!!!');
        console.log(msg)
    })
    .catch(error =>{
        console.log('TODO MALLL!!!');
         console.error(error)
        });