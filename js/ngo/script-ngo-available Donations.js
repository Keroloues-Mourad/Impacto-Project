const API = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '../Auth/index-auth-login.html';
}

// Load available donations
function loadAvailableDonations() {
  fetch(`${API}/ngo/donations/available`, {
    headers: { Authorization: 'Bearer ' + token }
  })
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('availableDonationsTable');
      tbody.innerHTML = '';

      if (data.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" class="text-center">No available donations</td>
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
          <td>${new Date(d.expiry).toLocaleDateString()}</td>
          <td>
            <button class="btn btn-success btn-sm" onclick="acceptDonation(${d.id})">
              Accept
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error(err);
      alert('Unable to load available donations');
    });
}

// Accept a donation
function acceptDonation(donationId) {
  if (!confirm('Do you want to accept this donation?')) return;

  fetch(`${API}/ngo/donations/${donationId}/accept`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token }
  })
    .then(res => res.json())
    .then(() => {
      loadAvailableDonations(); // refresh table
    })
    .catch(err => {
      console.error(err);
      alert('Failed to accept donation');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', loadAvailableDonations);
