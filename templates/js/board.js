let taskStatus = ['To Do', 'In progress', 'Awaiting Feedback', 'Done'];
let dragTargets = ['todo', 'in progress', 'awaiting feedback', 'done'];
let taskStatusClasses = ['todo', 'inProgress', 'awaitingFeedback', 'done'];
let priories = ['low', 'medium', 'urgent'];
let currentDraggedTask;
let currentDraggedOnStatus;
let filteredTasks = [];
let newPrio;
let chosenStat = 'todo';
let currentBooleanValue = 'false';

/**
 * 
 * Adding a id System for each Task importend to editer the Task and Drag and Drio function.
 */

function giveTaskId() {
    for (let i = 0; i < newTaskArray.length; i++) {
        const currentTask = newTaskArray[i];

        currentTask['id'] = i;
    }
}

/**
 * 
 * Render Function For Board
 */

function updateBoardTasks() {
    renderTodoTasksHTML(newTaskArray);
    renderInProgressHTML(newTaskArray);
    renderAwaitingFeedbackHTML(newTaskArray);
    renderDoneHTML(newTaskArray);
    showProgressbar();
}
/**
 * 
 * Render HTML For Board
 */
function renderBoardHTML() {
    let content = document.getElementById('contentSection');

    content.innerHTML = '';
    content.innerHTML += renderBoardTemplateHTML();
    document.getElementById('body').classList.add('hideScrollBarY');
    document.getElementById('boardBody').classList.add('showScrollBarY');
    renderBoardHeaderHTML();
    renderStatusFieldsHTML();
    checkPositionTask();
}
/**
 * 
 * Render the header HTML For Board
 */
function renderBoardHeaderHTML() {
    let content = document.getElementById('boardHeadlineContainer');

    content.innerHTML = '';
    content.innerHTML += renderBoardHeaderTemplateHTML();
}
/**
 * 
 * Render StatusFields HTML For Board
 */
function renderStatusFieldsHTML() {
    let content = document.getElementById('boardContentContainer');

    content.innerHTML = '';

    for (let i = 0; i < taskStatus.length; i++) {
        const stat = taskStatus[i];
        const statClass = taskStatusClasses[i];

        content.innerHTML += renderStatusfieldsTemplateHTML(i, stat, statClass);
    }
    updateBoardTasks();
}
/**
 * Render where the Task a show up For The Board
 * @param {String} arrayName - This is the parameter for the Todo Area
 */
function renderTodoTasksHTML(arrayName) {
    let content = document.getElementById('statContainer0');
    let todos = arrayName.filter(task => task['stat'] == 'todo');

    content.innerHTML = '';

    if (todos.length == 0) {
        content.innerHTML += /*html*/`
            Noch keine Tasks vorhanden
        `
    } else {
        for (let i = 0; i < todos.length; i++) {
            const task = todos[i];
            let subtasksAmount = task['subtasks'].length;
            let doneSubtasks = task['doneSubTasks'];
            let ProgressPercent = calculateProgress(subtasksAmount, doneSubtasks);

            content.innerHTML += generatePinnedTaskHTML(task, ProgressPercent);
            renderAssignedToHTML(task);
        }
    }
}
/**
 * Render where the Task a show up For The Board
 * @param {String} arrayName - This is the parameter for the InProgress Area
 */
function renderInProgressHTML(arrayName) {
    let content = document.getElementById('statContainer1');
    let inProgress = arrayName.filter(task => task['stat'] == 'inProgress');

    content.innerHTML = '';

    if (inProgress.length == 0) {
        content.innerHTML += /*html*/`
            Noch keine Tasks vorhanden
        `
    } else {
        for (let i = 0; i < inProgress.length; i++) {
            const task = inProgress[i];
            let subtasksAmount = task['subtasks'].length;
            let doneSubtasks = task['doneSubTasks'];
            let ProgressPercent = calculateProgress(subtasksAmount, doneSubtasks);

            content.innerHTML += generatePinnedTaskHTML(task, ProgressPercent);
            renderAssignedToHTML(task);
        }
    }
}
/**
 * Render where the Task a show up For The Board
 * @param {String} arrayName - This is the parameter for the AwaitingFeedback Area
 */
function renderAwaitingFeedbackHTML(arrayName) {
    let content = document.getElementById('statContainer2');
    let awaitingFeedback = arrayName.filter(task => task['stat'] == 'awaitingFeedback');

    content.innerHTML = '';

    if (awaitingFeedback.length == 0) {
        content.innerHTML += /*html*/`
            Noch keine Tasks vorhanden
        `
    } else {
        for (let i = 0; i < awaitingFeedback.length; i++) {
            const task = awaitingFeedback[i];
            let subtasksAmount = task['subtasks'].length;
            let doneSubtasks = task['doneSubTasks'];
            let ProgressPercent = calculateProgress(subtasksAmount, doneSubtasks);

            content.innerHTML += generatePinnedTaskHTML(task, ProgressPercent);
            renderAssignedToHTML(task);
        }
    }
}
/**
 * Render where the Task a show up For The Board
 * @param {String} arrayName - This is the parameter for the Done Area
 */
function renderDoneHTML(arrayName) {
    let content = document.getElementById('statContainer3');
    let done = arrayName.filter(task => task['stat'] == 'done');

    content.innerHTML = '';

    if (done.length == 0) {
        content.innerHTML += /*html*/`
            Noch keine Tasks vorhanden
        `
    } else {
        for (let i = 0; i < done.length; i++) {
            const task = done[i];
            let subtasksAmount = task['subtasks'].length;
            let doneSubtasks = task['doneSubTasks'];
            let ProgressPercent = calculateProgress(subtasksAmount, doneSubtasks);

            content.innerHTML += generatePinnedTaskHTML(task, ProgressPercent);
            renderAssignedToHTML(task);
        }
    }
}
/**
 * 
 * @param {String} task - This function allow to use the unique Tasknote after adding in a area.
 */
function renderAssignedToHTML(task) {
    let content = document.getElementById(`assignedToContainer${task['id']}`);
    //debugger;
    let assignmentCount = task['assignedTo'].length - 3;

    content.innerHTML = '';
    if (task['assignedTo'].length <= 3) {
        renderTaskAssignmentListHTML(task, task['assignedTo'].length);
    } else {
        renderTaskAssignmentListHTML(task, '3');
    }

    if (task['assignedTo'].length > 3) {
        content.innerHTML += renderTaskAssignmentCountHTML(assignmentCount);
    }
}
/**
 * 
 * @param {String} task - This function allow to use the unique Tasknote after adding in a area.
 * @param {String} count  This function allow to use the Tasknote.length. 
 */

function renderTaskAssignmentListHTML(task, count) {
    let content = document.getElementById(`assignedToContainer${task['id']}`);

    for (let i = 0; i < count; i++) {
        const assignment = task['assignedTo'][i];
        let initials = getInitials(assignment);
        let bgColor = task['color'][i];

        content.innerHTML += renderTaskAssignmentsTemplateHTML(task, bgColor, initials);
    }
}
/**
 * render the Progressbar on the Tasksnotes
 * 
 */

function showProgressbar() {
    for (let i = 0; i < newTaskArray.length; i++) {
        const task = newTaskArray[i];

        if (task['subtasks'].length > 0) {
            document.getElementById(`progressContainer${task['id']}`).classList.remove('v-hide');
        }
    }
}
/**
 * Open the Popup to adding new Task 
 * 
 */
function openExistingTaskPopUp(Id) {
    renderClickedTaskPopUpHTML(Id);
    document.getElementById('overlaySection').classList.remove('d-none');
    currentOpenTask = Id;
}
/**
 * close the Popup to adding new Task 
 * 
 */
function closeTaskPopUp() {
    document.getElementById('overlaySection').classList.add('d-none');
}
/**
 * Render The Pop up Task 
 * @param {number} Id Id is the unique Id of each Tasknote
 * 
 */
function renderClickedTaskPopUpHTML(Id) {
    let content = document.getElementById('overlaySection');
    let clickedTask = newTaskArray[Id];
    content.innerHTML = '';

    content.innerHTML += renderClickedTaskOverviewPopUpTemplateHTML(clickedTask, Id);

    renderTaskPopUpTableHTML(clickedTask);
    renderTaskPopUpAssignmentsHTML(clickedTask);
}
/**
 *  Render more of The Pop up Task 
 * 
 */
function renderTaskPopUpTableHTML(clickedTask) {
    let content = document.getElementById('taskPopUpTable');

    content.innerHTML = '';

    content.innerHTML += renderTaskPopUpTableTemplateHTML(clickedTask);
}
/**
 * Render the Initails and color 
 * 
 */
function renderTaskPopUpAssignmentsHTML(clickedTask) {
    let content = document.getElementById('taskPopUpAssignmentsList');

    content.innerHTML = '';

    for (let i = 0; i < clickedTask['assignedTo'].length; i++) {
        const assignment = clickedTask['assignedTo'][i];
        let initials = getInitials(assignment);
        let bgColor = clickedTask['color'][i];

        content.innerHTML += renderTaskAssignmentsPlusInitialsTemplateHTML(assignment, initials, bgColor);
    }
}
/**
 * Open the Popup to modifyer the Task
 * 
 */
function openModifyTaskPopUp(Id) {
    generateNormalTask = false;
    modifyCurrentTaskHTML(Id);
    renderContactsModifyAddTask(Id);
    renderModifyAssignmentsHTML(Id);
}
/**
 * Use the Current Task the Popup to modifyer the Task
 * 
 */
function modifyCurrentTaskHTML(Id) {
    let content = document.getElementById('overlaySection');
    let currentTask = newTaskArray[Id];
    let prio = currentTask['prio'];

    content.innerHTML = '';
    content.innerHTML = renderModifyTaskTemplateHTML(currentTask);


    setMinDate('modifyDate');
    modifyPrio(prio);
    renderModifySubtaskList(Id);
}
/**
 * Render the Popup to modifyer the Task
 * 
 */
function renderModifyAssignmentsHTML(Id) {
    let currentTask = document.getElementById(`modifyPopUpAssignmentContainer${Id}`);

    for (let i = 0; i < allContacts.length; i++) {
        const initial = allContacts[i]['initials'];
        const color = allContacts[i]['color'];
        currentTask.innerHTML += /* html */ `
        <div  id="modifyerRenderVisibelAssigned${i}"  style="background-color: ${color}" class=" assigneeContainer d-none">${initial}</div>`;

        let checkbox = document.getElementById(`assignedCheckboxModidiyer${i}`);
        if (checkbox.checked == true) {
            document.getElementById(`modifyerRenderVisibelAssigned${i}`).classList.remove('d-none');
        } else {
            document.getElementById(`modifyerRenderVisibelAssigned${i}`).classList.add('d-none');
        }
    }
}

/**
 * Modifyer the prio 
 * 
 */
function modifyPrio(currentPriority) {
    let currentPrio = capitalizeFirstLetter(currentPriority);
    let prioValue = document.getElementById(`modify${currentPrio}`).value;
    newPrio = prioValue;
    let otherPrios = priories.filter(currentPriority => currentPriority !== `${prioValue}`);
    let otherPrio1 = capitalizeFirstLetter(otherPrios[0]);
    let otherPrio2 = capitalizeFirstLetter(otherPrios[1]);

    document.getElementById(`modify${currentPrio}`).classList.add(`${prioValue}`);
    document.getElementById(`modify${currentPrio}Icon`).src = `./img/${prioValue}WhiteIcon.png`;

    document.getElementById(`modify${otherPrio1}`).classList.remove(`${otherPrios[0]}`);
    document.getElementById(`modify${otherPrio1}Icon`).src = `./img/${otherPrios[0]}Icon.png`;

    document.getElementById(`modify${otherPrio2}`).classList.remove(`${otherPrios[1]}`);
    document.getElementById(`modify${otherPrio2}Icon`).src = `./img/${otherPrios[1]}Icon.png`;
}
/**
 * Render the subtask for Modifyer and changes  
 * 
 */
function renderModifySubtaskList(Id) {
    let content = document.getElementById('modifysubtasksList');
    let task = newTaskArray[Id];

    for (let i = 0; i < task['subtasks'].length; i++) {
        const subtask = task['subtasks'][i];
        let isChecked = task['isChecked'][i];

        if (isChecked == true) {
            content.innerHTML += renderCheckedBoxTemplateHTML(i, Id, subtask);
        }
        if (isChecked == false) {
            content.innerHTML += renderUncheckedBoxTemplateHTML(i, Id, subtask);
        }
    }
}

function changeImg() {
    let imageTag = document.getElementById('deleteTask-Img');

    imageTag.src = './img/delete.png';
}
/**
 * Render the Contact and checkboxes for Modifyer and changes  
 * 
 */
function renderContactsModifyAddTask(Id) {


    for (let i = 0; i < allContacts.length; i++) {
        const allData = allContacts[i];
        const { name, color } = getJoinData(allData);

        document.getElementById(`modifyAssignedTo`).innerHTML += /*html*/ `
        <div id="assignedName${i}" class="assignedFrame" >
        <input id="assignedCheckboxModidiyer${i}" onclick="renderModifyAssignmentsHTML(${Id})" class="assignedCheckbox" type="checkbox">${name}
        </div>
        `;

    }
    activateEvent(Id);
}/**
 * show which Checkbox is checked after loading the Pop up First time
 * 
 */
function activateEvent(Id) {
    let currentTask = newTaskArray[Id]['assignedTo'];
    for (let i = 0; i < allContacts.length; i++) {
        const Contact = allContacts[i]['name'];
        for (let j = 0; j < currentTask.length; j++) {
            const name = currentTask[j];
            if (Contact == name) {
                document.getElementById(`assignedCheckboxModidiyer${i}`).checked = true;
            }
        }
    }

}

/**
 * Modifyer the Assigned
 * 
 */
function modifyAssignedTo(Id) {
    newTaskArray[Id]['assignedTo'] = []
    newTaskArray[Id]['color'] = []

    for (let i = 0; i < allContacts.length; i++) {
        const contact = allContacts[i]['name'];
        const initial = allContacts[i]['initials'];
        const color = allContacts[i]['color'];
        let modifycheckbox = document.getElementById(`assignedCheckboxModidiyer${i}`);
        if (modifycheckbox.checked) {
            newTaskArray[Id]['assignedTo'].push(contact);
            newTaskArray[Id]['color'].push(color);
        }
    }
    renderModifyAssignmentsHTML(Id);
}
/**
 * modifyer the Subtask
 * 
 */
function configDoneSubtask(i, Id) {
    let task = newTaskArray[Id];
    let currentStatus = document.getElementById(`subtaskCheckBox${i}`).checked;

    if (currentStatus == true) {
        task['doneSubTasks']++;
    }

    if (currentStatus == false) {
        task['doneSubTasks']--;
    }
    task['isChecked'][i] = currentStatus;
}
/**
 *  calcuclate for the Done Bar Progress
 * 
 */
function calculateProgress(subTaskAmount, doneAmount) {
    if (doneAmount > subTaskAmount) {
        doneAmount = subTaskAmount;
    }
    let progressInPercent = 100 / subTaskAmount * doneAmount;

    return progressInPercent;
}
/**
 * confim the Modifyers 
 * 
 */
function confirmChangesOnTask(Id) {
    modifyAssignedTo(Id);

    if (newTaskArray[Id]['assignedTo'].length > 0) {
        let currentTask = newTaskArray[Id];
        let newTitle = document.getElementById('modifyTitle').value;
        let newDescription = document.getElementById('modifyDescription').value;
        let newDate = document.getElementById('modifyDate').value;

        currentTask['title'] = newTitle;
        currentTask['description'] = newDescription;
        currentTask['date'] = newDate;
        currentTask['prio'] = newPrio;


        closeTaskPopUp();
        saveTasks();
        updateBoardTasks();
    } else { warnNoChoseAssigned(); }
}
/**
 * Deletet the Current chose Task
 * 
 */
function deleteTask(Id) {

    newTaskArray.splice(Id, 1);
    giveTaskId();
    closeTaskPopUp();
    saveTasks();
    updateBoardTasks();
}
/**
 * Drag and Drop
 * 
 */

function startDragging(id) {
    currentDraggedTask = id;
    document.getElementById(`pinnedTaskContainer${currentDraggedTask}`).classList.add('rotateDeg');
}
/**
 * allowDrop
 * 
 */
function allowDrop(ev) {
    ev.preventDefault();
}
/**
 * drop
 * 
 */
function drop(stat) {
    newTaskArray[currentDraggedTask]['stat'] = stat;
    document.getElementById(`pinnedTaskContainer${currentDraggedTask}`).classList.remove('rotateDeg');
    saveTasks();
    updateBoardTasks();
}

function highlight(stat) {
    //document.getElementById(stat).classList.add('dragAreaHighlight');
}

function stopHighlight(stat) {
    document.getElementById(stat).classList.remove('dragAreaHighlight');
}
/**
 * searchTask
 * 
 */
function searchTask() {
    let searchInput = document.getElementById('searchInput').value;

    for (let i = 0; i < newTaskArray.length; i++) {
        const currentTask = newTaskArray[i];
        let search = searchInput.toLowerCase();
        let search2 = capitalizeFirstLetter(search);

        if (currentTask['title'].includes(search) || currentTask['description'].includes(search)) {
            filteredTasks.push(currentTask);
        } else if (currentTask['title'].includes(search2) || currentTask['description'].includes(search2)) {
            filteredTasks.push(currentTask);
        }
    }
    renderFilteredTasks('filteredTasks');
}
/**
 * UpperCase each search question. Importend for search 
 * 
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * Filter the Task 
 * 
 */
function renderFilteredTasks() {
    renderTodoTasksHTML(filteredTasks);
    renderInProgressHTML(filteredTasks);
    renderAwaitingFeedbackHTML(filteredTasks);
    renderDoneHTML(filteredTasks);

    filteredTasks = [];
}

/**
 * for responsive to move the task up
 * 
 * @param {number} taskID to get the id from the clicked button
 * @param {*} event to stop Propagation
 */
async function moveTaskUp(taskID, event) {
    event.stopPropagation();
    let currentTaskPosition = newTaskArray[taskID]['stat'];
    let indexOfTaskPosition = taskStatusClasses.indexOf(currentTaskPosition);
    indexOfTaskPosition-- ;
    newTaskArray[taskID]['stat'] = taskStatusClasses[indexOfTaskPosition] ;
    await saveTasks();
    checkPositionTask();
}

/**
 * for responsive to move the task down
 * 
 * @param {number} taskID to get the id from the clicked button
 * @param {*} event to stop Propagation
 */
async function moveTaskDown(taskID,event) {
    event.stopPropagation();
    let currentTaskPosition = newTaskArray[taskID]['stat'];
    let indexOfTaskPosition = taskStatusClasses.indexOf(currentTaskPosition);
    indexOfTaskPosition++ ;
    newTaskArray[taskID]['stat'] = taskStatusClasses[indexOfTaskPosition] ;
    await saveTasks();
    checkPositionTask();
}

/**
 * check where the task is do display the arrow correct
 * 
 */
function checkPositionTask() {
    //if position todo or done don´t show up/down arrow
    for (let i = 0; i < newTaskArray.length; i++) {
        const task = newTaskArray[i];
        if (task['stat'] == 'todo') {
            document.getElementById(`move-up${i}`).classList.add('d-none');
        }
        if (task['stat'] == 'done') {
            document.getElementById(`move-down${i}`).classList.add('d-none');
        }
    }
}