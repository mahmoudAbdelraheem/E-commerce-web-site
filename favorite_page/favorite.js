window.onload =async function () {
    //? get all products from json file and save it in all products list
    //? this function is in functions.js
    await getProductData('../local_data/product.json');
    await getAndDisplayFavoriteProducts();
}

//? get all favorite products from local storage and display it
async function getAndDisplayFavoriteProducts() {

    //? get favorite products ids form local storage if it exist
    favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts'));
    if (favoriteProducts != null && favoriteProducts.length > 0) {
        //? get favorite products data from all products list
        favoriteProductsData = [];
        //? loop through favorite products and get data from all products
        for (let i = 0; i < favoriteProducts.length; i++) {
            let productId = favoriteProducts[i];
            for (let j = 0; j < allProducts.length; j++) {
                let product = allProducts[j];
                if (product.id == productId) {
                    favoriteProductsData.push(product);
                }
            }
        }
        //? using display products form functions.js to display favorite products
        await displayProducts(favoriteProductsData, 0);
    }else  {
        //? if there is no favorite products in local storage
        //? display no favorite products message
        let message =  document.getElementById('no-favorite-products-message');
        message.style.display = 'flex';
    }
}
