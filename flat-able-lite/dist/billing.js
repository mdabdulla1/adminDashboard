let billingData = [];

document.addEventListener("DOMContentLoaded", () => {
  loadBillingData();
  setupBillingValidation();
});

function setupBillingValidation() {
  document.getElementById("billingName").addEventListener("input", validateBillingName);
  document.getElementById("amount").addEventListener("input", validateAmount);
}

function validateBillingName() {
  const name = document.getElementById("billingName").value.trim();
  const error = document.getElementById("billingNameError");
  const isValid = /^[A-Za-z][A-Za-z\s]{2,}$/.test(name);
  error.textContent = isValid ? "" : "Name must be at least 3 letters.";
  return isValid;
}

function validateAmount() {
  const amount = document.getElementById("amount").value.trim();
  const error = document.getElementById("amountError");
  const isValid = /^\d+(\.\d{1,2})?$/.test(amount) && parseFloat(amount) > 0;
  error.textContent = isValid ? "" : "Enter a valid positive amount.";
  return isValid;
}

function loadBillingData() {
  billingData = JSON.parse(localStorage.getItem("billingData")) || [];
  displayBillingData();
}

function saveBillingData() {
  localStorage.setItem("billingData", JSON.stringify(billingData));
}

function addBillingEntry() {
  const isValid = validateBillingName() & validateAmount();
  if (!isValid) return;

  const name = document.getElementById("billingName").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const status = document.getElementById("paymentStatus").value;
  const mode = document.getElementById("paymentMode").value;

  billingData.push({ name, amount, status, mode });
  saveBillingData();
  displayBillingData();
  clearBillingForm();
}

function clearBillingForm() {
  document.getElementById("billingName").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("paymentStatus").value = "Pending";
  document.getElementById("paymentMode").value = "Cash";
  document.getElementById("billingNameError").textContent = "";
  document.getElementById("amountError").textContent = "";
}

function displayBillingData() {
  const billingTable = document.getElementById("billingTable");
  billingTable.innerHTML = `
  `;

  billingData.forEach((entry, index) => {
    billingTable.innerHTML += `
      <tr>
        <td><strong>${entry.name}</strong></td>
        <td>₹${entry.amount}</td>
        <td>${entry.status}</td>
        <td>${entry.mode}</td>
        <td>
          <div class="actions">
            <button class="action-btn" onclick="toggleMenu(event, ${index})">☰</button>
            <div class="action-menu" id="billing-menu-${index}">
              <button onclick="editBillingEntry(${index})">Edit</button>
              <button onclick="deleteBillingEntry(${index})" style="color: red;">Delete</button>
            </div>
          </div>
        </td>
      </tr>
    `;
  });
}

function deleteBillingEntry(index) {
  billingData.splice(index, 1);
  saveBillingData();
  displayBillingData();
}

function editBillingEntry(index) {
  const entry = billingData[index];
  document.getElementById("billingName").value = entry.name;
  document.getElementById("amount").value = entry.amount;
  document.getElementById("paymentStatus").value = entry.status;
  document.getElementById("paymentMode").value = entry.mode;
  deleteBillingEntry(index);
}

function toggleMenu(event, index) {
  event.stopPropagation();
  const menu = document.getElementById(`billing-menu-${index}`);
  document.querySelectorAll(".action-menu").forEach(m => m.style.display = "none");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
  document.addEventListener("click", () => menu.style.display = "none", { once: true });
}
