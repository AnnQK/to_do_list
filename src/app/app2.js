// variables
const taskInput = document.querySelector('.js-input');
const btnInput = document.querySelector('.js-input-btn');
const tasksList = document.querySelector('.js-tasks-container');
const btnShowTasks = document.querySelector('.js-show-btn');
const filterOptions = document.querySelector('.js-select');

class Task {
  constructor(title, category, time) {
    this.title = title;
    this.category = category;
    this.time = time;
  }
}

class UI {
  addTask(task) {
    // creating a box for task

    //   creating list item with task text
    const listItem = document.createElement('li');
    listItem.classList.add('tasks-list__item');

    const taskName = document.createElement('span');
    taskName.innerText = task.title;
    listItem.appendChild(taskName);

    //   creating buttons for each task

    //   task done
    const doneBtn = document.createElement('button');
    doneBtn.classList.add('done-btn');
    doneBtn.innerHTML = `&#x2611`;
    listItem.appendChild(doneBtn);

    //   delete task
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '&#x2612';
    listItem.appendChild(deleteBtn);

    //   adding text and buttons
    tasksList.insertAdjacentElement('afterbegin', listItem);
    taskInput.value = '';
  }

  removeTask(e) {
    const targetItem = e.target;

    // check if target is functional btn
    if (
      !targetItem.classList.contains('delete-btn') &&
      !targetItem.classList.contains('done-btn')
    )
      return;

    // find div with task
    const targetParent = targetItem.parentElement;

    if (targetItem.classList.contains('delete-btn')) {
      // remove from local storage
      removeFromStorage(targetParent);

      // remove item
      targetParent.classList.add('removed-task');
    } else {
      targetParent.classList.add('done-task');
    }
    // remove div
    targetParent.addEventListener('transitionend', () => {
      targetParent.remove();
    });
  }
}

class Storage {
  getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
  }

  addToStorage(task) {
    const savedTasks = getTasks();
    savedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  }

  removeFromStorage(task) {
    const savedTasks = this.getTasks();
    const taskIndex = savedTasks.indexOf(task.firstChild.innerText);
    savedTasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  }

  showTasks() {
    let savedTasks = this.getTasks();

    savedTasks.forEach((task) => {
      const ui = new UI();
      ui.addTask(task);
    });
  }
}

btnInput.addEventListener('click', function (e) {
  e.preventDefault();

  const title = taskInput.value;
  const category = taskInput.value;
  const time = taskInput.value;

  const userTask = new Task(title, category, time);
  const ui = new UI();
  ui.addTask(userTask);

  Storage.addTask(userTask);
});

// tasksList.addEventListener('click', removeTask);

// btnShowTasks.addEventListener('click', showTasks);
