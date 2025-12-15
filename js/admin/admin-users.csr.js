const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

// Extra guard (protect.js already does this, but safe)
if (!token) {
  redirectToLogin();
}

/**
 * Load all users (ADMIN ONLY)
 */
function loadUsers() {
  fetch(`${API_BASE}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(handleAuthResponse)
    .then(users => renderUsers(users))
    .catch(handleNonAuthError);
}

/**
 * Render users into the table
 */
function renderUsers(users) {
  const table = document.getElementById('usersTable');
  table.innerHTML = '';

  if (!users || users.length === 0) {
    table.innerHTML = `
      <tr>
        <td colspan="5" class="text-center">No users found</td>
      </tr>
    `;
    return;
  }

  users.forEach(user => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <button class="btn btn-sm btn-danger"
                onclick="deleteUser(${user.id})">
          Delete
        </button>
      </td>
    `;

    table.appendChild(row);
  });
}


function deleteUser(userId) {
  if (!confirm('Are you sure you want to delete this user?')) return;

  fetch(`${API_BASE}/admin/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(handleAuthResponse)
    .then(() => loadUsers())
    .catch(handleNonAuthError);
}


function handleAuthResponse(res) {

  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem('token');
    redirectToLogin();
    throw new Error('Unauthorized');
  }


  if (!res.ok) {
    throw new Error('Server error');
  }

  return res.json();
}


/*
 function handleNonAuthError(error) {
   console.error(error);
   alert('Something went wrong. Please try again.');
}*/

/**
 * Redirect helper
 */
function redirectToLogin() {
  window.location.href = '../Auth/index-auth-login.html';
}

// Initial load
document.addEventListener('DOMContentLoaded', loadUsers);
