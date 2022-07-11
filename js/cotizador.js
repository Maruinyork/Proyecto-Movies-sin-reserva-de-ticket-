/*----Variables----*/
const containerSeat = document.querySelector('.containerSeat'); //selecciono de la fila de asientos
const butacas = document.querySelectorAll('.row .seat:not(.occupied');
const cuenta = document.getElementById('cuenta');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let precioTicket = +movieSelect.value;


//Selecciono los asientos
function actualizaSeleccion() {
  const seleccionButaca = document.querySelectorAll('.row .seat.selected'); //selecciono las butacas que tienen la clase selected
  const seleccionButacaCuenta = seleccionButaca.length;

  cuenta.innerText = seleccionButacaCuenta;
  total.innerText = seleccionButacaCuenta * precioTicket;
}


// Cambiar precio cuando se cambie la seleccion
movieSelect.addEventListener('change', (e) => { 
  precioTicket = +e.target.value; //El precio se conforma del objetivo mas el value que esta declarado en el html
  actualizaSeleccion();
});

// Para seleccionar el asiento
containerSeat.addEventListener('click', (e) => { //cuando hago click, sucede el evento
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected'); // Si el objetivo contiene la clase seat y ocupado,  al clickear lo marcara como seleccionado

    actualizaSeleccion(); //actualiza el precio llamo a la funcion para actualizar
  }
});



