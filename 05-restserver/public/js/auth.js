const miFormulario = document.querySelector("form");

const url = window.location.hostname.includes("localhost")
    ? "http://localhost:8080/api/auth/"
    : "https://abcde.herokuapp.com/api/auth/google";

  miFormulario.addEventListener("submit", ev => {
    ev.preventDefault();

    const formData = {};

    for (let el of miFormulario.elements) {
      if (el.name.length > 0) {
        formData[el.name] = el.value;
      }
    }

    fetch(url + "login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then(({msg, token}) =>{
        if(msg){
            return console.error(msg);
        }
        localStorage.setItem('token', token)
      })
      .catch((err) => {
        console.log(err);
      });
  });

function handleCredentialResponse(response) {
  

  const id_token = response.credential;
  var data = { id_token };
  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var myInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(data),
  };

  var myRequest = new Request(url, myInit);

  fetch(myRequest)
    .then((resp) => resp.json())
    .then((resp) => {
      localStorage.setItem("mail", resp.usuario.mail);
    })
    .then((data) => console.log("Nuestro Server", data))
    .catch(console.warn);
  console.log("id_token", response.credential);
}

const button = document.getElementById("google_signout");
button.onclick = () => {
  console.log(google.accounts.id);
  google.accounts.id.disableAutoSelect();

  google.accounts.id.revoke(localStorage.getItem("mail"), done => {
    localStorage.clear();
    location.reload();
    console.log("Usuario deslogueado");
  });
};
