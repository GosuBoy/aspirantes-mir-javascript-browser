/*!
 * Javier Chavez
 * Future Web Developer   
 * MakeItReal  
 * 2023  
 * 
 */

// i) Solution : Palindromes have an od or even number of characters. 

//  1. odd : compare characters from the center onwards , to find it we use (word.length - 1) / 2 
//  2. even : compare characters from center right and center left  , center right = (word.length) / 2 , centert left = centert right - 1 
//  3. why? : this methods will be more eficient than inverting every word and comparing it to its original 

// ii) Implementation : 

//  * I'll use this data sctructure: [object_array] , object = { 'word' : 'string' , even : 'boolean' , palindrome : 'boolean' }
//      1. Each word will become and object inside an array.
//      2. The "even" property will tell us witch method to use when determining if a word (or number) i a palindrome.   
//      3. The "palindrome" property will be usefull to sort palindromes and normal words.
//      4. $analize_text_for_palindrome() will return an object that contains the sorted words.

// iii) Extra : 

//      1. Using an API to get random words and analize them.

function num_is_even ( $number ) { 
    let is_even = false ;   
    if ( $number % 2 === 0 ) {
        is_even = true ;
    }
    return is_even ; 
}

function _odd_palindrome ( $word ) { 
    let is_a_palindrome = true ; 
    let middle = ($word.length-1) / 2 ;
    let r = middle ;
    let l = middle ;

    for ( let i = 0 ; i < middle ; i++ ) {
        r++
        l--

        if ( $word[r] !== $word[l] ) {
            is_a_palindrome = false ;
            break ;
        }
    }
    return is_a_palindrome ;
}

function _even_palindrome ( $word ) {
    let is_a_palindrome; 
    let middle = ($word.length) / 2 ;
    let r = middle ;
    let l = middle - 1 ;
    for ( let i = 0 ; i < middle ; i++ ) {
        if ( $word[r] !== $word[l] ) {
            is_a_palindrome = false ;
            break ;
        } else is_a_palindrome = true ;
        r++
        l--
    }
    return is_a_palindrome ;
}

function _remove_spaces ( $string ) { // receives a string and retuns isolated words array
    let $words_array = [] ; 
    let $array = $string.split(' ') ;
    $array.forEach(element => {
        if ( element.length > 0 ) {
            $words_array.push(element);
        } 
    }) ;
    return $words_array ;
}

function $create_object_from_template ( $template , ...$values ) { //will only add as many values as there are keys in the template 

    let $object = Object.create($template) ; 
    let i = 0 ; 
    for ( const $key in $object ) {
        $object[$key] = $values[i] ;
        i++ 
    }

    return $object ;
}

function $analize_text_for_palindrome ( $element ) {

    let $word_array;

    if ( typeof($element) === 'string' ) {
        $word_array = _remove_spaces($element)
    } else if ( Array.isArray($element) ) {
        $word_array = $element ; 
    } else return console.log('Not a valid data type') ;
     
    let $palindrome_object_array = [] ;

    const p_object = {
        word : '' ,
        even : undefined ,
        palindrome : undefined  
    }

    $word_array.forEach(element => {
        if ( num_is_even(element.length ) ) {
            $palindrome_object_array.push( $create_object_from_template ( p_object , element , true ) ) ;
        } else {
            $palindrome_object_array.push( $create_object_from_template ( p_object , element , false ) ) ;  
        }
    });

    //console.log($palindrome_object_array) ;
    
    $palindrome_object_array.forEach( $object => {

        if ( $object.even ) {
            //console.log("use _even_palindrome_function!!") ;    
            $object.palindrome = _even_palindrome($object.word) ;
        } else {
            //console.log("use_odd_palindrome_function!!")
            $object.palindrome = _odd_palindrome($object.word) ;
        }
    } ) ;
        
    console.log($palindrome_object_array) ;  

    let $palindromes_array = [] ;
    let $non_palindromes_array = [] ;

    //sort into two arrays : [palindrome]  , [non_palindrome] ;

    $palindrome_object_array.forEach ( $object => { 
        if ( $object.palindrome ) {
            $palindromes_array.push($object.word) ; 
        } else {
            $non_palindromes_array.push($object.word) ;
        }
    })

    // return an object containing palindromes: [] and non palindromes : [] 
    
    const $palindrome_object = {
        palindromes : [] ,
        normal_words : [] 
    }

    const $analized_words = $create_object_from_template ( $palindrome_object , $palindromes_array , $non_palindromes_array ) ;
    
    return $analized_words ; 
}

const this_are_palindromes = document.querySelector('#palindromes') ;
const this_are_normal_words = document.querySelector('#palabras-normales') ; 

const button = document.querySelector('.btn') ;
const input = document.getElementById('texto') ;

button.addEventListener('click',function(){
    
    let $analized_words_object = $analize_text_for_palindrome(input.value) ;

    this_are_palindromes.textContent = $analized_words_object.palindromes.join(', ') ; 

    this_are_normal_words.textContent = $analized_words_object.normal_words.join(', ') ;

}) ;

const api_request_button = document.querySelector('.api-request') ;
const random_words = document.querySelector('#random-words') ;
const analize_random_words = document.querySelector('.analize') ;

let  random_words_array = [] ;

document.querySelectorAll('.hidden').forEach( element => element.style.display = 'none' );  

let $toggle = document.querySelectorAll('.hidden') ;

api_request_button.addEventListener('click',function(){

    document.querySelectorAll('.hidden').forEach( element => element.style.display = 'none' );  

    console.log('requesting-data...') ;
    fetch('https://random-word-api.herokuapp.com/word?number=100&length=3')
        .then( response => response.json() ) 
        .then( array_in_json => {
            random_words.textContent = array_in_json.join(', ') ;
            random_words_array = array_in_json ;
        })    
        .catch( error => console.log(error) ) ;
       
})

analize_random_words.addEventListener('click',function() {


    $toggle.forEach ( element => element.style.display === "none"? element.style.display = "block": element.style.display = "none" )

    let obj = $analize_text_for_palindrome(random_words_array) ;
    let p1 = document.getElementById('random-palindromes') ;
    let p2 = document.getElementById('random-normales') ;

    p1.textContent = obj.palindromes.join(' ') ;
    p2.textContent = obj.normal_words.join(' ') ;

    console.log(obj);

}) 
