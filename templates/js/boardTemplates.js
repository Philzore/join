/**
 * modify Assignments Template for HTML
 * 
 */

function modifyAssignmentsTemplateHTML(bgColor, initials) {
    return /*html*/`
    <div class="taskPopUpSingleAssignmentInitals contactContainer" style="background:${bgColor}">${initials}</div>
`
}
/**
 * render modify Task Template for HTML
 * 
 */
function renderModifyTaskTemplateHTML(currentTask) {
    return /*html*/`
    <div class="taskModifyPopUp" onclick="doNotClose(event)">
    
        <div class="closeTaskPopUpButton" onclick="closeTaskPopUp()"><img  class="closeBtnCross" src="./img/close.svg">
        <img  class="closeBtnArrow" src="./img/arrow-left-line.svg"></div>

        <div class="titleAndInput m-0">
            <span>Title</span>
            <input class="modifyInput" id="modifyTitle" type="text" required placeholder="Enter a title" value="${currentTask['title']}">
        </div>

        <div class="descriptionAndTextarea">
            <span>Description</span>
            <textarea class="modifyInput" id="modifyDescription" type="text" required placeholder="Enter a Description">${currentTask['description']}</textarea>
        </div>

        <div class="dueDateAndInput">
            <span>Due Date</span>
            <input class="modifyInput" type="date" id="modifyDate" required placeholder="dd/mm/yyyy" value="${currentTask['date']}">
        </div>

        <div class="prio">
            <span>Prio</span>
            <div class="prioButtons modifyInput">
                <button type="button" id="modifyUrgent" value="urgent" onclick=" modifyPrio(value)">
                    Urgent
                    <img id="modifyUrgentIcon" src="./img/urgentIcon.png">
                </button>

                <button type="button" id="modifyMedium" value="medium" onclick=" modifyPrio(value)">
                    Medium
                    <img id="modifyMediumIcon" src="./img/mediumIcon.png">
                </button>

                <button type="button" id="modifyLow" value="low" onclick=" modifyPrio(value)">
                    Low
                    <img id="modifyLowIcon" src="./img/lowIcon.png">
                </button>
            </div>
        </div>

        <div class="assignedToAndSelect">
            <span>Assigned to<div type="button" onclick="closewarnNoChoseAssigned()"  class="ChoseAssigned d-none" id="ChoseAssigned" >Chose a Assigned !!!</div></span>
            <div class="modifyInput">
            </div>
            <div class="assignedTo" id="modifyAssignedTo">
            </div>
            <div id="modifyPopUpAssignmentContainer${currentTask['id']}" class="d-flex mt"></div>
        </div>
        <div class="inputAndButton">
            <input id="modifysubtasks" placeholder="Add new subtask">
            <button type="button" onclick="newSubtask()">
                <img src="./img/subtaskIcon.png">
            </button>
        </div>
        <div class="subtasksList modifySubtaskList" id="modifysubtasksList">

        </div>
        <div class="addTaskBtn confirmBtn btn-bg" onclick="confirmChangesOnTask('${currentTask['id']}')">
        <img src="./img/checkIcon.png" alt="">
    </div>

    </div>
   `
}
/**
 * render modify Assignments and Initails Template for HTML
 * 
 */

function renderTaskAssignmentsPlusInitialsTemplateHTML(assignment, initials, bgColor) {
    return /*html*/`
    <div class="taskPopUpSingleAssignmentContainer">
        <div class="taskPopUpSingleAssignmentInitals contactContainer" style="background:${bgColor}">${initials}</div>
        <div class="taskPopUpSingleAssignmentName">${assignment}</div>
    </div>
`
}
/**
 *render Task PopUp Table Template HTML
 * 
 */
function renderTaskPopUpTableTemplateHTML(clickedTask) {
    return /*html*/`
    <div class="taskPopUpRow">
        <div class="taskPopUpLeftTd"><b>Due Date:</b></div>
        <div class="taskPopUpRightTd">${clickedTask['date']}</div>
    </div>

    <div class="taskPopUpRow">
        <div class="taskPopUpLeftTd"><b>Priority:</b></div>

    <div id="modifyMedium" class="${clickedTask['prio']} prioContainer">
        ${clickedTask['prio']} <img id="modifyMediumIcon" src="./img/${clickedTask['prio']}WhiteIcon.png">
    </div>

    </div>

    <div class="closeTaskPopUpButton" onclick="closeTaskPopUp()"><img  class="closeBtnCross" src="./img/close.svg">
    <img  class="closeBtnArrow" src="./img/arrow-left-line.svg"></div>
`
}
/**
 * render Clicked TaskOverview PopUp Template for HTML
 * 
 */
function renderClickedTaskOverviewPopUpTemplateHTML(clickedTask, Id) {
    return /*html*/`
    <div class="taskOverviewPopUp" onclick="doNotClose(event)">
        <div class="taskCategory ${clickedTask['category'].toLowerCase()}-bg">
            ${clickedTask['category']}
        </div>

        <div class="taskPopUpHeadline">${clickedTask['title']}</div>

        <div class="taskPopUpDiscription">${clickedTask['description']}</div>

        <div class="taskPopUpTable" id="taskPopUpTable"></div>

        <div class="special-info">
        <div class="taskPopUpAssignments" id="taskPopUpAssignments">
            <div class="assignedToHeadline"><b>Assigned to:</b></div>
            <div id="taskPopUpAssignmentsList" class="taskPopUpAssignmentsList"></div>
        </div>
        <div class="subtask-container">
            <span><b>Subtasks :</b></span>
            <div class="actual-subtasks" id="actual-subtasks"></div>
        </div>
        </div>

        <div class="popUpButtonsContainer">
            <div onmouseover="changeImg()" class="taskPopUpButton leftBtn btn-border" onclick="deleteTask('${Id}')"><img class="leftBtnImg" id="deleteTask-Img" src="./img/delete.png" alt=""></div>

            <div class="taskPopUpButton rightBtn btn-bg" onclick="openModifyTaskPopUp('${Id}')"><img class="rightBtnImg" src="./img/edit.svg" alt=""></div>
        </div>
    </div>
`
}
/**
 * generate Pinned Task HTML
 * 
 */
function generatePinnedTaskHTML(task, progressInPercent) {
    return /*html*/`
    <div onclick="openExistingTaskPopUp(${task['id']})">
        <div draggable="true" ondragstart="startDragging(${task['id']})" class="pinnedTaskContainer" id="pinnedTaskContainer${task['id']}">
            <div class="taskCategory ${task['category'].toLowerCase()}-bg">
                ${task['category']}
            </div>

            <div class="move-task-btns">
                <img id="move-up${task['id']}" class="direction-btn" onclick="moveTaskUp(${task['id']},event)" src="./img/arrow-up.png">
                <img id="move-down${task['id']}" class="direction-btn" onclick="moveTaskDown(${task['id']}, event)" src="./img/arrow-down.png">
            </div>

            <h3 class="pinnedTaskHeadline">${task['title']}</h3>
            <p class="pinnedTaskDiscription">${task['description']}</p>

            <div id="progressContainer${task['id']}" class="progressContainer v-hide">
                <div class="progressBar">
                    <div class="blueProgress" style="width:${progressInPercent}%"></div>
                </div>
            
            <div class="progressText">${task['doneSubTasks']} / ${task['subtasks'].length} Done</div>
        </div>

        <div class="pinnedTaskContactsArrowContainer">
            <div class="pinnedTaskContactsContainer" id="assignedToContainer${task['id']}">

            </div>

            <div class="arrowButton">
                <img src="./img/${task['prio']}Icon.png" alt="">
            </div>
        </div>
        </div>
        </div>
        
    </div>
`;
}
/**
 * render Task Assignments Template to HTML
 * 
 */
function renderTaskAssignmentsTemplateHTML(task, bgColor, initials) {
    return /*html*/`
    <div class="contactContainer" id="" style="background-color:${bgColor}">${initials}</div>
    `;
}
/**
 * render Task Assignment Count to HTML
 * 
 */
function renderTaskAssignmentCountHTML(assignmentCount) {
    return /*html*/`
    <div class="contactContainer" style="background-color: rgb(0, 0, 0)">+${assignmentCount}</div>
    `;
}
/**
 * render Status fields Template to HTML
 * 
 */
function renderStatusfieldsTemplateHTML(i, stat, statClass) {
    return /*html*/`
    <div class="statContainer">

        <div class="boardStatusHeadContainer" onclick="openAddTaskOverlay('${statClass}')">
            <div class="boardStatus">${stat}</div>
            <div class="plusBtnContainer btn-border-color">
                <div class="plusLine1"></div>
                <div class="plusLine2"></div>
            </div>
        </div>

        <div id="statContainer${i}" class="statusContent" ondrop="drop('${statClass}'); stopHighlight('statContainer${i}')" ondragover="allowDrop(event); highlight('statContainer${i}')" ondragleave="stopHighlight('statContainer${i}')"></div>
    </div>
`
}
/**
 * render Board Header Template to HTML
 * 
 */
function renderBoardHeaderTemplateHTML() {
    return /*html*/`
    <div id= "BoardManagementText" class="boardManagementText">Kanban Project Management Tool</div>
    <div class="boardHeadlineLeftContainer">
        <div class="board">Board</div>

        <div class="plusBtnContainer mobileAddTask d-none btn-bg" onclick="openAddTaskOverlay('todo')">
            <div class="plusLine1 bg-white"></div>
            <div class="plusLine2 bg-white"></div>
        </div>
    </div>

    <div class="boardHeadlineRightContainer">
        <div class="searchContainer">
            <input oninput="searchTask()" id="searchInput" class="searchInput" type="text" placeholder="Find task">

        <div class="searchBtn">
            <img src="./img/Vector.png" alt="">
        </div>
    </div>
    
    <button class="addTaskBtn btn-bg" onclick="openAddTaskOverlay('todo')">
        <span class="addTaskBtnText">Add task</span>
        <span class="addTaskBtnIcon">+</span>
    </button>

    </div>
`
}
/**
 * render Board Template to HTMLL
 * 
 */
function renderBoardTemplateHTML() {
    return /*html*/`
    <div class="boardBody" id="boardBody">
        <section id="boardHeadlineContainer" class="boardHeadlineContainer"></section>

        <section id="boardContentContainer" class="boardContentContainer"></section>
    </div>
    `
}
/**
 * render CheckedBox Template to HTML
 * 
 */
function renderCheckedBoxTemplateHTML(i, Id, subtask) {
    return /*html*/`
    <div class="subtask modifySubtask">
        <input id="subtaskCheckBox${i}" type="checkbox" checked onclick="configDoneSubtask(${i}, ${Id})">
        <p id="subtaskName${i}">${subtask}</p>
    </div>
    `
}
/**
 * render Unchecked Box Template to HTML
 * 
 */
function renderUncheckedBoxTemplateHTML(i, Id, subtask) {
    return /*html*/`
    <div class="subtask modifySubtask">
        <input id="subtaskCheckBox${i}" type="checkbox"  onclick="configDoneSubtask(${i}, ${Id})">
        <p id="subtaskName${i}">${subtask}</p>
    </div>
    `
}