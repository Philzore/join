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

function giveTaskId() {
    for (let i = 0; i < newTaskArray.length; i++) {
        const currentTask = newTaskArray[i];

        currentTask['id'] = i;
    }
}

///////////////RenderFunktionen////////////////////////
function updateBoardTasks() {
    renderTodoTasksHTML(newTaskArray);
    renderInProgressHTML(newTaskArray);
    renderAwaitingFeedbackHTML(newTaskArray);
    renderDoneHTML(newTaskArray);
    showProgressbar();
}

function renderBoardHTML() {
    let content = document.getElementById('contentSection');

    content.innerHTML = '';
    content.innerHTML += renderBoardTemplateHTML();
    document.getElementById('body').classList.add('hideScrollBarY');
    document.getElementById('boardBody').classList.add('showScrollBarY');
    renderBoardHeaderHTML();
    renderStatusFieldsHTML();
}

function renderBoardHeaderHTML() {
    let content = document.getElementById('boardHeadlineContainer');

    content.innerHTML = '';
    content.innerHTML += renderBoardHeaderTemplateHTML();
}

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

function renderTodoTasksHTML(arrayName) {
    let content = document.getElementById('statContainer0');
    let todos = arrayName.filter(task => task['stat'] == 'todo');

    content.innerHTML = '';

    for (let i = 0; i < todos.length; i++) {
        const task = todos[i];
        let subtasksAmount = task['subtasks'].length;
        let doneSubtasks = task['doneSubTasks'];
        let ProgressPercent = calculateProgress(subtasksAmount, doneSubtasks);

        content.innerHTML += generatePinnedTaskHTML(task, ProgressPercent);
        renderAssignedToHTML(task);
    }
}

function renderInProgressHTML(arrayName) {
    let content = document.getElementById('statContainer1');
    let inProgress = arrayName.filter(task => task['stat'] == 'inProgress');

    content.innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const task = inProgress[i];
        let subtasksAmount = task['subtasks'].length;
        let doneSubtasks = task['doneSubTasks'];
        let ProgressPercent = calculateProgress(subtasksAmount, doneSubtasks);

        content.innerHTML += generatePinnedTaskHTML(task, ProgressPercent);
        renderAssignedToHTML(task);
    }
}

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

function renderDoneHTML(arrayName) {
    let content = document.getElementById('statContainer3');
    let done = arrayName.filter(task => task['stat'] == 'done');

    content.innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const task = done[i];
        let subtasksAmount = task['subtasks'].length;
        let doneSubtasks = task['doneSubTasks'];
        let ProgressPercent = calculateProgress(subtasksAmount, doneSubtasks);

        content.innerHTML += generatePinnedTaskHTML(task, ProgressPercent);
        renderAssignedToHTML(task);
    }
}

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

function renderTaskAssignmentListHTML(task, count) {
    let content = document.getElementById(`assignedToContainer${task['id']}`);

    for (let i = 0; i < count; i++) {
        const assignment = task['assignedTo'][i];
        let initials = getInitials(assignment);
        let bgColor = task['color'][i];

        content.innerHTML += renderTaskAssignmentsTemplateHTML(task, bgColor, initials);
    }
}

function showProgressbar() {
    for (let i = 0; i < newTaskArray.length; i++) {
        const task = newTaskArray[i];

        if (task['subtasks'].length > 0) {
            document.getElementById(`progressContainer${task['id']}`).classList.remove('v-hide');
        }
    }
}

///////////////////////Task-Pop-Up/////////////////////////////////
function openExistingTaskPopUp(Id) {
    renderClickedTaskPopUpHTML(Id);
    document.getElementById('overlaySection').classList.remove('d-none');
}

function closeTaskPopUp() {
    document.getElementById('overlaySection').classList.add('d-none');
}

function renderClickedTaskPopUpHTML(Id) {
    let content = document.getElementById('overlaySection');
    let clickedTask = newTaskArray[Id];
    content.innerHTML = '';

    content.innerHTML += renderClickedTaskOverviewPopUpTemplateHTML(clickedTask, Id);

    renderTaskPopUpTableHTML(clickedTask);
    renderTaskPopUpAssignmentsHTML(clickedTask);
}

function renderTaskPopUpTableHTML(clickedTask) {
    let content = document.getElementById('taskPopUpTable');

    content.innerHTML = '';

    content.innerHTML += renderTaskPopUpTableTemplateHTML(clickedTask);
}

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

function openModifyTaskPopUp(Id) {
    modifyCurrentTaskHTML(Id);
    renderContactsModifyAddTask(Id)
}

function modifyCurrentTaskHTML(Id) {
    let content = document.getElementById('overlaySection');
    let currentTask = newTaskArray[Id];
    let prio = currentTask['prio'];

    content.innerHTML = '';
    content.innerHTML = renderModifyTaskTemplateHTML(currentTask);

    renderModifyAssignmentsHTML(Id);
    setMinDate('modifyDate');
    modifyPrio(prio);
    renderModifySubtaskList(Id);
}

function renderModifyAssignmentsHTML(Id) {
    let currentTask = newTaskArray[Id];
    let content = document.getElementById(`modifyPopUpAssignmentContainer${currentTask['id']}`);

    content.innerHTML = '';

    for (let i = 0; i < currentTask['assignedTo'].length; i++) {
        const assignment = currentTask['assignedTo'][i];
        let initials = getInitials(assignment);
        let bgColor = currentTask['color'][i];

        content.innerHTML += modifyAssignmentsTemplateHTML(bgColor, initials);
    }
}

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

function renderContactsModifyAddTask() {
   /*  activateEvent(); */

    for (let i = 0; i < allContacts.length; i++) {
        const allData = allContacts[i];
        const { name, color } = getJoinData(allData);

        document.getElementById(`modifyAssignedTo`).innerHTML += /*html*/ `
        <div class="assignedFrame" >
        <input id="assignedCheckbox${i}" onclick="" class="assignedCheckbox" type="checkbox">${name}
        </div>
        `;
    }
}

/* function activateEvent() {
    for (let i = 0; i < allContacts.length; i++) {
        let modifycheckbox = document.getElementById(`assignedCheckbox${i}`);
        if (modifycheckbox.checked) {
            let modifyAssignBtn = document.getElementById(`assignedCheckbox${i}`);
            modifyAssignBtn.addEventListener("change", modifyAssignedTo);
        }
    }
}
 */
function modifyAssignedTo(Id) {
    /*     let assignee = document.getElementById("modifyAssignedTo");
        let Id = assignee.options[assignee.selectedIndex].value;
        let color = assignee.options[assignee.selectedIndex].id;
        let name = assignee.options[assignee.selectedIndex].innerHTML;
        let selectedAssignee2 = assignee.options[assignee.selectedIndex];
        selectedAssignee2.disabled = true;
        let i = (assignee.selectedIndex) - 1;
  
        if (newTaskArray[Id]['assignedTo'].indexOf(name) === -1) {
            newTaskArray[Id]['assignedTo'].push(name);
            newTaskArray[Id]['color'].push(color);
        } */

    for (let i = 0; i < allContacts.length; i++) {
        const contact = allContacts[i]['name'];
        const initial = allContacts[i]['initials'];
        const color = allContacts[i]['color'];
        let modifycheckbox = document.getElementById(`assignedCheckbox${i}`);
        if (modifycheckbox.checked) {
            newTaskArray[Id]['assignedTo'] = []
            newTaskArray[Id]['color'] = []
            newTaskArray[Id]['assignedTo'].push(contact);
            newTaskArray[Id]['color'].push(color);
        }
    }
    renderModifyAssignmentsHTML(Id);
}

function pushToAssignments(Id, name) {
    task['assignedTo'].push(name);
    renderModifySubtaskList(Id);
}

function configDoneSubtask(i, Id) {
    let task = newTaskArray[Id];
    let currentStatus = document.getElementById(`subtaskCheckBox${i}`).checked;

    if (currentStatus == true) {
        task['doneSubTasks']++;
        console.log(task['doneSubTasks']);
    }

    if (currentStatus == false) {
        task['doneSubTasks']--;
        console.log(task['doneSubTasks']);
    }
    task['isChecked'][i] = currentStatus;
    console.log(task['isChecked'][i]);
}

function calculateProgress(subTaskAmount, doneAmount) {
    if (doneAmount > subTaskAmount) {
        doneAmount = subTaskAmount;
    }
    let progressInPercent = 100 / subTaskAmount * doneAmount;

    return progressInPercent;
}

function confirmChangesOnTask(Id) {
    debugger
    if(newTaskArray[Id]['assignedTo'].length > 0){
    let currentTask = newTaskArray[Id];
    let newTitle = document.getElementById('modifyTitle').value;
    let newDescription = document.getElementById('modifyDescription').value;
    let newDate = document.getElementById('modifyDate').value;

    currentTask['title'] = newTitle;
    currentTask['description'] = newDescription;
    currentTask['date'] = newDate;
    currentTask['prio'] = newPrio;

    modifyAssignedTo(Id);
    closeTaskPopUp();
    saveTasks();
    updateBoardTasks();
    }else{ alert('pls chose a Assigned')}
}

function deleteTask(Id) {

    newTaskArray.splice(Id, 1);
    giveTaskId();
    closeTaskPopUp();
    saveTasks();
    updateBoardTasks();
}

///////////////////////Drag & Drop/////////////////////////////////
function startDragging(id) {
    currentDraggedTask = id;
    document.getElementById(`pinnedTaskContainer${currentDraggedTask}`).classList.add('rotateDeg');
}

function allowDrop(ev) {
    ev.preventDefault();

}

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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderFilteredTasks() {
    renderTodoTasksHTML(filteredTasks);
    renderInProgressHTML(filteredTasks);
    renderAwaitingFeedbackHTML(filteredTasks);
    renderDoneHTML(filteredTasks);

    filteredTasks = [];
}