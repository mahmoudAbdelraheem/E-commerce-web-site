//? pattrns for email, password, name
const emailPattrn = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//! passwor must contain 
//? at least one uppercase letter, 
//? one lowercase letter or more, one number or more and one special character or more
const passwordPattrn = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//? just text
const namePattrn = /^[a-zA-Z\s]+$/;
//? get singup button
const signupButton = document.getElementById('signup-button');

const showPassword = document.getElementById('show-password');
//? add event listener to show Password
showPassword.addEventListener('click', () => {
    const password = document.getElementById('password');
    password.type = password.type === 'password' ? 'text' : 'password';
    showPassword.classList.toggle('checked');
})

signupButton.addEventListener('click', () => {
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value; 
    if(namePattrn.test(name) && emailPattrn.test(email) && passwordPattrn.test(password)) {
       //? save data in local storage
       user = {'id':Date.now().toString(), 'name':name, 'email':email, 'password':password,'isLogin':false};
     localStorage.setItem('user', JSON.stringify(user));
     alert('Sign up successful lets login now'); 
     window.open('../login/login.html', '_self');
    } else {
        if(!namePattrn.test(name)){
        document.getElementById('nameError').innerHTML = 'name must containe just chracters';
    }else {
        document.getElementById('nameError').innerHTML = '';
    }
    
    if(!emailPattrn.test(email)){
        document.getElementById('emailError').innerHTML = 'email must be like example@example.com';
    }else{
        document.getElementById('emailError').innerHTML = '';
    }
    
    
    if(!passwordPattrn.test(password)){
        document.getElementById('passwordError').innerHTML = 'password must contain at least one uppercase letter, one lowercase letter or more, one number or more and one special character or more';
    }else {
        document.getElementById('passwordError').innerHTML = '';
    }
       
    }
});

