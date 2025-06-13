document.addEventListener("DOMContentLoaded", () => {
    loadData();
    setupValidation();
    showSection('milk'); // Show milk section by default
});

let milkCollections = [];
let suppliers = [];

function loadData() {
    milkCollections = JSON.parse(localStorage.getItem("milkCollections")) || [];
    suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
    displayData();
}

function saveData() {
    localStorage.setItem("milkCollections", JSON.stringify(milkCollections));
    localStorage.setItem("suppliers", JSON.stringify(suppliers));
}

function setupValidation() {
    document.getElementById("collectorName").addEventListener("input", validateCollectorName);
    document.getElementById("quantity").addEventListener("input", validateQuantity);
    document.getElementById("fat").addEventListener("input", validateFat);
    document.getElementById("snf").addEventListener("input", validateSnf);

    document.getElementById("supplierName").addEventListener("input", validateSupplierName);
    document.getElementById("contact").addEventListener("input", validateContact);
    document.getElementById("location").addEventListener("input", validateLocation);
}

// === Validation Functions ===

function validateCollectorName() {
    const val = document.getElementById("collectorName").value.trim();
    const err = document.getElementById("collectorNameError");
    const regex = /^[A-Za-z][A-Za-z\s]{3,}$/;
    err.textContent = regex.test(val) ? "" : "Must be at least 4 characters and start with a letter.";
    return regex.test(val);
}

function validateQuantity() {
    const val = parseFloat(document.getElementById("quantity").value);
    const err = document.getElementById("quantityError");
    const valid = !isNaN(val) && val > 0;
    err.textContent = valid ? "" : "Enter a valid quantity > 0.";
    return valid;
}

function validateFat() {
    const val = parseFloat(document.getElementById("fat").value);
    const err = document.getElementById("fatError");
    const valid = !isNaN(val) && val >= 0 && val <= 10;
    err.textContent = valid ? "" : "Fat must be between 0% and 10%.";
    return valid;
}

function validateSnf() {
    const val = parseFloat(document.getElementById("snf").value);
    const err = document.getElementById("snfError");
    const valid = !isNaN(val) && val >= 0 && val <= 10;
    err.textContent = valid ? "" : "SNF must be between 0% and 10%.";
    return valid;
}

function validateSupplierName() {
    const val = document.getElementById("supplierName").value.trim();
    const err = document.getElementById("supplierNameError");
    const regex = /^[A-Za-z][A-Za-z\s]{3,}$/;
    err.textContent = regex.test(val) ? "" : "Must be at least 4 characters and start with a letter.";
    return regex.test(val);
}

function validateContact() {
    const val = document.getElementById("contact").value.trim();
    const err = document.getElementById("contactError");
    const regex = /^\d{10}$/;
    err.textContent = regex.test(val) ? "" : "Phone number must be exactly 10 digits.";
    return regex.test(val);
}

function validateLocation() {
    const val = document.getElementById("location").value.trim();
    const err = document.getElementById("locationError");
    const regex = /^[A-Za-z0-9\s,.'-]{5,}$/;
    err.textContent = regex.test(val) ? "" : "Minimum 5 characters. Letters, numbers, punctuation allowed.";
    return regex.test(val);
}

// === Form Submission Functions ===

function addMilkCollection() {
    let valid =
        validateCollectorName() &
        validateQuantity() &
        validateFat() &
        validateSnf();
    if (!valid) return;

    let collection = {
        collectorName: document.getElementById("collectorName").value.trim(),
        quantity: parseFloat(document.getElementById("quantity").value),
        fat: parseFloat(document.getElementById("fat").value),
        snf: parseFloat(document.getElementById("snf").value),
    };

    milkCollections.push(collection);
    saveData();
    displayData();
    clearForm("milkForm");
}

function addSupplier() {
    let valid =
        validateSupplierName() &
        validateContact() &
        validateLocation();
    if (!valid) return;

    let supplier = {
        supplierName: document.getElementById("supplierName").value.trim(),
        contact: document.getElementById("contact").value.trim(),
        location: document.getElementById("location").value.trim(),
    };

    suppliers.push(supplier);
    saveData();
    displayData();
    clearForm("supplierForm");
}

// === Display Functions ===

function displayData() {
    let milkTable = document.getElementById("milkTable");
    let supplierTable = document.getElementById("supplierTable");
    milkTable.innerHTML = "";
    supplierTable.innerHTML = "";

    milkCollections.forEach((c, i) => {
        milkTable.innerHTML += `
        <tr>
            <td><strong>${c.collectorName}</strong></td>
            <td>${c.quantity}</td>
            <td>${c.fat}</td>
            <td>${c.snf}</td>
            <td class="actions">
                <button class="action-btn" onclick="toggleMenu(event, ${i}, 'milk')"><i class="bi bi-list"></i></button>
                <div class="action-menu" id="milk-menu-${i}">
                    <button onclick="editMilkCollection(${i})"><i class="bi bi-pencil-square"></i> Edit</button>
                    <button onclick="deleteMilkCollection(${i})" style="color: red;"><i class="bi bi-trash"></i> Delete</button>
                </div>
            </td>
        </tr>`;
    });

    suppliers.forEach((s, i) => {
        supplierTable.innerHTML += `
        <tr>
            <td><strong>${s.supplierName}</strong></td>
            <td>${s.contact}</td>
            <td>${s.location}</td>
            <td class="actions">
                <button class="action-btn" onclick="toggleMenu(event, ${i}, 'supplier')"><i class="bi bi-list"></i></button>
                <div class="action-menu" id="supplier-menu-${i}">
                    <button onclick="editSupplier(${i})"><i class="bi bi-pencil-square"></i> Edit</button>
                    <button onclick="deleteSupplier(${i})" style="color: red;"><i class="bi bi-trash"></i> Delete</button>
                </div>
            </td>
        </tr>`;
    });
}

// === Edit / Delete ===

function deleteMilkCollection(index) {
    milkCollections.splice(index, 1);
    saveData();
    displayData();
}

function deleteSupplier(index) {
    suppliers.splice(index, 1);
    saveData();
    displayData();
}

function editMilkCollection(index) {
    let c = milkCollections[index];
    document.getElementById("collectorName").value = c.collectorName;
    document.getElementById("quantity").value = c.quantity;
    document.getElementById("fat").value = c.fat;
    document.getElementById("snf").value = c.snf;
    deleteMilkCollection(index);
}

function editSupplier(index) {
    let s = suppliers[index];
    document.getElementById("supplierName").value = s.supplierName;
    document.getElementById("contact").value = s.contact;
    document.getElementById("location").value = s.location;
    deleteSupplier(index);
}

function clearForm(formId) {
    document.getElementById(formId).reset();
    document.querySelectorAll(`#${formId} .error`).forEach(e => e.textContent = "");
}

function toggleMenu(event, index, type) {
    event.stopPropagation();
    let menu = document.getElementById(`${type}-menu-${index}`);
    document.querySelectorAll(".action-menu").forEach(m => m.style.display = "none");
    menu.style.display = "block";
    document.addEventListener("click", () => menu.style.display = "none", { once: true });
}

function showSection(section) {
    document.getElementById('milkSection').style.display = 'none';
    document.getElementById('supplierSection').style.display = 'none';

    if (section === 'milk') {
        document.getElementById('milkSection').style.display = 'flex';
    } else {
        document.getElementById('supplierSection').style.display = 'flex';
    }
}
