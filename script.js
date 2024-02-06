const taskInput = document.querySelector('#taskInput');
const addTask = document.querySelector('#addTask');
const taskList = document.querySelector('#taskList');

addTask.addEventListener('click',function(){
    const addtaskInput = taskInput.value.trim();
    console.log(addtaskInput)
    if(addtaskInput == ''){
        alert("Please fill");
    }
    else{
        const taskListEvent = document.createElement('li');
        // taskListEvent.textContent = addtaskInput;
        taskListEvent.innerHTML = `
            <span>${addtaskInput}</span>
            <button class="update">Update</button>
            <button class="delete">Delete</button>
        `;
        

        console.log(taskListEvent)
        taskList.appendChild(taskListEvent);
        const deleteElement = taskListEvent.querySelector('button.delete');
        const updateElement = taskListEvent.querySelector('button.update');
        deleteElement.addEventListener('click',function(){
            taskListEvent.remove();
        });

        
        // Update Task
        updateElement.addEventListener('click', function () {
            const updatedTaskInput = prompt("Update the task:", addtaskInput);
            if (updatedTaskInput !== null) {
                taskListEvent.querySelector('span').textContent = updatedTaskInput;
            }
        });

        taskInput.value = '';
    }
})