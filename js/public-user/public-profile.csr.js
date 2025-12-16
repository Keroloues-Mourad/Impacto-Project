const token = localStorage.getItem('token');

fetch('http://localhost:3000/api/me', {
  headers: { Authorization: 'Bearer ' + token }
})
.then(res => res.json())
.then(data => {
  document.getElementById('profileName').innerText = data.name;
  document.getElementById('profileRole').innerText = data.role;
  document.getElementById('name').innerText = data.name;
  document.getElementById('email').innerText = data.email;
  document.getElementById('phone').innerText = data.phone || '—';
  document.getElementById('address').innerText = data.address || '—';
});
