
const input = document.querySelector('#texto') ; // tambien se puede usar document.getelementbyi('texto') ;
const resultado = document.querySelector('#resultado') ; // document.getelementbyid('resultado') ;
const resultadoEnMayuscula = document.querySelector('#resultadoMayusculas') ;

input.addEventListener('input',function(){

    const texto = input.value ; 
    resultado.textContent = texto ; 
    resultadoEnMayuscula.textContent = '' ; // si ingresamos otro input el texto anterior que estaba en mayusculas desaparece 

}) ;

const boton = document.querySelector('.btn') ;

boton.addEventListener('click',function() {
 
    resultadoEnMayuscula.textContent = texto.value.toUpperCase();

}) ;    

