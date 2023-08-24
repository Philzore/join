let userLogin = [];
async function initLogin(){
  await loadUserLogin();
  await getMsg();
}

/**
 * load the users
 * 
 */
async function loadUserLogin() {
  let users = JSON.parse(await getItem("userLogin"));
  userLogin = users;
}

/**
 * push name,email and password in an array and send it to the backend
 * 
 */
async function signUp() {
  signUpbtn.disabled = true;
  userLogin.push({
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
  });

  await setItem("userLogin", JSON.stringify(userLogin));
  resetForm();
  window.location.href = "login.html?msg=registration succesful"; //Du hast dich erfolgreich registriert
}

/**
 * go to login.html
 * 
 */
function goBackToLogin() {
 window.location.href = "login.html";
}

/**
 * reset form
 * 
 */
function resetForm() {
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  signUpbtn.disabled = false;
}