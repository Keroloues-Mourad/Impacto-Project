const API = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

const params = new URLSearchParams(window.location.search);
const orderId = params.get('id');

document.getElementById('donationTitle').innerText = `Order #${orderId}`;

document.getElementById('confirmBtn').addEventListener('click', () => {
  const file = document.getElementById('proofImage').files[0];
  const notes = document.getElementById('notes').value;

  if (!file) {
    alert('Please upload a photo');
    return;
  }

  const formData = new FormData();
  formData.append('proof', file);
  formData.append('notes', notes);

  fetch(`${API}/courier/proof/${orderId}`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    },
    body: formData
  })
    .then(res => res.json())
    .then(() => {
      alert('Delivery confirmed');
      window.location.href = 'courier-delivery-history.html';
    })
    .catch(() => alert('Failed to upload proof'));
});
