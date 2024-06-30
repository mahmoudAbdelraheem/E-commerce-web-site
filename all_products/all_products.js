
window.onload = async function () {
    //! get all products from json file and 
    await getProductData('../local_data/product.json');
    //! display all products when page is loaded
    await displayAllProducts();
}


// //! go to product details page using product id
// //! using location href to pass product id
function goToProductDetailsPage(eve){
    console.log(eve.target);
    //? get product id
    let id = eve.target.id;
    //? go to product details page
    window.location.href = "../details-page/product_details.html?id="+id;
}
