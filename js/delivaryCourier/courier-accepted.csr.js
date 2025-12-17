const API = 'http://localhost:3000/api';
const token = localStorage.getItem('token');
const container = document.getElementById('acceptedList');

fetch(`${API}/courier/accepted`, {
  headers: { Authorization: 'Bearer ' + token }
})
  .then(res => res.json())
  .then(renderAccepted)
  .catch(() => {
    container.innerHTML = '<p>Failed to load deliveries</p>';
  });

function renderAccepted(list) {
  container.innerHTML = '';

  if (!list.length) {
    container.innerHTML = '<p>No active deliveries</p>';
    return;
  }

  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card-box mb-3';

    card.innerHTML = `
      <h5>Order #${item.id}</h5>
      <p class="mb-1 text-muted">Pickup: ${item.restaurant}</p>
      <p class="mb-1 text-muted">Type: ${item.food_type} — Qty: ${item.quantity}</p>
      <p class="mb-2"><strong>Status:</strong> <span class="status-onway">On The Way</span></p>
      <div class="d-flex gap-2">
        <button class="btn btn-success" onclick="goToProof(${item.id})">
             Mark Delivered [ Upload Proof Required ! ]
        </button>

      </div>
    `;

    container.appendChild(card);
  });
}

function goToProof(orderId) {
  window.location.href = `courier-delivery-proof.html?id=${orderId}`;
}
