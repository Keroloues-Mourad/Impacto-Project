const API = 'http://localhost:3000/api';
const token = localStorage.getItem('token');
const table = document.getElementById('ngosTable');

fetch(`${API}/admin/ngos`, {
  headers: { Authorization: 'Bearer ' + token }
})
  .then(res => res.json())
  .then(renderNgos)
  .catch(() => {
    table.innerHTML = `<tr><td colspan="6">Failed to load NGOs</td></tr>`;
  });

function renderNgos(list) {
  table.innerHTML = '';

  if (!list.length) {
    table.innerHTML = `<tr><td colspan="6">No NGOs found</td></tr>`;
    return;
  }

  list.forEach(ngo => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${ngo.id}</td>
      <td>${ngo.name || '-'}</td>
      <td>${ngo.email}</td>
      <td><span class="badge bg-success">Active</span></td>
      <td>${ngo.accepted}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="deleteNgo(${ngo.id})">
          Delete
        </button>
      </td>
    `;

    table.appendChild(tr);
  });
}

function deleteNgo(id) {
  if (!confirm('Delete this NGO?')) return;

  fetch(`${API}/admin/ngos/${id}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + token }
  })
    .then(() => location.reload())
    .catch(() => alert('Failed to delete NGO'));
}
