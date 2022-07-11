/*----Variables----*/
const containerSeat = document.querySelector('.containerSeat'); //selecciono de la fila de asientos
const butacas = document.querySelectorAll('.row .seat:not(.occupied');
const total = document.getElementById('total');

//Selecciono los asientos
function actualizaSeleccion() {
  const seleccionButaca = document.querySelectorAll('.row .seat.selected'); //selecciono las butacas que tienen la clase selected
  const seleccionButacaCuenta = seleccionButaca.length;

  total.innerText = seleccionButacaCuenta * precioTicket;
}

// Para seleccionar el asiento
containerSeat.addEventListener('click', (e) => { //cuando hago click, sucede el evento
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected'); // Si el objetivo contiene la clase seat y no esta ocupado, al clickear lo marcara como seleccionado

    actualizaSeleccion(); //actualiza el precio, llamo a la funcion para actualizar
  }
});




