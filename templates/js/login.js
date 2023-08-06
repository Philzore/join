function getMsg() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");

  if (msg) {
    document.getElementById("msgBox").innerHTML = `${msg}`;
    document.getElementById("msgBoxDiv").classList.remove("d-none");
  } else {
    document.getElementById("msgBoxDiv").classList.remove("d-flex");
  }
}

function leadToSignUp() {
  window.location.href = "signUp.html";
}
function guestLogIn() {
  window.location.replace("https://join-604.developerakademie.net/join/index.html");
}

async function login() {

  let email = document.getElementById("loginEmail");
  let password = document.getElementById("loginPassword");
  let user = userLogin.find(
    (u) => u.email == email.value && u.password == password.value
  );

  localStorage.setItem('currentEmail', email.value);

  console.log(user);
  if (user) {
    console.log("user gefunden");
    window.location.replace("https://join-604.developerakademie.net/join/index.html");
  } else {
    document.getElementById("msgBox").innerHTML = `Incorrect mail or password!`;
    document.getElementById("msgBoxDiv").classList.remove("d-none");
  }
}