function protectPage(requiredRoles) {
  const token = localStorage.getItem('token');

  // Not logged in
  if (!token) {
    window.location.href = '../Auth/index-auth-login.html';
    return;
  }

  try {
    // Decode JWT payload
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userRole = payload.role;

    // Normalize roles to array
    const allowedRoles = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];

    // Role not allowed
    if (!allowedRoles.includes(userRole)) {
      throw new Error('Access denied');
    }

  } catch (err) {
    alert('Unauthorized access');
    localStorage.removeItem('token');
    window.location.href = '../Auth/index-auth-login.html';
  }
}
