const API = 'http://localhost:3000/api';
const token = localStorage.getItem('token');
const container = document.getElementById('orders-container');

fetch(`${API}/courier/history`, {
  headers: { Authorization: 'Bearer ' + token }
})
  .then(res => res.json())
  .then(renderHistory)
  .catch(() => {
    container.innerHTML = '<p>Failed to load history</p>';
  });

function renderHistory(list) {
  container.innerHTML = '';

  if (!list.length) {
    container.innerHTML = '<p>No completed deliveries yet</p>';
    return;
  }

  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card-box mb-3';

    const date = new Date(item.created_at).toLocaleString();
    const imageUrl = item.proof_image
      ? `http://localhost:3000/uploads/${item.proof_image}`
      : null;

    card.innerHTML = `
      <h5>Order #${item.id}</h5>
      <p class="mb-1 text-muted">Restaurant: ${item.restaurant}</p>
      <p class="mb-1 text-muted">Type: ${item.food_type} — Qty: ${item.quantity}</p>
      <p class="mb-1"><strong>Delivered At:</strong> ${date}</p>

      ${
        imageUrl
          ? `<img src="${imageUrl}" 
                 class="img-fluid rounded mt-2"
                 style="max-height:200px;cursor:pointer"
                 onclick="window.open('${imageUrl}', '_blank')">`
          : '<p class="text-muted">No proof image</p>'
      }

      ${
        item.proof_notes
          ? `<p class="mt-2"><strong>Notes:</strong> ${item.proof_notes}</p>`
          : ''
      }

      <span class="badge bg-success mt-2">Delivered</span>
    `;

    container.appendChild(card);
  });
}

