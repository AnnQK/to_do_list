// varianles
const taskInput = document.querySelector('.js-input');
const btnInput = document.querySelector('.js-input-btn');
const tasksList = document.querySelector('.js-tasks-container');

// adding task to task list
function addTask() {
  // creating a box for task
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

// delete task
function removeTask(e) {
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
    targetParent.classList.add('removing');
  } else {
    targetParent.classList.add('completing');
  }
  // remove div
  targetParent.addEventListener('transitionend', () => {
    targetParent.remove();
  });
}

// handlers
btnInput.addEventListener('click', function (e) {
  e.preventDefault();
  if (inputValidation()) return addTask();
});
tasksList.addEventListener('click', removeTask);
