const todoList = [];

const todoListElement = document.querySelector("#myUL");

document.querySelector("#add_button").addEventListener("click", addTodo);
document.querySelector("#myInput").addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    addTodo()
  }
});

function addTodo() {
  const todoText = document.querySelector("#myInput").value;

  if (todoText == "") {
    alert("You did not enter any item");
  } else {
    const todoObject = {
      id: todoList.length,
      todoText: todoText,
      isDone: false,
    };

    todoList.unshift(todoObject);
    displayTodos();
  }
}

function doneTodo(todoId) {
  const selectedTodoIndex = todoList.findIndex((item) => item.id == todoId);

  todoList[selectedTodoIndex].isDone
    ? (todoList[selectedTodoIndex].isDone = false)
    : (todoList[selectedTodoIndex].isDone = true);
  displayTodos();
}

function deleteItem(x) {
  todoList.splice(
    todoList.findIndex((item) => item.id == x),
    1
  );
  displayTodos();
}

function displayTodos() {
  todoListElement.innerHTML = "";
  document.querySelector("#myInput").value = "";

  todoList.forEach((item) => {
    const listElement = document.createElement("li");
    const delBtn = document.createElement("i");

    listElement.innerHTML = item.todoText;
    listElement.setAttribute("data-id", item.id);

    delBtn.setAttribute("data-id", item.id);
    delBtn.classList.add("far");
    delBtn.classList.add("fa-trash-alt");
    delBtn.setAttribute("data-id", item.id);

    if (item.isDone) {
      listElement.classList.add("checked");
    }

    listElement.addEventListener("click", function (e) {
      const selectedId = e.target.getAttribute("data-id");
      doneTodo(selectedId);
    });

    delBtn.addEventListener("click", function (e) {
      const delId = e.target.getAttribute("data-id");
      deleteItem(delId);
    });

    todoListElement.appendChild(listElement);
    listElement.appendChild(delBtn);
  });
}

var ul = document.querySelector('.for-ul');
var li = ul.querySelectorAll('li');
var height = 0;
for (i = 0; i < 4; i++) {
  height = height + li[i].offsetHeight;
  console.log(height);
}
ul.style.maxHeight = height+'px';

	 
const filtersEl = document.querySelector('#filters');
const filterLinksEl = filtersEl.querySelectorAll('.filter');
filterLinksEl.forEach(linkEl => {
  linkEl.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Удаляем жирное начертание у всех ссылок
    filterLinksEl.forEach(linkEl => {
      linkEl.style.fontWeight = 'normal';
    });
    
    // Добавляем жирное начертание для выбранной ссылки
    const selectedLinkEl = event.target;
    selectedLinkEl.style.fontWeight = 'bold';
    
    // Фильтруем список в соответствии с выбранным режимом
    const filterMode = selectedLinkEl.dataset.filter;
    filterList(filterMode);
  });
});

// Функция для фильтрации списка
function filterList(mode) {
  const todoListEl = document.querySelector('#todo-list');
  
  // Очищаем список
  todoListEl.innerHTML = '';
  
  // Фильтруем элементы в соответствии с выбранным режимом
  let filteredItems = [];
  if (mode === 'all') {
    filteredItems = todoList.items;
  } else if (mode === 'done') {
    filteredItems = todoList.items.filter(item => item.completed);
  } else if (mode === 'not-done') {
    filteredItems = todoList.items.filter(item => !item.completed);
  }
  
  // Отображаем отфильтрованные элементы
  filteredItems.forEach(item => {
    const liEl = document.createElement('li');
    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.completed;
    checkboxEl.addEventListener('click', () => todoList.toggleComplete(item.id));
    
    const textEl = document.createElement('span');
    textEl.textContent = item.text;
    
    const deleteBtnEl = document.createElement('button');