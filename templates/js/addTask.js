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

function setColor(color) {
    contactsColors.push(color);
}

function renderTwoButtonsContainer() {
    document.getElementById('twoButtonsContainer').innerHTML = generateTwoButtonsContainer();
}

/**
 * 
 * @param {string} id - The ID allows the use of today's date
 */
function setMinDate(id) {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById(id).setAttribute('min', today);
}

/**
 * 
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
 * activate to Urgent Button
 * 
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
 * activate to Medium Button
 * 
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
 * activate to Low Button
 * 
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
 * Create a new SubTask
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
 * 
 * Reset the AddTasks Field
 */
function clearFields() {
    assignedToNames = [];
    allSubtasks = [];
    document.getElementById('assignedToList').innerHTML = '';
    document.getElementById('subtasksList').innerHTML = '';
    closeAllAssigned();
}

/**
 * 
 * Create a new Task
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
 * If no Assigned is Chose this function stop to push a new Task
 */
function warnNoChoseAssigned() {
    document.getElementById('ChoseAssigned').classList.remove('d-none');
    setTimeout(closewarnNoChoseAssigned, 4000)
}

function closewarnNoChoseAssigned() {
    document.getElementById('ChoseAssigned').classList.add('d-none');
}

async function saveTasks() {
    await setItem('createdTask', JSON.stringify(newTaskArray));
    renderBoard();
}

/**
 * 
 * Open the OverlaySection for the Board to adding new Tasks
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

/**
 * 
 *  Open the field which allow to adding new Category
 */
function showAddBox() {
    let value = document.getElementById('category').value;
    if (value == 'new') {
        document.getElementById('new-category-box').classList.remove('d-none');
    } else {
        document.getElementById('new-category-box').classList.add('d-none');
    }
    //check if a new category is choosen
    if (newCategorys.includes(value)) {
        document.getElementById('delete-category-btn').classList.remove('d-none');
    } else {
        document.getElementById('delete-category-btn').classList.add('d-none');
    }
}

/**
 * 
 *  adding new Category
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
 * Save the new Category
 */
function setNewCategory(categoryInput) {
    let selection = document.getElementById('category');
    selection.innerHTML += `
    <option class="delete-category" value="${categoryInput}">${categoryInput}

    </option>`;
    newCategorys.push(categoryInput);
    localStorage.setItem('newCategorys', JSON.stringify(newCategorys));
    selection.value = categoryInput;
    document.getElementById('new-category-box').classList.add('d-none');
    document.getElementById('delete-category-btn').classList.remove('d-none');
}

/**
 * 
 * render the new Category
 */
function renderNewCategorys() {
    let selection = document.getElementById('category');
    let parsedCategorys = JSON.parse(localStorage.getItem('newCategorys'));
    selection.innerHTML = '';
    renderStandardOptions(selection);
    if (parsedCategorys) {
        newCategorys = parsedCategorys;
        for (let i = 0; i < newCategorys.length; i++) {
            const category = newCategorys[i];
            selection.innerHTML += `<option value="${category}">${category}</option>`;
        }
    }
}

/**
 * render the standard options in the selection field
 * 
 * @param {html element} selection selection field getting by id
 */
function renderStandardOptions(selection) {
    selection.innerHTML += `
    <option value="" disabled selected>Select task category</option>
    <option value="new">Create new category</option>
    <option value="design">Design</option>
    <option value="sales">Sales</option>
    <option value="backoffice">Backoffice</option>
    <option value="media">Media</option>
    <option value="marketing">Marketing</option>
    `;
}

/**
 * delete the new created categorys
 * 
 */
function deleteCategory() {
    let currentCategory = document.getElementById('category').value;
    let position = -1;
    //check which position in array the category is 
    for (let i = 0; i < newCategorys.length; i++) {
        const place = newCategorys[i];
        if (currentCategory == place) {
            position = place;
            newCategorys.splice(position, 1);
            localStorage.setItem('newCategorys', JSON.stringify(newCategorys));
            renderNewCategorys();
        }
    }
    document.getElementById('delete-category-btn').classList.add('d-none');

}