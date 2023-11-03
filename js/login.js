if (window.location.href == 'https://join.philippmoessl.de/templates/html/login.html') {
  let mailInput = document.getElementById('loginEmail');
  
  mailInput.addEventListener('input', renderPassword);
}

/**
 * check url parameter and if there is one , show popup 
 * 
 */
function getMsg() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");

  if (msg) {
    document.getElementById("msgBox").innerHTML = `${msg}`;
    document.getElementById("msgBoxDiv").classList.remove("d-none");
    document.getElementById('loginContent').classList.add('d-none');
    setTimeout(() => {
      document.getElementById('loginContent').classList.remove('d-none');
      document.getElementById("msgBoxDiv").classList.add('d-none');
    }, 1500);
  } else {
    document.getElementById("msgBoxDiv").classList.remove("d-flex");
  }
}

/**
 * change location to signUp.html
 * 
 */
function leadToSignUp() {
  window.location.href = "signUp.html";
}

/**
 * replace location 
 * 
 */
function guestLogIn() {
  window.location.replace("https://join.philippmoessl.de/index.html");
}

/**
 * check if user is located in the backend if yes go to another location if not show popup incorrect mail or password
 * 
 */
async function login() {

  let email = document.getElementById("loginEmail");
  let password = document.getElementById("loginPassword");
  let user = userLogin.find(
    (u) => u.email == email.value && u.password == password.value
  );

  localStorage.setItem('currentEmail', email.value);

  if (user) {
    rememberMe(email, password);
    window.location.replace("https://philipp-moessl.developerakademie.net/join/index.html");
  } else {
    document.getElementById("msgBox").innerHTML = `Incorrect mail or password!`;
    document.getElementById("msgBoxDiv").classList.remove("d-none");
    document.getElementById('loginContent').classList.add('d-none');
    setTimeout(() => {
      document.getElementById('loginContent').classList.remove('d-none');
      document.getElementById("msgBoxDiv").classList.add('d-none');
    }, 1500);
  }
}

/**
 * save mail and password in local storage to automatic fill for remember
 * 
 * @param {string} email - email for remeber function
 * @param {string} password -  password for remember function to save in local storage
 */
function rememberMe(email, password) {
  //check checkbox
  let remember = document.getElementById('scales').checked;
  //if yes save username and password to local storage
  if (remember) {
    localStorage.setItem('rememberEmail', email.value);
    localStorage.setItem('rememberPassword', password.value);
  } else {
    localStorage.removeItem('rememberEmail');
    localStorage.removeItem('rememberPassword');
  }
}

/**
* get mail and password from local storage for automatic fill 
* 
*/
function renderPassword() {
  let mailInput = document.getElementById('loginEmail');
  let passwordInput = document.getElementById('loginPassword');
  //get email & password from localstorage
  
  let localStorageEmail = localStorage.getItem('rememberEmail');
  let localStoragePassword = localStorage.getItem('rememberPassword');
  if (mailInput.value == localStorageEmail) {
    passwordInput.value = localStoragePassword;
  }
}