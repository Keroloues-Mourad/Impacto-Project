/**
 * profile.csr.js
 * Client-side rendering for profile.html
 * Fetches logged-in user's data from /api/profile and populates the page
 * + Smart Back Button based on user role
 */

const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  // Not logged in → redirect to login
  window.location.href = '../Auth/index-auth-login.html';
}

/**
 * Handle Back button based on role
 */
function handleBackButton(role) {
  const backBtn = document.getElementById('backBtn');
  if (!backBtn) return;

  backBtn.addEventListener('click', () => {
    switch (role) {
      case 'customer':
        window.location.href = '../../public-user/index-public-home.html';
      case 'ngo':
        window.location.href = '../../NGO/ngo-dashboard.html';
        break;
      case 'donor':
        window.location.href = '../../Donors/index-donor-dashboard.html';
        break;

      case 'admin':
        window.location.href = '../../Admin/index-admin-dashborad.html';
        break;

      default:
        window.location.href = '../../index.html';
    }
  });
}

/**
 * Populate profile page with fetched data
 */
function renderProfile(user) {
  // Profile picture
  const profileImg = document.getElementById('profileImg');
  profileImg.src = user.avatar || 'https://via.placeholder.com/140';

  // Display Name
  document.getElementById('displayName').textContent =
    user.display_name || user.full_name || 'No Name';

  // Role
  document.getElementById('roleText').textContent =
    `Role: ${user.role || 'N/A'}`;

  // Full details
  document.getElementById('fullName').textContent = user.full_name || '';
  document.getElementById('email').textContent = user.email || '';
  document.getElementById('phone').textContent = user.phone || '';
  document.getElementById('location').textContent = user.location || '';
  document.getElementById('accountType').textContent = user.role || '';

  // 🔥 Smart Back Button
  handleBackButton(user.role);
}

/**
 * Fetch profile data from backend
 */
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
    .then(renderProfile)
    .catch(err => {
      console.error('Profile fetch error:', err);
      alert('Session expired or unauthorized. Please log in again.');
      localStorage.removeItem('token');
      window.location.href = '../Auth/index-auth-login.html';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', loadProfile);
