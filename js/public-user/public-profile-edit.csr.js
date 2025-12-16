function saveProfile(event) {
  event.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '../Auth/index-auth-login.html';
    return;
  }

  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();

  fetch('http://localhost:3000/api/me', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      address
    })
  })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(() => {
      window.location.href = './index-public-profile.html';
    })
    .catch(() => {
      alert('Failed to save profile');
    });
}
