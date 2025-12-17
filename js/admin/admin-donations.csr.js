const API = 'http://localhost:3000/api';
const token = localStorage.getItem('token');
const body = document.getElementById('donationsBody');

fetch(`${API}/admin/donations`, {
  headers: { Authorization: 'Bearer ' + token }
})
  .then(res => res.json())
  .then(renderDonations)
  .catch(() => {
    body.innerHTML = `<tr><td colspan="7">Failed to load donations</td></tr>`;
  });

function renderDonations(list) {
  body.innerHTML = '';

  if (!list.length) {
    body.innerHTML = `<tr><td colspan="7">No donations found</td></tr>`;
    return;
  }

  list.forEach(d => {
    const tr = document.createElement('tr');

    const badge =
      d.status === 'Pending' ? 'bg-warning' :
      d.status === 'Approved' ? 'bg-success' :
      'bg-secondary';

    tr.innerHTML = `
      <td>#${d.order_id}</td>
      <td>${d.restaurant}</td>
      <td>${d.food_type}</td>
      <td>${d.quantity}</td>
      <td><span class="badge ${badge}">${d.status}</span></td>
      <td>${new Date(d.created_at).toLocaleDateString()}</td>
      <td>
        ${
          d.status === 'Pending'
            ? `<button class="btn btn-sm btn-success" onclick="approve(${d.order_id})">Approve</button>`
            : ''
        }
      </td>
    `;

    body.appendChild(tr);
  });
}

function approve(orderId) {
  if (!confirm('Approve this donation?')) return;

  fetch(`${API}/admin/donations/approve/${orderId}`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token }
  })
    .then(res => res.json())
    .then(() => {
      alert('Donation approved');
      location.reload();
    })
    .catch(() => alert('Failed to approve'));
}
