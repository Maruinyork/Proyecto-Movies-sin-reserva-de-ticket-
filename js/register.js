/*----Variables----*/
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("pass");
const complejo = document.getElementById("complejo");
const boton = document.getElementById("btn-enviar");
const resultado = document.querySelector(".resultado");


boton.addEventListener("click", (e)=>{
    e.preventDefault()
    let error = validarCampos();

    const object = {
        nombre : document.querySelector("#nombre").value,
        email : document.querySelector("#email").value,
        pass : document.querySelector("#pass").value,
    };
    
    //Guardo en LS, convierto el objeto en string
    const save_localStorage = (object) =>{
                        /*Clave*//*Valor*/
    localStorage.setItem('data', JSON.stringify(object));
    }

    //Lee, obtiene y lo manda al formulario
    const read_localStorage = ()=> {
    let data = localStorage.getItem('data');
    console.log(data);

    //Convertimos el string en objeto
    const object = JSON.parse(data);
    console.log(object);

    document.querySelector("#nombre").value = object.nombre;
    document.querySelector("#email").value = object.email;
    document.querySelector("#pass").value = object.pass;
    }

//JSON pasara el objeto a string, lo muestro en consola
console.log(JSON.stringify(object));
//Guardare los datos en LStorage
save_localStorage(object);
read_localStorage();


//Validacion de formulario
    if (error[0]){
        resultado.innerHTML = error[1]; //se agrega el error
        resultado.classList.add("red")
    } else {
        resultado.innerHTML = "Solicitud enviada correctamente. Antes de reservar verifica tu correo";
        window.location.href = 'shop.html';
        resultado.classList.add("green");
        resultado.classList.remove("red");
    }
})

const validarCampos = ()=>{
    let error = [];
    if(nombre.value.length < 5 || nombre.value.length > 40) {
        error[0] = true;
        error[1] = "El nombre es invalido o no coloco alguno";
        return error;
    } else if (email.value.length < 5 ||
               email.value.length >40 ||
               email.value.indexOf("@") == -1 ||
               email.value.indexOf(".") == -1){
            error[0] = true;
            error[1] ="El mail es invalido";
            return error; 
    }else if (password.value.length <4 || password.value.length > 40){
            error[0] = true;
            error[1] ="El password es invalido";
            return error;
    } else if (complejo.value <4 ||complejo.value >40){
        error[0] = true; //si se da alguna de las arriba mencionadas el error se vuelve true, y se retorna
        error[1] = "Por favor, escriba el nombre de su cine favorito";
    }

    return error;
    
}
