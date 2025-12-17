const API = 'http://localhost:3000/api';
const token = localStorage.getItem('token');
const table = document.getElementById('restaurantsTable');

fetch(`${API}/admin/restaurants`, {
  headers: { Authorization: 'Bearer ' + token }
})
  .then(res => res.json())
  .then(renderRestaurants)
  .catch(() => {
    table.innerHTML = `<tr><td colspan="6">Failed to load restaurants</td></tr>`;
  });

function renderRestaurants(list) {
  table.innerHTML = '';

  if (!list.length) {
    table.innerHTML = `<tr><td colspan="6">No restaurants found</td></tr>`;
    return;
  }

  list.forEach(r => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${r.id}</td>
      <td>${r.name || '-'}</td>
      <td>${r.email}</td>
      <td><span class="badge bg-success">Active</span></td>
      <td>${r.donations}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="deleteRestaurant(${r.id})">
          Delete
        </button>
      </td>
    `;

    table.appendChild(tr);
  });
}

function deleteRestaurant(id) {
  if (!confirm('Delete this restaurant?')) return;

  fetch(`${API}/admin/restaurants/${id}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + token }
  })
    .then(() => location.reload())
    .catch(() => alert('Failed to delete restaurant'));
}
