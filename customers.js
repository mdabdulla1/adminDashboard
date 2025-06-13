document.addEventListener("DOMContentLoaded", () => {
    loadCustomers();
    setupValidation();
});

let customers = [];

function loadCustomers() {
    customers = JSON.parse(localStorage.getItem("customers")) || [];
    displayCustomers();
}

function saveCustomers() {
    localStorage.setItem("customers", JSON.stringify(customers));
}

function setupValidation() {
    document.getElementById("name").addEventListener("input", validateName);
    document.getElementById("email").addEventListener("input", validateEmail);
    document.getElementById("phone").addEventListener("input", validatePhone);
    document.getElementById("address").addEventListener("input", validateAddress);
}

function validateName() {
    const name = document.getElementById("name").value.trim();
    const error = document.getElementById("nameError");
    const regex = /^[A-Za-z][A-Za-z\s]{3,}$/;
    error.textContent = regex.test(name) ? "" : "Name must start with a letter and be at least 4 characters.";
    return regex.test(name);
}

function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const error = document.getElementById("emailError");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    error.textContent = regex.test(email) ? "" : "Enter a valid email address.";
    return regex.test(email);
}

function validatePhone() {
    const phone = document.getElementById("phone").value.trim();
    const error = document.getElementById("phoneError");
    const regex = /^\d{10}$/;
    error.textContent = regex.test(phone) ? "" : "Phone number must be exactly 10 digits.";
    return regex.test(phone);
}

function validateAddress() {
    const address = document.getElementById("address").value.trim();
    const error = document.getElementById("addressError");
    const regex = /^[A-Za-z0-9\s,.'-]{5,}$/;
    error.textContent = regex.test(address) ? "" : "Address must be at least 5 characters.";
    return regex.test(address);
}

function addCustomer() {
    let isValid = validateName() & validateEmail() & validatePhone() & validateAddress();
    if (!isValid) return;

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();

    let customer = { name, email, phone, address };
    customers.push(customer);
    saveCustomers();
    displayCustomers();
    clearForm();
}

function displayCustomers() {
    let table = document.getElementById("customerTable");
    table.innerHTML = "";

    customers.forEach((customer, index) => {
        let row = `<tr>
            <td><strong>${customer.name}</strong></td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
            <td>
                <div class="actions">
                    <button class="action-btn" onclick="toggleMenu(event, ${index})">
                        <i class="bi bi-list"></i>
                    </button>
                    <div class="action-menu" id="menu-${index}">
                        <button onclick="editCustomer(${index})"><i class="bi bi-pencil-square"></i> Edit</button>
                        <button onclick="deleteCustomer(${index})" style="color: red;"><i class="bi bi-trash"></i> Delete</button>
                    </div>
                </div>
            </td>
        </tr>`;
        table.innerHTML += row;
    });

    document.getElementById("totalCustomers").innerText = customers.length;
}

function deleteCustomer(index) {
    customers.splice(index, 1);
    saveCustomers();
    displayCustomers();
}

function editCustomer(index) {
    let customer = customers[index];
    document.getElementById("name").value = customer.name;
    document.getElementById("email").value = customer.email;
    document.getElementById("phone").value = customer.phone;
    document.getElementById("address").value = customer.address;
    deleteCustomer(index);
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
}

function toggleMenu(event, index) {
    event.stopPropagation();
    let menu = document.getElementById(`menu-${index}`);
    document.querySelectorAll(".action-menu").forEach(m => m.style.display = "none");
    menu.style.display = "block";
    document.addEventListener("click", () => menu.style.display = "none", { once: true });
}
