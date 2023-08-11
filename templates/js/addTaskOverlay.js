/**
 * open overlay to create new task
 * 
 * @param {string} stat to add the task in the right position
 */
function openAddTaskOverlay(stat) {
    chosenStat = stat;
    document.getElementById('overlaySection').classList.remove('d-none');
    document.getElementById('overlaySection').innerHTML = /*html*/ `
        <form class="addTaskOverlay" id="addTaskForm" onclick="doNotClose(event)">
            <div class="headlineContainerOverlay" id="headlineContainerOverlay"></div>
            <div class="contentLeftAndRightContainerOverlay" id="contentLeftAndRightContainerOverlay"></div>
            <div class="twoButtonsContainerOverlay" id="twoButtonsContainerOverlay"></div>
        </form>
    `;
    renderHeadlineOverlay();
}

/**
 * render headline
 * 
 */
function renderHeadlineOverlay() {
    document.getElementById('headlineContainerOverlay').innerHTML = /*html*/ `
        <h1>Add Task</h1>
        <img class="closeBtnCross" src="./img/cancelIcon.png" onclick="closeOverlay()">
        <img  class="closeBtnArrow" src="./img/arrow-left-line.svg" onclick="closeOverlay()">
    `;
    renderContentLeftAndRightOverlay();
    renderContactsAddTaskOverlay();
    activatePrioButtonsOverlay();
}

/**
 * close overlay
 * 
 */
function closeOverlay() {
    document.getElementById('overlaySection').classList.add('d-none');
}

/**
 * render content for overlay to add a new task 
 * 
 */
function renderContentLeftAndRightOverlay() {
    document.getElementById('contentLeftAndRightContainerOverlay').innerHTML = generateContentLeftAndRightContainerOverlay();
    renderNewCategorys();
    renderTwoButtonsContainerOverlay();
    setMinDate('dateOverlay');
}

/**
 * render contacts to add them in a new task
 * 
 */
function renderContactsAddTaskOverlay() {

    for (let i = 0; i < allContacts.length; i++) {
        const allData = allContacts[i];
        const { name, color } = getJoinData(allData);

        document.getElementById('assignedToOverlay').innerHTML += /*html*/ `
        <div class="assignedFrame" >
        <input id="assignedCheckbox${i}" onclick="renderAssignedInitialOverlay()" class="assignedCheckbox" type="checkbox">${name}</div>
        `;
    }

}

/**
 * drop down for add task overlay to assigned the contacts
 * 
 */
function showAllAssignedOverlay() {
    if (document.getElementById('selectContactOverlay').innerText == `Close Select contacts to assign`) {
        setTimeout(closeAllAssignedOverlay, 100)

    } else {
        setTimeout(openAllAssignedOverlay, 100)
    }
}

/**
 * close drop down menu
 * 
 */
function closeAllAssignedOverlay() {
    document.getElementById('assignedToOverlay').classList.add('d-none');
    document.getElementById('selectContactOverlay').innerHTML = `Select contacts to assign`;
    document.getElementById('selectContactImg').classList.remove('selectContactImgFlip');
}

/**
 * open drop down menu
 * 
 */
function openAllAssignedOverlay() {
    document.getElementById('assignedToOverlay').classList.remove('d-none');
    document.getElementById('selectContactOverlay').innerHTML = `Close Select contacts to assign`;
    document.getElementById('selectContactImg').classList.add('selectContactImgFlip');
}

/**
 * render initials for from the contacts
 * 
 */
function renderAssignedInitialOverlay() {
    for (let i = 0; i < allContacts.length; i++) {
        const initial = allContacts[i]['initials'];
        const color = allContacts[i]['color'];

        document.getElementById('assignedToListOverlay').innerHTML += /* html */ `
        <div  id="renderVisibelAssignedOverlay${i}"  style="background-color: ${color}" class=" assigneeContainer d-none">${initial}</div>`;
        let checkbox = document.getElementById(`assignedCheckbox${i}`);
        if (checkbox.checked == true) {
            document.getElementById(`renderVisibelAssignedOverlay${i}`).classList.remove('d-none');
        }else{
            document.getElementById(`renderVisibelAssignedOverlay${i}`).classList.add('d-none');
        }
    }
}

/**
 * render the buttons at the end
 * 
 */
function renderTwoButtonsContainerOverlay() {
    document.getElementById('twoButtonsContainerOverlay').innerHTML = generateTwoButtonsContainerOverlay();
}

/**
 * 
 * 
 */
function pushDateOverlay() {
    let dueDate = document.getElementById('dateOverlay').value;
    dateArray.splice(0, 1, dueDate);
}

/**
 * create event listener for each priority button
 * 
 */
function activatePrioButtonsOverlay() {
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
 * change backround for urgent button
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
 * change backround for medium button
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
 * change backround for low button
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
 * generate html for add task overlay
 * 
 * @returns html code
 */
function generateContentLeftAndRightContainerOverlay() {
    return /*html*/ `
    <div class="contentLeftAndRight contentLeftAndRightOverlay">
    <div class="contentLeft">
        <div class="titleAndInput">
            <span>Title</span>
            <input id="title" type="text" required placeholder="Enter a title">
        </div>

        <div class="descriptionAndTextarea">
            <span>Description</span>
            <textarea id="description" type="text" required placeholder="Enter a Description"></textarea>
        </div>

        <div class="categoryAndSelect">
            <span>Category</span>
            <div class="select-category-box">
                <select id="category" onchange="showAddBox()" required>
                    <option value="" disabled selected>Select task category</option>
                    <option value="new">Create new category</option>
                    <option value="design">Design</option>
                    <option value="sales">Sales</option>
                    <option value="backoffice">Backoffice</option>
                    <option value="media">Media</option>
                    <option value="marketing">Marketing</option>
                </select>
                <button type="button" id="delete-category-btn" class="category-btn d-none" onclick="deleteCategory()">Delete</button>
            </div>
            <div id="new-category-box" class="d-none new-category-box">
                <input id="new-category-input" class="" type="text" placeholder="Add new category">
                <button type="button" class="category-btn" onclick="addNewCategory()">Add</button>
            </div>
        </div>

        <div class="assignedToAndSelect">
            <span>Assigned to <div  type="button" onclick="closewarnNoChoseAssigned()" class="ChoseAssigned d-none" id="ChoseAssigned" >Chose a Assigned !!!</div></span>
            <div  class="selectContactOverlay" type="button" onclick="showAllAssignedOverlay()">
            <div id="selectContactOverlay" class="" >Select contacts to assign</div>
            <img id="selectContactImg" src="./img/dropdownArrow.png" class="selectContactImg">
            </div>
            <div class="assignedTo d-none" id="assignedToOverlay">
            </div>   
        </div>



        <div class="assignedToList" id="assignedToListOverlay">
        </div>
    </div>
    <div class="borderline borderlineOverlay"></div>

    <div class="contentRight">
        <div class="dueDateAndInput">
            <span>Due Date</span>
            <input type="date" id="dateOverlay" required placeholder="dd/mm/yyyy" onchange="pushDateOverlay()">
        </div>

        <div class="prio">
            <span>Prio</span>
            <div class="prioButtons">
                <button type="button" id="urgent" value="urgent">
                    Urgent
                    <img id="urgentIcon" src="./img/urgentIcon.png">
                </button>

                <button type="button" id="medium" value="medium">
                    Medium
                    <img id="mediumIcon" src="./img/mediumIcon.png">
                </button>

                <button type="button" id="low" value="low">
                    Low
                    <img id="lowIcon" src="./img/lowIcon.png">
                </button>
            </div>
        </div>

        <div class="subtasksAndInput">
            <span>Subtasks</span>

            <div class="inputAndButton">
                <input id="subtasks" placeholder="Add new subtask">
                <button type="button" onclick="newSubtask()">
                    <img src="./img/subtaskIcon.png">
                </button>
            </div>
        </div>

        <div class="subtasksList" id="newSubtasksList">

        </div>
    </div>
</div>
`;
}

/**
 * generate html code for the two buttons at the end
 * 
 * @returns html code
 */
function generateTwoButtonsContainerOverlay() {
    return /*html*/ `
        <div class="twoButtons">
            <button id="reset" type="reset" class="clearButton" onclick="clearFields()">
                Clear
                <img src="./img/cancelIcon.png">
            </button>

            <button type="submit" class="createTaskButton" id="createTask">
                Create Task
                <img src="./img/checkIcon.png">
            </button>
        </div>
    `;
}