let newTaskArray = [];
let prio = undefined;
let allSubtasks = [];
let assignedToNames = [];
let contactsColors = [];
let assignedToInitials = [];
let dateArray = [];
let isChecked = [];
let newCategorys = [];
let currentOpenTask = 0;

/**
 * This Function render Task
 */
async function initAddTask() {
    document.getElementById('contentSection').innerHTML = generateAddTaskContent();
    await loadTasks();
    renderHeadline();
    activatePrioButtons();
    allSubtasks = [];
    generateNormalTask = true;
    chosenStat = 'todo';
}

/**
 * This Function loading Information from the Server
 */
async function loadTasks() {
    newTaskArray = JSON.parse(await getItem('createdTask'));
}

/**
 * This Function render AddTask side
 */
function renderHeadline() {
    document.getElementById('headlineContainer').innerHTML = /*html*/ `
        <h1>Add Task</h1>
    `;
    renderContentLeftAndRight();
    renderContactsAddTask('assignedTo');
    renderAssignedInitial();
}

/**
 * This Function render leftside of AddTask
 */
function renderContentLeftAndRight() {
    document.getElementById('contentLeftAndRightContainer').innerHTML = generateContentLeftAndRightContainer();
    renderNewCategorys();
    renderTwoButtonsContainer();
    setMinDate('date');
}

/**
 * This Function render the list of Contact for the Checkboxes
 */
function renderContactsAddTask(Id) {

    for (let i = 0; i < allContacts.length; i++) {
        const allData = allContacts[i];
        const { name, color } = getJoinData(allData);

        document.getElementById(Id).innerHTML += /*html*/ `
        <div class="assignedFrame" ><input id="assignedCheckbox${i}" onclick="renderAssignedInitial()" class="assignedCheckbox" type="checkbox">${name}</div>
        `;
    }

}

/**
 *  Allow how fast open and close the hidden field of the Checkboxes
 */
function showAllAssigned() {
    if (document.getElementById('selectContact').innerText == `Close Select contacts to assign`) {
        setTimeout(closeAllAssigned, 100);

    } else {
        setTimeout(openAllAssigned, 100);
    }
}

/**
 *  It close the hidden field of Checkboxes and switch the Imagen Arrow.
 */
function closeAllAssigned() {
    document.getElementById('assignedTo').classList.add('d-none');
    document.getElementById('selectContact').innerHTML = `Select contacts to assign`;

    document.getElementById('selectContactImg').classList.remove('selectContactImgFlip');

}

/**
 * It open the hidden field of Checkboxes and switch the Imagen Arrow.
 */
function openAllAssigned() {
    document.getElementById('assignedTo').classList.remove('d-none');
    document.getElementById('selectContact').innerHTML = `Close Select contacts to assign`;
    document.getElementById('selectContactImg').classList.add('selectContactImgFlip');

}

/**
 *  The Function reading the Checkbox and if the Checkbox is checked push it to the Array AssignedToNames and ContactsColors.
 */

function addAssignedToTask() {

    for (let i = 0; i < allContacts.length; i++) {
        const contact = allContacts[i]['name'];
        const initial = allContacts[i]['initials'];
        const color = allContacts[i]['color'];
        let checkbox = document.getElementById(`assignedCheckbox${i}`);
        if (checkbox.checked == true) {
            assignedToNames.push(contact);
            contactsColors.push(color);
        }
    }
}

/**
 * This Function show in a visiual design which Checkbox is checked.
 * 
 */
function renderAssignedInitial() {
    for (let i = 0; i < allContacts.length; i++) {
        const initial = allContacts[i]['initials'];
        const color = allContacts[i]['color'];

        document.getElementById('assignedToList').innerHTML += /* html */ `
        <div  id="renderVisibelAssigned${i}"  style="background-color: ${color}" class=" assigneeContainer d-none">${initial}</div>`;
        let checkbox = document.getElementById(`assignedCheckbox${i}`);
        if (checkbox.checked == true) {
            document.getElementById(`renderVisibelAssigned${i}`).classList.remove('d-none');
        } else {
            document.getElementById(`renderVisibelAssigned${i}`).classList.add('d-none');
        }
    }
}

/**
 * push the color to the array
 * 
 * @param {string} color color to push in an array
 */
function setColor(color) {
    contactsColors.push(color);
}

/**
 * render a container for buttons
 * 
 */
function renderTwoButtonsContainer() {
    document.getElementById('contentLeftAndRightContainer').innerHTML += generateTwoButtonsContainer();
}

/**
 * set minimum date
 * 
 * @param {string} id - The ID allows the use of today's date
 */
function setMinDate(id) {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById(id).setAttribute('min', today);
}

/**
 * delete date data from an array
 * 
 */
function pushDate() {
    let dueDate = document.getElementById('date').value;
    dateArray.splice(0, 1, dueDate);
}

/**
 * Add the Button's of addTask a click function.
 * 
 */
function activatePrioButtons() {
    priorityStatus('low');

    document.getElementById('addTaskForm').addEventListener('submit', function (event) {
        event.preventDefault();
        createTask();
    });
}


/**
 * changes backround and set prio for choosen priority
 * 
 * @param {string} priority to choose the right priority
 */
function priorityStatus(priority) {
    let prioValue = document.getElementById(priority).value;
    prio = prioValue;
    
    document.getElementById(priority).classList.add(priority);
    document.getElementById(`${priority}Icon`).src = `./img/${priority}WhiteIcon.png`;

    if (priority == 'low') {
        removeMedium();
        removeUrgent();
    } else if (priority == 'medium') {
        removeLow();
        removeUrgent();
    } else if (priority == 'urgent') {
        removeLow();
        removeMedium();
    }
}

/**
 * remove class list and change img
 * 
 */
function removeLow() {
    document.getElementById('low').classList.remove('low');
    document.getElementById('lowIcon').src = './img/lowIcon.png';
}

/**
 * remove class list and change img
 * 
 */
function removeMedium() {
    document.getElementById('medium').classList.remove('medium');
    document.getElementById('mediumIcon').src = './img/mediumIcon.png';
}

/**
 * remove class list and change img
 * 
 */
function removeUrgent() {
    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('urgentIcon').src = './img/urgentIcon.png';
}

/**
 * Create a new SubTask
 * 
 */
function newSubtask() {
    if (generateNormalTask) {
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
    } else if (!generateNormalTask) {
        newSubtaskEditOverlay();
    }

}

/**
 * create new subtask in edit overlay for a single task
 * 
 */
function newSubtaskEditOverlay() {
    let newModifedSubtask = document.getElementById('modifysubtasks').value;
    let subtaskList = document.getElementById('modifysubtasksList');
    subtaskList.innerHTML += `
    <div class="subtask">
        <input type="checkbox">
        <p>${newModifedSubtask}</p>
    </div>
    ` ;

    newTaskArray[currentOpenTask]['subtasks'].push(newModifedSubtask);
    newTaskArray[currentOpenTask]['isChecked'].push(false);
    document.getElementById('modifysubtasks').value = '';
}

/**
 * Reset the AddTasks Field
 * 
 */
function clearFields() {
    assignedToNames = [];
    allSubtasks = [];
    document.getElementById('assignedToList').innerHTML = '';
    document.getElementById('subtasksList').innerHTML = '';
    closeAllAssigned();
}

/**
 * Create a new Task
 * 
 */
function createTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let date = dateArray;
    addAssignedToTask();
    if (assignedToNames.length > 0) {
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
    } else {
        warnNoChoseAssigned();
    }
}

/**
 * If no Assigned is Chose this function stop to push a new Task
 * 
 */
function warnNoChoseAssigned() {
    document.getElementById('ChoseAssigned').classList.remove('d-none');
    setTimeout(closewarnNoChoseAssigned, 4000)
}

/**
 * add display none to an element
 * 
 */
function closewarnNoChoseAssigned() {
    document.getElementById('ChoseAssigned').classList.add('d-none');
}

/**
 * save tasks in the backend
 * 
 */
async function saveTasks() {
    await setItem('createdTask', JSON.stringify(newTaskArray));
    renderBoard();
}

/**
 * Open the OverlaySection for the Board to adding new Tasks
 * 
 */
function taskAddedToBoard() {
    document.getElementById('overlaySection').classList.remove('d-none');
    document.getElementById('overlaySection').innerHTML = /*html*/ `
        <img src="./img/taskAddedToBoard.png" class="taskAddedPopUp" id="taskAddedPopUp">
    `;
    setTimeout(function () { closePopUp() }, 2000);
}

function closePopUp() {
    document.getElementById('overlaySection').classList.add('d-none');
}

