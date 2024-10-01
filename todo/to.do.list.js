let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    



function newTodo() {
    
    
    let todoListHTML='';
    




    
        
    for(let i=0;i<todoList.length;i++){
        
        let todoObject=todoList[i];
        let name = todoObject.name;
        const dueDate = todoObject.dueDate;
        const assignedTo=todoObject.assign;
        console.log(todoList);
        
       
        


        
    
        
        const html = `<p class="script"
        >
      <br> Event Name: ${name} </br>
        <br> Due Date: ${dueDate}</br> 
        
       <br> Assigned to: ${assignedTo} </br>
        
        
        
        
        
        </p>
        <div class="button-text">
        <button class="button1" onclick="editTodo(${i})">Edit</button>
        <button class="button1" onclick="
        todoList.splice(${i},1);
        newTodo();
        localStorage.setItem('todoList', JSON.stringify(todoList));"
        
        >Delete</button>
        
        </div>`;
        todoListHTML+=html;
       


    }
        

    
    console.log(todoListHTML);

    document.querySelector('.js-Crazy').innerHTML=todoListHTML;
    


    

    



    

}

function addTodo() {
        
    const inputElement =document.querySelector('.js-Todo') ;
    const inputDate=document.querySelector('.js-Todo-Date');
    const assignedTo=document.querySelector('.js-assignedToo');
    const dueDate= inputDate.value;

    const name=inputElement.value ;

    const assign = assignedTo.value;


    if(name && dueDate && assign) {
        todoList.push({name : name,
            dueDate:dueDate,
            assign:assign
        })
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }else {
        alert("Please Fill All the Fields");
    }
    
    
    
    
    
    
    




    inputElement.value='';
    inputDate.value='';
    assignedTo.value='';

    newTodo() ;







    

}
function editTodo(index) {
    const todo = todoList[index];

    
    document.querySelector('.js-Todo').value = todo.name;
    document.querySelector('.js-Todo-Date').value = todo.dueDate;
    document.querySelector('.js-assignedToo').value = todo.assign;

    todoList.splice(index, 1);
    newTodo();
}













    







