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
    { id: 6, name: 'Gadgets' },
    { id: 7, name: 'Outdoor Gear' },
    { id: 8, name: 'Beauty & Personal Care' },
    { id: 9, name: 'Pet Supplies' },
    { id: 10, name: 'Kitchen Appliances' },
];

const articles = {
    1: [
        { id: 101, title: 'Top 10 Smartphones of 2024' },
        { id: 102, title: 'Top 10 Laptops for Work and Play of 2024' },
        { id: 103, title: 'Top 10 Tablets of 2024' },
        { id: 104, title: 'Top 10 Smartwatches of 2024' },
        { id: 105, title: 'Top 10 Bluetooth Speakers of 2024' },
        { id: 106, title: 'Top 10 Wireless Earbuds of 2024' },
        { id: 107, title: 'Top 10 Gaming Consoles of 2024' },
        { id: 108, title: 'Top 10 Smart Home Devices of 2024' },
        { id: 109, title: 'Top 10 Digital Cameras of 2024' },
        { id: 110, title: 'Top 10 Portable Chargers and Power Banks of 2024' },
    ],
    2: [
        { id: 201, title: 'Top 10 Kitchen Appliances of 2024' },
        { id: 202, title: 'Top 10 Furniture for Your Home of 2024' },
        { id: 203, title: 'Top 10 Vacuum Cleaners of 2024' },
        { id: 204, title: 'Top 10 Coffee Makers of 2024' },
        { id: 205, title: 'Top 10 Air Purifiers of 2024' },
        { id: 206, title: 'Top 10 Blenders of 2024' },
        { id: 207, title: 'Top 10 Robot Vacuums of 2024' },
        { id: 208, title: 'Top 10 Air Fryers of 2024' },
        { id: 209, title: 'Top 10 Smart Thermostats of 2024' },
        { id: 210, title: 'Top 10 Washing Machines of 2024' },
    ],
    3: [
        { id: 301, title: 'Top 10 Fitness Trackers of 2024' },
        { id: 302, title: 'Top 10 Electric Toothbrushes of 2024' },
        { id: 303, title: 'Top 10 Blood Pressure Monitors of 2024' },
        { id: 304, title: 'Top 10 Massage Guns of 2024' },
        { id: 305, title: 'Top 10 Yoga Mats of 2024' },
        { id: 306, title: 'Top 10 Water Flossers of 2024' },
        { id: 307, title: 'Top 10 Personal Scales of 2024' },
        { id: 308, title: 'Top 10 Sleep Trackers of 2024' },
        { id: 309, title: 'Top 10 Portable Massage Devices of 2024' },
        { id: 310, title: 'Top 10 Air Quality Monitors of 2024' },
    ],
    4: [
        { id: 401, title: 'Top 10 Gaming Desks of 2024' },
        { id: 402, title: 'Top 10 Gaming Keyboards of 2024' },
        { id: 403, title: 'Top 10 Gaming Mice of 2024' },
        { id: 404, title: 'Top 10 Gaming Monitors of 2024' },
        { id: 405, title: 'Top 10 Gaming Headsets of 2024' },
        { id: 406, title: 'Top 10 Gaming Chairs of 2024' },
        { id: 407, title: 'Top 10 Gaming Cards of 2024' },
        { id: 408, title: 'Top 10 Gaming Consoles of 2024' },
        { id: 409, title: 'Top 10 Gaming Controllers of 2024' },
        { id: 410, title: 'Top 10 VR Headsets of 2024' },
    ],
    5: [
        { id: 501, title: 'Top 10 Mens T-Shirts of 2024' },
        { id: 502, title: 'Top 10 Womens Dresses of 2024' },
        { id: 503, title: 'Top 10 Mens Jeans of 2024' },
        { id: 504, title: 'Top 10 Womens Leggings of 2024' },
        { id: 505, title: 'Top 10 Mens Sneakers of 2024' },
        { id: 506, title: 'Top 10 Womens Athletic Shoes of 2024' },
        { id: 507, title: 'Top 10 Winter Jackets of 2024' },
        { id: 508, title: 'Top 10 Workout Clothes of 2024' },
        { id: 509, title: 'Top 10 Underwear for Men of 2024' },
        { id: 510, title: 'Top 10 Underwear for Women of 2024' },
    ],
    6: [
        { id: 601, title: 'Top 10 Smartwatches of 2024' },
        { id: 602, title: 'Top 10 Drones of 2024' },
        { id: 603, title: 'Top 10 Portable Bluetooh Speakers of 2024' },
        { id: 604, title: 'Top 10 Wireless Earbuds of 2024' },
        { id: 605, title: 'Top 10 Smart Home Devices of 2024' },
        { id: 606, title: 'Top 10 Portable Power Banks of 2024' },
        { id: 607, title: 'Top 10 E-Readers of 2024' },
        { id: 608, title: 'Top 10 Action Cameras of 2024' },
        { id: 609, title: 'Top 10 Smart Glasses of 2024' },
        { id: 610, title: 'Top 10 Wearable Fitness Devices of 2024' },
    ],
    7: [
        { id: 701, title: 'Top 10 Camping Tents of 2024' },
        { id: 702, title: 'Top 10 Hiking Backpacks of 2024' },
        { id: 703, title: 'Top 10 Sleeping Bags of 2024' },
        { id: 704, title: 'Top 10 Portable Camping Stoves of 2024' },
        { id: 705, title: 'Top 10 Hiking Boots of 2024' },
        { id: 706, title: 'Top 10 Outdoor GPS Devices of 2024' },
        { id: 707, title: 'Top 10 Camping Chairs of 2024' },
        { id: 708, title: 'Top 10 Waterproof Jackets of 2024' },
        { id: 709, title: 'Top 10 Binoculars of 2024' },
        { id: 710, title: 'Top 10 Outdoor Multi-Tools of 2024' },
    ],
    8: [
        { id: 801, title: 'Top 10 Facial Cleansers of 2024' },
        { id: 802, title: 'Top 10 Moisturizers of 2024' },
        { id: 803, title: 'Top 10 Hair Dryers Speakers of 2024' },
        { id: 804, title: 'Top 10 Makeup Brushes of 2024' },
        { id: 805, title: 'Top 10 Electric Shavers Devices of 2024' },
        { id: 806, title: 'Top 10 Lipsticks Banks of 2024' },
        { id: 807, title: 'Top 10 Face Masks of 2024' },
        { id: 808, title: 'Top 10 Hair Straighteners of 2024' },
        { id: 809, title: 'Top 10 Sunscreens of 2024' },
        { id: 810, title: 'Top 10 Nail Polishes of 2024' },
    ],
    9: [
        { id: 901, title: 'Top 10 Dog Beds of 2024' },
        { id: 902, title: 'Top 10 Cat Litter Boxes of 2024' },
        { id: 903, title: 'Top 10 Pet Food Brands of 2024' },
        { id: 904, title: 'Top 10 Pet Toys of 2024' },
        { id: 905, title: 'Top 10 Dog Leashes and Collars of 2024' },
        { id: 906, title: 'Top 10 Cat Scratching Posts of 2024' },
        { id: 907, title: 'Top 10 Pet Grooming Tools of 2024' },
        { id: 908, title: 'Top 10 Pet Carriers of 2024' },
        { id: 909, title: 'Top 10 Aquarium Supplies of 2024' },
        { id: 910, title: 'Top 10 Pet Water Fountains of 2024' },
    ],
    10: [
        { id: 1001, title: 'Top 10 Refrigerators of 2024' },
        { id: 1002, title: 'Top 10 Microwaves of 2024' },
        { id: 1003, title: 'Top 10 Dishwashers of 2024' },
        { id: 1004, title: 'Top 10 Coffee Makers of 2024' },
        { id: 1005, title: 'Top 10 Blenders of 2024' },
        { id: 1006, title: 'Top 10 Air Fryers of 2024' },
        { id: 1007, title: 'Top 10 Toasters and Toaster Ovens of 2024' },
        { id: 1008, title: 'Top 10 Stand Mixers of 2024' },
        { id: 1009, title: 'Top 10 Pressure Cookers of 2024' },
        { id: 1010, title: 'Top 10 Food Processors of 2024' },
    ],
};

const products = {
    101: [
        {
            id: 1,
            name: 'iPhone 15',
            details: 'Latest iPhone with A16 Bionic chip.',
            pros: [
                { title: 'Great camera', details: '12MP dual-lens camera with Night mode' },
                { title: 'Fast performance', details: 'A16 Bionic chip for faster processing' }
            ],
            cons: [
                { title: 'Expensive', details: 'Starting at $999, it is one of the priciest smartphones' },
                { title: 'No headphone jack', details: 'Requires wireless headphones or a dongle' }
            ],
            images: ['../images/phones/iphone15.jpg', '../images/phones/iphone151.jpg', '../images/phones/iphone152.jpg'], // Multiple images
            rating: 4.5, // Overall rating
            links: [
                { url: '#', text: 'Buy on Amazon', originalPrice: '$999.99', salePrice: '$899.99' },
                { url: '#', text: 'Buy on eBay', originalPrice: '$999.99' }
            ]
        },
        {
            id: 2,
            name: 'Samsung Galaxy S24',
            details: 'Newest Galaxy with improved camera.',
            pros: [
                { title: 'Excellent display', details: '6.1-inch Dynamic AMOLED with HDR10+' },
                { title: 'Versatile camera', details: 'Triple-lens setup with ultra-wide and telephoto' }
            ],
            cons: [
                { title: 'High price', details: 'Starting at $899' },
                { title: 'Average battery life', details: 'Up to 10 hours of usage' }
            ],
            images: ['../images/phones/samsunggalaxys24.jpg', '../images/phones/samsunggalaxys241.jpg', '../images/phones/samsunggalaxys242.jpg'], // Multiple images
            rating: 4.0, // Overall rating
            links: [
                { url: '#', text: 'Buy on Amazon', originalPrice: '$899.99', salePrice: '$799.99' },
                { url: '#', text: 'Buy on eBay', originalPrice: '$899.99' }
            ]
        },
        {
            id: 3,
            name: 'Google Pixel 8',
            details: 'The best Android for most people',
            pros: [
                { title: 'Cool AI photo features', details: '50MP (wide) + 12MP (ultra-wide)' },
                { title: 'Seven years of Android support', details: '128GB / 256GB of storage' }
            ],
            cons: [
                { title: 'Design changes are minor', details: 'Starting at $549' },
                { title: 'No temperature sensor', details: 'Up to 10 hours of usage' }
            ],
            images: ['../images/phones/Google Pixel 8.webp', '../images/phones/googlepixel81.jpg', '../images/phones/googlepixel82.jpg'], // Multiple images
            rating: 4.0, // Overall rating
            links: [
                { url: '#', text: 'Buy on Amazon', originalPrice: '$699.00', salePrice: '$549.00' },
                { url: '#', text: 'Buy on eBay', originalPrice: '$699.00' }
            ]
        },
        {
            id: 4,
            name: 'OnePlus 12R',
            details: 'The best battery life',
            pros: [
                { title: 'Excellent battery life', details: '50MP (wide) + 8P (ultrawide) + 2MP (macro)' },
                { title: 'Display is outstanding', details: '128GB / 256GB of storage' }
            ],
            cons: [
                { title: 'Not many MP on those cameras', details: 'Starting at $499' },
                { title: 'Cant charge wirelessly', details: 'Up to 10 hours of usage' }
            ],
            images: ['../images/phones/oneplus 12r.jpg', '../images/phones/oneplus12r1.jpg', '../images/phones/oneplus12r2.jpg'], // Multiple images
            rating: 4.0, // Overall rating
            links: [
                { url: '#', text: 'Buy on Amazon', originalPrice: '$499.99', salePrice: '$449.99' },
                { url: '#', text: 'Buy on eBay', originalPrice: '$499.99' }
            ]
        },
        {
            id: 5,
            name: 'OnePlus Open',
            details: 'The best tablet foldable phone',
            pros: [
                { title: 'Bigger displays inside and out', details: ' 48MP (wide) + 48MP (ultrawide) + 64MP (telephoto)' },
                { title: 'Best cameras on any foldable phone', details: '512GB UFS 4.0 of storage' }
            ],
            cons: [
                { title: 'Not as feature-packed as the Galaxy Z Fold 5', details: 'Starting at $1399' },
                { title: 'Whoa, that’s a big camera bump', details: 'Up to 10 hours of usage' }
            ],
            images: ['../images/phones/oneplus open.jpg', '../images/phones/oneplusopen1.jpg', '../images/phones/oneplusopen2.jpg'], // Multiple images
            rating: 4.0, // Overall rating
            links: [
                { url: '#', text: 'Buy on Amazon', originalPrice: '$1699.99', salePrice: '$1399.99' },
                { url: '#', text: 'Buy on eBay', originalPrice: '$1699.99' }
            ]
        },
        {
            id: 6,
            name: 'Motorola Razr Plus (Razr 40 Ultra)',
            details: 'The best clamshell foldable',
            pros: [
                { title: 'Huge cover display is actually useful', details: '12MP (wide) + 13MP (ultrawide)' },
                { title: 'Cool vegan leather and unique colors', details: '256GB / 512GB of storage' }
            ],
            cons: [
                { title: 'Not water resistant enough', details: 'Starting at $999' },
                { title: 'Too expensive for what you get', details: 'Up to 10 hours of usage' }
            ],
            images: ['../images/phones/motorola.jpg', '../images/phones/motorola1.jpg', '../images/phones/motorola2.jpg'], // Multiple images
            rating: 4.0, // Overall rating
            links: [
                { url: '#', text: 'Buy on Amazon', originalPrice: '$999.99', salePrice: '$649.99' },
                { url: '#', text: 'Buy on eBay', originalPrice: '$999.99' }
            ]
        },
        {
            id: 7,
            name: 'Google Pixel 8a',
            details: 'The best budget phone',
            pros: [
                { title: 'An affordable way get Googles AI magic', details: '152.1 x 72.7 x 8.9mm' },
                { title: 'Versatile camera', details: '128GB of storage' }
            ],
            cons: [
                { title: 'Battery life could be better', details: 'Starting at $499' },
                { title: 'Not the best performance, but AI-capable', details: 'Up to 10 hours of usage' }
            ],
            images: ['../images/phones/googlepixel8a.jpg', '../images/phones/googlepixel8a1.jpg', '../images/phones/googlepixel8a2.jpg'], // Multiple images
            rating: 4.0, // Overall rating
            links: [
                { url: '#', text: 'Buy on Amazon', originalPrice: '$369.99', salePrice: '$499.99' },
                { url: '#', text: 'Buy on eBay', originalPrice: '$499.99' }
            ]
        },
        {
            id: 8,
            name: 'Google Pixel 8 Pro',
            details: 'The best AI phone',
            pros: [
                { title: 'Great materials and matte finish', details: '50MP (wide) + 48MP (ultra-wide) + 48MP (telephoto)' },
                { title: 'Call screening is natural and very useful', details: '128GB/256GB/512GB/1TB of storage' }
            ],
            cons: [
                { title: 'Android settings and features are confusing', details: 'Starting at $999' },
                { title: 'Cameras don’t beat the iPhone 15 Pro', details: 'Up to 10 hours of usage' }
            ],
            images: ['../images/phones/googlepixel8pro.jpg', '../images/phones/googlepixel8pro1.jpg', '../images/phones/googlepixel8pro2.jpg'], // Multiple images
            rating: 4.0, // Overall rating
            links: [
                { url: '#', text: 'Buy on Amazon', originalPrice: '$999.99', salePrice: '$749.99' },
                { url: '#', text: 'Buy on eBay', originalPrice: '$999.99' }
            ]
        },
        {
            id: 9,
            name: 'Asus ROG Phone 8 Pro',
            details: 'The best gaming phone',
            pros: [
                { title: 'Subtle design, for a gaming phone', details: ' 50MP (wide) + 13MP (ultra-wide) + 32MP (3X optical zoom)' },
                { title: 'Incredible performance', details: '512GB / 1TB of storage' }
            ],
            cons: [
                { title: 'Cant sustain top performance', details: 'Starting at $1120' },
                { title: 'Only two years of Android updates', details: 'Up to 10 hours of usage' }
            ],
            images: ['../images/phones/asusrogphone8pro.jpg', '../images/phones/asusrogphone8pro1.jpg', '../images/phones/asusrogphone8pro2.jpg'], // Multiple images
            rating: 4.0, // Overall rating
            links: [
                { url: '#', text: 'Buy on Amazon', originalPrice: '$1045.49', salePrice: '$1120.00' },
                { url: '#', text: 'Buy on eBay', originalPrice: '$1120.00' }
            ]
        },
        {
            id: 10,
            name: 'OnePlus 12',
            details: 'The best-looking phone',
            pros: [
                { title: 'Amazing emerald green finish', details: '50MP (wide) + 48MP (ultra-wide)' },
                { title: 'Stellar performance and battery life', details: '256GB / 512GB / 1TB of storage' }
            ],
            cons: [
                { title: 'Only splash-resistant, not waterproof', details: 'Starting at $899' },
                { title: 'Wont get 7 years of Android', details: 'Up to 10 hours of usage' }
            ],
            images: ['../images/phones/oneplus12.jpg', '../images/phones/oneplus121.jpg', '../images/phones/oneplus122.jpg'], // Multiple images
            rating: 4.0, // Overall rating
            links: [
                { url: '#', text: 'Buy on Amazon', originalPrice: '$899.99', salePrice: '$799.99' },
                { url: '#', text: 'Buy on eBay', originalPrice: '$899.99' }
            ]
        }
        
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
            images: ['../images/macbook.webp', 'macbook2.jpg'], // Multiple images
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
