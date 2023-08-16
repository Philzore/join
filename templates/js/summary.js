let earliest = [];

/**
 * initialize summary location
 * 
 */
async function initSummary() {
  await loadUserLogin();
  let currentUser = getCurrentUser();
  document.getElementById('contentSection').innerHTML = getSummarySection();
  document.getElementById('headlineDiv').innerHTML += getSummaryHeadlineDiv();
  document.getElementById('contentAndGreeting').innerHTML += getSummaryinnerContent();
  //document.getElementById('contentAndGreeting').innerHTML += getSummaryGreeting(currentUser);
  renderGreeting(currentUser);
  loadTaskStat();
  searchDate();
  searchUrgentTasks();

}

/**
 * 
 * @returns name for showing welcome text
 */
function getCurrentUser() {
  let name;
  let email = localStorage.getItem('currentEmail');
  let index = userLogin.findIndex(function (currentUser) {
    return currentUser.email === email;
  });
  if (email) {
    name = userLogin[index]['name'];
  } else {
    name = 'Guest';
  }
  return name;
}

/**
 * show how many urgent tasks are open
 * 
 */
function searchUrgentTasks() {
  let prio = 'urgent';
  let urgentTasks = newTaskArray.filter(function (a) {
    return a.prio === prio;
  });
  let urgentTask = urgentTasks.length;
  document.getElementById('newsNumber').innerHTML = /*html*/`
  ${urgentTask}
  `;
}

/**
 * generate date
 * 
 */
function searchDate() {
  if (newTaskArray.length > 0) {
    const minDate =
      newTaskArray.map(element => {
        return element.date;
      });
    earliest = minDate.reduce(function (pre, cur) {
      return Date.parse(pre) > Date.parse(cur) ? cur : pre;
    });

    document.getElementById('insertDate').innerHTML = earliest;
  }
}

/**
 * get current hours and generate a greeting text for current day time
 * 
 * @param {string} currentUser user for greeting text
 */
function renderGreeting(currentUser) {
  let date = new Date();
  let currentHours = date.getHours();
  let greeting = '';

  if (currentHours >= 0 && currentHours <= 12) {
    greeting = 'Good Morning';
  } else if (currentHours >= 12 && currentHours <= 17) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }
  document.getElementById('contentAndGreeting').innerHTML += `
  <div class="d-flex center greeting">
    <p id="welcome-text">${greeting}<br><b class="current-user">${currentUser}</b></p>
  </div>` ;
}

/**
 * load statistics how many tasks with which status
 * 
 */
function loadTaskStat() {
  let stat = '';
  for (let i = 0; i < newTaskArray.length; i++) {
    const element = newTaskArray[i];

    stat = newTaskArray[i]['stat'];
    let taskStat = newTaskArray.filter(function (a) {
      return a.stat === stat;
    });
    taskStats = taskStat.length;
    document.getElementById(stat).innerHTML = /*html*/`    
    ${taskStats}`
  }
}

function getSummaryHeadlineDiv() {
  return /*html*/`
        
          <h1 id="summaryHeadline" class="summaryHeadline">Summary</h1>
          <p id="nutshelltext" class="nutshelltext">Everything in a nutshell!</p>
  `
}

function getSummaryinnerContent() {
  return /*html*/`
  <div id="innerContentSummary" class="">
    <div id="taskSection" class="d-flex">
      <div id="inBoardDiv" class="taskbox" onclick="renderBoard()">
        <div id="inBoard" class="tasknumber">${newTaskArray.length}</div>
        <p class="tasktext">Tasks in Board</p>
      </div>
      <div id="inProgressDiv" class="taskbox" onclick="renderBoard()">
        <div id="inProgress" class="tasknumber">0</div>
        <p class="tasktext">Tasks in Progress</p>
      </div>
      <div id="awaitingFeedbackDiv" class="taskbox" onclick="renderBoard()">
        <div id="awaitingFeedback" class="tasknumber">0</div>
        <p class="tasktext">Awaiting Feedback</p>
      </div>
    </div>
    <div id="newsAndDateDiv" class="newsAndDate pointer" onclick="renderBoard()">
      <div id="news" class="news">
        <img src="./img/urgent.png" alt="" />
        <div id="newsNumberAndText">
          <b id="newsNumber" class="newsNumber">0</b><br />
          Urgent
        </div>
      </div>
      <div id="dateDiv" class="date">
        <b id="insertDate" class="insertDate">0</b> <br />
        Upcoming Deadline
      </div>
    </div>
    <div id="personalTasks" class="personalTasks d-flex">
      <div id="todoDiv" class="personalTaskBox toDobg pointer" onclick="renderBoard()">
        <div id="toDoNumberAndText" class="marginLeft25">
          <b id="todo" class="toDoNumber">0</b><br />
          To Do
        </div>
      </div>
      <div id="doneDiv" class="personalTaskBox donebg pointer" onclick="renderBoard()">
        <div id="doneNumberAndText" class="marginLeft25">
          <b id="done" class="doneNumber">0</b><br />
          Done
        </div>
      </div>
    </div>
  </div>
  `
}

function getSummarySection() {
  return /*html*/`
      <div id="summarySection" class="summarySection">
        
        <div id="headlineDiv" class="d-flex headlineDiv">
        <div id= "managementText" class="managementText">Kanban Project Management Tool</div>
        </div>
        <div id="contentAndGreeting" class="d-flex contentAndGreeting ">
        </div>
      </div>
  `;
}

