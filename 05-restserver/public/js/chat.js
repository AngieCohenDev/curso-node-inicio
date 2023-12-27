const url = window.location.hostname.includes("localhost")
    ? "http://localhost:8080/api/auth/"
    : "https://abcde.herokuapp.com/api/auth/google";


let usuario = null;
let socket = null;

// Referencias HTML
const txtUid      = document.querySelector('#txtUid') 
const txtMens     = document.querySelector('#txtMens') 
const ulUsuarios  = document.querySelector('#ulUsuarios') 
const ulMensajes  = document.querySelector('#ulMensajes') 
const btnSalir    = document.querySelector('#btnSalir') 

// Validar el token del localstorage
const validarJWT = async() => {

    const token = localStorage.getItem('token') || '';

    if( token.length <= 10){
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch(url, {
        headers: {'x-token': token}
    });

    const {usuario : userDB, token: tokenDB} = await resp.json();
    localStorage.setItem('token', tokenDB);
    usuario = userDB;
    document.title = usuario.nombre;

    await conectarSocket();
}

const conectarSocket = async() => {
    socket = io({
        'extraHeaders':{
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', ()=>{
        console.log('Sockets online');
    });

    socket.on('disconnect', ()=>{
        console.log('Sockets offline');
    })

    socket.on('recibir-mensajes', (payload)=>{
        console.log(payload);
    })

    socket.on('usuarios-activos', dibujarUsuarios)

    socket.on('mensaje-pricado', ()=>{
        // TODO
    })


}

const dibujarUsuarios = (usuarios = []) =>{

    let usersHtml = '';
    usuarios.forEach(({nombre, iud}) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${nombre}</h5>
                    <spam class="fs-6 text-muted">${iud}</spam>
                </p>
            </li>
        `;
    });

    ulUsuarios.innerHTML = usersHtml;
}

txtMens.addEventListener('keyup', ({keyCode}) =>{

    const mensaje = txtMens.value;
    const iud  = txtUid.value;

    if( keyCode !== 13){ return;}
    if(mensaje.length === 0){return;}

    socket.emit('enviar-mensaje', {mensaje, iud});

    txtMens.value = '';
})

const main = async() => {

    // Validar JWT
    await validarJWT();

}


main();


