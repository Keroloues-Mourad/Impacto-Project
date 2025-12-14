// =========================
// CART COUNT UPDATE
// =========================
function updateCartCount() {
    let count = document.querySelectorAll("#orderItems .order-item").length;
    document.getElementById("cartCountBadge").textContent = count;
}
updateCartCount();

// =========================
// ADD ITEM
// =========================
function addItem() {
    let name = document.getElementById("itemName").value;
    let qty = document.getElementById("itemQty").value;

    let newItem = document.createElement("div");
    newItem.className = "order-item animate";
    newItem.innerHTML = `
        <div class="d-flex justify-content-between">
            <div>
                <strong>${name}</strong>
                <p class="text-muted">Quantity: ${qty}</p>
            </div>
            <span class="remove-btn" onclick="removeItem(this)">🗑️</span>
        </div>
    `;

    document.getElementById("orderItems").appendChild(newItem);

    updateCartCount();

    setTimeout(() => newItem.classList.remove("animate"), 500);

    bootstrap.Modal.getInstance(document.getElementById("addItemModal")).hide();
}

// =========================
// REMOVE ITEM
// =========================
function removeItem(btn) {
    btn.closest(".order-item").remove();
    updateCartCount();
}

// =========================
// CONFIRM ORDER
// =========================
document.getElementById("confirmBtn").onclick = function () {
    let address = document.getElementById("addressInput").value.trim();

    if (address === "") {
        alert("Enter your address first.");
        return;
    }

    document.getElementById("successMessage").style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
};