const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '../Auth/index-auth-login.html';
}

// Fetch all users
function loadUsers() {
  fetch(`${API_BASE}/admin/users`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
       if (res.status === 401 || res.status === 403) {
           localStorage.removeItem('token');
           window.location.href = '../Auth/index-auth-login.html';
           throw new Error('Unauthorized');
  }
      return res.json();
})

    .then(users => {
      const table = document.getElementById('usersTable');
      table.innerHTML = '';

      users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
            <button onclick="deleteUser(${user.id})">Delete</button>
          </td>
        `;

        table.appendChild(row);
      });
    })
    

}

// Delete user
function deleteUser(id) {
  if (!confirm('Are you sure?')) return;

  fetch(`${API_BASE}/admin/users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => res.json())
    .then(() => loadUsers());
}

// Load users on page load
loadUsers();
