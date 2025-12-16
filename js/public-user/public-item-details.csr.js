const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

// Get donation ID from URL
const params = new URLSearchParams(window.location.search);
const donationId = params.get('id');

if (!token || !donationId) {
  window.location.href = './index-public-home.html';
}

/**
 * Load donation details
 */
fetch(`${API_BASE}/public/donations/${donationId}`, {
  headers: {
    Authorization: 'Bearer ' + token
  }
})
  .then(res => {
    if (!res.ok) throw new Error('Not found');
    return res.json();
  })
  .then(donation => {
    document.getElementById('foodType').innerText = donation.food_type;
    document.getElementById('restaurantName').innerText = donation.restaurant_name;
    document.getElementById('quantity').innerText = donation.quantity;
    document.getElementById('expiry').innerText = donation.expiry;

    // Optional description (derived)
    document.getElementById('description').innerText =
      `Fresh ${donation.food_type} donated by ${donation.restaurant_name}.`;

    // Pass donation id to checkout
    document.getElementById('requestBtn').href =
      `./index-public-checkout.html?id=${donation.id}`;
  })
  .catch(() => {
    alert('Donation not found');
    window.location.href = './index-public-home.html';
  });