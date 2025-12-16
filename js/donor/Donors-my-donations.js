const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '/Auth/index-auth-login.html';
}

fetch(`${API_BASE}/donor/donations`, {
  headers: {
    Authorization: 'Bearer ' + token
  }
})
  .then(res => res.json())
  .then(donations => {
    const tbody = document.getElementById('myDonations');
    tbody.innerHTML = '';

    if (!donations.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center">No donations yet</td>
        </tr>
      `;
      return;
    }

    donations.forEach(d => {
      let badgeClass = 'badge-pending';
      let statusText = 'Pending';

      if (d.status === 'Accepted') {
        badgeClass = 'badge-accepted';
        statusText = 'Accepted';
      }

      if (d.status === 'Delivered') {
        badgeClass = 'badge-rejected';
        statusText = 'Delivered';
      }

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>#${d.id}</td>
        <td>${d.food_type}</td>
        <td>${d.quantity}</td>
        <td>${d.ngo_name || '—'}</td>
        <td><span class="badge ${badgeClass}">${statusText}</span></td>
        <td>${new Date(d.created_at).toISOString().split('T')[0]}</td>
      `;

      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error(err);
    alert('Failed to load your donations');
  });
