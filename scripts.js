document.addEventListener("DOMContentLoaded", () => {
    // Ensure elements exist before attaching event listeners
    const suggestionForm = document.getElementById("suggestionForm");
    const contactForm = document.getElementById("contactForm");
    const article1 = document.getElementById("article1");
    const article2 = document.getElementById("article2");
    const article3 = document.getElementById("article3");

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
            img: "https://www.apa.org/images/monitor-january-2023_tcm7-309150.png",
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

    if (article1 && article2 && article3) {
        let index1 = 0;
        let index2 = 0;
        let index3 = 0;

        function rotateArticles() {
            index1 = (index1 + 1) % articles1.length;
            index2 = (index2 + 1) % articles2.length;
            index3 = (index3 + 1) % articles3.length;

            updateArticle(article1, articles1[index1]);
            updateArticle(article2, articles2[index2]);
            updateArticle(article3, articles3[index3]);
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
    let state = {
        currentView: 'categories', // or 'articles' or 'article'
        selectedCategory: null,
        selectedArticle: null,
        previousView: null // To keep track of the previous view
    };

   // Example categories, articles, and products
   const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Home Goods' },
    { id: 3, name: 'Health & Wellness' },
    { id: 4, name: 'Gaming' },
    { id: 5, name: 'Clothing' },
    { id: 6, name: 'Gadgets' }
];

const articles = {
    1: [
        { id: 101, title: 'Best Smartphones of 2024' },
        { id: 102, title: 'Top Laptops for Work and Play' }
    ],
    2: [
        { id: 201, title: 'Top Kitchen Appliances' },
        { id: 202, title: 'Best Furniture for Your Home' }
    ]
};

const products = {
    101: [
        {
            id: 1,
            name: 'iPhone 14',
            details: 'Latest iPhone with A16 Bionic chip.',
            pros: [
                { title: 'Great camera', details: '12MP dual-lens camera with Night mode' },
                { title: 'Fast performance', details: 'A16 Bionic chip for faster processing' }
            ],
            cons: [
                { title: 'Expensive', details: 'Starting at $999, it is one of the priciest smartphones' },
                { title: 'No headphone jack', details: 'Requires wireless headphones or a dongle' }
            ],
            images: ['../images/iphone15.jpg', '../images/electronics.jpg', 'iphone3.jpg'], // Multiple images
            rating: 4.5, // Overall rating
            links: [
                { url: '#', text: 'Buy on Amazon', originalPrice: '$999.99', salePrice: '$899.99' },
                { url: '#', text: 'Buy on eBay', originalPrice: '$999.99' }
            ]
        },
        {
            id: 2,
            name: 'Samsung Galaxy S22',
            details: 'Newest Galaxy with improved camera.',
            pros: [
                { title: 'Excellent display', details: '6.1-inch Dynamic AMOLED with HDR10+' },
                { title: 'Versatile camera', details: 'Triple-lens setup with ultra-wide and telephoto' }
            ],
            cons: [
                { title: 'High price', details: 'Starting at $899' },
                { title: 'Average battery life', details: 'Up to 10 hours of usage' }
            ],
            images: ['galaxy1.jpg', 'galaxy2.jpg'], // Multiple images
            rating: 4.0, // Overall rating
            links: [
                { url: '#', text: 'Buy on Amazon', originalPrice: '$899.99', salePrice: '$799.99' },
                { url: '#', text: 'Buy on eBay', originalPrice: '$899.99' }
            ]
        }
        // Add more products as needed
    ],
    102: [
        {
            id: 3,
            name: 'MacBook Pro 2024',
            details: 'Powerful laptop with M2 chip.',
            pros: [
                { title: 'High performance', details: 'Powered by the M2 chip' },
                { title: 'Great battery life', details: 'Up to 20 hours on a single charge' }
            ],
            cons: [
                { title: 'Very expensive', details: 'Starting at $1999' },
                { title: 'Limited ports', details: 'Only USB-C ports available' }
            ],
            images: ['macbook1.jpg', 'macbook2.jpg'], // Multiple images
            rating: 4.8, // Overall rating
            links: [
                { url: '#', text: 'Buy on Amazon', originalPrice: '$1999.99', salePrice: '$1899.99' },
                { url: '#', text: 'Buy on eBay', originalPrice: '$1999.99' }
            ]
        },
        {
            id: 4,
            name: 'Dell XPS 13',
            details: 'Compact and powerful laptop.',
            pros: [
                { title: 'Compact design', details: 'Slim and lightweight' },
                { title: 'Powerful specs', details: 'Intel i7 processor and 16GB RAM' }
            ],
            cons: [
                { title: 'Expensive', details: 'Starting at $1299' },
                { title: 'No HDMI port', details: 'Requires an adapter for HDMI' }
            ],
            images: ['xps1.jpg', 'xps2.jpg'], // Multiple images
            rating: 4.2, // Overall rating
            links: [
                { url: '#', text: 'Buy on Amazon', originalPrice: '$1299.99', salePrice: '$1199.99' },
                { url: '#', text: 'Buy on eBay', originalPrice: '$1299.99' }
            ]
        }
        // Add more products as needed
    ]
};


// Function to update the header
function updateHeader(content) {
    const headerCell = document.getElementById('heading-cell');
    headerCell.textContent = content;
}

// Function to render categories
function renderCategories() {
    state.previousView = null; // Reset previous view
    state.currentView = 'categories';
    updateHeader('Categories'); // Update header
    const dynamicContent = document.getElementById('dynamic-content');
    const cells = dynamicContent.getElementsByClassName('dynamic-cell');
    
    // Clear previous content
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
        cells[i].onclick = null;
    }

    categories.forEach((category, index) => {
        if (index < cells.length) {
            cells[index].textContent = category.name;
            cells[index].onclick = () => loadCategory(category.id);
        }
    });
}

// Function to render articles within a category
function loadCategory(categoryId) {
    state.previousView = 'categories'; // Track previous view
    state.currentView = 'articles';
    state.selectedCategory = categoryId;
    const categoryName = categories.find(category => category.id === categoryId).name;
    updateHeader(categoryName); // Update header
    const dynamicContent = document.getElementById('dynamic-content');
    const cells = dynamicContent.getElementsByClassName('dynamic-cell');
    
    // Clear previous content
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
        cells[i].onclick = null;
    }

    const categoryArticles = articles[categoryId] || [];
    categoryArticles.forEach((article, index) => {
        if (index < cells.length) {
            cells[index].textContent = article.title;
            cells[index].onclick = () => loadArticle(article.id);
        }
    });
}

// Function to render article details with products
function loadArticle(articleId) {
    state.previousView = 'articles'; // Track previous view
    state.currentView = 'article';
    state.selectedArticle = articleId;
    const articleTitle = Object.values(articles)
        .flat()
        .find(article => article.id === articleId).title;
    updateHeader(articleTitle); // Update header
    const dynamicContent = document.getElementById('dynamic-content');
    const cells = dynamicContent.getElementsByClassName('dynamic-cell');
    
    // Clear previous content
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
        cells[i].onclick = null;
    }

    const articleProducts = products[articleId] || [];
    articleProducts.forEach((product, index) => {
        if (index < cells.length) {
            cells[index].textContent = product.name;
            cells[index].onclick = () => showProductDetails(product);
        }
    });
}

// Function to show product details in a modal
function showProductDetails(product) {
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('carousel-image');
    const modalProsList = document.getElementById('modal-pros-list');
    const modalConsList = document.getElementById('modal-cons-list');
    const modalButtons = document.getElementById('modal-buttons');
    const modalRating = document.getElementById('modal-rating');

    modalTitle.textContent = product.name;

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


// Function to go back in history
function goBack() {
    console.log('goBack called');
    console.log('state.previousView:', state.previousView);
    console.log('state.currentView:', state.currentView);
    if (state.currentView === 'article') {
        loadCategory(state.selectedCategory);
    } else if (state.currentView === 'articles') {
        renderCategories();
    }
}

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
renderCategories();
});

document.addEventListener('DOMContentLoaded', function() {
    var ctaButton = document.getElementById('cta-button');

    if (ctaButton) {
        ctaButton.addEventListener('click', function(event) {
            event.preventDefault();
            var button = this;
            button.classList.add('move-up');
            setTimeout(function() {
                window.location.href = button.href;
            }, 1000); // Adjust the delay to match the animation duration
        });
    }
});
