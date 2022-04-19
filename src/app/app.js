// VARIABLES
const taskInput = document.querySelector('.js-input');
const btnInput = document.querySelector('.js-input-btn');
const tasksList = document.querySelector('.js-tasks-container');
const filterOptions = document.querySelector('.js-select');
// const btnShowTasks = document.querySelector('.js-show-btn');

class Task {
  constructor(title, category, time, complete) {
    this.title = title;
    this.category = category;
    this.time = time;
    this.complete = complete;
  }
}

class UI {
  addTask(task) {
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
      Storage.removeFromStorage(targetParent);
      // remove item
      targetParent.classList.add('removed-task');
    } else {
      targetParent.classList.add('done-task');
      // change status
      Storage.updateStatus(targetParent);
    }
    // remove div
    targetParent.addEventListener('transitionend', () => {
      targetParent.remove();
    });
  }

  clearTasksList() {
    tasksList.innerHTML = '';
  }
}

class Storage {
  static getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
  }

  static findInStorage(task) {
    const savedTasks = Storage.getTasks();
    const taskInfo = task.firstChild.innerText;
    const taskIndex = savedTasks.findIndex((item) => item.title === taskInfo);
    return taskIndex;
  }

  static addToStorage(task) {
    const savedTasks = Storage.getTasks();
    savedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  }

  static removeFromStorage(task) {
    const savedTasks = Storage.getTasks();
    const taskIndex = Storage.findInStorage(task);
    savedTasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  }

  static showTasks() {
    let savedTasks = Storage.getTasks();
    savedTasks.forEach((task) => {
      const ui = new UI();
      ui.addTask(task);
    });
  }

  static updateStatus(task) {
    const updatedTask = Storage.getTasks()[Storage.findInStorage(task)];
    updatedTask.complete = 'true';
    Storage.removeFromStorage(task);
    Storage.addToStorage(updatedTask);
  }

  static filterTasks() {
    const savedTasks = this.getTasks();
    const doneTasks = savedTasks.filter((item) => item.complete);
    return doneTasks;
  }
}

// HANDLERS
document.addEventListener('DOMContentLoaded', Storage.showTasks());
btnInput.addEventListener('click', function (e) {
  e.preventDefault();
  if (taskInput.value === '') {
    return false;
  }
  const title = taskInput.value;
  const category = 'none';
  const time = 'none';
  const complete = false;
  const userTask = new Task(title, category, time, complete);
  const ui = new UI();
  ui.addTask(userTask);
  Storage.addToStorage(userTask);
});
tasksList.addEventListener('click', function (e) {
  e.preventDefault();
  const ui = new UI();
  ui.removeTask(e);
});
filterOptions.addEventListener('click', function (e) {
  const ui = new UI();
  ui.clearTasksList();
  switch (e.target.value) {
    case 'done': {
      const tasks = Storage.filterTasks();
      tasks.forEach((item) => ui.addTask(item));
      break;
    }
    case 'saved': {
      Storage.showTasks();
      break;
    }
    case 'empty': {
      Storage.showTasks();
    }
  }
});
