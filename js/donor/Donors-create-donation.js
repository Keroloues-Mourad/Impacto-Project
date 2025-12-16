const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '/Auth/index-auth-login.html';
}

const form = document.getElementById('donationForm');

form.addEventListener('submit', e => {
  e.preventDefault();

  const foodType = document.getElementById('foodType').value;
  const quantity = document.getElementById('quantity').value;
  const expiry = document.getElementById('expiry').value;

  if (!foodType || !quantity || !expiry) {
    alert('Please fill all required fields');
    return;
  }

  fetch(`${API_BASE}/donor/donations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      foodType,
      quantity,
      expiry
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      window.location.href = './Donors-dashboard.html';
    })
    .catch(err => {
      console.error(err);
      alert('Failed to create donation');
    });
});
