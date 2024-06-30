//! **********************************************************!//
//? this file containe most needed function form this project
//! **********************************************************!//



//* gloable variables 
var allProducts = [];
var allCategory = [];
var user = JSON.parse(localStorage.getItem('user'));



//! save function as variable to use it in other files
 
//* Get all products from json file and save it in all products list
//* take products url as parameter 
var getProductData= async function (prductsUrl='./local_data/product.json') {
    try {
        const response = await fetch(prductsUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        allProducts = data.products;
        return allProducts;
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
}


//* Get all categories from json file and save it in all category list
//* take products url as parameter 
var getCategoryData = async function (categoryUrl = './local_data/category.json') {
    try {
        const response = await fetch(categoryUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        allCategory = data.categories;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
    }
}

//* Loop through all products and get top offers with a discount >= 15
var getTopOffers = function () {
    let topOffers = [];
    for (let i = 0; i < allProducts.length; i++) {
        let product = allProducts[i];
        if (product.discount >= 15) {
            topOffers.push(product);
        }
    }
   // display the top offers products func
   displayProducts(topOffers,0);
   
}

//* Loop through all products and get top products (rate >= 4.5)
var getTopRated = function () {
    let topRatedProducts = [];
    for(let i = 0; i < allProducts.length; i++){
        let product = allProducts[i];
        if(product.rate >= 4.5){
            topRatedProducts.push(product);
        }
    }
    // display top rated products
    displayProducts(topRatedProducts,1);
}


//* display products
//! take product list and card-container index that will containe product
//! card index = 0 -> hot offers , card index = 1 -> top rated 
var displayProducts = function (productsList, cardIndex = 0) {
    const productImageUrl = "../assets/images/products";
    // Get container div that holds all products cards
    let container = document.querySelectorAll(".card-container")[cardIndex];
    container.innerHTML = "";

     

    // Generate HTML for all products
    let productsHTML = productsList.map(product => {
        
        let favIcon = `<i class="add-to-favoriate fa fa-heart" style="color: black;" id="${product.id}" onclick="addToFavorite(event)"></i>`;
        // ? check if product is already in favorite to display red heart icon
        favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts'));
        if(favoriteProducts != null){
            for(let i = 0; i < favoriteProducts.length; i++){
               if(product.id == favoriteProducts[i]){
                favIcon = `<i class="add-to-favoriate fa fa-heart" style="color: red;" id="${product.id}" onclick="addToFavorite(event)"></i>`;
               } 
            }
        }

        //? Calculate new price and old price if discount is available
        let newPrice = product.price;
        let oldPrice = "";
        if (product.discount > 0) {
            newPrice = (product.price - (product.price * product.discount) / 100).toFixed(2);
            oldPrice = `<div class="old-price" id="${product.id}">${product.discount}%</div>`;
        } else {
            newPrice = product.price.toFixed(2);
        }

        //? Generate stars for rating
        let stars = generateStars(product.rate);
       
        return `
            <section class="product-card" >
                <div class="image" onclick="goToProductDetailsPage(event)">
                    <img src="${productImageUrl}/${product.image}" id="${product.id}">
                </div>
                <div class="content" >
                    <h3 class="name" >${product.name}</h3>
                    <div class="price">
                        <div class="new-price" >$${newPrice}</div>
                        ${oldPrice}
                    </div>
                    <div class="rating" >
                        ${stars}
                        <p >${product.rate}</p>
                    </div>
                    <div class="btn" >
                        <button class="add-to-cart" id="${product.id}" onclick="addProductToCart(event)">add to cart</button>
                        ${favIcon}
                    </div>
                </div>
            </section>
        `;
    }).join("");

    // Set the container's innerHTML to the generated HTML
    container.innerHTML = productsHTML;

   
}


 //* Function to generate stars for rating
  var   generateStars =function (rate) {
        let stars = "";
        for (var i = 0; i < 5; i++) {
            if (i < Math.floor(rate)) {
                stars += '<i class="fa fa-star checked"></i>';
            } else {
                stars += '<i class="fa fa-star"></i>';
            }
        }
        return stars;
    }


//! just loop through all products and display them
//! used in all products page
var displayAllProducts = function () {
    displayProducts(allProducts, 0);
}


//* add to cart
function addProductToCart (event){
    //? check if user is logined or not
    if(user!=null && user.isLogin){
        //? add to cart
        //? store product id in session storage
        addToCart(event.target.id);
        favoriteAndCartCount();
    }else {
        //? if user is not logined redirect to login page
        alert("please login first");
        window.location.href = "./auth/login/login.html";
    }
}

function addToCart(productId){
    let productQuantity = 1;
    let productCart = {'productId': productId, 'quantity': productQuantity};
    //? get cart from session storage
    let cart = JSON.parse(sessionStorage.getItem('cart'));

    if(cart == null){
        //? if cart is empty
        cart = [productCart];
        sessionStorage.setItem('cart',JSON.stringify(cart));
    }else {
        //? if cart is not empty
        //? check if product is already in cart increase quantity
        for(let i = 0; i < cart.length; i++){
            if(cart[i].productId == productId){
                cart[i].quantity++;
                sessionStorage.setItem('cart',JSON.stringify(cart));
                return;
            }
        }
        //? add new product id
        cart.push(productCart);
        sessionStorage.setItem('cart',JSON.stringify(cart));
    }
}


//* add to favorite
 async  function  addToFavorite(event) {
    //? check if user is logined or not
    if(user!=null && user.isLogin){
       
        //? check if product is already in favorite
        if(event.target.style.color != "red"){
       //? add to favorite
       addProductToFavorite(event.target.id);
       favoriteAndCartCount();
       event.target.style.color = "red";
    } else {
        //? remove from favorite
       event.target.style.color = "black";
       removeProductFromFavorite(event.target.id );
       favoriteAndCartCount();

   }   
    // favoriteAndCartCount();
    }else {
        //? if user is not logined redirect to login page
        alert("please login first");
        window.location.href = "./auth/login/login.html";
    }
   
}
function addProductToFavorite(productId) {
    //? get favorite products ids form local storage
    let favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts'));
    if(favoriteProducts == null){
        //? if favorite products is empty
        favoriteProducts = [productId];
        localStorage.setItem('favoriteProducts',JSON.stringify(favoriteProducts));

    }else {
        //? if favorite products is not empty
        //? check if product is already in favorite products to avoid duplicates
        for(let i = 0; i < favoriteProducts.length; i++){
            if(favoriteProducts[i] == productId){
                return;
            }  
    }
    //? add new product id
        favoriteProducts.push(productId);
        localStorage.setItem('favoriteProducts',JSON.stringify(favoriteProducts));
}

}

//? remove from favorite from local storage
function removeProductFromFavorite(productId) {  
    // favoriteAndCartCount();
    //? get favorite products ids form local storage 
    let favoriteProducts =  JSON.parse(localStorage.getItem('favoriteProducts'));
    //? remove product from favorite products using indexOf
    let index = favoriteProducts.indexOf(productId);
    favoriteProducts.splice(index, 1);
    //? set favorite products in local storage
    localStorage.setItem('favoriteProducts',JSON.stringify(favoriteProducts));
    if (window.location.pathname.includes('favorite_page.html')){
        //? if current page is favorite page
        //? reload page
        location.reload();
    }
}


//! get favorite and cart products count


// //? get favorite and cart products count as number
function getSpanCount(count) {
  if(count == null ) {
    return 0;
  }else {
    return count.length;
  }
}

function favoriteAndCartCount() {
//? get favorite and cart products count
let favoriteProductsCount = JSON.parse(localStorage.getItem('favoriteProducts'));
let cartProductCount = JSON.parse(sessionStorage.getItem('cart'));
//? get favorite and cart products count span element
let favoriteSpan = document.getElementById('favoriteCountSpan');
let cartSpan = document.getElementById('cartCountSpan');

//? if favorite products count is 0 then hide it else show it
if(getSpanCount(favoriteProductsCount) == 0) {
  favoriteSpan.style.display = 'none';
}else {
  favoriteSpan.style.display = 'block';
  favoriteSpan.innerHTML = getSpanCount(favoriteProductsCount);
}

//? if cart products count is 0 then hide it else show it
 if(getSpanCount(cartProductCount)==0){
  cartSpan.style.display = 'none';
}else {
  cartSpan.style.display = 'block';
  cartSpan.innerHTML = getSpanCount(cartProductCount);
}

}

