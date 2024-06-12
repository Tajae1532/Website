document.addEventListener("DOMContentLoaded", () => {
    // Ensure elements exist before attaching event listeners
    const suggestionForm = document.getElementById("suggestionForm");
    const contactForm = document.getElementById("contactForm");
    const article1 = document.getElementById("article1");
    const article2 = document.getElementById("article2");
    const article3 = document.getElementById("article3");
    const article4 = document.getElementById("article4")

    if (suggestionForm) {
        suggestionForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const productName = document.getElementById("productName").value;
            const productCategory = document.getElementById("productCategory").value;
            const productLink = document.getElementById("productLink").value;

            fetch('http://localhost:3000/submit-suggestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productName: productName,
                    productCategory: productCategory,
                    productLink: productLink
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Product Suggested:", data);
                event.target.reset();
            })
            .catch(error => console.error('Error:', error));
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            fetch('http://localhost:3000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Message Sent:", data);
                event.target.reset();
            })
            .catch(error => console.error('Error:', error));
        });
    }

    const articles1 = [
        {
            title: "Top Journal Articles of 2023",
            img: "https://www.apa.org/images/2023-01-news-top-journals_tcm7-312767.jpg",
            url: "https://www.apa.org/monitor/2023/01/top-journal-articles"
        },
        {
            title: "10 Superfoods to Boost a Healthy Diet",
            img: "https://www.health.harvard.edu/media/content/images/p1_superfoods_s.jpg",
            url: "https://www.health.harvard.edu/staying-healthy/10-superfoods-to-boost-a-healthy-diet"
        },
        {
            title: "2022 Product of the Year Awards",
            img: "https://www.electronicproducts.com/wp-content/uploads/2022/10/product-of-the-year.jpg",
            url: "https://www.electronicproducts.com/electronic-products-announces-winners-of-the-2022-product-of-the-year-awards/"
        }
    ];

    const articles2 = [
        {
            title: "Top 10 5G Chips and Modules",
            img: "https://www.electronicproducts.com/wp-content/uploads/AMD-Zynq-RFSoC-1.png",
            url: "https://www.electronicproducts.com/top-10-5g-chips-and-modules/"
        },
        {
            title: "Top 10 Image Sensors",
            img: "https://www.electronicproducts.com/wp-content/uploads/2022/10/image-sensors.jpg",
            url: "https://www.electronicproducts.com/top-10-image-sensors/"
        },
        {
            title: "Designer's Guide to Automotive Processors",
            img: "https://www.electronicproducts.com/wp-content/uploads/2022/10/automotive-processors.jpg",
            url: "https://www.electronicproducts.com/designers-guide-automotive-processors/"
        }
    ];

    const articles3 = [
        {
            title: "APEC 2023: Advances in Power Devices",
            img: "https://www.electronicproducts.com/wp-content/uploads/2022/10/power-devices.jpg",
            url: "https://www.electronicproducts.com/apec-2023-underscores-advances-in-power-devices/"
        },
        {
            title: "How Hall Effect Sensors Make Better Joysticks",
            img: "https://www.electronicproducts.com/wp-content/uploads/2022/10/hall-effect-sensors.jpg",
            url: "https://www.electronicproducts.com/how-hall-effect-sensors-can-make-better-joysticks/"
        },
        {
            title: "Bosch Unveils New Sensors at CES",
            img: "https://www.electronicproducts.com/wp-content/uploads/2022/10/bosch-sensors.jpg",
            url: "https://www.electronicproducts.com/bosch-unveils-new-sensors-at-ces/"
        }
    ];

    const articles4 = [
        {
            title: "Smarter Siri",
            img: "https://www.electronicproducts.com/wp-content/uploads/AMD-Zynq-RFSoC-1.png",
            url: "https://www.msn.com/en-us/money/other/a-smarter-siri-and-more-everything-we-learned-during-apple-s-ai-announcement/ar-BB1nYkAA?ocid=BingNewsSerp"
        },
        {
            title: "Bill Gates",
            img: "https://www.electronicproducts.com/wp-content/uploads/2022/10/image-sensors.jpg",
            url: "https://www.msn.com/en-us/money/companies/in-wyoming-bill-gates-moves-ahead-with-nuclear-project-aimed-at-revolutionizing-power-generation/ar-BB1nY1CH?ocid=BingNewsSerp"
        },
        {
            title: "IOS 18",
            img: "https://www.electronicproducts.com/wp-content/uploads/2022/10/automotive-processors.jpg",
            url: "https://www.msn.com/en-us/news/technology/ios-18-gives-you-more-control-over-the-home-screen-lets-you-schedule-texts/ar-BB1nXYCn?ocid=BingNewsSerp"
        }
    ];

    if (article1 && article2 && article3 && article4) {
        let index1 = 0;
        let index2 = 0;
        let index3 = 0;
        let index4 = 0;

        function rotateArticles() {
            index1 = (index1 + 1) % articles1.length;
            index2 = (index2 + 1) % articles2.length;
            index3 = (index3 + 1) % articles3.length;
            index4 = (index4 + 1) % articles4.length;

            updateArticle(article1, articles1[index1]);
            updateArticle(article2, articles2[index2]);
            updateArticle(article3, articles3[index3]);
            updateArticle(article4, articles4[index4]);
        }

        function updateArticle(element, article) {
            element.querySelector("h3").textContent = article.title;
            element.querySelector("img").src = article.img;
            element.href = article.url;
        }

        setInterval(rotateArticles, 3000); // Rotate every 3 seconds
    }
});

document.addEventListener("DOMContentLoaded", function() {
 // Tracker to keep track of user's position
    // Tracker to keep track of user's position
    let state = {
        currentView: 'categories',
        selectedCategory: null,
        selectedArticle: null,
        previousView: null,
        categories: [],
        articles: [],
        products: []
    };

        // Fetch categories on page load
    fetch('/categories')
        .then(response => response.json())
        .then(categories => {
            state.categories = categories;
            renderCategories();
        });

    // Function to update the header
    function updateHeader(content) {
        const headerCell = document.getElementById('heading-cell');
        headerCell.textContent = content;
    }

    // Function to render categories
    function renderCategories() {
        state.previousView = null;
        state.currentView = 'categories';
        updateHeader('Categories');
        const dynamicContent = document.getElementById('dynamic-content');
        const cells = dynamicContent.getElementsByClassName('dynamic-cell');

        // Clear previous content
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = '';
            cells[i].onclick = null;
            cells[i].style.backgroundImage = '';
        }

        state.categories.forEach((category, index) => {
            if (index < cells.length) {
                cells[index].textContent = category.name;
                cells[index].onclick = () => onCategoryClick(category.id);
            }
        });
    }

    // Function to handle category click event
    function onCategoryClick(categoryId) {
        state.selectedCategory = categoryId;
        state.currentView = 'articles';
        fetchArticles(categoryId);
    }

    // Function to fetch articles based on selected category
    function fetchArticles(categoryId) {
        console.log('Fetching articles for categoryId:', categoryId);
        fetch(`/articles/${categoryId}`)
            .then(response => response.json())
            .then(articles => {
                console.log('Fetched articles:', articles);
                state.articles = articles;
                renderArticles();
            })
            .catch(error => console.error('Error fetching articles:', error));
    }

    // Function to render articles within a category
    function renderArticles() {
        console.log('Rendering Articles:', state.articles);
        updateHeader('Articles');
        const dynamicContent = document.getElementById('dynamic-content');
        const cells = dynamicContent.getElementsByClassName('dynamic-cell');

        // Clear previous content
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = '';
            cells[i].onclick = null;
            cells[i].style.backgroundImage = '';
        }

        state.articles.forEach((article, index) => {
            if (index < cells.length) {
                cells[index].textContent = article.title;
                cells[index].onclick = () => onArticleClick(article.id);
            }
        });
    }

    // Function to handle article click event
    function onArticleClick(articleId) {
        state.selectedArticle = articleId;
        state.currentView = 'products';
        fetchProducts(articleId);
    }

    // Function to fetch products based on selected article
    function fetchProducts(articleId) {
        console.log('Fetching products for articleId:', articleId);
        fetch(`/products/${articleId}`)
            .then(response => response.json())
            .then(products => {
                console.log('Fetched products:', products);
                state.products = products;
                renderProducts();
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    // Function to render products within an article
    function renderProducts() {
        console.log('Rendering Products:', state.products);
        updateHeader('Products');
        const dynamicContent = document.getElementById('dynamic-content');
        const cells = dynamicContent.getElementsByClassName('dynamic-cell');

        // Clear previous content
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = '';
            cells[i].innerHTML = '';
            cells[i].onclick = null;
            cells[i].style.backgroundImage = '';
        }

        state.products.forEach((product, index) => {
            if (index < cells.length) {
                const productImg = document.createElement('img');
                productImg.src = product.images[0];
                productImg.alt = product.name;
                productImg.className = 'product-image';

                const productName = document.createElement('div');
                productName.className = 'product-name';
                productName.textContent = product.name;

                cells[index].appendChild(productImg);
                cells[index].appendChild(productName);
                cells[index].style.cursor = 'pointer';
                cells[index].onclick = () => showProductDetails(product);
            }
        });
    }

    // Function to show product details in a modal
    function showProductDetails(product) {
        const modal = document.getElementById('product-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalImage = document.getElementById('carousel-image');
        const modalDescription = document.getElementById('modal-description');
        const modalProsList = document.getElementById('modal-pros-list');
        const modalConsList = document.getElementById('modal-cons-list');
        const modalButtons = document.getElementById('modal-buttons');
        const modalRating = document.getElementById('modal-rating');

        modalTitle.textContent = product.name;
        modalDescription.textContent = product.details;

        // Clear previous content
        modalProsList.innerHTML = '';
        modalConsList.innerHTML = '';
        modalButtons.innerHTML = '';
        modalRating.innerHTML = '';

        // Populate pros list
        product.pros.forEach(pro => {
            const li = document.createElement('li');
            li.textContent = pro.title;

            const details = document.createElement('div');
            details.className = 'details';
            details.textContent = pro.details;

            li.appendChild(details);
            li.onclick = () => {
                toggleDetails(li, modalProsList);
            };

            modalProsList.appendChild(li);
        });

        // Populate cons list
        product.cons.forEach(con => {
            const li = document.createElement('li');
            li.textContent = con.title;

            const details = document.createElement('div');
            details.className = 'details';
            details.textContent = con.details;

            li.appendChild(details);
            li.onclick = () => {
                toggleDetails(li, modalConsList);
            };

            modalConsList.appendChild(li);
        });

        // Populate buttons and prices
        product.links.forEach(link => {
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            const button = document.createElement('button');
            button.textContent = link.text;
            button.onclick = function() {
                window.open(link.url, '_blank');
            };

            const priceContainer = document.createElement('div');
            priceContainer.className = 'modal-price-container';

            if (link.salePrice) {
                const originalPrice = document.createElement('span');
                originalPrice.className = 'original-price';
                originalPrice.textContent = link.originalPrice;
                priceContainer.appendChild(originalPrice);

                const salePrice = document.createElement('span');
                salePrice.className = 'sale-price';
                salePrice.textContent = link.salePrice;
                priceContainer.appendChild(salePrice);
            } else {
                const originalPrice = document.createElement('span');
                originalPrice.className = 'modal-price';
                originalPrice.textContent = link.originalPrice;
                priceContainer.appendChild(originalPrice);
            }

            buttonContainer.appendChild(button);
            buttonContainer.appendChild(priceContainer);
            modalButtons.appendChild(buttonContainer);
        });

        // Populate star rating
        const ratingValue = Math.round(product.rating * 2) / 2; // Round to nearest 0.5
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = 'star';
            if (i <= ratingValue) {
                star.classList.add('full-star');
            } else if (i === Math.ceil(ratingValue) && ratingValue % 1 !== 0) {
                star.classList.add('half-star');
            } else {
                star.classList.add('empty-star');
            }
            modalRating.appendChild(star);
        }

        // Carousel functionality
        let currentImageIndex = 0;
        const images = product.images;
        modalImage.src = images[currentImageIndex];

        document.getElementById('prev-button').onclick = function() {
            currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : images.length - 1;
            modalImage.src = images[currentImageIndex];
        };

        document.getElementById('next-button').onclick = function() {
            currentImageIndex = (currentImageIndex < images.length - 1) ? currentImageIndex + 1 : 0;
            modalImage.src = images[currentImageIndex];
        };

        modal.style.display = 'block';
    }

    function toggleDetails(selectedLi, parentList) {
        // Close any currently open details
        const openItem = parentList.querySelector('li.active');
        if (openItem && openItem !== selectedLi) {
            openItem.classList.remove('active');
            openItem.querySelector('.details').style.display = 'none';
        }

        // Toggle the selected item
        const details = selectedLi.querySelector('.details');
        if (details.style.display === 'none' || details.style.display === '') {
            selectedLi.classList.add('active');
            details.style.display = 'block';
        } else {
            selectedLi.classList.remove('active');
            details.style.display = 'none';
        }
    }

    document.getElementById('close-modal').addEventListener('click', function() {
        document.getElementById('product-modal').style.display = 'none';
    });

    document.getElementById('back-button').addEventListener('click', function() {
        if (state.previousView) {
            state.currentView = state.previousView;
            if (state.previousView === 'categories') {
                renderCategories();
            } else if (state.previousView === 'articles') {
                renderArticles();
            }
        }
    });
// // Function to go back in history
// function goBack() {
//     console.log('goBack called');
//     console.log('state.previousView:', state.previousView);
//     console.log('state.currentView:', state.currentView);
//     if (state.currentView === 'article') {
//         loadCategory(state.selectedCategory);
//     } else if (state.currentView === 'articles') {
//         renderCategories();
//     }
// }

// Attach event listener for the back button
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', goBack);

// Attach event listener to close the modal
const closeModalButton = document.getElementById('close-modal');
closeModalButton.addEventListener('click', function() {
    document.getElementById('product-modal').style.display = 'none';
});

// Close the modal when clicking outside of the modal content
window.addEventListener('click', function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize with categories
// renderCategories();
});

document.addEventListener('DOMContentLoaded', function() {
    var ctaButton = document.getElementById('cta-button');

    if (ctaButton) {
        ctaButton.addEventListener('click', function(event) {
            event.preventDefault();
            var button = this;
            button.classList.add('move-up');

            // Create a temporary clone of the button to handle pointer events
            var tempButton = button.cloneNode(true);
            tempButton.style.position = 'absolute';
            tempButton.style.pointerEvents = 'auto';
            tempButton.style.opacity = '0';
            tempButton.style.transform = 'translateY(-60px)';
            button.parentNode.appendChild(tempButton);

            setTimeout(function() {
                window.location.href = button.href;
            }, 1000); // Adjust the delay to match the animation duration

            // Clean up the temporary button after navigation
            setTimeout(function() {
                tempButton.remove();
            }, 1100); // Adjust to ensure it's removed after navigation
        });
    }
});
