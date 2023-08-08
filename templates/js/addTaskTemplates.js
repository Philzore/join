function generateAddTaskContent() {
    return /*html*/ `
        <form class="addTaskMainContainer" id="addTaskForm">
            <div class="headlineContainer" id="headlineContainer"></div>
            <div class="contentLeftAndRightContainer" id="contentLeftAndRightContainer"></div>
            <div class="twoButtonsContainer" id="twoButtonsContainer"></div>
        </form>
    `;
}

function generateContentLeftAndRightContainer() {
    return /*html*/ `
        <div class="contentLeftAndRight">
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
                    <select id="category" onchange="showAddBox()" required>
                        <option value="" disabled selected>Select task category</option>
                        <option value="new">Create new category</option>
                        <option value="design">Design</option>
                        <option value="sales">Sales</option>
                        <option value="backoffice">Backoffice</option>
                        <option value="media">Media</option>
                        <option value="marketing">Marketing</option>
                    </select>
                    <div id="new-category-box" class="d-none new-category-box">
                        <input id="new-category-input" class="" type="text" placeholder="Add new category" >
                        <button type="button" class="add-category-btn" onclick="addNewCategory()">Add</button>
                    </div>
                </div>

                <div class="assignedToAndSelect">
                    <span>Assigned to</span>
                    <div  id="selectContact"  class="selectContact" type="button" onclick="showAllAssigned()">Select contacts to assign 
                    <img id="selectContactImg" src="./img/dropdownArrow.png"  class="selectContactImg"></div>
                    <div class="assignedTo d-none" id="assignedTo" required> 
                        
                    </div>
                </div> 

            


                <div class="assignedToList" id="assignedToList">

                </div>
            </div>

            <div class="borderline"></div>

            <div class="contentRight">
                <div class="dueDateAndInput">
                    <span>Due Date</span>
                    <input type="date" id="date" required placeholder="dd/mm/yyyy" onchange="pushDate()">
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

                <div class="subtasksList" id="subtasksList">

                </div>
            </div>
        </div>
    `;
}

function generateTwoButtonsContainer() {
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


