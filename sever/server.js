const users = require('../src/users_profile');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

const secretKey = 'your-secret-key';

app.post('/api/login',async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  // Check if the user exists
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  console.log('361')
  console.log(password)
  console.log(user.password)


  // Check if the password matches
  if (bcrypt.compareSync(password, user.password)) {
    // Generate JWT token
    const token = jwt.sign({ sub: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
    // Send the token as the response
    return res.json({ token });
  }else{
    res.status(401).json({ error: 'Invalid username or password' });
  }
  
});
app.listen(5000, () => {
  console.log('Server started on port 3000');
});