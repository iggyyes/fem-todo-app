

console.log('pieczareczki')
//dark/light mode
//local storage
//eventlistener to textbox
//submit to list on keydown enter
//addtask html/css markup
//autosizing
//eventlistener delete button
//saving/editing/saving checked state
//items left
//clear completed
//all active completed filter


window.addEventListener('load', () => {
  let tasks = getTasksFromLocalStorage();
  let draggedItem; // Add this line
  
  const newTaskForm = document.getElementById('task-form');
  const textArea = document.getElementById('new-todo');
  const taskList = document.querySelector('.todo__tasks');

  const taskCount = document.getElementById('todoTaskCount');
  const clearCompletedBtn = document.querySelector('.clearButton');

  const allRadioBtn = document.getElementById('all');
  const activeRadioBtn = document.getElementById('active');
  const completedRadioBtn = document.getElementById('completed');
  
  const todoFilterRadios = document.querySelectorAll('.todo__filter input[type="radio"]');

  const taskDeleteBtnClass = 'deleteButton';
  const taskItemClass = 'todo__task';
  const taskCheckboxClass = 'sr-only';
  const taskLabelClass = 'customCheckbox';
  const taskTextareaClass = 'taskDescription';
  const taskTextareaRows = 1;
  const taskDeleteBtnLabel = 'Delete todo task';

  const autoSizeInput = element => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  newTaskForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const task = {
      content: e.target.elements.content.value,
      done: false,
      createdAt: new Date().getTime()
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    e.target.reset();
    autoSizeInput(textArea);



    displayTasks();
  });

  function displayTasks() {
    taskList.innerHTML = '';
    tasks.map((task, index) => {
      const taskId = `${task.createdAt}`;

      const taskItem = document.createElement('li');
      taskItem.classList.add(taskItemClass, 'flex');
      taskItem.draggable = true; // enable dragging

      //DRAG AND DROP
      taskItem.addEventListener('dragstart', () => {
        draggedItem = task;
        taskItem.classList.add('dragged');
      });
  
      taskItem.addEventListener('dragover', e => {
        e.preventDefault();
        taskItem.classList.add('hovered');
      });
  
      taskItem.addEventListener('dragleave', () => {
        taskItem.classList.remove('hovered');
      });
  
      taskItem.addEventListener('drop', () => {
        const droppedItem = task;
        const droppedIndex = tasks.indexOf(droppedItem);
        const draggedIndex = tasks.indexOf(draggedItem);
  
        tasks[draggedIndex] = droppedItem;
        tasks[droppedIndex] = draggedItem;
  
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
      });

      //finish

      const taskCheckbox = document.createElement('input');
      taskCheckbox.type = 'checkbox';
      taskCheckbox.checked = task.done;
      taskCheckbox.classList.add(taskCheckboxClass);
      taskCheckbox.id = taskId;
      taskCheckbox.setAttribute('aria-checked', false);

      const taskLabel = document.createElement('label');
      taskLabel.htmlFor = taskId;
      taskLabel.classList.add(taskLabelClass);

      const taskTextarea = document.createElement('textarea');
      taskTextarea.classList.add(taskTextareaClass);
      taskTextarea.id = taskId;
      taskTextarea.contentEditable = true;
      taskTextarea.rows = taskTextareaRows;
      taskTextarea.setAttribute('aria-label', `Task ${tasks.length + 1} description`);

      taskTextarea.textContent = task.content;


      const taskDeleteBtn = document.createElement('button');
      taskDeleteBtn.classList.add(taskDeleteBtnClass);
      taskDeleteBtn.type = 'button';
      taskDeleteBtn.setAttribute('aria-label', taskDeleteBtnLabel);

      taskLabel.appendChild(taskTextarea);
      taskItem.appendChild(taskCheckbox);
      taskItem.appendChild(taskLabel);
      taskItem.appendChild(taskDeleteBtn);
      taskList.appendChild(taskItem);
      
      taskCheckbox.addEventListener('change', (e) => {
        e.preventDefault();
        task.done = e.target.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // displayTasks()
        filterTasks();
        renderTaskCount();
        
      });

      taskDeleteBtn.addEventListener('click', (e) => {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        renderTaskCount();
        displayTasks();
      });

      //responsible for editing added tasks
      taskTextarea.addEventListener('input', (e) => {
        task.content = e.target.value;
        localStorage.setItem('tasks', JSON.stringify(tasks));
      });
      


      autoSizeInput(taskTextarea)
      renderTaskCount();

    });
  };


  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      newTaskForm.dispatchEvent(new Event('submit'));
    }
  };

  newTaskForm.addEventListener('input', () => autoSizeInput(textArea));
  taskList.addEventListener('input', event => autoSizeInput(event.target.closest(`.${taskItemClass}`).querySelector(`.${taskTextareaClass}`)));
  textArea.addEventListener('keydown', handleKeyDown);
  

  // Retrieve tasks from local storage
  function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }

  function renderTaskCount() {
    const incompleteTasks = tasks.filter(task => !task.done);
    const incompleteTaskCount = incompleteTasks.length;
    const taskString = incompleteTaskCount === 1 ? 'item' : 'items';
    taskCount.innerText = `${incompleteTaskCount} ${taskString} left`;
  };

  
  clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.done);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskCount();
    displayTasks();
  });

  
  function filterTasks() {
    const filteredTasks = taskList.children;
  
    if (allRadioBtn.checked) {
      for (let task of filteredTasks) {
        task.style.display = 'block';
      }
    } else if (activeRadioBtn.checked) {
      for (let task of filteredTasks) {
        if (task.querySelector('.sr-only').checked) {
          task.style.display = 'none';
        } else {
          task.style.display = 'block';
        }
      }
    } else if (completedRadioBtn.checked) {
      for (let task of filteredTasks) {
        if (task.querySelector('.sr-only').checked) {
          task.style.display = 'block';
        } else {
          task.style.display = 'none';
        }
      }
    }
  }
  
  for (let radio of todoFilterRadios) {
    radio.addEventListener('change', filterTasks);
  }
  
  

  

 // Call displayTasks to show tasks on load
 
 displayTasks();
});










const toggleButton = document.querySelector('#themeButton');


let currentTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);
toggleButton.checked = currentTheme === 'dark';




//DARK/LIGHT MODE
const handleToggleTheme = () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
};


toggleButton.addEventListener('click', handleToggleTheme);























// // other version
// const form = document.getElementById('task-form');
// const taskList = document.querySelector('.todo__tasks');
// const toggleButton = document.querySelector('#themeButton');
// const input = document.getElementById('new-todo');

// const taskDeleteBtnClass = 'deleteButton';
// const taskItemClass = 'todo__task';
// const taskCheckboxClass = 'sr-only';
// const taskLabelClass = 'customCheckbox';
// const taskTextareaClass = 'taskDescription';
// const taskTextareaRows = 1;
// const taskDeleteBtnLabel = 'Delete todo task';

// let currentTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
// document.documentElement.setAttribute('data-theme', currentTheme);
// toggleButton.checked = currentTheme === 'dark';

// var tasks = [];

// const autoSizeInput = element => {
//   element.style.height = 'auto';
//   element.style.height = `${element.scrollHeight}px`;
// };

// function saveTasks() {
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// const addTask = taskDescription => {
//   if (!taskDescription) return;

//   const taskId = `task${tasks.length + 1}`;

//   const taskItem = document.createElement('li');
//   taskItem.classList.add(taskItemClass, 'flex');

//   const taskCheckbox = document.createElement('input');
//   taskCheckbox.setAttribute('type', 'checkbox');
//   taskCheckbox.classList.add(taskCheckboxClass);
//   taskCheckbox.id = taskId;

//   const taskLabel = document.createElement('label');
//   taskLabel.htmlFor = taskId;
//   taskLabel.classList.add(taskLabelClass);

//   const taskTextarea = document.createElement('textarea');
//   taskTextarea.classList.add(taskTextareaClass);
//   taskTextarea.id = `taskDescription${tasks.length + 1}`;
//   taskTextarea.contentEditable = true;
//   taskTextarea.rows = taskTextareaRows;
//   taskTextarea.setAttribute('aria-label', `Task ${tasks.length + 1} description`);

//   const task = {
//     id: taskId,
//     description: taskDescription,
//     completed: false
//   };
//   taskTextarea.textContent = task.description;

//   // Add event listener to save edited task
//   taskTextarea.addEventListener('input', event => {
//     const taskId = event.target.parentNode.parentNode.querySelector('input').id;
//     const index = tasks.findIndex(task => task.id === taskId);
//     tasks[index].description = taskTextarea.value;
//     saveTasks();
//   });

//   const taskDeleteBtn = document.createElement('button');
//   taskDeleteBtn.classList.add(taskDeleteBtnClass);
//   taskDeleteBtn.type = 'button';
//   taskDeleteBtn.setAttribute('aria-label', taskDeleteBtnLabel);

//   taskLabel.appendChild(taskTextarea);
//   taskItem.appendChild(taskCheckbox);
//   taskItem.appendChild(taskLabel);
//   taskItem.appendChild(taskDeleteBtn);
//   taskList.appendChild(taskItem);

//   tasks.push(task);
//   saveTasks();

//   // Add event listener to the delete button to remove the task when clicked
//   taskDeleteBtn.addEventListener('click', () => {
//     taskItem.remove();
//     const index = tasks.findIndex(task => task.id === taskCheckbox.id);
//     tasks.splice(index, 1);
//     saveTasks();
//   });
// };






// function renderTasks() {
//   taskList.innerHTML = '';

//   for (let i = 0; i < tasks.length; i++) {
//     const taskItem = document.createElement('li');
//     taskItem.classList.add(taskItemClass, 'flex');

//     const taskCheckbox = document.createElement('input');
//     taskCheckbox.setAttribute('type', 'checkbox');
//     taskCheckbox.classList.add(taskCheckboxClass);
//     taskCheckbox.id = `task${i + 1}`;

//     const taskLabel = document.createElement('label');
//     taskLabel.htmlFor = `task${i + 1}`;
//     taskLabel.classList.add(taskLabelClass);

//     const taskTextarea = document.createElement('textarea');
//     taskTextarea.classList.add(taskTextareaClass);
//     taskTextarea.id = `taskDescription${i + 1}`;
//     taskTextarea.contentEditable = true;
//     taskTextarea.rows = taskTextareaRows;
//     taskTextarea.setAttribute('aria-label', `Task ${i + 1} description`);
//     taskTextarea.textContent = tasks[i].description;

//     const taskDeleteBtn = document.createElement('button');
//     taskDeleteBtn.classList.add(taskDeleteBtnClass);
//     taskDeleteBtn.type = 'button';
//     taskDeleteBtn.setAttribute('aria-label', taskDeleteBtnLabel);

//     taskLabel.appendChild(taskTextarea);
//     taskItem.appendChild(taskCheckbox);
//     taskItem.appendChild(taskLabel);
//     taskItem.appendChild(taskDeleteBtn);
//     taskList.appendChild(taskItem);

//     // Add event listener to the delete button to remove the task when clicked
//     taskDeleteBtn.addEventListener('click', () => {
//       tasks.splice(i, 1);
//       saveTasks();
//       renderTasks();
//     });
//   }
// }


// function loadTasks() {
//   var savedTasks = localStorage.getItem("tasks");
//   if (savedTasks) {
//     tasks = JSON.parse(savedTasks);
//     renderTasks();
//   }
// }



// const handleSubmit = event => {
//   event.preventDefault();
//   const taskDescription = input.value.trim();
//   addTask(taskDescription);
//   input.value = '';
//   autoSizeInput(input);
// };

// const handleKeyDown = event => {
//   if (event.key === 'Enter') {
//     event.preventDefault();
//     form.dispatchEvent(new Event('submit'));
//   }
// };

// const handleToggleTheme = () => {
//   currentTheme = currentTheme === 'light' ? 'dark' : 'light';
//   document.documentElement.setAttribute('data-theme', currentTheme);
//   localStorage.setItem('theme', currentTheme);
// };

// input.addEventListener('input', () => autoSizeInput(input));
// taskList.addEventListener('input', event => autoSizeInput(event.target.closest(`.${taskItemClass}`).querySelector(`.${taskTextareaClass}`)));
// form.addEventListener('submit', handleSubmit);
// input.addEventListener('keydown', handleKeyDown);
// toggleButton.addEventListener('click', handleToggleTheme);

// window.addEventListener('load', loadTasks);


