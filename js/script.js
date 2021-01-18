// DOM Elements
const form = document.getElementById("form");
const taskInput = document.getElementById("taskInput");
const listGroup = document.getElementById("list-group");
const clearBtn = document.getElementById("clearBtn");
const searchTasks = document.getElementById("searchTask")

searchTasks.addEventListener("keyup" , filterTasks)



// Adding tasks to the list
form.addEventListener("submit" , addTasks);

function addTasks(e){
        //  alerts if input is empty
       if(taskInput.value === ""){
                alert("Please add a task");
        }else{
            // creating a list item
            const li =  document.createElement("li");

            // giving it a bootstrapclass for styling
            li.className = "list-group-item";
    
            // appending the text node
            li.appendChild(document.createTextNode(taskInput.value));
    
            // creating the delete btn
            const times = document.createElement("i")
    
            // giving it a bootstrap class
            times.className = "fa fa-times";
    
            li.appendChild(times);
    
            listGroup.appendChild(li);
    
            
    
            e.preventDefault();

            storeInputs(taskInput.value);

            
        }

        // Clearing the input once it is added
        taskInput.value = "";
       
      
    
}


// EventListener for ClearBtn 
clearBtn.addEventListener("click" , clearAll );

function clearAll(e){
    // removing a whole item
            while(listGroup.firstChild){
                listGroup.removeChild(listGroup.firstChild)
            }

       localStorage.clear();

}



// Deleting the single items
listGroup.addEventListener("click" , deleteTasks);

function deleteTasks(e){
    if(e.target.classList.contains("fa-times")){

        if(confirm("Do you want to delete it?")){
            e.target.parentElement.remove();

            removeTasks(e.target.parentElement);
        }
    }
}


// removing tasks from the local storage
function removeTasks(item){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
      
    }

    // iterating through the tasks for delete every item
    tasks.forEach(function(task ,index){
        if(item.textContent ===  task){
            tasks.splice(index , 1)
        }
    });

    localStorage.setItem("tasks" ,  JSON.stringify(tasks))
}



// storing the tasks in localstorage
function storeInputs(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
      
    }
    tasks.push(task);

    localStorage.setItem("tasks" , JSON.stringify(tasks))

}


// persisting the undeleted tasks even if the page loads
document.addEventListener("DOMContentLoaded" , retrievetasks);

function retrievetasks(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
      
    }
    tasks.forEach(task => {
        const li =  document.createElement("li");

            li.className = "list-group-item";
    
            li.appendChild(document.createTextNode(task));
    
            const times = document.createElement("i")
    
            times.className = "fa fa-times";
    
            li.appendChild(times);
    
            listGroup.appendChild(li);

    });
}


// filterValues
function filterTasks(e){
    let li = listGroup.querySelectorAll("li.list-group-item");

    let filteredValues = searchTasks.value.toUpperCase();
   
    for(i = 0 ; i < li.length ; i++){
        if(li[i].innerHTML.toUpperCase().indexOf(filteredValues) > -1){
            li[i].style.display = "";
        }
        else{
            li[i].style.display = "none"
        }
    }
}