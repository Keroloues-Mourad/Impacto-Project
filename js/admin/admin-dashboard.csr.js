const API = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

fetch(`${API}/admin/dashboard`, {
  headers: {
    Authorization: 'Bearer ' + token
  }
})
  .then(res => {
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  })
  .then(data => {
    document.getElementById('totalDonations').innerText = data.totalDonations;
    document.getElementById('lastOrders').innerText = data.lastOrders;
    document.getElementById('totalNgos').innerText = data.totalNgos;
    document.getElementById('activeCouriers').innerText = data.activeCouriers;

    const table = document.getElementById('recentDonationsTable');
    table.innerHTML = '';

    if (!data.recentDonations.length) {
      table.innerHTML = `<tr><td colspan="6">No donations yet</td></tr>`;
      return;
    }

    data.recentDonations.forEach(d => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>#${d.id}</td>
        <td>${d.restaurant}</td>
        <td>${d.food_type}</td>
        <td>${d.quantity}</td>
        <td>${d.status}</td>
        <td>${new Date(d.created_at).toLocaleDateString()}</td>
      `;
      table.appendChild(tr);
    });
  })
  .catch(() => {
    alert('Failed to load admin dashboard');
  });
