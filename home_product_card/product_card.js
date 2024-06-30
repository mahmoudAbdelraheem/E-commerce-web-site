//? get all products from json file

window.onload = function () {
    getProductsData();
};

function getProductsData(){

    var xhr = new XMLHttpRequest(); 
    xhr.open("GET", "../local_data/product.json", true);
    xhr.onreadystatechange = function () {  
        if (xhr.readyState == 4 && xhr.status == 200) {
            var productsData = JSON.parse(xhr.response);
            displayProducts(productsData.products);        
        }
    }
    xhr.send();
}

function displayProducts(productsList) {
    const productImageUrl = "../assets/images/products";
    //? get container div that hold all products cards
    let container = document.querySelector(".card-container");
    for (var i = 0; i < productsList.length; i++) {
        let product = productsList[i];  
        //! create product card elements
        //? product card
        let productCard = document.createElement("div");
        productCard.classList.add("product-card");

        //? image
        let image = document.createElement("div");
        image.classList.add("image");
        let img = document.createElement("img");
        img.src = `${productImageUrl}/${product.image}`;
        image.appendChild(img);

        //? content
        let content = document.createElement("div");
        content.classList.add("content");
        //? name   
        let name = document.createElement("h3");
        name.classList.add("name");
        name.textContent = product.name;
        //? price
        let price = document.createElement("div");
        price.classList.add("price");
        //? new price
        let newPrice = document.createElement("div");
        newPrice.classList.add("new-price");
        //? if product have a discount
        //? calculate new price and old price
        if(product.discount > 0){
            newPrice.textContent =  (product.price - (product.price * product.discount) / 100)+ "$";
            //? old price
            let oldPrice = document.createElement("div");
            oldPrice.classList.add("old-price");
            oldPrice.textContent =  product.discount +"%" ;
        }
        //? rate
        let rate = document.createElement("div");
        rate.classList.add("rating");
        //? star
        let star = generateStars(product.rate);
        rate.innerHTML = star;
        //? text
        let text = document.createElement("p");
        text.textContent =product.rate;

        //? add to cart , add to favourite
        let btn = document.createElement("div");
        btn.classList.add("btn");
        let cart = document.createElement("button");
        cart.classList.add("add-to-cart");
        cart.textContent = "add to cart";
        let favoriate = document.createElement("i");
        favoriate.classList.add("add-to-favoriate");
        favoriate.classList.add("fa", "fa-heart");
        favoriate.setAttribute("name", "heart-outline");
        
        //? append elements
        btn.appendChild(cart);
        btn.appendChild(favoriate);
        price.appendChild(newPrice);
        price.appendChild(oldPrice);
        rate.appendChild(text);
        content.appendChild(name);
        content.appendChild(price);
        content.appendChild(rate);
        content.appendChild(btn);
        productCard.appendChild(image);
        productCard.appendChild(content);
        container.appendChild(productCard);
    }

    //? generate five icons stars
    function generateStars(rate) {
        let stars = "";
        for (var i = 0; i < rate; i++) {
            stars += '<i class="fa fa-star checked"></i>';
        }
        return stars;
    }
}

