const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '../Auth/index-auth-login.html';
}

// ===============================
// Load Dashboard Stats
// ===============================
function loadStats() {
  fetch(`${API_BASE}/ngo/dashboard/stats`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to load stats');
      return res.json();
    })
    .then(data => {
      const cards = document.querySelectorAll('.card-box h3');

      // Order matches your HTML
      cards[0].innerText = data.available ?? 0;
      cards[1].innerText = data.accepted ?? 0;
      cards[2].innerText = data.delivered ?? 0;
    })
    .catch(err => {
      console.error(err);
      alert('Unable to load dashboard stats');
    });
}

// ===============================
// Load Available Donations Table
// ===============================
function loadAvailableDonations() {
  fetch(`${API_BASE}/ngo/donations/available`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to load donations');
      return res.json();
    })
    .then(donations => {
      const tbody = document.querySelector('table tbody');
      tbody.innerHTML = '';

      if (donations.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" class="text-center">No available donations</td>
          </tr>
        `;
        return;
      }

      donations.forEach(d => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
          <td>${d.id}</td>
          <td>${d.restaurant || '-'}</td>
          <td>${d.food_type}</td>
          <td>${d.quantity}</td>
          <td>${new Date(d.expiry).toLocaleDateString()}</td>
          <td>
            <button class="btn btn-sm btn-success" onclick="acceptDonation(${d.id})">
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

// ===============================
// Accept Donation
// ===============================
function acceptDonation(donationId) {
  if (!confirm('Are you sure you want to accept this donation?')) return;

  fetch(`${API_BASE}/ngo/donations/${donationId}/accept`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => res.json())
    .then(() => {
      loadStats();
      loadAvailableDonations();
    })
    .catch(err => {
      console.error(err);
      alert('Failed to accept donation');
    });
}

// ===============================
// Init
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  loadAvailableDonations();
});
