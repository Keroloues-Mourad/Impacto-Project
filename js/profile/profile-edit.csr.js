/**
 * profile-edit.csr.js
 * Client-side rendering for profile-edit.html
 * Fetches logged-in user's data and handles profile updates
 */

const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '../Auth/index-auth-login.html';
}

// Elements
const editForm = document.getElementById('editForm');
const previewImg = document.getElementById('previewImg');
const imgInput = document.getElementById('imgInput');

// Populate form with current profile data
function renderEditForm(user) {
  previewImg.src = user.avatar || 'https://via.placeholder.com/140';
  document.getElementById('displayName').value = user.display_name || '';
  document.getElementById('fullName').value = user.full_name || '';
  document.getElementById('email').value = user.email || '';
  document.getElementById('phone').value = user.phone || '';
  document.getElementById('location').value = user.location || '';
}

// Fetch profile data
function loadProfile() {
  fetch(`${API_BASE}/profile`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch profile');
      return res.json();
    })
    .then(renderEditForm)
    .catch(err => {
      console.error('Profile fetch error:', err);
      alert('Session expired or unauthorized. Please log in again.');
      localStorage.removeItem('token');
      window.location.href = '../Auth/index-auth-login.html';
    });
}

// Preview image before upload
imgInput.addEventListener('change', function () {
  const file = imgInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    previewImg.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

// Submit updated profile
editForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    display_name: document.getElementById('displayName').value,
    full_name: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    location: document.getElementById('location').value,
    avatar: previewImg.src  // Can store base64 or URL
  };

  fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(result => {
      if (result.message) {
        alert(result.message);
        // Redirect back to profile page
        window.location.href = './profile.html';
      }
    })
    .catch(err => {
      console.error('Profile update error:', err);
      alert('Failed to update profile. Try again.');
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', loadProfile);
