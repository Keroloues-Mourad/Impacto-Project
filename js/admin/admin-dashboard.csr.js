const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  redirectToLogin();
}


function loadStats() {
  fetch(`${API_BASE}/admin/stats`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(handleResponse)
    .then(stats => {
      document.getElementById('totalDonations').innerText = stats.totalDonations;
      document.getElementById('lastOrders').innerText = stats.lastOrders;
      document.getElementById('totalNgos').innerText = stats.totalNgos;
      document.getElementById('activeCouriers').innerText = stats.activeCouriers;
    })
    .catch(handleAuthError);
}


function loadRecentDonations() {
  fetch(`${API_BASE}/admin/recent-donations`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(handleResponse)
    .then(renderRecentDonations)
    .catch(handleAuthError);
}


function renderRecentDonations(donations) {
  const table = document.getElementById('recentDonationsTable');
  table.innerHTML = '';

  if (donations.length === 0) {
    table.innerHTML = `
      <tr>
        <td colspan="6" class="text-center">No donations found</td>
      </tr>
    `;
    return;
  }

  donations.forEach(donation => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>#${donation.id}</td>
      <td>${donation.restaurant_name}</td>
      <td>${donation.food_type}</td>
      <td>${donation.quantity}</td>
      <td>${donation.status}</td>
      <td>${new Date(donation.created_at).toLocaleDateString()}</td>
    `;

    table.appendChild(row);
  });
}


function handleResponse(res) {
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}

function handleAuthError() {
  alert('Session expired or unauthorized');
  localStorage.removeItem('token');
  redirectToLogin();
}

function redirectToLogin() {
  window.location.href = '../Auth/index-auth-login.html';
}


document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  loadRecentDonations();
});
