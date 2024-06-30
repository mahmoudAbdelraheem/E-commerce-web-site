//? pattrns for email, password, name
const emailPattrn = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//! passwor must contain 
//? at least one uppercase letter, 
//? one lowercase letter or more, one number or more and one special character or more
const passwordPattrn = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//? get user data from input fields

const loginButton = document.getElementById('login-button');
const showPassword = document.getElementById('show-password');
//? add event listener to show Password
showPassword.addEventListener('click', () => {
    const password = document.getElementById('password');
    password.type = password.type === 'password' ? 'text' : 'password';
    showPassword.classList.toggle('checked');
})
//? add event listener to login button
loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem('user'));
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if(email === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }else if(user==null){
        alert("this email does not exist, please signup first");
        window.open('../signup/signup.html', '_self');
    }
    //? get data from local storage
    user.isLogin = true;
    localStorage.setItem('user', JSON.stringify(user));
        //? check if email and password match
    if(email === user.email && password === user.password) {
        window.open('../../index.html', '_self');
        //? nav to home page
    } else {
            
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