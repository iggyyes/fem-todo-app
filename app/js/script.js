console.log('pieczareczki')

const input = document.getElementById('new-todo');
const taskInput = document.getElementById('taskDescription1');
const taskInput2 = document.getElementById('taskDescription2');
const inputHelper = document.getElementById('input-helper');

const autoSizeInput = (element) => {
  element.style.height = 'auto';
  element.style.height = `${element.scrollHeight}px`;
  inputHelper.textContent = `${element.value.length} characters entered`;
};

input.addEventListener('input', () => {
  autoSizeInput(input);
});

taskInput.addEventListener('input', () => {
  autoSizeInput(taskInput);
});

taskInput2.addEventListener('input', () => {
    autoSizeInput(taskInput2);
  });

function checkEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("task-form").submit();
    }
}


