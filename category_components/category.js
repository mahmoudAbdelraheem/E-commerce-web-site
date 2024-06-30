//? get category data
let allCategoryList = [];
//? calculate start and end index of categories to display
let currentPage = 0;
const categoriesPerPage = 5;

//! get category data from category.json 
//!and return it as list of category model
function getCategoryData() {
    //? create xhr object and open it
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../local_data/category.json", true);
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let categoryData = JSON.parse(xhr.response);
            allCategoryList = categoryData.categories;
            displayCategories();
        }
    };
    xhr.send();
}

getCategoryData();

//? display categories on page
function displayCategory(categoryData) {
    const categoryImageUrl = "../assets/images/category";
    let categoryDiv = document.querySelector(".category-list");
    //? create category image and category name
    let categoryImage = document.createElement('img');
    let categoryName = document.createElement('p');
    //? set category image and category name
    categoryImage.src = `${categoryImageUrl}/${categoryData.image}`;
    categoryImage.width = 50;
    categoryName.textContent = categoryData.name;
    //? create category card
    let categoryCard = document.createElement('div');

    //? add category card class and id
    categoryCard.classList.add("category-card");
    categoryCard.id = categoryData.id;
    //? set category card click event and add active class
    categoryCard.addEventListener("click", function(event) {
        handleCategoryClick(event, categoryData.id);
    });
    //? append category card
    categoryCard.appendChild(categoryImage);
    categoryCard.appendChild(categoryName);
    categoryDiv.appendChild(categoryCard);
}

//! handle category card click event
function handleCategoryClick(event, categoryId) {
    if (window.location.pathname.includes('index.html')) {
        //? Navigate to all products page
        window.location.href = '../all_products/all_products.html?category_id=' + categoryId;
    } else if (window.location.pathname.includes('all_products.html')) {
        //? Display products of the category
        addActiveClass(event);
        getProductsByCategoryID(categoryId);
    }
}

//! add active class to category card
function addActiveClass(event) {
    //? get all category card
    const categoryCards = document.querySelectorAll(".category-card");
    //? remove active class from all category card
    categoryCards.forEach(card => card.classList.remove("active"));
    //? add active class to clicked category card
    event.target.classList.add("active");
}


//! display categories on page
function displayCategories() {
    //? get category div
    const categoryDiv = document.querySelector(".category-list");
    //? clear category div
    categoryDiv.innerHTML = ""; 
    //? calculate start and end index of categories to display
    const start = currentPage * categoriesPerPage;
    const end = start + categoriesPerPage;
    const categoriesToDisplay = allCategoryList.slice(start, end);
    //? display categories
    categoriesToDisplay.forEach(category => displayCategory(category));
}

//! show next categories
function showNextCategories() {
    //? show next categories
    if ((currentPage + 1) * categoriesPerPage < allCategoryList.length) {
        currentPage++;
        displayCategories();
    }
}

//! show previous categories
function showPreviousCategories() {
    if (currentPage > 0) {
        currentPage--;
        displayCategories();
    }
}

//? get products by category id
    let productsContainer = document.querySelector(".card-container");
    //? get category title
    let categoryTitle = document.querySelector(".title");

    //? get products by category id
async function getProductsByCategoryID(categoryID) {
    //? set category title
    categoryTitle.textContent = allCategoryList.find((c) => c.id === categoryID).name;
    //? clear products container
    productsContainer.innerHTML = '';
    try {
        //? fetch products
        const response = await fetch('../local_data/product.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //? get products data from response and filter by category id
        let data = await response.json();
            data.products.filter((p) => {
                if (p.category_id === categoryID) {
                    //? display product
                    displaySingleProduct(p);
                }
            }) ; 
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }

}


    function displaySingleProduct(product) {    
    const productImageUrl = "../assets/images/products";
    let productsContainer = document.querySelector(".card-container");

    // Clear the container to only display the single product


    let price, discount;
    let oldPrice;
    if (product.discount > 0) {
        price = (product.price - (product.price * product.discount / 100)).toFixed(2);
        discount = product.discount + '%';
        oldPrice = `<span class="old-price">${discount}</span>`;
    } else {
        price = product.price.toFixed(2);
    oldPrice='';
    }

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

    productsContainer.innerHTML += `
        <div class="product-card"  >
            <div class="image" >
                <img id="${product.id}"  src="${productImageUrl}/${product.image}" onclick="goToProductDetailsPage(event)" />
            </div>
            <div class="content" >
                <h3 class="name" >${product.name}</h3>
                <div class="price">
                    <div class="new-price">$${price} </div>
                    ${oldPrice}
                </div>
                <div class="rating">${generateStars(product.rate)}</div>
                <div class="btn">
                     <button class="add-to-cart" id="${product.id}" onclick="addProductToCart(event)">add to cart</button>

                    ${favIcon}
                </div>
            </div>
        </div>
    `;
}


function generateStars(rate) {
        let stars = "";
        for (var i = 0; i < 5; i++) {
            if(i<Math.floor(rate)){
                stars += '<i class="fa fa-star checked"></i>';
            }else {
                stars += '<i class="fa fa-star"></i>';
            }
        }
        return stars;
}
