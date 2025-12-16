
const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '../Auth/index-auth-login.html';
}

fetch(`${API_BASE}/orders/my`, {
  headers: {
    Authorization: 'Bearer ' + token
  }
})
  .then(res => res.json())
  .then(renderRequests)
  .catch(() => {
    alert('Failed to load requests');
  });

function renderRequests(orders) {
  const table = document.getElementById('requestsTable');
  table.innerHTML = '';

  if (!orders || orders.length === 0) {
    table.innerHTML = `
      <tr>
        <td colspan="5" class="text-center">No requests yet</td>
      </tr>
    `;
    return;
  }

  orders.forEach(order => {
    const badgeClass =
      order.status === 'Pending' ? 'badge-pending' :
      order.status === 'Approved' ? 'badge-approved' :
      'badge-delivered';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>#${order.id}</td>
      <td>${order.food_type}</td>
      <td>${order.quantity}</td>
      <td><span class="badge ${badgeClass}">${order.status}</span></td>
      <td>${new Date(order.created_at).toLocaleDateString()}</td>
    `;
    table.appendChild(row);
  });
}
