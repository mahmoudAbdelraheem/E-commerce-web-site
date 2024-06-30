//! start global variables



//? to store all products data
let products = [];
//? to store total cart price and display it in cart total price
let totalCartPrice = 0;
//? get cart product container
let cartProductContainerElement = document.getElementById('cart-product-container');
//? get cart total price
let cartTotalPriceElement = document.getElementById('cart-total-price');

//! end global variables
window.onload = async function(){
    //? get all products data 
    products= await getProductData('../local_data/product.json');
    //? 
    await displayCartProducts();
}

//! event listeners for two buttons
//? returnToShop button
let returnToShop = document.getElementById('returnToShop');
returnToShop.addEventListener('click', function(){
    window.location.href = '../index.html';
});

//? removeAll products from cart button
let removeAll = document.getElementById('removeAll');
removeAll.addEventListener('click', function(){
    //? remove all products from cart
    sessionStorage.removeItem('cart');
    //? remove all products from cart product container
    cartProductContainerElement.innerHTML = '';
    totalCartPrice = 0;
      cartProductContainerElement.innerHTML = `
        <div class="emptyCart">
        <h1>Your cart is empty</h1>
        </div>
        `;
        //? update cart total price to 0
        displayCartTotalPrice(0);
        //? update favorite and cart count
        favoriteAndCartCount();
});

//? updateCart button
let updateCart = document.getElementById('updateCart');
updateCart.addEventListener('click', function(){
    
//? get cart data from session storage
let cartList = JSON.parse(sessionStorage.getItem('cart'));
    //? get quantity of each products in cart as an array
    let productsQuantity = document.getElementsByClassName('quantity');
//? loop through each product in cart and update quantity
    for(let i = 0; i < productsQuantity.length; i++){
        //? update quantity in cart list
        cartList[i].quantity = Number(productsQuantity[i].value);  
    } 

    //? loop through each product in cart list and remove it from cart list if quantity is 0
    let newCartList = [];
    for(let i = 0; i < cartList.length; i++){
        if(cartList[i].quantity > 0){
            newCartList.push(cartList[i]);
        }
    }
    //? update cart in session storage with new quantities
    sessionStorage.setItem('cart', JSON.stringify(newCartList));
    //? remove all old cart products from cart product container
    cartProductContainerElement.innerHTML = '';
    totalCartPrice = 0;
    //? display cart products with new quantities
    displayCartProducts();
    //? calculate favorite and cart total products count
    favoriteAndCartCount();
});



//? display cart data
function displayCartProducts(){
//? get cart data from session storage
let cartList = JSON.parse(sessionStorage.getItem('cart'));
    if(cartList != null && cartList.length > 0){
        //? display cart products
        for(let i = 0; i < cartList.length; i++){
           //? get product data from products list
           let product = products.find((p)=>p.id == cartList[i].productId);
           //? display cart single product
           displayCartProduct(product, cartList[i].quantity);
        }
        displayCartTotalPrice(totalCartPrice);

    }else {
        //? if cart is empty
        cartProductContainerElement.innerHTML = `
        <div class="emptyCart">
        <h1>Your cart is empty</h1>
        </div>
        `;
        displayCartTotalPrice(0);
    }
}


function displayCartProduct(product, quantity){
    let price =product.price.toFixed(2) ;
    //? calculate price if there is discount
    if(product.discount>0){
        price = (product.price - (product.price * product.discount / 100)).toFixed(2);
    }
    //? calculate subtotal price
    let subtotal = (price * quantity).toFixed(2);
    //? convert string to number to calculate total price for all products 
    totalCartPrice+=Number(subtotal);
    //? create cart product and add it in cart product container
   cartProductContainerElement.innerHTML += `
    <div class="productCartData">
          <div class="imgAndName">
            <div class="image">
              <img src="../assets/images/products/${product.image}"/>
            </div>
            <div class="name">${product.name}</div>
          </div>
          <div class="price">$${price}</div>

          <input class="quantity" type="number" value="${quantity}" min="0" max="${product.quantity}" />

          <span class="subtotal">$${subtotal}</span>
        </div>
   `;
}

function displayCartTotalPrice(totalCartPrice){
    //? display total price
    cartTotalPriceElement.innerHTML = `
        <div class="totalPrice">
          <h2>Cart Total</h2>
          <div class="cartTotalElement">
            <p>Subtotal :</p>
            <p>$${totalCartPrice}</p>
          </div>
          <div class="cartTotalElement">
            <p>Shipping :</p>
            <p>Free</p>
          </div>
          <div class="cartTotalElement">
            <p>Total :</p>
            <p>$${totalCartPrice}</p>
          </div>
          <button>Proceed to Checkout</button>
    `;
}
        
