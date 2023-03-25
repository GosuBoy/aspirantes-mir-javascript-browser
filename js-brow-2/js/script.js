const add_button = document.getElementById('add-button') ;
const delete_button = document.getElementById('delete-button') ;

add_button.addEventListener('click', $send_task ) ;

delete_button.addEventListener('click', $delete_tasks ) ;

function $send_task ( $event ) {
   
    $event.preventDefault() ;
    const $task_name = document.getElementById('add-input') ;
    console.log(typeof($task_name.value)) ;

    $create_new_task($task_name.value) ;
    
}

function $create_new_task ( $value ) {

    const $delete_button = document.getElementById('delete-button-container') ;
    
    const $_new_task = document.createDocumentFragment() ;
    
    const $list_item = document.createElement('li') ;

    const $checkbox = document.createElement('input') ;

    const $existing_tasks = document.querySelectorAll('input[type=checkbox]') ;

    $checkbox.addEventListener('click', $cross_checked_task) ;

    let _id = $id_asing ($existing_tasks) ;

    $checkbox.setAttribute('type','checkbox') ;

    $checkbox.setAttribute('id',_id) ;
    
    const $label = document.createElement('label') ;

    $label.setAttribute('for',_id) ;

    $label.textContent = $value ;

    $_new_task.appendChild($list_item) ;

    $list_item.appendChild($checkbox) ;  

    $list_item.appendChild($label) ;
    
    console.log($_new_task) ;

    $delete_button.parentNode.insertBefore($list_item,$delete_button) ;
}

function $id_asing ( $node_list ) {
    $last_index = $node_list.length ; 
    return $last_index ; 
}

function $delete_tasks () {
    
    const $existing_tasks = document.querySelectorAll('input[type=checkbox]:checked') ;

    $existing_tasks.forEach( element => {
        let $parent = element.parentNode
        $parent.remove();
    });

    console.log($existing_tasks);

    const $remaining_tasks = document.querySelectorAll('input[type=checkbox]') ;

    console.log($remaining_tasks) ;

    $reasing_ids (($remaining_tasks)) ; 

}

function $reasing_ids ( $node_list ) {

    for ( let i = 0 ; i < $node_list.length ; i ++ ) {
        
        console.log($node_list[i].labels[0].attributes.for.value , $node_list[i].id); // label: for ; 

        $node_list[i].labels[0].attributes.for.value = i ;  
        $node_list[i].id = i ; 

        console.log($node_list[i].labels[0].attributes.for.value , $node_list[i].id); // label: for ; 

    }

}

function $cross_checked_task ( $event ) {

    $event.target.labels[0].classList.toggle('crossed') ;
    
}