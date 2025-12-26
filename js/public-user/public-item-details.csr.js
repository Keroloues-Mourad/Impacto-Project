const API_BASE = 'http://127.0.0.1:3000/api';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '../Auth/index-auth-login.html';
}

function getDonationId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function loadDonationDetails() {
  const donationId = getDonationId();
  if (!donationId) return;

  fetch(`${API_BASE}/public/donations/${donationId}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => res.json())
    .then(renderDetails)
    .catch(() => {
      alert('Failed to load donation details');
    });
}

function renderDetails(donation) {
  const imgEl = document.getElementById('donationImage');
  const foodTypeEl = document.getElementById('foodType');
  const restaurantEl = document.getElementById('restaurantName');
  const quantityEl = document.getElementById('quantity');
  const expiryEl = document.getElementById('expiry');
  const descEl = document.getElementById('description');

  imgEl.src = `http://127.0.0.1:3000/uploads/${donation.image}`;

  foodTypeEl.textContent = donation.food_type;
  restaurantEl.textContent = donation.restaurant_name;
  quantityEl.textContent = donation.quantity;
  expiryEl.textContent = donation.expiry;

  descEl.textContent = donation.notes
    ? donation.notes
    : 'No additional description provided.';

  // Update the "Request This Donation" button to include the donation ID
  const requestBtn = document.getElementById('requestBtn');
  requestBtn.href = `./index-public-checkout.html?id=${donation.id}`;
}

document.addEventListener('DOMContentLoaded', loadDonationDetails);
