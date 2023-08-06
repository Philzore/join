let index = localStorage.getItem('index');

/**
 * remove class d-none from buttonAnimationEmail
 * 
 */
function popUpMessageEmail() {
    document.getElementById('buttonAnimationEmail').classList.remove('d-none');
}

/**
 * remove class d-none from buttonAnimationEmail
 * 
 */
function popUpMessagePw() {
    document.getElementById('buttonAnimationPw').classList.remove('d-none');
}

/**
 * change ypur password and show a popup
 * 
 */
function resetPassword() {
    let email = document.getElementById('forgotPwEmail').value;
    popUpMessagePw();
    i = resetUserPassword(email);
    setTimeout(function () {
        window.location.href = "resetPassword.html";
    }, 1800);
    localStorage.setItem('index', i);
}

/**
 * change location to login.html
 * 
 */
async function backToLogin() {
    popUpMessageEmail();
    await setNewPassword();
    setTimeout(function () {
        window.location.href = "login.html";
    }, 1800);
}

/**
 * find in array userLogin the correct user and return it
 * 
 * @param {string} email email from input field
 * @returns index number which user it is
 */
function resetUserPassword(email) {

    let i = userLogin.findIndex(function (a) {
        return a.email === email;
    });
    return i;

}

/**
 * set the new password to the user and push it to the backend
 * 
 */
async function setNewPassword() {
    let password = document.getElementById('resetPassword').value;
    let passwordRepeat = document.getElementById('repeatPassword').value;
    if (password === passwordRepeat) {
        userLogin[index]['password'] = password;
        await setItem("userLogin", JSON.stringify(userLogin));
    }
}
