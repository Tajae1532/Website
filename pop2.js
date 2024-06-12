// const mongoose = require('mongoose');
// const Category = require('./models/Category');  // Adjust the path as needed
// const Article = require('./models/Article');  // Adjust the path as needed
// const Product = require('./models/Product');  // Adjust the path as needed

// mongoose.connect('mongodb://127.0.0.1:27017/worth-the-pick', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// const categories = [
//   { id: 1, name: 'Electronics' },
//   { id: 2, name: 'Home Goods' },
//   { id: 3, name: 'Health & Wellness' },
//   { id: 4, name: 'Gaming' },
//   { id: 5, name: 'Clothing' },
//   { id: 6, name: 'Gadgets' },
//   { id: 7, name: 'Outdoor Gear' },
//   { id: 8, name: 'Beauty & Personal Care' },
//   { id: 9, name: 'Pet Supplies' },
//   { id: 10, name: 'Kitchen Appliances' },
// ];

// const articles = {
//     1: [
//         { id: 101, title: 'Top 10 Smartphones of 2024' },
//         { id: 102, title: 'Top 10 Laptops for Work and Play of 2024' },
//         { id: 103, title: 'Top 10 Tablets of 2024' },
//         { id: 104, title: 'Top 10 Smartwatches of 2024' },
//         { id: 105, title: 'Top 10 Bluetooth Speakers of 2024' },
//         { id: 106, title: 'Top 10 Wireless Earbuds of 2024' },
//         { id: 107, title: 'Top 10 Gaming Consoles of 2024' },
//         { id: 108, title: 'Top 10 Smart Home Devices of 2024' },
//         { id: 109, title: 'Top 10 Digital Cameras of 2024' },
//         { id: 110, title: 'Top 10 Portable Chargers and Power Banks of 2024' },
//     ],
// };

// const products = {
//     101: [
//         {
//             id: 1,
//             name: 'iPhone 15',
//             details: 'Latest iPhone with A16 Bionic chip.',
//             pros: [
//                 { title: 'Great camera', details: '12MP dual-lens camera with Night mode' },
//                 { title: 'Fast performance', details: 'A16 Bionic chip for faster processing' }
//             ],
//             cons: [
//                 { title: 'Expensive', details: 'Starting at $999, it is one of the priciest smartphones' },
//                 { title: 'No headphone jack', details: 'Requires wireless headphones or a dongle' }
//             ],
//             images: ['../images/phones/iphone15.jpg', '../images/phones/iphone151.jpg', '../images/phones/iphone152.jpg'], // Multiple images
//             rating: 4.5, // Overall rating
//             links: [
//                 { url: '#', text: 'Buy on Amazon', originalPrice: '$999.99', salePrice: '$899.99' },
//                 { url: '#', text: 'Buy on eBay', originalPrice: '$999.99' }
//             ]
//         },
//     ]
// };

// async function populateDatabase() {
//   try {
//     await Category.deleteMany({});
//     await Article.deleteMany({});
//     await Product.deleteMany({});

//     await Category.insertMany(categories);
//     await Article.insertMany(articles);
//     await Product.insertMany(products);

//     console.log('Database populated successfully');
//   } catch (error) {
//     console.error('Error populating database:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// populateDatabase();
