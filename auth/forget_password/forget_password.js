//? get forget password button
let forgetPassBtn = document.getElementById("forgot-password-btn");
//? add event listener to reset password if email is correct
forgetPassBtn.addEventListener("click", () => {
    //? get email from user and get the data from local storage
    let email = document.getElementById("email").value;
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log(email, user.email);
    //? check if email is correct
    if(email === user.email) {  
        //? display password field if email is correct
        let passwordField = document.querySelector(".password-field");
        passwordField.style.display = "block";
        //? get new password from user
        let password = document.getElementById("password").value;
        const passwordPattrn = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        //? check if password is correct
        if(passwordPattrn.test(password)) {
        user.password = password;
        //? save new password in local storage
        localStorage.setItem("user", JSON.stringify(user));
        window.open("../login/login.html", "_self");
        }else if(password!='' && !passwordPattrn.test(password)) {
            alert("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        }
    }else {
        alert("Invalid Email");
    }
});


//! show password
const showPassword = document.getElementById('show-password');
//? add event listener to show Password
showPassword.addEventListener('click', () => {
    const password = document.getElementById('password');
    password.type = password.type === 'password' ? 'text' : 'password';
    showPassword.classList.toggle('checked');
})