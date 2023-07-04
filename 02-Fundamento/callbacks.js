
const getUserById = (id, callback) => {

    const user = {
        id,
        user: 'Angie'
    }
    setTimeout(() => {
        callback(user);
    },1500)
}

getUserById(10, (usuario) =>{
    console.log(usuario.id);
    console.log(usuario.user.toUpperCase());
});