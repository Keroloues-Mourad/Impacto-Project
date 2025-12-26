const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '/Auth/index-auth-login.html';
}

const form = document.getElementById('donationForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const donorType = document.getElementById('donorType').value;
  const foodType = document.getElementById('foodType').value;
  const quantity = document.getElementById('quantity').value;
  const expiry = document.getElementById('expiry').value;
  const notes = document.getElementById('notes').value;
  const imageFile = document.getElementById('foodImg').files[0];

  // ✅ FIXED validation (this caused your alert before)
  if (!donorType || !foodType || !quantity || !expiry) {
    alert('All required fields must be filled.');
    return;
  }

  const formData = new FormData();
  formData.append('donorType', donorType);
  formData.append('foodType', foodType);
  formData.append('quantity', quantity);
  formData.append('expiry', expiry);
  formData.append('notes', notes || '');

  if (imageFile) {
    formData.append('foodImage', imageFile);
  }

  try {
    const response = await fetch(`${API_BASE}/donor/donations`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
        // ❌ DO NOT set Content-Type
      },
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Failed to create donation');
      return;
    }

    alert('Donation created successfully!');
    window.location.href = './Donors-dashboard.html';

  } catch (error) {
    console.error(error);
    alert('Server error');
  }
});
