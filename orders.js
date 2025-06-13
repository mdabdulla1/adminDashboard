document.addEventListener("DOMContentLoaded", () => {
    loadData();
    setupValidation();
    showSection('order'); // Default section
});

let orders = [];
let deliveries = [];

function loadData() {
    orders = JSON.parse(localStorage.getItem("orders")) || [];
    deliveries = JSON.parse(localStorage.getItem("deliveries")) || [];
    displayOrders();
    displayDeliveries();
}

function saveData() {
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("deliveries", JSON.stringify(deliveries));
}

function setupValidation() {
    document.getElementById("orderId").addEventListener("input", validateOrderId);
    document.getElementById("customerName").addEventListener("input", validateCustomerName);
    document.getElementById("quantity").addEventListener("input", validateOrderQuantity);

    document.getElementById("deliveryId").addEventListener("input", validateDeliveryId);
    document.getElementById("driverName").addEventListener("input", validateDriverName);
    document.getElementById("vehicle").addEventListener("input", validateVehicle);
    document.getElementById("deliveryDate").addEventListener("change", validateDeliveryDate);
}

// === Validation Functions ===
function validateOrderId() {
    const val = document.getElementById("orderId").value.trim();
    const err = document.getElementById("orderIdError");
    const valid = /^[a-zA-Z0-9]{3,}$/.test(val);
    err.textContent = valid ? "" : "At least 3 alphanumeric characters required.";
    return valid;
}

function validateCustomerName() {
    const val = document.getElementById("customerName").value.trim();
    const err = document.getElementById("customerNameError");
    const valid = /^[A-Za-z][A-Za-z\s]{2,}$/.test(val);
    err.textContent = valid ? "" : "At least 3 letters, alphabets and spaces only.";
    return valid;
}

function validateOrderQuantity() {
    const val = parseFloat(document.getElementById("quantity").value);
    const err = document.getElementById("quantityError");
    const valid = !isNaN(val) && val > 0;
    err.textContent = valid ? "" : "Quantity must be a number greater than 0.";
    return valid;
}

function validateDeliveryId() {
    const val = document.getElementById("deliveryId").value.trim();
    const err = document.getElementById("deliveryIdError");
    const valid = /^[a-zA-Z0-9]{3,}$/.test(val);
    err.textContent = valid ? "" : "At least 3 alphanumeric characters required.";
    return valid;
}

function validateDriverName() {
    const val = document.getElementById("driverName").value.trim();
    const err = document.getElementById("driverNameError");
    const valid = /^[A-Za-z\s]{3,}$/.test(val);
    err.textContent = valid ? "" : "At least 3 letters, alphabets and spaces only.";
    return valid;
}

function validateVehicle() {
    const val = document.getElementById("vehicle").value.trim();
    const err = document.getElementById("vehicleError");
    const valid = val.length >= 4;
    err.textContent = valid ? "" : "Vehicle number must be at least 4 characters.";
    return valid;
}

function validateDeliveryDate() {
    const val = document.getElementById("deliveryDate").value;
    const err = document.getElementById("deliveryDateError");
    const today = new Date();
    const inputDate = new Date(val);
    today.setHours(0, 0, 0, 0);
    const valid = val && inputDate >= today;
    err.textContent = valid ? "" : "Date must be today or a future date.";
    return valid;
}

function addOrder() {
    let valid =
        validateOrderId() &
        validateCustomerName() &
        validateOrderQuantity();
    if (!valid) return;

    let order = {
        orderId: document.getElementById("orderId").value.trim(),
        customerName: document.getElementById("customerName").value.trim(),
        product: document.getElementById("product").value,
        quantity: document.getElementById("quantity").value.trim(),
    };

    orders.push(order);
    saveData();
    displayOrders();
    clearForm("orderForm");
}

function addDelivery() {
    let valid =
        validateDeliveryId() &
        validateDriverName() &
        validateVehicle() &
        validateDeliveryDate();
    if (!valid) return;

    let delivery = {
        deliveryId: document.getElementById("deliveryId").value.trim(),
        driverName: document.getElementById("driverName").value.trim(),
        vehicle: document.getElementById("vehicle").value.trim(),
        deliveryDate: document.getElementById("deliveryDate").value,
    };

    deliveries.push(delivery);
    saveData();
    displayDeliveries();
    clearForm("deliveryForm");
}

function displayOrders() {
    const table = document.getElementById("orderTable");
    table.innerHTML = "";
    orders.forEach((order, index) => {
        table.innerHTML += `
        <tr>
            <td>${order.orderId}</td>
            <td>${order.customerName}</td>
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td class="actions">
                <button class="action-btn" onclick="toggleMenu(event, ${index}, 'order')">☰</button>
                <div class="action-menu" id="order-menu-${index}">
                    <button onclick="editOrder(${index})">Edit</button>
                    <button onclick="deleteOrder(${index})" style="color:red;">Delete</button>
                </div>
            </td>
        </tr>`;
    });
}

function displayDeliveries() {
    const table = document.getElementById("deliveryTable");
    table.innerHTML = "";
    deliveries.forEach((delivery, index) => {
        table.innerHTML += `
        <tr>
            <td>${delivery.deliveryId}</td>
            <td>${delivery.driverName}</td>
            <td>${delivery.vehicle}</td>
            <td>${delivery.deliveryDate}</td>
            <td class="actions">
                <button class="action-btn" onclick="toggleMenu(event, ${index}, 'delivery')">☰</button>
                <div class="action-menu" id="delivery-menu-${index}">
                    <button onclick="editDelivery(${index})">Edit</button>
                    <button onclick="deleteDelivery(${index})" style="color:red;">Delete</button>
                </div>
            </td>
        </tr>`;
    });
}

function deleteOrder(index) {
    orders.splice(index, 1);
    saveData();
    displayOrders();
}

function deleteDelivery(index) {
    deliveries.splice(index, 1);
    saveData();
    displayDeliveries();
}

function editOrder(index) {
    let o = orders[index];
    document.getElementById("orderId").value = o.orderId;
    document.getElementById("customerName").value = o.customerName;
    document.getElementById("product").value = o.product;
    document.getElementById("quantity").value = o.quantity;
    deleteOrder(index);
}

function editDelivery(index) {
    let d = deliveries[index];
    document.getElementById("deliveryId").value = d.deliveryId;
    document.getElementById("driverName").value = d.driverName;
    document.getElementById("vehicle").value = d.vehicle;
    document.getElementById("deliveryDate").value = d.deliveryDate;
    deleteDelivery(index);
}

function clearForm(formId) {
    document.getElementById(formId).reset();
    document.querySelectorAll(`#${formId} .error`).forEach(e => (e.textContent = ""));
}

function toggleMenu(event, index, type) {
    event.stopPropagation();
    let menu = document.getElementById(`${type}-menu-${index}`);
    document.querySelectorAll(".action-menu").forEach(m => (m.style.display = "none"));
    menu.style.display = "block";
    document.addEventListener("click", () => (menu.style.display = "none"), { once: true });
}

function showSection(section) {
    document.getElementById("orderSection").style.display = "none";
    document.getElementById("deliverySection").style.display = "none";
    if (section === "order") {
        document.getElementById("orderSection").style.display = "flex";
    } else {
        document.getElementById("deliverySection").style.display = "flex";
    }
}