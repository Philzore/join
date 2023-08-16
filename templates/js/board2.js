
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