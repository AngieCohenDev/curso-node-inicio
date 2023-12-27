
function handleCredentialResponse(response) {
          
    // Google Token : ID_TOKEN
    
    const body = {id_token: response.credential};

    fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(({token}) => {  
            localStorage.setItem('token', token);   
        })
        .catch(console.warn);
}


const button = document.getElementById('google_signout');
button.onclick = () =>{
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect()

    google.accounts.id.revoke(localStorage.getItem('mail'), done =>{
        localStorage.clear();
        location.reload();
    });
}
