"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

const toDoData = JSON.parse(localStorage.getItem("toDoData")) || [];
render();
//Создаем переменную и делаем условие если data true то парсим и рендерим
// const data = localStorage.getItem("toDoData");
// if (data) {
//   toDoData = JSON.parse(data);
//   render();
// }

function render() {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  toDoData.forEach(function (item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });
    //Удаляем элемент по клику
    li.querySelector(".todo-remove").addEventListener("click", function () {
      toDoData = toDoData.filter((elem) => elem.id !== item.id);
      render();
    });
  });

  console.debug(toDoData);

  //Парсим toDoData в строку и сохраняем в localStorage
  localStorage.setItem("toDoData", JSON.stringify(toDoData));
}

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  const newToDo = {
    id:
      Date.now().toString(36) +
      Math.floor(
        Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
      ).toString(36),
    text: headerInput.value,
    completed: false,
  };

  //Создаем условие чтобы пустое значение не добавлялось
  if (headerInput.value.trim() !== "") {
    toDoData.push(newToDo);
    headerInput.value = "";
  }
  render();
});
