function saveProfile(e) {
  e.preventDefault();

  const token = localStorage.getItem('token');

  fetch('http://localhost:3000/api/me', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      name: fullName.value,
      email: email.value,
      phone: phone.value,
      address: address.value
    })
  })
  .then(res => {
    if (!res.ok) throw new Error();
    window.location.href = './index-public-profile.html';
  })
  .catch(() => alert('Failed to save profile'));
}
