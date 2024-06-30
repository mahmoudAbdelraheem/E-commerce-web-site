window.onload = async function () {
    await getProdyuctByID();

    
    
}




//? Get product data using id that passed from home page to display its details
async function getProdyuctByID() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    try {
        const response = await fetch('../local_data/product.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        product = data.products.find((p)=>p.id == productId);
         displayProductDetails(product);
        displayRelatedProducts(data.products, product);
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
}


//? take product data and display it 
function displayProductDetails(product) {
    const productImageUrl = "../assets/images/products";
    let price ;
    let discount;
    
    if(product.discount > 0){
        price = product.price - (product.price * product.discount / 100);
        discount = product.discount+'%';
    }else {
        price = product.price;
        discount = '0%';
    }
    // console.log(price); 
    //? get container div that hold all products cards
    let productContainer = document.querySelector(".product-container");
    productContainer.innerHTML = `
       <div class="product-image">
            <img src="${productImageUrl}/${product.image}"  alt="Product Image">
        </div>
        <div class="product-details">
            <h1 class="product-title">${product.name}</h1>
            <p class="product-price"> $${price.toFixed(2)} <span class="discountSpan">${discount}</span></p>
            <p class="product-description">
                ${product.description}
            </p>
            <div class="rating">
            <!-- call generate starts from function file -->
                ${generateStars(product.rate)}
            </div>
            
            <button class="add-to-cart-btn" id="${product.id}" onclick="addProductToCart(event)">Add to Cart</button>
        </div>
    `;    

}

//? display related products pased on selected product category

function displayRelatedProducts(allProducts , product) {
    let relatedProducts = [];
    for (let i = 0; i < allProducts.length; i++) {
        if(allProducts[i].category_id == product.category_id && allProducts[i].id != product.id){
            relatedProducts.push(allProducts[i]);
        }
    }
    //? call display products from function file  
    //? and display related products
    displayProducts(relatedProducts,0);
}


// //! go to product details page using product id
// //! using location href to pass product id
function goToProductDetailsPage(eve){
    console.log(eve.target);
    //? get product id
    let id = eve.target.id;
    //? go to product details page
    // window.location.href = "../details-page/product_details.html?id="+id;
    window.location.replace("../details-page/product_details.html?id="+id);

}
