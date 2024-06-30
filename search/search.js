let productsData = [];
window.onload = async function () {
   productsData = await getProductData('../local_data/product.json');
}

async function startSearch() { 
    console.log("start search");
    //? containe searched products
    let searchedProductsResult = [];
    //? get search input from search bar
    let searchInput = document.getElementById("searchInput");
    
    //? if user click on search button from home page
    //? then redirect to search page
    if(window.location.pathname.includes('index.html')){
        window.location.href = './search/search_page.html';

    }else if(!window.location.pathname.includes('search_page.html')){
        //? if user click on search button from any other page except search page
        //? then redirect to search page
        window.location.href = '../search/search_page.html';

    }
    else {
        //? if user click on search button from search page
        //? check if search input is not empty
        if(searchInput.value!=""){
            console.log(searchInput.value);
            for(let i=0;i<productsData.length;i++){ 
                let product = productsData[i];
                //? search for product name and description
                if(product.name.includes(searchInput.value) || product.description.includes(searchInput.value)){
                    //? push searched product to searchedProductsResult 
                    searchedProductsResult.push(product);
                }
            }
            //? if searchedProductsResult is empty
            let searchMessage = document.getElementById("searchMessage");
            let container = document.querySelector(".card-container");
            if(searchedProductsResult.length==0){
                //? display message to user that no products found
                searchMessage.style.display = "flex";
                //? hide searched products
                container.style.display = "none";
                // alert("No products found, please try with another keyword");
               
            }else {
                //? hide message
                searchMessage.style.display = "none";
                //? show searched products
                container.style.display = "flex";
                //? display searched products and use display products function.js file
                await displayProducts(searchedProductsResult,0);
            }
        }
        
    }
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
