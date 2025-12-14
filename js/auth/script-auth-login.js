function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.token) {
        alert('Invalid credentials');
        return;
      }

      localStorage.setItem('token', data.token);

      if (role === "admin") window.location.href = "../../Admin/index-admin-dashborad.html";
      if (role === "donor") window.location.href = "../../Donors/Donors-dashboard.html";
      if (role === "ngo") window.location.href = "../../NGO/ngo-dashboard.html";
      if (role === "customer") window.location.href = "../../Public-User/index-public-home.html";
      if (role === "courier") window.location.href = "../../Delivary-Courier/courier-dashboard.html";
    });
}
