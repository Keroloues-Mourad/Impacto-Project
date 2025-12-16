

const API_BASE = 'http://localhost:3000/api';
const token = localStorage.getItem('token');


if (!token) {
  window.location.href = '../Auth/index-auth-login.html';
}

/**
 * Load available donations
 */
function loadDonations() {
  fetch(`${API_BASE}/public/donations`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(handleResponse)
    .then(renderDonations)
    .catch(handleAuthError);
}

/**
 * Render donation cards
 */
function renderDonations(donations) {
  const container = document.getElementById('donationsContainer');
  container.innerHTML = '';

  if (!donations || donations.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center">
        <p>No available food donations at the moment.</p>
      </div>
    `;
    return;
  }

  donations.forEach(donation => {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    col.innerHTML = `
      <div class="card-box">
        <img 
          src="https://via.placeholder.com/350x200"
          class="food-img"
          alt="Food Donation"
        />

        <h5 class="mt-3">${donation.food_type}</h5>
        <p>
          Quantity: ${donation.quantity}<br>
          From: ${donation.restaurant_name}<br>
          Expiry: ${donation.expiry}
        </p>

        <a 
          class="btn btn-main w-100"
          href="./index-public-item-details.html?id=${donation.id}"
        >
          View Details
        </a>
      </div>
    `;
    container.appendChild(col);
  });
}

/**
 * Helpers
 */
function handleResponse(res) {
  if (!res.ok) {
    throw new Error('Unauthorized');
  }
  return res.json();
}

function handleAuthError() {
  alert('Session expired or unauthorized');
  localStorage.removeItem('token');
  window.location.href = '../Auth/index-auth-login.html';
}

/**
 * Init
 */
document.addEventListener('DOMContentLoaded', loadDonations);
