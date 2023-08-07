class Todo {
    constructor(text) {
      this.text = text;
      this.completed = false;
      this.bgColor = 'transparent';
      this.date = new Date().toISOString();
    }

    render(index) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between mt-2';
        listItem.style.backgroundColor = this.bgColor; // Apply the background color to the whole li element
        listItem.innerHTML = `
          <span class="${this.completed ? 'completed' : ''}">${this.text}</span>
          <div class="btn-group">
            <button class="btn btn-sm btn-success w-5" onclick="todos[${index}].toggleComplete()"><i class="bi bi-check-all w-5"></i></button>
            <select class="form-control form-control-sm w-5" onchange="todos[${index}].changeBackgroundColor(this.value)">
              <option value="transparent" ${this.bgColor === 'transparent' ? 'selected' : ''}>Default </option>
              <option value="lightblue" ${this.bgColor === 'lightblue' ? 'selected' : ''}>Light Blue</option>
              <option value="lightgreen" ${this.bgColor === 'lightgreen' ? 'selected' : ''}>Light Green</option>
              <option value="lightpink" ${this.bgColor === 'lightpink' ? 'selected' : ''}>Light Pink</option>
              <option value="lightyellow" ${this.bgColor === 'lightyellow' ? 'selected' : ''}>Light Yellow</option>
              <option value="lightcoral" ${this.bgColor === 'lightcoral' ? 'selected' : ''}>Light Coral</option>
              <!-- Add more colors below -->
              <option value="lightcyan" ${this.bgColor === 'lightcyan' ? 'selected' : ''}>Light Cyan</option>
              <option value="lightgoldenrodyellow" ${this.bgColor === 'lightgoldenrodyellow' ? 'selected' : ''}>Light Goldenrod Yellow</option>
              <option value="lightseagreen" ${this.bgColor === 'lightseagreen' ? 'selected' : ''}>Light Sea Green</option>
            </select>
            <button class="btn btn-sm btn-danger w-5" onclick="todos[${index}].remove()"><i class="bi bi-x-lg w-5"></i></button>
          </div>
        `;
        return listItem;
      }

      toggleComplete() {
        this.completed = !this.completed;
        this.renderAndUpdate();
      }

    changeBackgroundColor(newBgColor) {
      this.bgColor = newBgColor;
      this.renderAndUpdate();
    }

    remove() {
      const index = todos.indexOf(this);
      if (index !== -1) {
        todos.splice(index, 1);
        this.renderAndUpdate();
      }
    }

    renderAndUpdate() {
      renderTodos();
      saveTodosToLocalStorage();
    }
  }
  

  // Retrieve todos from local storage or create an empty array
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
      if (!(todo instanceof Todo)) {
        // Convert plain object to Todo instance
        todos[index] = new Todo(todo.text);
        todos[index].completed = todo.completed;
        todos[index].bgColor = todo.bgColor;
        todos[index].date = todo.date;
      }

      const listItem = todos[index].render(index); // Call the render method directly on the todo instance
      todoList.appendChild(listItem);
    });
  }

  function addTodo() {
    const inputField = document.getElementById('todoInput');
    const text = inputField.value.trim();
    if (text !== '') {
      const newTodo = new Todo(text);
      todos.push(newTodo);
      inputField.value = '';
      renderTodos();
      saveTodosToLocalStorage();
    }
  }

  function sortTodosByDate() {
    todos.sort((a, b) => new Date(a.date) - new Date(b.date));
    renderTodos();
    saveTodosToLocalStorage();
  }

  function deleteCompletedTodos() {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
    saveTodosToLocalStorage();
  }

  function saveTodosToLocalStorage() {
    // Convert Todo instances to plain objects before saving to local storage
    const todosToSave = todos.map(todo => ({
      text: todo.text,
      completed: todo.completed,
      bgColor: todo.bgColor,
      date: todo.date
    }));
    localStorage.setItem('todos', JSON.stringify(todosToSave));
  }

  function changeListBackgroundColor() {
    const bgColorSelect = document.getElementById('bgColorSelect');
    const selectedColor = bgColorSelect.value;
    const todoList = document.getElementById('todoList');
    todoList.style.backgroundColor = selectedColor;
  }

  // Initial rendering of todos
  renderTodos();