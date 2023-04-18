console.log('pieczareczki')
//DARK&LIGHT MODE

// Get the toggle button and set its initial state
const toggleButton = document.querySelector("#themeButton");
const currentTheme = localStorage.getItem("theme");

// Check if user has explicitly set a theme using the toggle button
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleButton.checked = true;
  }
} else {
  // If no theme has been set, use the user's color scheme preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleButton.checked = true;
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

// Add event listener to toggle button
toggleButton.addEventListener("click", function () {
  // Get the current theme mode
  let currentTheme = document.documentElement.getAttribute("data-theme");

  // Toggle the theme mode and update the data-theme attribute
  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

// AUTO SIZES
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


