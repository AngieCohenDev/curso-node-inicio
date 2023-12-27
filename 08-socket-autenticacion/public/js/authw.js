const miFormulario = document.querySelector('form');

const url = (window.location.hostname.includes('localhost'))
            ? 'http://localhost:8080/api/auth'
            :  'https://restserver-curso-fher.herokuapp.com/api/auth';


miFormulario.addEventListener('submit', ev =>{
    ev.preventDefault();

    const formData = {};

    for(let el of miFormulario.elements){
        if(el.name.length > 0){
            formData[el.name] = el.value
        }
    }

    fetch(url + 'login',{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })

});
