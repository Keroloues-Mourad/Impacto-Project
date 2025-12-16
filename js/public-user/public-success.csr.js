
const params = new URLSearchParams(window.location.search);
const orderId = params.get('orderId');

const message = document.getElementById('successMessage');

if (orderId) {
  message.innerHTML = `
    Your request has been successfully submitted.<br>
    <strong>Order ID:</strong> ${orderId}<br>
    You will be notified when the donation is ready.
  `;
} else {
  message.innerHTML = `
    Your request has been successfully submitted.<br>
    You will be notified when the donation is ready.
  `;
}
