
window.onload = function(){

    const selectElement = document.forms[0].categoria; //document.forms es el array que contiene el formulario de la pagina
                                                       //accedo al primer formulario de la pagina
                                                       //se crea automatic, el array elements por cada formulario

    //Creare dos eventos para cuando se les de click al boton
    const containerForm = document.getElementById("container");
    const container2 = document.getElementById("movies");
    
    const sendButton = document.getElementById("send-button");
    const completar = document.getElementById("completar");
    
    //Sucederan dos eventos, cuando se envie el formulario: la validacion y la compra
    sendButton.addEventListener('click', validate);
    completar.addEventListener('click', completarCompra);
    
    //Cuando a la casilla con evento change, cuando a la casilla selected se le cambie el valor va a ejecutarse un evento
    selectElement.addEventListener('change', mostrarPeli);
    
    product_list = [];//Declaro un array vacio por que aqui ira lo que el cliente agregue//
    let ids = 0; //Para que a cada objeto se le agregue un id unico
    
    let elementos = document.forms[0].elements; //Se obtiene el primer elemento del primer formulario, los elementos estan con name 
    

    //Validacion de eleccion del cliente

    function validate(e){ //Esta es la funcion para validar y recibira el evento e
        e.preventDefault(); //Evita que se refresque la pagina por default
    
        let patron = /^\s+/; //Para detectar espacios vacios;
        let opciones = ["Top Gun Maverick","Jurassic World Dominio","Dr Strange, Multiverso de Locura","Minions: nace un villano", "Lightyear"];
        let categoria = elementos[0]; //Seleccionar la categoria cine o teatro
        let movie = elementos[1].value; //Selecciona la pelicula que desea
        let cantidad = elementos[2].value; //El segundo campo no puede ser nulo, no puede tener longitud de 0, la tercera condicion indica que no pueden ser solo espacios vacios
        
        if (categoria.selectedIndex == 0){
            return false; //Si todavia no cambie la categoria devolvera falso, no se produce la compra
        }
        else if (!opciones.includes(movie)){
            console.log("Opción inválida");   
            return false; //Si las opciones no incluyen movie, devuelve falso y no envia
        } 
        
        else if(movie == null || movie.length == 0 || patron.test(movie) || /\d+/.test(movie)){   
            return false; //Si movie es nulo, si no hay nada escrito o si el patron descubre que hay espacios vacios o si existe algun digito o numero tmb retornara falso
        
        }else if(cantidad == null ||isNaN(cantidad) || cantidad <=0 || cantidad>10) {   
            return false; //Si la cantidad es igual a 0 o si Nan en cantidad o si la cantidad esta en numeros negativos o es menos a 0, o cantidad es mayor a 10, devolvera falso
        
        }else{
            addProduct(); //Si las condiciones anteriores no se cumplen se agregara la pelicula
        }
        //Cambiar el estilo CSS de la lista de productos
        if (product_list.length >0){
            completar.style.display = "block";
        }  
    }
    
    function mostrarPeli(){
        if(selectElement.value=="Pelicula"){
            container2.textContent = "Atencion: Reserve su entrada desde aqui   Pague desde cualquier medio electronico  Reciba su entrada en la app o el correo ";
        }
        else if (selectElement.value=="Obra de Teatro"){
            container2.textContent=" Lo lamentamos, la venta de localidades se realiza el dia del espectaculo en el teatro";
        }        
    }
    
////////////Obtener los combos desde el JSON/////////////////   
const cargarJSONbtn = document.querySelector('#cargarJSON');
cargarJSONbtn.addEventListener('mouseover', obtenerCombos);

function obtenerCombos(){

    const url = '/combos.json';
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => mostrarHTML(resultado))
}

function mostrarHTML(combos){
    const contenido = document.querySelector('.combosCine');

    let html = '';

    combos.forEach (combo => {
     let extra = document.createElement("combo");
     extra.innerText = combo.id;
     extra.innerText = combo.name;
     extra.value = combo.value;

     html += `
     <input type="checkbox" id=${combo.id} name=${combo.name} value=${combo.value}>
     <p>${combo.name}</p>
     
     `;
    });
    
contenido.innerHTML = html;
}

/////////////// Funciones //////////////////////////////

    function addProduct () { 
       
        let id = ids;
        let movie = elementos[1].value;
        let categoria = elementos[0].value;
        let age = document.forms[0].age.value;
     
        let c1 = document.getElementById("1");
        let c2 = document.getElementById("2");
        let c3 = document.getElementById("3");
        let c4 = document.getElementById("4");
        
        let combos = [c1,c2,c3,c4];
        
        let producto = new Producto(id, categoria, movie,elementos[2].value, age, combos);
        console.log(producto.id);
        ids+=1; //Operador ++
    

        const element = document.createElement('div'); //Crear un div vacío
        element.className ="card";  //Se añadira la clase card al elemento creado para darle formato
            
        element.innerHTML =  //Creo una plantilla de HTML y se ira agregando cada atributo
        `<p>
            <strong>${categoria} ${producto.movie}</strong>
            <br>
            Cantidad: ${producto.cantidad}<br>   
            Precio: $ ${producto.precio}<br>   
            Extras: ${producto.extras}<br> 
            Total a pagar: $ ${producto.getTotal()} <br>
            <p>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp <img src="../img/qrcode.png" width="100%"></p>
            <p>Escanea este codigo para efectuar el pago o bien abona en caja, presentandote 30min antes de la funcion. <br>
            Jubilados y estudiantes pueden obtener hasta un 20%OFF en el valor de su compra.<br>
            Menores de 18 años no pueden reservar entradas por este medio. <br>
            Los asientos permaneceran reservados durante 24hs y se confirmaran con el pago de las entradas.</p>
        </p>
        <input type="button" class="button" name="delete" value="Eliminar">
        `;
    

        //Guardo la seleccion del cliente en LS  //////////////////////////////////////////
        const productoString = JSON.stringify(producto);
        localStorage.setItem('producto', productoString);
    
        //Convierto el string en objeto //////////////////////////////////////////////////
        const productoJSON = localStorage.getItem('producto');
        console.log(JSON.parse(productoJSON));


        //Añadir elemento en la pantalla
        container.appendChild(element);
        
        //Añadir un nuevo producto a la lista interna del programa
        product_list.push(producto); //con push agrego el producto
        
        //Para borrar el formulario
        document.forms[0].reset();
        
        //Mostrar la lista de producto
        console.log(product_list);
        
        //Esta función es para evitar un error y clicks infinitos
        container.removeEventListener("click", deleteProduct);
        
        container.addEventListener("click", function(e){
        console.log(e.target+": "+e.target.name+" "+ producto.id);
        if(e.target.name === 'delete'){
            deleteProduct(e.target, producto.id);
        }else{
            return;
        }
    }); 
        return false;
    }

    function time(){
        setTimeout(() => {
            Swal.fire ({
                titleText: 'MUCHAS GRACIAS POR ELEGIRNOS',
                text: 'En instantes, sera redirigido a la plataforma de pago',
                icon: 'info',
                width: '50%',
                color: 'goldenrod',
                background: 'rgb(13, 13, 13)'
            })
            window.location.href = 'https://www.mercadopago.com.ar/paid?code=V1C70X&utm_source=google&utm_medium=cpc&utm_campaign=MLA_MP_G_AO_ALL_BRD_SEARCH_MP_EXACT&matt_tool=28766038&matt_word=MLA_MP_BRD_EXACT&gclid=Cj0KCQjw2MWVBhCQARIsAIjbwoM_cNvCVaBYDPpSTDUR8s4gIzSglr9LLBI2sILwtL5zHIYS1G_yqJ8aAjFREALw_wcB';
        }, 5000);
    }
    
    //////Calcular el monto total de la compra
    function completarCompra(){
        let total = 0;
        for(i=0; i< product_list.length; i++){ //Recorro el array de producto
        console.log(product_list[i]);
             total+=product_list[i].getTotal();
        }
        Swal.fire(
            'La reserva se ha realizado con exito!',
            'Monto total a pagar: $' + total,
            'success'
        )
        time()
    }
    
    
    //////Función para borrar un producto recibiendo su ID (numérico)
    function deleteProduct(element, id){
        if(element.name === 'delete'){
            element.parentElement.remove();
            if(product_list.length > 0){
                product_list.splice(id,1); //con splice elimino del id, 1 elemento
                ids-=1;
            }
                console.log("Productos: "+ product_list.length);
        }else{
            return;
        }
    }
    
    /////////Uso un metodo con una funcion constructora, para crear una especie de objeto nuevo
    function Producto(id, tipo, movie, cantidad, age, combos){
        this.id = id; 
        this.tipo = tipo;
        this.movie = movie;
        this.cantidad = cantidad;
        this.age = age;
        this.extras="";
    
        
        console.log("ID: "+id); //cuando se cree un objeto mostrara el id
        
        switch (movie){
            case "Top Gun Maverick":
                this.precio = 1000.00;
                break;
            case "Dr Strange, Multiverso de Locura":
                this.precio = 1000.00;
                break;
            case "Jurassic World Dominio":
                this.precio = 1150.00;
                break;
            case "Minions: nace un villano":
                this.precio = 800.00;
                break;
            case "Lightyear":
                this.precio = 900.00;
                break;
        }
        
        this.subtotal = this.cantidad*this.precio;
        
        let edad = 0;
        
        if(this.age == "adulto"){
            edad+=0.00;
        }
        else if(this.age == "estudiante"){
            edad-=200.00;
        }else{
            edad-=200.00;
        }
        
        let adicional = 0;
    
        for (let i=0; i<combos.length;i++){
               if(combos[i].checked == true){
                   adicional+=1500.00;
                   this.extras+=combos[i].value+",";
               }
        }
    
        this.getTotal = function (){
            let total = this.subtotal + edad + adicional;
            return total;
        }  
    }

    
    }


       