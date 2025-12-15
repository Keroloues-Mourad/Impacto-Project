const API = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '../Auth/index-auth-login.html';
}

function loadAcceptedDonations() {
  fetch(`${API}/ngo/donations/accepted`, {
    headers: { Authorization: 'Bearer ' + token }
  })
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('tbody');
      tbody.innerHTML = '';

      if (data.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" class="text-center">No accepted donations</td>
          </tr>
        `;
        return;
      }

      data.forEach(d => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${d.id}</td>
          <td>${d.restaurant}</td>
          <td>${d.food_type}</td>
          <td>${d.quantity}</td>
          <td>${d.expiry}</td>
          <td>
            <button class="btn btn-sm btn-primary"
              onclick="markDelivered(${d.id})">
              Mark Delivered
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error(err);
      alert('Unable to load accepted donations');
    });
}

function markDelivered(id) {
  if (!confirm('Mark this donation as delivered?')) return;

  fetch(`${API}/ngo/donations/${id}/deliver`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token }
  })
    .then(res => res.json())
    .then(() => loadAcceptedDonations());
}

loadAcceptedDonations();
