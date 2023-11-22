//grupe
//checkmarksubject input
//clickable priority
//duedate input
//status
//percent new0 inprogres complete100
//modifiedon 

const states = [
  {text: "Low", class:'state1'},
  {text: "Normal", class:'state2'},
  {text: "High", class:'state3'}
];
var currentState = 0;
function changeState(button) {
  currentState = (currentState + 1) % states.length;
  updateButton(button);
}
function updateButton(button) {
  if (currentState === 0) {
    button.className = 'btPriority ' + states[currentState].class;
  } else {
    button.classList.replace(states[currentState - 1].class, states[currentState].class);
  }
  button.textContent = states[currentState].text;
}

const addTask = (taskData, index) => {
  const taskID = allTasks.length;
  const tr = document.createElement('tr');
  tr.setAttribute('id', taskID);
  
  const tdCheckbox = document.createElement('td');
  const checkboxImg = document.createElement('img');
  
  if (taskData.isChecked) {
    checkboxImg.src = 'img/checkbox1.png';
  } else {
    checkboxImg.src = 'img/checkbox0.png';
    }
  
  checkboxImg.addEventListener('click', () => {
    taskData.isChecked = !taskData.isChecked;
    updateTask(taskData, index);
  })
  tdCheckbox.appendChild(checkboxImg)
    
  tr.appendChild(tdCheckbox);
  //------Text------//
  const tdSubject = document.createElement('td');
  tdSubject.innerText = taskData.subject;
  if (taskData.isChecked) {
    tdSubject.className = 'crossed'
  }
  tr.appendChild(tdSubject);

  //------Priority------//

  const tdPriority = document.createElement('td');
  const btPriority = document.createElement('button');
  btPriority.textContent = 'Choose Priority';
  btPriority.classList.add('btPriority', states[0].class);
  btPriority.addEventListener('click', function() {
    changeState(btPriority);
  });
  tdPriority.appendChild(btPriority);
  const btState = tdPriority;
  tr.appendChild(tdPriority);

  //------Date-------//
  const tdDate = document.createElement('td');

  tdDate.innerText = taskData.date;
  tr.appendChild(tdDate);

  //------Status------//

  const tdStatus = document.createElement('td');
  tdStatus.innerText = taskData.status;
  tr.appendChild(tdStatus);

  //------Slider------//

  const tdPercent = document.createElement('td');

  const tdPercentSlider = document.createElement('input');
  tdPercentSlider.setAttribute('type', 'range');
  tdPercentSlider.classList.add('slider');
  tdPercentSlider.setAttribute('min', 0);
  tdPercentSlider.setAttribute('max', 100);
  tdPercentSlider.setAttribute('value', taskData.percent);
  tdPercentSlider.addEventListener('change', (event) => {
      taskData.percent = event.target.valueAsNumber;
      if (taskData.percent === 100) {
        taskData.status = 'Complete'
      }
      if (taskData.percent === 0) {
        taskData.status = 'New'
      }
      if (taskData.percent > 0 && taskData.percent < 100) {
        taskData.status = 'In progress'
      }
      updateTask(taskData, index)
  });
    
  tdPercent.appendChild(tdPercentSlider);
  tr.appendChild(tdPercent);
  //------LastModified------//
  const tdModified = document.createElement('td');
  tdModified.innerText = taskData.modified;
  tr.appendChild(tdModified);
  
  //------Delete Task-------//
  const tdDelete = document.createElement('td');
  const tdDeleteBtn = document.createElement('button');
  tdDeleteBtn.innerText = 'Delete task';
  tdDeleteBtn.addEventListener('click', () => {
    deleteTask(index);
  })
  tdDeleteBtn.className = 'deleteButton'
  tdDelete.appendChild(tdDeleteBtn);
  tr.appendChild(tdDelete);

  const tableBody = document.getElementById('table-body');
    tableBody.appendChild(tr);
  }
  
  const deleteTask = (index) => {
    allTasks.splice(index, 1);
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    window.location.reload();
  }
  
  const updateTask = (taskData, index) => {
    taskData.modified = new Date().toLocaleString();
    allTasks[index] = taskData;
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    window.location.reload();
  }
  
  const lsTasks = localStorage.getItem('allTasks');
  let allTasks = [];
  if (lsTasks) {
    allTasks = JSON.parse(lsTasks);
  }
  allTasks.forEach((task, index) => {
    addTask(task, index);
  });

  document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();

    //------GetData------//
    const subject = document.getElementById('taskSubject');
    const date = document.getElementById('taskDate');
    //check if empty
    if (!subject || !date) {
      return;
    }
    //put data
    const newTask = {
      isChecked: false,
      subject: subject.value,
      state: currentState,
      date: date.value,
      status: 'New',
      percent: 0,
      modified: ''
    };
    //push task
    allTasks.push(newTask);
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    window.location.reload();
});



