
window.onload = async function () {
    userData = user;
     displayUserData();
}

//? pattrns for email, password, name
const emailPattrn = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//! passwor must contain 
//? at least one uppercase letter, 
//? one lowercase letter or more, one number or more and one special character or more
const passwordPattrn = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//? just text
const namePattrn = /^[a-zA-Z\s]+$/;


function displayUserData() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    name.value = userData.name;
    email.value = userData.email;
    password.value = userData.password;
}

const showPassword = document.getElementById('show-password');
//? add event listener to show Password
showPassword.addEventListener('click', () => {
    const password = document.getElementById('password');
    password.type = password.type === 'password' ? 'text' : 'password';
    showPassword.classList.toggle('checked');
})




//? add event listener to save button
function updateUserData() {
    newName = document.getElementById('name').value;
    newEmail = document.getElementById('email').value;
    newPassword = document.getElementById('password').value;
   
        
    if (namePattrn.test(newName) && emailPattrn.test(newEmail) && passwordPattrn.test(newPassword)) {
        userData.name = newName;
        userData.email = newEmail;
        userData.password = newPassword;
         localStorage.setItem('user', JSON.stringify(userData));
    // window.open('./setting_page.html', '_self');
    window.location.replace('./setting_page.html');
    } else {
         if(!namePattrn.test(newName)){
        document.getElementById('nameError').innerHTML = 'name must containe just chracters';
    }else {
        document.getElementById('nameError').innerHTML = '';
    }
    
    if(!emailPattrn.test(newEmail)){
        document.getElementById('emailError').innerHTML = 'email must be like example@example.com';
    }else{
        document.getElementById('emailError').innerHTML = '';
    }
    
    
    if(!passwordPattrn.test(newPassword)){
        document.getElementById('passwordError').innerHTML = 'password must contain at least one uppercase letter, one lowercase letter or more, one number or more and one special character or more';
    }else {
        document.getElementById('passwordError').innerHTML = '';
    }
     
    }
   
}

function logOut() {
    userData.isLogin = false;
    localStorage.setItem('user', JSON.stringify(userData));
    // window.open('./login_page.html', '_self');
    window.location.replace('../auth/login/login.html');
}