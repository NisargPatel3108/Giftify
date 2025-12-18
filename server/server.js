import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory 'database'
const users = [];

app.get('/', (req, res) => {
    res.send('Giftify API is running');
});

// Register Endpoint
app.post('/api/register', (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    if (!email || !password || !firstName || !lastName || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = {
        id: users.length + 1,
        firstName,
        lastName,
        email,
        password, // In a real app, hash this!
        role
    };

    users.push(newUser);
    console.log('User registered:', newUser);

    res.status(201).json({ message: 'Registration successful', user: { ...newUser, password: undefined } });
});

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user: { ...user, password: undefined } });
});

// Admin Endpoint: Get all users
app.get('/api/users', (req, res) => {
    // In production, protect this endpoint!
    const safeUsers = users.map(u => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        role: u.role
    }));
    res.json(safeUsers);
});

// Admin Endpoint: Update user role
app.patch('/api/users/:id/role', (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users[userIndex].role = role;
    console.log(`User ${id} role updated to ${role}`);
    
    res.json({ message: 'Role updated successfully', user: users[userIndex] });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
