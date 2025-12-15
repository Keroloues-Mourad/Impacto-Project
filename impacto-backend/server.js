const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/protected', require('./routes/protected.routes'));
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/admin.routes'));
app.use('/api', require('./routes/adminDashboard.routes'));
app.use('/api', require('./routes/ngo.routes'));


app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
