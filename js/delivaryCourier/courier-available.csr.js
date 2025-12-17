const API = 'http://localhost:3000/api';
const token = localStorage.getItem('token');
const container = document.getElementById('availableList');

fetch(`${API}/courier/available`, {
  headers: { Authorization: 'Bearer ' + token }
})
  .then(res => res.json())
  .then(renderAvailable)
  .catch(() => {
    container.innerHTML = '<p>Failed to load deliveries</p>';
  });

function renderAvailable(list) {
  container.innerHTML = '';

  if (!list.length) {
    container.innerHTML = '<p>No available deliveries</p>';
    return;
  }

  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card-box mb-3';

    card.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h5>#${item.id} — ${item.restaurant}</h5>
          <p class="mb-0 text-muted">Pickup: ${item.restaurant}</p>
          <small class="text-muted">Type: ${item.food_type} — Qty: ${item.quantity}</small>
        </div>
        <div class="text-end">
          <button class="btn btn-success me-2" onclick="acceptDelivery(${item.id})">Accept</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function acceptDelivery(orderId) {
  if (!confirm('Accept this delivery?')) return;

  fetch(`${API}/courier/accept/${orderId}`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token }
  })
    .then(res => res.json())
    .then(() => {
      alert('Delivery accepted');
      location.reload();
    })
    .catch(() => alert('Failed to accept delivery'));
}
