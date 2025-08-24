import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data (in-memory storage for demo)
let users = [
  {
    id: '1',
    username: 'demo',
    email: 'demo@example.com',
    password: 'password123' // In real app, this would be hashed
  }
];

let boards = [
  {
    id: '1',
    name: 'Project Alpha',
    description: 'Main project board',
    tasks: [
      {
        id: '1',
        title: 'Design Homepage',
        description: 'Create homepage design mockups',
        status: 'todo',
        priority: 'high',
        assignee: '1',
        dueDate: '2024-01-15'
      },
      {
        id: '2',
        title: 'Setup Database',
        description: 'Configure MongoDB connection',
        status: 'in-progress',
        priority: 'medium',
        assignee: '1',
        dueDate: '2024-01-20'
      }
    ]
  }
];

// Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword, token: 'demo-token' });
});

app.get('/api/boards', (req, res) => {
  res.json(boards);
});

app.post('/api/tasks', (req, res) => {
  const task = { id: Date.now().toString(), ...req.body };
  boards[0].tasks.push(task);
  res.json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = boards[0].tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  boards[0].tasks[taskIndex] = { ...boards[0].tasks[taskIndex], ...req.body };
  res.json(boards[0].tasks[taskIndex]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
