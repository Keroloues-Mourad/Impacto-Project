const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '/Auth/index-auth-login.html';
}

const orderItemsContainer = document.getElementById('orderItems');
const confirmBtn = document.getElementById('confirmBtn');

/* ================= LOAD DONATIONS ================= */
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

        div.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
            <div class="flex-grow-1 me-3">
              <strong>${d.food_type}</strong>

              <input 
                type="number"
                class="form-control quantity-input mt-2"
                value="${d.quantity}"
                min="1"
              >
            </div>

            <span class="remove-btn" title="Delete">🗑️</span>
          </div>
        `;

        // DELETE donation (real DB delete)
        div.querySelector('.remove-btn').addEventListener('click', () => {
          if (!confirm('Delete this donation?')) return;

          fetch(`${API_BASE}/donor/donations/${d.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
            .then(res => res.json())
            .then(() => div.remove());
        });

        orderItemsContainer.appendChild(div);
      });
    })
    .catch(err => console.error(err));
}

/* ================= SAVE CHANGES ================= */
confirmBtn.addEventListener('click', () => {
  const items = Array.from(orderItemsContainer.children);

  items.forEach(div => {
    const donationId = div.dataset.donationId;
    const quantity = parseInt(
      div.querySelector('.quantity-input').value,
      10
    );

    fetch(`${API_BASE}/donor/donations`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        donationId,
        quantity,
        food_type: div.querySelector('strong').textContent,
        expiry: new Date().toISOString().split('T')[0]
      })
    });
  });

  alert('Changes saved successfully');
});

/* ================= INIT ================= */
document.addEventListener('DOMContentLoaded', loadDonations);
