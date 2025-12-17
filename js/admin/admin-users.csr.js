const API = 'http://localhost:3000/api';
const token = localStorage.getItem('token');
const table = document.getElementById('usersTable');

fetch(`${API}/admin/users`, {
  headers: { Authorization: 'Bearer ' + token }
})
  .then(res => {
    if (!res.ok) throw new Error();
    return res.json();
  })
  .then(renderUsers)
  .catch(() => {
    table.innerHTML = `<tr><td colspan="5">Failed to load users</td></tr>`;
  });

function renderUsers(users) {
  table.innerHTML = '';

  if (!users.length) {
    table.innerHTML = `<tr><td colspan="5">No users found</td></tr>`;
    return;
  }

  users.forEach(user => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name || '-'}</td>
      <td>${user.email}</td>
      <td>
        <span class="badge bg-secondary">${user.role}</span>
      </td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">
          Delete
        </button>
      </td>
    `;

    table.appendChild(tr);
  });
}

function deleteUser(id) {
  if (!confirm('Delete this user?')) return;

  fetch(`${API}/admin/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + token }
  })
    .then(res => res.json())
    .then(() => {
      alert('User deleted');
      location.reload();
    })
    .catch(() => alert('Failed to delete user'));
}
