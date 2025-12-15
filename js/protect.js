function protectPage(requiredRole) {
  const token = localStorage.getItem('token');

  // Not logged in
  if (!token) {
    window.location.href = '../Auth/index-auth-login.html';
    return;
  }

  // Check role with backend
  fetch(`http://localhost:3000/api/protected/${requiredRole}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (!res.ok) {
      
        throw new Error('Access denied');
      }
    })
    .catch(() => {
      alert('Unauthorized access');
      localStorage.removeItem('token');
      window.location.href = '../Auth/index-auth-login.html';
    });
}
