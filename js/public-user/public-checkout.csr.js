
const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

const params = new URLSearchParams(window.location.search);
const donationId = params.get('id');

if (!token || !donationId) {
  window.location.href = './index-public-home.html';
}

// Load donation summary
fetch(`${API_BASE}/public/donations/${donationId}`, {
  headers: { Authorization: 'Bearer ' + token }
})
  .then(res => res.json())
  .then(donation => {
    document.getElementById('foodType').innerText = donation.food_type;
    document.getElementById('availableQty').innerText = donation.quantity;
    document.getElementById('restaurantName').innerText = donation.restaurant_name;
  });

// Confirm order
document.getElementById('confirmBtn').addEventListener('click', () => {
  const quantity = document.getElementById('requestQty').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;

  fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      donationId,
      quantity,
      phone,
      address
    })
  })
    .then(res => res.json())
    .then(data => {
       window.location.href = `./index-public-success.html?orderId=${data.orderId}`;
    })
    .catch(() => alert('Order failed'));
});
