document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const productData = Object.fromEntries(formData.entries());

    // Convert JSON fields from strings to actual JSON objects
    productData.pros = JSON.parse(productData.pros);
    productData.cons = JSON.parse(productData.cons);
    productData.images = JSON.parse(productData.images);
    productData.links = JSON.parse(productData.links);

    fetch('http://localhost:3000/admin/add-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Product added successfully!');
        console.log('Product added:', data);
        this.reset();
    })
    .catch(error => {
        alert('Error adding product.');
        console.error('Error:', error);
    });
});
