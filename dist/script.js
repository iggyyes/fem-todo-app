"use strict";console.log("pieczareczki");var toggleButton=document.querySelector("#themeButton"),currentTheme=localStorage.getItem("theme");currentTheme?(document.documentElement.setAttribute("data-theme",currentTheme),"dark"===currentTheme&&(toggleButton.checked=!0)):window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?(document.documentElement.setAttribute("data-theme","dark"),toggleButton.checked=!0):document.documentElement.setAttribute("data-theme","light"),toggleButton.addEventListener("click",(function(){"light"===document.documentElement.getAttribute("data-theme")?(document.documentElement.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark")):(document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light"))}));var input=document.getElementById("new-todo"),taskInput=document.getElementById("taskDescription1"),taskInput2=document.getElementById("taskDescription2"),inputHelper=document.getElementById("input-helper"),autoSizeInput=function(t){t.style.height="auto",t.style.height="".concat(t.scrollHeight,"px"),inputHelper.textContent="".concat(t.value.length," characters entered")};function checkEnter(t){"Enter"===t.key&&(t.preventDefault(),document.getElementById("task-form").submit())}input.addEventListener("input",(function(){autoSizeInput(input)})),taskInput.addEventListener("input",(function(){autoSizeInput(taskInput)})),taskInput2.addEventListener("input",(function(){autoSizeInput(taskInput2)}));
//# sourceMappingURL=script.js.map