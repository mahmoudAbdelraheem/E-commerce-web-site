

window.onload = async function () {
    //? call functions from functions.js
    //? and use await keyword to wait for the functions to finish
    await getProductData();
    await getCategoryData();
    await getTopOffers();
    await getTopRated();
};



// //! go to product details page using product id
// //! using location href to pass product id
function goToProductDetailsPage(eve){
    console.log(eve.target);
    //? get product id
    let id = eve.target.id;
    //? go to product details page
    window.location.href = "../details-page/product_details.html?id="+id;
}

//! show more products go to products page and show all products with category
//! using window open method
function    goToAllProducts(){
    window.open('../all_products/all_products.html', '_self');
}



//? list for top slider images url
let productsImagesUrl = ['/slider01.png','/slider02.png','/slider03.png','/slider04.png'];
//? list for bottom slider images url
let offersImagesUrl = ['/offers01.jpg','/offers02.jpg','/offers03.jpg','/offers04.png','/offers05.png'];

let count = 0;

//! display products image slider using set interval
setInterval(()=>{
    const imageUrl = '../assets/images/products_slider'+productsImagesUrl[count++%productsImagesUrl.length];
    
    let sliderDiv = document.querySelector('.sliderDiv');
    sliderDiv.style.backgroundImage = "url('"+imageUrl+"')";
},3000);

//! display offers images using set interval
setInterval(()=>{
    const imageUrl = '../assets/images/offers_slider'+offersImagesUrl[count++%offersImagesUrl.length];
    let img = document.getElementById('offer-slide-show');
    img.style.backgroundImage = "url('"+imageUrl+"')";
},5000);


