
function obtenerListaUsuarios(){
    let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'));
    if(listaUsuarios ==null){
        listaUsuarios = 
        [
        //id, nombre, apellido, correo,           contraseña, fecha nacimiento, cliente:1  admin:2
        ['1', 'MaruB', 'Bas', 'mariabas@gmail.com', 'maru83', '1983-04-17','2'],
        ['2', 'EricB', 'Bellezza', 'ericbellezza@gmail.com', 'ericoder', '1995-06-02','1'],
        ['3', 'ThonyT', 'Trillo', 'anthonytrillo@gmail.com', 'thonycoder', '1990-06-02','1']
        ]
    }
    return listaUsuarios;
}

function validarIdentidad(paramCorreo, paramPassword){
    let listaUsuarios = obtenerListaUsuarios();
    let acceso = false; //utilizo esta variable booleana
    for(let i=0; i < listaUsuarios.length; i++){ //recorrere esta lista y si hay coincidencias la variable cambiara a true
        if(paramCorreo == listaUsuarios[i][3] && paramPassword == listaUsuarios[i][4]){
            acceso = true;
            sessionStorage.setItem('usuarioActivo', listaUsuarios[i][1] + ''); //la sesion estara activa mientras no se cambie o cierre la pestaña
            sessionStorage.setItem('rolUsuarioActivo', listaUsuarios[i][6]);   //creo las variables usuario activo y rolusuario y se guardara el nombre del usuario dentro
        }
    }
    return acceso;
}
