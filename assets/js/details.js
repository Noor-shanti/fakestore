const displayProducts = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');

        const decodedCategory = decodeURIComponent(category);
        const { data } = await axios.get(`https://fakestoreapi.com/products/category/${decodedCategory}`);


        const products = data;

        const result = products.map((product) => {
            return `<div class='product-item'>
            <div class='image'>
                <img src=${product.image} />
            </div>
            <h2>${product.title}</h2>
            <p>$${product.price}</p>
            <a href='product.html?id=${product.id}'>details</a>
        </div>`;
        }).join('');


        document.querySelector(".products .title").innerHTML = `<h1>${decodedCategory}</h1>`;
        document.querySelector(".products .row").innerHTML = result;
    }catch(error) {
        document.querySelector(".categories .row").innerHTML = "<p>Please try again later ...</p>";
    }
    finally {
        document.querySelector(".loading").classList.add("d-none");
    }

};

displayProducts();
