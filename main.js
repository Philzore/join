let allContacts = [];
let lastActivePage = 'sidebarSummary';

/**
 * init variables
 * 
 */
async function init() {
    await loadContacts();
    await loadTasks();
    includeHTML();
    initSummary();
}

/**
 * render summary page
 * 
 */
function renderSummary() {
    initSummary();
    let sidebarSummary = document.getElementById('sidebarSummary');
    highlightSidebarBtn(sidebarSummary);
    lastActivePage = 'sidebarSummary';
}

/**
 * render board page
 * 
 */
function renderBoard() {
    giveTaskId();
    renderBoardHTML();
    let sidebarBoard = document.getElementById('sidebarBoard');
    highlightSidebarBtn(sidebarBoard);
    lastActivePage = 'sidebarBoard';
}

/**
 * render addTask page
 * 
 */
function renderAddTask() {
    initAddTask();
    let sidebarAddTask = document.getElementById('sidebarAddTask');
    highlightSidebarBtn(sidebarAddTask);
    lastActivePage = 'sidebarAddTask';
}

/**
 * render contacts page
 * 
 */
function renderContacts() {
    initContacts();
    let sidebarContacts = document.getElementById('sidebarContacts');
    highlightSidebarBtn(sidebarContacts);
    lastActivePage = 'sidebarContacts';
}

/**
 * render legal notice page
 * 
 */
function showLegalNoticeScreen() {
    contentSection.innerHTML = generateLegalNoticeScreenHTML();
    let sidebarLegal = document.getElementById('sidebarLegal');
    document.getElementById('headerContentRightLogout').style.display = 'none'
    highlightSidebarBtn(sidebarLegal);
}

/**
 * render show help page
 * 
 */
function showHelpScreen() {
    contentSection.innerHTML = generateHelpScreenHTML();
    let helpLogoBtn = document.getElementById('helpLogoBtn');
    document.getElementById('headerContentRightLogout').style.display = 'none'
    highlightSidebarBtn(helpLogoBtn);
}

/**
 * get datas
 * 
 */
function getJoinData(allData) {
    let name = allData['name'];
    let email = allData['email'];
    let phone = allData['phone'];
    let color = allData['color'];
    let initials = allData['initials'];
    let group = allData['group'];
    return { name, email, phone, color, initials, group };
}

/**
 * to close overlays screens
 * 
 * @param {event} event 
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * log out function
 * 
 */
function logOut() {
    window.location.replace("./templates/html/login.html");
    localStorage.removeItem("currentEmail");
}

/**
 * show log out screen
 * 
 */
function showLogOut() {
    if (document.getElementById('headerContentRightLogout').style.display == 'none') {
        document.getElementById('headerContentRightLogout').style.display = 'block';
    } else {
        document.getElementById('headerContentRightLogout').style.display = 'none';
    }
}

/**
 * highlight sidebar buttons when active
 * 
 */
function highlightSidebarBtn(element) {
    const buttons = document.getElementsByClassName('sidebarBtn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('sidebarBtnActive');
    }
    element.classList.add('sidebarBtnActive');
}

/**
 * go back to last page
 * 
 */
function returnToLastActivePage() {
    let nextScreen = document.getElementById(`${lastActivePage}`);
    nextScreen.click();
}