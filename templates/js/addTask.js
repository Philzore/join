let newTaskArray = [];
let prio = undefined;
let allSubtasks = [];
let assignedToNames = [];
let contactsColors = [];
let assignedToInitials = [];
let dateArray = [];
let isChecked = [];
let newCategorys = [];


/**
 * 
 */
async function initAddTask() {
    document.getElementById('contentSection').innerHTML = generateAddTaskContent();
    await loadTasks();
    renderHeadline();
    activatePrioButtons();
    allSubtasks = [];
}
/**
 * 
 */
async function loadTasks() {
    newTaskArray = JSON.parse(await getItem('createdTask'));
}
/**
 * 
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
 * 
 */
function renderContentLeftAndRight() {
    document.getElementById('contentLeftAndRightContainer').innerHTML = generateContentLeftAndRightContainer();
    renderNewCategorys();
    renderTwoButtonsContainer();
    setMinDate('date');
}
/**
 * 
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
 * 
 */
function showAllAssigned() {
    if (document.getElementById('selectContact').innerText == `Close Select contacts to assign`) {
        setTimeout(closeAllAssigned, 100)

    } else {
        setTimeout(openAllAssigned, 100)
    }
}
/**
 * 
 */
function closeAllAssigned() {
    document.getElementById('assignedTo').classList.add('d-none');
    document.getElementById('selectContact').innerHTML = `Select contacts to assign`;

    document.getElementById('selectContactImg').classList.remove('selectContactImgFlip');

}
/**
 * 
 */
function openAllAssigned() {
    document.getElementById('assignedTo').classList.remove('d-none');
    document.getElementById('selectContact').innerHTML = `Close Select contacts to assign`;
    document.getElementById('selectContactImg').classList.add('selectContactImgFlip');
  
}
/**
 * 
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
 * 
 * @param {*} color 
 */
function setColor(color) {
    contactsColors.push(color);
}
/**
 * 
 * @param {*} color 
 */
function renderTwoButtonsContainer() {
    document.getElementById('twoButtonsContainer').innerHTML = generateTwoButtonsContainer();
}
/**
 * 
 * @param {*} color 
 */
function setMinDate(id) {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById(id).setAttribute('min', today);
}
/**
 * 
 * @param {*} color 
 */
function pushDate() {
    let dueDate = document.getElementById('date').value;
    dateArray.splice(0, 1, dueDate);
}
/**
 * 
 * 
 */
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

    document.getElementById('addTaskForm').addEventListener('submit', function (event) {
        event.preventDefault();
        createTask();
    });
}
/**
 * 
 * @param {*} color 
 */
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
/**
 * 
 * @param {*} color 
 */
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
/**
 * 
 * @param {*} color 
 */
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
/**
 * 
 * @param {*} color 
 */
function newSubtask() {
    let newSubtask = document.getElementById('subtasks').value;
    debugger;
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
/**
 * 
 * @param {*} color 
 */
function clearFields() {
    assignedToNames = [];
    allSubtasks = [];
    document.getElementById('assignedToList').innerHTML = '';
    document.getElementById('subtasksList').innerHTML = '';
}
/**
 * 
 * @param {*} color 
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
 * 
 * @param {*} color 
 */
function warnNoChoseAssigned() {
    document.getElementById('ChoseAssigned').classList.remove('d-none');
    setTimeout(closewarnNoChoseAssigned, 4000)
}
/**
 * 
 * @param {*} color 
 */
function closewarnNoChoseAssigned(){
    document.getElementById('ChoseAssigned').classList.add('d-none');
}
/**
 * 
 * @param {*} color 
 */
async function saveTasks() {
    await setItem('createdTask', JSON.stringify(newTaskArray));
    renderBoard();
}
/**
 * 
 * @param {*} color 
 */
function taskAddedToBoard() {
    document.getElementById('overlaySection').classList.remove('d-none');
    document.getElementById('overlaySection').innerHTML = /*html*/ `
        <img src="./img/taskAddedToBoard.png" class="taskAddedPopUp" id="taskAddedPopUp">
    `;
    setTimeout(function () { closePopUp() }, 2000);
}
/**
 * 
 * @param {*} color 
 */
function closePopUp() {
    document.getElementById('overlaySection').classList.add('d-none');
}

function showAddBox() {
    let value = document.getElementById('category').value;
    if (value == 'new') {
        document.getElementById('new-category-box').classList.remove('d-none');
    } else {
        document.getElementById('new-category-box').classList.add('d-none');
    }
}
/**
 * 
 * @param {*} color 
 */
function addNewCategory() {
    let categoryInput = document.getElementById('new-category-input').value;
    let search = categoryInput.toLowerCase();
    let included = false;

    if (categoryInput.length > 2) {
        if (!newCategorys) {
            setNewCategory(categoryInput);
        } else {
            for (let i = 0; i < newCategorys.length; i++) {
                const category = newCategorys[i].toLowerCase();
                if (category.includes(search)) {
                    included = true;
                }
            }
            if (!included) {
                setNewCategory(categoryInput);
            } else {
                alert('Category already exist');
            }
        }
    } else {
        alert('Pleasse enter a plausible new category');
    }
    document.getElementById('new-category-input').value = '';
}
/**
 * 
 * @param {*} color 
 */
function setNewCategory(categoryInput) {
    let selection = document.getElementById('category');
    selection.innerHTML += `<option value="${categoryInput}">${categoryInput}</option>`;
    newCategorys.push(categoryInput);
    localStorage.setItem('newCategorys', JSON.stringify(newCategorys));
}
/**
 * 
 * @param {*} color 
 */
function renderNewCategorys() {
    let selection = document.getElementById('category');
    let parsedCategorys = JSON.parse(localStorage.getItem('newCategorys'));


    if (parsedCategorys) {
        newCategorys = parsedCategorys;
        for (let i = 0; i < newCategorys.length; i++) {
            const category = newCategorys[i];
            selection.innerHTML += `<option value="${category}">${category}</option>`;
        }
    }
}