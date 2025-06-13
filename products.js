const products = [
  { name: 'Milk', price: 67.00, unit: 'per liter', stock: 5, expiry: '2025-03-15', production: '2025-02-25', image: 'milk.jpg', rating: 4.5 },
  { name: 'Cheese', price: 150.00, unit: 'per half kg', stock: 10, expiry: '2025-04-01', production: '2025-02-28', image: 'cheese.jpg', rating: 4.7 },
  { name: 'Yogurt', price: 200.99, unit: 'per liter', stock: 3, expiry: '2025-03-10', production: '2025-02-23', image: 'yogurt.jpg', rating: 4.3 },
  { name: 'Butter', price: 199.99, unit: 'per half kg', stock: 2, expiry: '2025-03-25', production: '2025-02-26', image: 'butter.jpg', rating: 4.6 },
  { name: 'Ghee', price: 180.00, unit: 'per half kg', stock: 0, expiry: 'N/A', production: 'Next batch: 2025-03-01', image: 'ghee.jpg', rating: 4.8 },
  { name: 'Lassi', price: 60.00, unit: 'per liter', stock: 2, expiry: '2025-03-05', production: '2025-02-24', image: 'lassi.jpg', rating: 4.1 },
  { name: 'Curd', price: 70.00, unit: 'per liter', stock: 3, expiry: '2025-03-12', production: '2025-02-27', image: 'curd.jpg', rating: 4.4 },
  { name: 'Paneer', price: 300.00, unit: 'per kg', stock: 10, expiry: '2025-03-18', production: '2025-02-29', image: 'paneer.jpg', rating: 4.9 },
  { name: 'Butter Milk', price: 250.00, unit: 'per liter', stock: 30, expiry: '2025-03-08', production: '2025-02-22', image: 'butter milk.jpg', rating: 4.0 },
  { name: 'Khoya', price: 250.00, unit: 'per half kg', stock: 0, expiry: 'N/A', production: 'Next batch: 2025-03-05', image: 'khoya.jpg', rating: 4.6 }
];

  
  function displayCatalog() {
	const catalog = document.getElementById('productCatalog');
	catalog.innerHTML = '';
  
	const formatter = new Intl.NumberFormat('en-IN', {
	  style: 'currency',
	  currency: 'INR',
	});
  
	products.forEach(product => {
	  const lowStock = product.stock < 5 && product.stock > 0;
	  const outOfStock = product.stock === 0;
  
	  const productDiv = document.createElement('div');
	  productDiv.classList.add('product');
  
	  productDiv.innerHTML = `
		<img src="${product.image}" alt="${product.name}" class="product-img">
		<h2>${product.name}</h2>
		<p>Price: ${formatter.format(product.price)}</p>
		<p>Expiry Date: <strong>${product.expiry}</strong></p>
		<p>Units Available: <span class="${outOfStock ? 'out-of-stock' : lowStock ? 'low-stock' : ''}">${product.stock} ${outOfStock ? ' (Out of Stock!)' : lowStock ? ' (Low Stock!)' : ''}</span></p>
		<div class="details-container">
		<button class="details-btn" onclick="viewDetails('${product.name}', '${formatter.format(product.price)}', '${product.unit}', '${product.stock}', '${product.expiry}', '${product.production}', '${product.rating}')">View Details</button>
		</div>
	  `;
  
	  catalog.appendChild(productDiv);
	});
  }
  
function viewDetails(name, price, unit, stock, expiry, production, rating) {
alert(`Product: ${name}
Price: ${price} ${unit}
Stock: ${stock} units
Expiry Date: ${expiry}
Production Info: ${production}
Rating: ${rating} / 5`);
}
  // Initial display of product catalog
  displayCatalog();