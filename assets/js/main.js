const getCategories = async () => {
    try {
        const { data } = await axios.get("https://fakestoreapi.com/products/categories");
        return data;
    } catch (error) {
        return [];
    }
};

const displayCategories = async () => {

    try {
        const categories = await getCategories();

        const result = categories.map(category =>
            `<div class='category'>
        <h2>${category}</h2>
        <a href="./details.html?category=${encodeURIComponent(category)}">details</a>
        </div>`
        ).join('');

        document.querySelector(".categories .row").innerHTML = result;
        document.querySelector(".Products .row").innerHTML = `<a href="./products.html">Products</a>`;

    }
    catch (error) {
        document.querySelector(".categories .row").innerHTML = "<p>Please try again later ...</p>";
    }
    finally {
        document.querySelector(".loading").classList.add("d-none");
    }
};

displayCategories();
