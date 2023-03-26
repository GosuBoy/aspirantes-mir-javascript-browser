// Obtener elementos del DOM
const form = document.querySelector('form');
const name_input = document.querySelector('#name');
const email_input = document.querySelector('#email');
const section = document.querySelector('section');
const delete_button = document.querySelector('#delete');

// Manejar el evento de enviar el formulario
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userData = new Object();  
    userData.name = name_input.value ;  
    userData.email = email_input.value ;
    section.innerHTML = `User: ${userData.name} ${'<br>'} Email: ${userData.email}` ;   
    localStorage.setItem('data', JSON.stringify( userData ) ) ;
});

delete_button.addEventListener('click', deleteName ) ; 

// Función para mostrar el nombre guardado en localStorage
function showName() {
    $data = JSON.parse(localStorage.getItem('data')) ;
    $data? section.innerHTML = `User: ${$data.name} ${'<br>'} Email: ${$data.email}` : section.innerHTML = 'Not data found' ;
    
}

// Función para borrar el nombre guardado en localStorage
function deleteName() {
    localStorage.removeItem('data') ;
    showName() ;
 }

// Mostrar el nombre guardado al cargar la página
showName();