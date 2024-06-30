let userData = user;


isUserLogin();
favoriteAndCartCount();

//? chedk if user is login
 function isUserLogin() {
   //? get nav list
    let navList = document.getElementById('navList');
    //? check if user data is not null and user is login
    if (userData && userData.isLogin) {
      //? create user icon
       let userIcon  = document.createElement('li');
       userIcon.classList.add('userIcon');
       //? create user icon with user first name
       userIcon.innerHTML = ` 
       <a href="../setting/setting_page.html">
       <i class="fa-solid fa-user"></i> 
       hi,<span style="color: grey;"> ${user.name.split(' ')[0]}</span>
       </a>
       `;
       //? append user icon
       navList.appendChild(userIcon);
    } else {
      //? create sign up list item
       let signUpListItem  = document.createElement('li');
        signUpListItem.innerHTML = `<a href="../auth/signup/signup.html">Sign Up</a>`;
        navList.appendChild(signUpListItem);
    }   
}



// //? get favorite and cart products count as number
// function getSpanCount(count) {
//   if(count == null ) {
//     return 0;
//   }else {
//     return count.length;
//   }
// }

// function favoriteAndCartCount() {
// //? get favorite and cart products count
// let favoriteProductsCount = JSON.parse(localStorage.getItem('favoriteProducts'));
// let cartProductCount = JSON.parse(sessionStorage.getItem('cart'));
// //? get favorite and cart products count span element
// let favoriteSpan = document.getElementById('favoriteCountSpan');
// let cartSpan = document.getElementById('cartCountSpan');

// //? if favorite products count is 0 then hide it else show it
// if(getSpanCount(favoriteProductsCount) == 0) {
//   favoriteSpan.style.display = 'none';
// }else {
//   favoriteSpan.style.display = 'block';
//   favoriteSpan.innerHTML = getSpanCount(favoriteProductsCount);
// }

// //? if cart products count is 0 then hide it else show it
//  if(getSpanCount(cartProductCount)==0){
//   cartSpan.style.display = 'none';
// }else {
//   cartSpan.style.display = 'block';
//   cartSpan.innerHTML = getSpanCount(cartProductCount);
// }

// }