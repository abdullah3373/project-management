import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Sample user for testing (password: password123)
const sampleUser = {
  id: '1',
  username: 'demo',
  email: 'demo@example.com',
  password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // password123
};

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if (email !== sampleUser.email) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const isMatch = await bcrypt.compare(password, sampleUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: sampleUser.id }, 'your-secret-key', { expiresIn: '1h' });
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = sampleUser;
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register (for testing purposes)
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Just return success for testing
    res.status(201).json({
      id: '2',
      username,
      email,
      createdAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
