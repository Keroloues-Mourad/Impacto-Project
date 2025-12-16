const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '/Auth/index-auth-login.html';
}

const orderItemsContainer = document.getElementById('orderItems');
const confirmBtn = document.getElementById('confirmBtn');

// Load existing donations for donor
function loadDonations() {
  fetch(`${API_BASE}/donor/donations`, {
    headers: { Authorization: 'Bearer ' + token }
  })
    .then(res => res.json())
    .then(donations => {
      orderItemsContainer.innerHTML = '';
      donations.forEach(d => {
        const div = document.createElement('div');
        div.classList.add('order-item');
        div.dataset.donationId = d.id;
        div.dataset.expiry = d.expiry || new Date().toISOString().split('T')[0];
        div.innerHTML = `
          <div class="d-flex justify-content-between">
            <div>
              <strong>${d.food_type}</strong>
              <p class="text-muted">Quantity: ${d.quantity}</p>
            </div>
            <span class="remove-btn" onclick="removeItem(this)">🗑️</span>
          </div>
        `;
        orderItemsContainer.appendChild(div);
      });
    })
    .catch(err => console.error('Error loading donations:', err));
}

// Remove an item from DOM
function removeItem(btn) {
  btn.closest('.order-item').remove();
}

// Add a new item from modal
function addItem() {
  const itemName = document.getElementById('itemName').value;
  const itemQty = parseInt(document.getElementById('itemQty').value, 10);

  const div = document.createElement('div');
  div.classList.add('order-item');
  div.innerHTML = `
    <div class="d-flex justify-content-between">
      <div>
        <strong>${itemName}</strong>
        <p class="text-muted">Quantity: ${itemQty}</p>
      </div>
      <span class="remove-btn" onclick="removeItem(this)">🗑️</span>
    </div>
  `;

  orderItemsContainer.appendChild(div);

  // Hide modal
  const modalEl = document.getElementById('addItemModal');
  bootstrap.Modal.getInstance(modalEl).hide();
}

// Save changes to backend
function saveChanges() {
  const items = Array.from(orderItemsContainer.children);

  items.forEach(div => {
    const donationId = div.dataset.donationId; // existing donation
    const food_type = div.querySelector('strong').textContent;
    const quantity = parseInt(div.querySelector('p').textContent.replace('Quantity: ', ''), 10);
    const expiry = div.dataset.expiry || new Date().toISOString().split('T')[0];

    if (donationId) {
      // Update existing donation
      fetch(`${API_BASE}/donor/donations`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ donationId, food_type, quantity, expiry })
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
    } else {
      // Create new donation
      fetch(`${API_BASE}/donor/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ foodType: food_type, quantity, expiry })
      })
      .then(res => res.json())
      .then(data => {
        div.dataset.donationId = data.donationId; // assign new id
      })
      .catch(err => console.error(err));
    }
  });
}

// Confirm button event
confirmBtn.addEventListener('click', () => {
  saveChanges();
  alert('Donations saved successfully!');
});

// Expose addItem globally for modal button
window.addItem = addItem;

// Load donations on page load
document.addEventListener('DOMContentLoaded', loadDonations);
