const formLogin = document.getElementById("login");
const btnEl = document.getElementById("btnform");
//console.log(formLogin);

/*
obtener la dta del localstorage si existe ese email
comparar contraseñas
redirigir al usuario
boton cambiar clases
*/

formLogin.addEventListener("submit", (event) =>{
    event.preventDefault();
    const email = event.target.elements["idEmail"].value;
    const password = event.target.elements["idPassword"].value;
    const localData = getUserInfo(email);
    if(localData === undefined){
        btnEl.classList.remove("btn-primary");
        btnEl.classList.add("btn-danger");
        return;
    } 
        

    if(checkPassword(localData, password)){
        btnEl.classList.remove("btn-primary");
        btnEl.classList.remove("btn-danger");
        btnEl.classList.add("btn-success");
        setTimeout(()=>{
            window.location.href = "../pages/user.html"
        }, 500)
    }else{
        //cambia el estilo del elemento email a rojo
        //event.target.elements["idEmail"].style.backgroundColor = "red";
        //si queremos que se quite la clase podemos usar toggle
        btnEl.classList.remove("btn-primary");
        btnEl.classList.add("btn-danger");
        return;
    }
    
});

const getUserInfo = (email) => {
    const data = localStorage.getItem(email);
    if(data === null) return;
    // console.log(data);
    return JSON.parse(data);
}

//usando destructuring obtenemos el password de nuestro objeto
const checkPassword = ({password}, loginPassword) =>{
    console.log({password});
    console.log({loginPassword});
    return password === loginPassword;
}


// btnCambio.addEventListener("click", () => {
//   btnCambio.classList.toggle("btn-primary");
// })
