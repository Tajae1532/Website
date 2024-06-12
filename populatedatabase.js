const mongoose = require('mongoose');
const Category = require('./models/Category');  // Adjust the path as needed
const Article = require('./models/Article');  // Adjust the path as needed
const Product = require('./models/Product');  // Adjust the path as needed

mongoose.connect('mongodb://127.0.0.1:27017/worth-the-pick', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

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

const articles = [
    // Category 1: Electronics
    { id: 101, title: 'Top 10 Smartphones of 2024', categoryId: 1 },
    { id: 102, title: 'Top 10 Laptops for Work and Play of 2024', categoryId: 1 },
    { id: 103, title: 'Top 10 Tablets of 2024', categoryId: 1 },
    { id: 104, title: 'Top 10 Smartwatches of 2024', categoryId: 1 },
    { id: 105, title: 'Top 10 Bluetooth Speakers of 2024', categoryId: 1 },
    { id: 106, title: 'Top 10 Wireless Earbuds of 2024', categoryId: 1 },
    { id: 107, title: 'Top 10 Gaming Consoles of 2024', categoryId: 1 },
    { id: 108, title: 'Top 10 Smart Home Devices of 2024', categoryId: 1 },
    { id: 109, title: 'Top 10 Digital Cameras of 2024', categoryId: 1 },
    { id: 110, title: 'Top 10 Portable Chargers and Power Banks of 2024', categoryId: 1 },

    // Category 2: Home Goods
    { id: 201, title: 'Top 10 Kitchen Appliances of 2024', categoryId: 2 },
    { id: 202, title: 'Top 10 Furniture for Your Home of 2024', categoryId: 2 },
    { id: 203, title: 'Top 10 Vacuum Cleaners of 2024', categoryId: 2 },
    { id: 204, title: 'Top 10 Coffee Makers of 2024', categoryId: 2 },
    { id: 205, title: 'Top 10 Air Purifiers of 2024', categoryId: 2 },
    { id: 206, title: 'Top 10 Blenders of 2024', categoryId: 2 },
    { id: 207, title: 'Top 10 Robot Vacuums of 2024', categoryId: 2 },
    { id: 208, title: 'Top 10 Air Fryers of 2024', categoryId: 2 },
    { id: 209, title: 'Top 10 Smart Thermostats of 2024', categoryId: 2 },
    { id: 210, title: 'Top 10 Washing Machines of 2024', categoryId: 2 },

    // Category 3: Health & Wellness
    { id: 301, title: 'Top 10 Fitness Trackers of 2024', categoryId: 3 },
    { id: 302, title: 'Top 10 Electric Toothbrushes of 2024', categoryId: 3 },
    { id: 303, title: 'Top 10 Blood Pressure Monitors of 2024', categoryId: 3 },
    { id: 304, title: 'Top 10 Massage Guns of 2024', categoryId: 3 },
    { id: 305, title: 'Top 10 Yoga Mats of 2024', categoryId: 3 },
    { id: 306, title: 'Top 10 Water Flossers of 2024', categoryId: 3 },
    { id: 307, title: 'Top 10 Personal Scales of 2024', categoryId: 3 },
    { id: 308, title: 'Top 10 Sleep Trackers of 2024', categoryId: 3 },
    { id: 309, title: 'Top 10 Portable Massage Devices of 2024', categoryId: 3 },
    { id: 310, title: 'Top 10 Air Quality Monitors of 2024', categoryId: 3 },

    // Category 4: Gaming
    { id: 401, title: 'Top 10 Gaming Desks of 2024', categoryId: 4 },
    { id: 402, title: 'Top 10 Gaming Keyboards of 2024', categoryId: 4 },
    { id: 403, title: 'Top 10 Gaming Mice of 2024', categoryId: 4 },
    { id: 404, title: 'Top 10 Gaming Monitors of 2024', categoryId: 4 },
    { id: 405, title: 'Top 10 Gaming Headsets of 2024', categoryId: 4 },
    { id: 406, title: 'Top 10 Gaming Chairs of 2024', categoryId: 4 },
    { id: 407, title: 'Top 10 Gaming Cards of 2024', categoryId: 4 },
    { id: 408, title: 'Top 10 Gaming Consoles of 2024', categoryId: 4 },
    { id: 409, title: 'Top 10 Gaming Controllers of 2024', categoryId: 4 },
    { id: 410, title: 'Top 10 VR Headsets of 2024', categoryId: 4 },

    // Category 5: Clothing
    { id: 501, title: 'Top 10 Mens T-Shirts of 2024', categoryId: 5 },
    { id: 502, title: 'Top 10 Womens Dresses of 2024', categoryId: 5 },
    { id: 503, title: 'Top 10 Mens Jeans of 2024', categoryId: 5 },
    { id: 504, title: 'Top 10 Womens Leggings of 2024', categoryId: 5 },
    { id: 505, title: 'Top 10 Mens Sneakers of 2024', categoryId: 5 },
    { id: 506, title: 'Top 10 Womens Athletic Shoes of 2024', categoryId: 5 },
    { id: 507, title: 'Top 10 Winter Jackets of 2024', categoryId: 5 },
    { id: 508, title: 'Top 10 Workout Clothes of 2024', categoryId: 5 },
    { id: 509, title: 'Top 10 Underwear for Men of 2024', categoryId: 5 },
    { id: 510, title: 'Top 10 Underwear for Women of 2024', categoryId: 5 },

    // Category 6: Gadgets
    { id: 601, title: 'Top 10 Smartwatches of 2024', categoryId: 6 },
    { id: 602, title: 'Top 10 Drones of 2024', categoryId: 6 },
    { id: 603, title: 'Top 10 Portable Bluetooth Speakers of 2024', categoryId: 6 },
    { id: 604, title: 'Top 10 Wireless Earbuds of 2024', categoryId: 6 },
    { id: 605, title: 'Top 10 Smart Home Devices of 2024', categoryId: 6 },
    { id: 606, title: 'Top 10 Portable Power Banks of 2024', categoryId: 6 },
    { id: 607, title: 'Top 10 E-Readers of 2024', categoryId: 6 },
    { id: 608, title: 'Top 10 Action Cameras of 2024', categoryId: 6 },
    { id: 609, title: 'Top 10 Smart Glasses of 2024', categoryId: 6 },
    { id: 610, title: 'Top 10 Wearable Fitness Devices of 2024', categoryId: 6 },

    // Category 7: Outdoor Gear
    { id: 701, title: 'Top 10 Camping Tents of 2024', categoryId: 7 },
    { id: 702, title: 'Top 10 Hiking Backpacks of 2024', categoryId: 7 },
    { id: 703, title: 'Top 10 Sleeping Bags of 2024', categoryId: 7 },
    { id: 704, title: 'Top 10 Portable Camping Stoves of 2024', categoryId: 7 },
    { id: 705, title: 'Top 10 Hiking Boots of 2024', categoryId: 7 },
    { id: 706, title: 'Top 10 Outdoor GPS Devices of 2024', categoryId: 7 },
    { id: 707, title: 'Top 10 Camping Chairs of 2024', categoryId: 7 },
    { id: 708, title: 'Top 10 Waterproof Jackets of 2024', categoryId: 7 },
    { id: 709, title: 'Top 10 Binoculars of 2024', categoryId: 7 },
    { id: 710, title: 'Top 10 Outdoor Multi-Tools of 2024', categoryId: 7 },

    // Category 8: Beauty & Personal Care
    { id: 801, title: 'Top 10 Facial Cleansers of 2024', categoryId: 8 },
    { id: 802, title: 'Top 10 Moisturizers of 2024', categoryId: 8 },
    { id: 803, title: 'Top 10 Hair Dryers Speakers of 2024', categoryId: 8 },
    { id: 804, title: 'Top 10 Makeup Brushes of 2024', categoryId: 8 },
    { id: 805, title: 'Top 10 Electric Shavers Devices of 2024', categoryId: 8 },
    { id: 806, title: 'Top 10 Lipsticks Banks of 2024', categoryId: 8 },
    { id: 807, title: 'Top 10 Face Masks of 2024', categoryId: 8 },
    { id: 808, title: 'Top 10 Hair Straighteners of 2024', categoryId: 8 },
    { id: 809, title: 'Top 10 Sunscreens of 2024', categoryId: 8 },
    { id: 810, title: 'Top 10 Nail Polishes of 2024', categoryId: 8 },

    // Category 9: Pet Supplies
    { id: 901, title: 'Top 10 Dog Beds of 2024', categoryId: 9 },
    { id: 902, title: 'Top 10 Cat Litter Boxes of 2024', categoryId: 9 },
    { id: 903, title: 'Top 10 Pet Food Brands of 2024', categoryId: 9 },
    { id: 904, title: 'Top 10 Pet Toys of 2024', categoryId: 9 },
    { id: 905, title: 'Top 10 Dog Leashes and Collars of 2024', categoryId: 9 },
    { id: 906, title: 'Top 10 Cat Scratching Posts of 2024', categoryId: 9 },
    { id: 907, title: 'Top 10 Pet Grooming Tools of 2024', categoryId: 9 },
    { id: 908, title: 'Top 10 Pet Carriers of 2024', categoryId: 9 },
    { id: 909, title: 'Top 10 Aquarium Supplies of 2024', categoryId: 9 },
    { id: 910, title: 'Top 10 Pet Water Fountains of 2024', categoryId: 9 },

    // Category 10: Kitchen Appliances
    { id: 1001, title: 'Top 10 Refrigerators of 2024', categoryId: 10 },
    { id: 1002, title: 'Top 10 Microwaves of 2024', categoryId: 10 },
    { id: 1003, title: 'Top 10 Dishwashers of 2024', categoryId: 10 },
    { id: 1004, title: 'Top 10 Coffee Makers of 2024', categoryId: 10 },
    { id: 1005, title: 'Top 10 Blenders of 2024', categoryId: 10 },
    { id: 1006, title: 'Top 10 Air Fryers of 2024', categoryId: 10 },
    { id: 1007, title: 'Top 10 Toasters and Toaster Ovens of 2024', categoryId: 10 },
    { id: 1008, title: 'Top 10 Stand Mixers of 2024', categoryId: 10 },
    { id: 1009, title: 'Top 10 Pressure Cookers of 2024', categoryId: 10 },
    { id: 1010, title: 'Top 10 Food Processors of 2024', categoryId: 10 },
];


const products = [
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
            ],
            articleId: 101
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
            ],
            articleId: 101
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
            ],
            articleId: 101
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
            ],
            articleId: 101
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
            ],
            articleId: 101
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
            ],
            articleId: 101
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
            ],
            articleId: 101
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
            ],
            articleId: 101
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
            ],
            articleId: 101
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
            ],
            articleId: 101
        },
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
            ],
            articleId: 102
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
            ],
            articleId: 101
        },
    ];

async function populateDatabase() {
  try {
    await Category.deleteMany({});
    await Article.deleteMany({});
    await Product.deleteMany({});

    await Category.insertMany(categories);
    await Article.insertMany(articles);
    await Product.insertMany(products);

    console.log('Database populated successfully');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    mongoose.connection.close();
  }
}

populateDatabase();
