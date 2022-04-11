const taskInput = document.querySelector('.js-input');
const btnInput = document.querySelector('.js-input-btn');
const tasksList = document.querySelector('.js-tasks-container');

// adding task to task list
function addTask() {
  // creating a bow for task
  const listDiv = document.createElement('div');
  listDiv.classList.add('tasks-list__div');

  //   creating list item with task text
  const listItem = document.createElement('li');
  listItem.classList.add('tasks-list__item');
  listItem.innerText = taskInput.value;
  listDiv.appendChild(listItem);

  //   creating buttons for each task

  //   task done
  const doneBtn = document.createElement('button');
  doneBtn.classList.add('done-btn');
  doneBtn.innerHTML = `&#x2611`;
  listDiv.appendChild(doneBtn);

  //   delete task
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.innerHTML = '&#x2612';
  listDiv.appendChild(deleteBtn);

  //   adding text and buttons

  tasksList.insertAdjacentElement('afterbegin', listDiv);
  taskInput.value = '';
}

function inputValidation() {
  if (taskInput.value === '') {
    return false;
  }
  return true;
}

function deleteTask(e) {
  const targetItem = e.target;
  if (!targetItem.classList.contains('delete-btn')) return;

  // find div with rask
  const targetParent = targetItem.parentElement;

  // remove div with task
  targetParent.classList.add('removing');
  targetParent.addEventListener('transitionend', () => {
    targetParent.remove();
  });
}

btnInput.addEventListener('click', function (e) {
  e.preventDefault();
  if (inputValidation()) return addTask();
});
tasksList.addEventListener('click', deleteTask);
