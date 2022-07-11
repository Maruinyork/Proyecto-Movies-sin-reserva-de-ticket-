
document.querySelector('#btnIngresar').addEventListener('click', iniciarSesion);

function iniciarSesion(){//Al iniciar Sesion se capturaran estos datos
    let tuCorreo ='';
    let tuPassword = '';
    let acceso = false;

    tuCorreo = document.querySelector('#txtCorreo').value;
    tuPassword = document.querySelector('#txtPassword').value;

    acceso = validarIdentidad(tuCorreo, tuPassword); //esta funcion viene de usuario.js
    if(acceso == true){ //viene de usuario.js
        ingresar();
    }
}
function ingresar(){
    let rol = sessionStorage.getItem('rolUsuarioActivo');
    switch(rol){
      case '1':
        success() //Se va a loguear y el usuario quedara en sessionStorage
        window.location.href = 'shop.html';
        break;
      case '2':
        console.log("administrador")
        window.location.href = 'shop.html';
        break;
      default: 
        break; //Como no tiene usuario activo la pagina permanecera en el mismo sitio obligandolo a registrarse   
    } 
}

function success(){
    Toastify({
        text: "Log in existoso",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          margin: "80px",
          color: "goldenrod",
          background: "rgba(13, 13, 13)",
        },
        onClick: function(){} 
      }).showToast();
}
