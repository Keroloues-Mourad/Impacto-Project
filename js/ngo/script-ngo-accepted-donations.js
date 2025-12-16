const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '../Auth/index-auth-login.html';
}

// Load accepted donations
function loadAcceptedDonations() {
  fetch(`${API_BASE}/ngo/donations/accepted`, {
    headers: { Authorization: 'Bearer ' + token }
  })
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#accepted-donations-table tbody');
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
          <td>${d.restaurant || '-'}</td>
          <td>${d.food_type}</td>
          <td>${d.quantity}</td>
          <td>${new Date(d.accepted_at || d.created_at).toLocaleString()}</td>
          <td>
            ${d.status === 'Delivered'
              ? '<span class="badge bg-success">Delivered</span>'
              : '<span class="badge bg-warning text-dark">Accepted</span>'}
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

// Initialize
document.addEventListener('DOMContentLoaded', loadAcceptedDonations);
