
STEP A — API CONTRACT (API-FIRST ARCHITECTURE)
=============================================

This file documents the API contract.
It contains NO code and changes NOTHING in frontend or backend logic.

Location:
backend/docs/api.contract.md

--------------------------------------------------
ARCHITECTURE RULES
--------------------------------------------------
- Backend: Node.js + Express
- Backend returns JSON only
- No HTML rendering in backend
- Frontend: plain HTML, CSS, JS
- Communication via fetch()
- Client-Side Rendering (CSR)
- SQLite database
- Stateless backend (JWT)

--------------------------------------------------
AUTH (ALREADY IMPLEMENTED)
--------------------------------------------------
POST /api/auth/register
POST /api/auth/login

--------------------------------------------------
USER APIs
--------------------------------------------------

GET /api/me
Auth: JWT
Response:
{
  "id": 1,
  "name": "User Name",
  "email": "user@mail.com",
  "role": "donor"
}

PUT /api/me
Auth: JWT
Body:
{
  "name": "New Name",
  "email": "new@mail.com"
}

PUT /api/me/password
Auth: JWT
Body:
{
  "currentPassword": "old",
  "newPassword": "new"
}

DELETE /api/me
Auth: JWT

--------------------------------------------------
ADMIN APIs
--------------------------------------------------

GET /api/admin/users
Auth: JWT
Role: admin

DELETE /api/admin/users/:id
Auth: JWT
Role: admin

--------------------------------------------------
END OF STEP A
--------------------------------------------------
