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
  window.location.replace("https://join-604.developerakademie.net/join/index.html");
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
    window.location.replace("https://join-604.developerakademie.net/join/index.html");
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