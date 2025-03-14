const getProducts = async (page) => {
    const skip = (page - 1) * 10;
    const { data } = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    return data;
}

const displayProducts = async (page = 1) => {
    try {
        const data = await getProducts(page);
        console.log(data);

        const numOfPage = Math.ceil(data.total / 10);
        const products = data.products;

        const result = products.map(product =>
            `<div class='product-item'>
                <h2>${product.title}</h2>
                <img class='product-img' src='${product.thumbnail}' />
            </div>`
        ).join('');
        document.querySelector(".products .row").innerHTML = result;
        customModal();

        let paginationLink = ``;

        if (page > 1) {
            paginationLink += `<li><button onclick="displayProducts(${page - 1})">&lt;</button></li>`;
        }
        else {
            paginationLink += `<li><button disabled>&lt;</button></li>`;
        }

        for (let i = 1; i <= numOfPage; i++) {
            paginationLink += `<li><button data-page="${i}"  onclick="displayProducts(${i})">${i}</button></li>`;
        }

        if (page < numOfPage) {
            paginationLink += `<li><button onclick="displayProducts(${page + 1})">&gt;</button></li>`;
        } else {
            paginationLink += `<li><button disabled>&gt;</button></li>`;
        }

        document.querySelector(".pagination").innerHTML = paginationLink;

        updateActivePage(page);

    } catch (error) {
        document.querySelector(".products .row").innerHTML = "<p>Please try again later ...</p>";
    } finally {
        document.querySelector(".loading").classList.add("d-none");
    }
}

function updateActivePage(activePage) {
    document.querySelectorAll(".pagination button").forEach(button => {
        button.classList.remove("active");
    });

    let activeButton = document.querySelector(`.pagination button[data-page="${activePage}"]`);
    if (activeButton) {
        activeButton.classList.add("active");
    }
}


displayProducts();
function customModal() {
    const modal = document.querySelector(".my-modal");
    const closeBtn = document.querySelector(".close-btn");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");
    const images = Array.from(document.querySelectorAll(".product-img"));
    console.log(images);

    let currentIndex =0;
    images.forEach(function (img) {
        img.addEventListener('click', (e) => {
            modal.classList.remove('d-none');
            modal.querySelector("img").setAttribute("src", e.target.src);
            const currentImg = e.target;
            currentIndex = images.indexOf(currentImg);
            
        });
    });

    closeBtn.addEventListener('click',(e)=>{
        modal.classList.add("d-none");
    })

    rightBtn.addEventListener("click",(e)=>{
        currentIndex++;
        if (currentIndex >= images.length){
            currentIndex=0;
        }
        const source = images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src", source);
    })

    leftBtn.addEventListener("click",(e)=>{
        currentIndex--;
        if (currentIndex < 0){
            currentIndex=images.length - 1;
        }
        const source = images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src", source);
    })
}


