/**
 * Para acceder a elementos del dom, siempre es mediante el document la 
 * primera vez
 * version old
 * .getElementById() //regresar el primer elemento con ese id
 * version mas nueva
 * .querySelector() // recibe un selector css, regresa igualmente el primero
 *  que encuentra
 * . clases
 * # ids
 * div selector de elemento
 * Seleccionar mas de un elemento
 *  .querySelectorAll();
 * .getElementsByClassName();
 */


const formEl = document.querySelector("form"); //elemento form
const divEl = document.querySelector(".message"); //clase
//console.log(formEl);

/*
agregando evento al elemento
recibe dos argumentos
1. tipo de eevento
2. una funciona de callback,
que efecto se va a desencadenar cuando ocurra ese evento

Para evitar el efecto por defecto de los elementos usamos 
preventDefault
*/

formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    divEl.innerHTML= "";
    // const fullName = event.target.elements["fullName"].value;
    //forma de obtener todos los valores de un formulario
    const formData = new FormData(formEl); //esto funciona para cuando el imput usa el atributo name
    // for(const [key,value] of formData){
    //     console.log(`key ${key} : value ${value}`);
    // }

    const arrayData = [...formData]; //usando spreed operator
    //console.log(arrayData);
    //convierte en un json
    const objectData = Object.fromEntries(arrayData);
    //uso del local storage
    //esto es en base al atributo name, no al id
    if(!checkPassword(objectData.password, objectData.confirmPassword)){
        renderError("Las contraseñas no coinciden");
        return;
    }
    //console.log(objectData);
    console.log(JSON.stringify(objectData));
    localStorage.setItem(objectData.email, JSON.stringify(objectData));
    renderSuccess("Tu registro fue exitoso");
    formEl.reset();
    setTimeout(() => {
        window.location.href ="/pages/login.html";
    }, 500);
})

//funcion para checar que ambas contraseñas sean iguales
const checkPassword = (password, confirmPassword) => password === confirmPassword;

//funcion para renderizar un mensaje de error
const renderError = (message) => {
    const alert = `
        <div class="alert alert-warning" role="alert">
            ${message}
        </div> 
    `;

    //opcion 1: InnerHTML
    //divEl.innerHTML = alert; //el innerHTML reemplaza el contenido html anterior por el nuevo
    //divEl.innerHTML += alert; //con el (+) agrega todo lo que tiene
    //innertext evita la inyeccion html

    //posiciones en html :afterbegin, afterend, beforebegin, beforeend
    divEl.insertAdjacentHTML("afterbegin", alert);
}

const renderSuccess = (message) =>{
    const alert = `
        <div class="alert alert-success" role="alert">
            ${message}
        </div>
    `

    divEl.insertAdjacentHTML("afterbegin", alert);
}


