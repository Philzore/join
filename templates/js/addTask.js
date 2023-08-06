let newTaskArray = [];
let prio = undefined;
let allSubtasks = [];
let assignedToNames = [];
let contactsColors = [];
let assignedToInitials = [];
let dateArray = [];
let isChecked = [];

async function initAddTask() {
    document.getElementById('contentSection').innerHTML = generateAddTaskContent();
    await loadTasks();
    renderHeadline();
    activatePrioButtons();
}

async function loadTasks() {
    newTaskArray = JSON.parse(await getItem('createdTask'));
}

function renderHeadline() {
    document.getElementById('headlineContainer').innerHTML = /*html*/ `
        <h1>Add Task</h1>
    `;
    renderContentLeftAndRight();
    renderContactsAddTask('assignedTo');
}

function renderContentLeftAndRight() {
    document.getElementById('contentLeftAndRightContainer').innerHTML = generateContentLeftAndRightContainer();
    renderTwoButtonsContainer();
    setMinDate('date');
}

function renderContactsAddTask(Id) {
    for (let i = 0; i < allContacts.length; i++) {
        const allData = allContacts[i];
        const { name, color } = getJoinData(allData);

        document.getElementById(Id).innerHTML += /*html*/ `
            <option id="${color}" value="${name}">${name}</option>
        `;  
    }
}

function setColor(color) {
    contactsColors.push(color);
}

function renderTwoButtonsContainer() {
    document.getElementById('twoButtonsContainer').innerHTML = generateTwoButtonsContainer();
}

function setMinDate(id) {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById(id).setAttribute('min', today);
}

function pushDate() {
    let dueDate = document.getElementById('date').value;
    dateArray.splice(0, 1, dueDate);
}

function activatePrioButtons() {
    low();
    let urgentBtn = document.getElementById('urgent');
    urgentBtn.addEventListener("click", urgent);

    let mediumBtn = document.getElementById('medium');
    mediumBtn.addEventListener("click", medium);

    let lowBtn = document.getElementById('low');
    lowBtn.addEventListener("click", low);

    let resetBtn = document.getElementById('reset');
    resetBtn.addEventListener("click", low);
       
    let assignBtn = document.getElementById('assignedTo');
    assignBtn.addEventListener("change", assignedTo);

    document.getElementById('addTaskForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        createTask();
    });
}

function urgent() {
    let prioValue = document.getElementById('urgent').value;
    prio = prioValue;

    document.getElementById('urgent').classList.add('urgent');
    document.getElementById('urgentIcon').src = './img/urgentWhiteIcon.png';

    document.getElementById('medium').classList.remove('medium');
    document.getElementById('mediumIcon').src = './img/mediumIcon.png';

    document.getElementById('low').classList.remove('low');
    document.getElementById('lowIcon').src = './img/lowIcon.png';
}

function medium() {
    let prioValue = document.getElementById('medium').value;
    prio = prioValue;

    document.getElementById('medium').classList.add('medium');
    document.getElementById('mediumIcon').src = './img/mediumWhiteIcon.png';

    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('urgentIcon').src = './img/urgentIcon.png';

    document.getElementById('low').classList.remove('low');
    document.getElementById('lowIcon').src = './img/lowIcon.png';
}

function low() {
    let prioValue = document.getElementById('low').value;
    prio = prioValue;

    document.getElementById('low').classList.add('low');
    document.getElementById('lowIcon').src = './img/lowWhiteIcon.png';

    document.getElementById('medium').classList.remove('medium');
    document.getElementById('mediumIcon').src = './img/mediumIcon.png';

    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('urgentIcon').src = './img/urgentIcon.png';
}

function assignedTo() {
    let assignee = document.getElementById("assignedTo");
    let selectedAssignee = assignee.options[assignee.selectedIndex].value;
    let color = assignee.options[assignee.selectedIndex].id;
    let selectedAssignee2 = assignee.options[assignee.selectedIndex];
    selectedAssignee2.disabled = true;
    let i = (assignee.selectedIndex) - 1;

    if (assignedToNames.indexOf(selectedAssignee) === -1) {
        assignedToNames.push(selectedAssignee);
        contactsColors.push(color);
    }
    showAssignedToList(i);
}

function showAssignedToList(i) {
    const allData = allContacts[i];
    const { initials, color } = getJoinData(allData);
    document.getElementById('assignedToList').innerHTML += /*html*/ `
        <div class="assigneeContainer" style="background-color: ${color}">
            ${initials}
        </div>
    `; 
}

function newSubtask() {
    let newSubtask = document.getElementById('subtasks').value;
    
    if (newSubtask == '') {
        document.getElementById('subtasks').focus();
    } else {
        allSubtasks.push(newSubtask);
        isChecked.push(false);
        document.getElementById('subtasksList').innerHTML = '';
        for (let i = 0; i < allSubtasks.length; i++) {
            let subtask = allSubtasks[i];
            document.getElementById('subtasksList').innerHTML += /*html*/ `
                <div class="subtask">
                    <input type="checkbox">
                    <p>${subtask}</p>
                </div>
            `;
        }
    }

    document.getElementById('subtasks').value = '';
}

function clearFields() {
    assignedToNames = [];
    allSubtasks = [];
    document.getElementById('assignedToList').innerHTML = '';
    document.getElementById('subtasksList').innerHTML = '';
}

function createTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let  date = dateArray;

    let newTask = {
        'id': '',
        'title': title,
        'description': description,
        'category': category,
        'assignedTo': assignedToNames,
        'date': date,
        'prio': prio,
        'stat': chosenStat,
        'subtasks': allSubtasks,
        'isChecked': isChecked,
        'doneSubTasks': 0,
        'color': contactsColors
    };
    newTaskArray.push(newTask);
    saveTasks();
    allSubtasks = [];
    assignedToNames = [];
    dateArray = [];
    taskAddedToBoard();
}

async function saveTasks() {
    await setItem('createdTask', JSON.stringify(newTaskArray));
    renderBoard();
}

function taskAddedToBoard() {
    document.getElementById('overlaySection').classList.remove('d-none');
    document.getElementById('overlaySection').innerHTML = /*html*/ `
        <img src="./img/taskAddedToBoard.png" class="taskAddedPopUp" id="taskAddedPopUp">
    `;
    setTimeout(function() {closePopUp()}, 2000);
}

function closePopUp() {
    document.getElementById('overlaySection').classList.add('d-none');
}