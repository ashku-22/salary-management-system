const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
require('dotenv').config();
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, password, role } = req.body;
  
  try {
    // Check if username already exists
    const [existingUsers] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    // Insert new user
    const [result] = await db.query(
      'INSERT INTO users (username, password, role, join_date) VALUES (?, ?, ?, CURDATE())',
      [username, password, role || 'employee']
    );
    
    res.status(201).json({ 
      message: 'Account created successfully',
      userId: result.insertId 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login endpoint
app.post('/login.php', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const [users] = await db.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );
    
    if (users.length > 0) {
      const user = users[0];
      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
        join_date: user.join_date
      };
      res.redirect('/index.html');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error');
  }
});

// Get user info endpoint
app.get('/get_user_info.php', (req, res) => {
  if (req.session.user) {
    res.json({
      username: req.session.user.username,
      role: req.session.user.role,
      join_date: req.session.user.join_date
    });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const [employees] = await db.query('SELECT * FROM employees WHERE status = "active" ORDER BY id DESC');
    res.json(employees);
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single employee
app.get('/api/employees/:id', async (req, res) => {
  try {
    const [employees] = await db.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
    if (employees.length > 0) {
      res.json(employees[0]);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error('Get employee error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new employee
app.post('/api/employees', async (req, res) => {
  try {
    const { name, position, department, salary, phone, email } = req.body;
    const [result] = await db.query(
      'INSERT INTO employees (name, position, department, salary, phone, email, hire_date, status) VALUES (?, ?, ?, ?, ?, ?, CURDATE(), "active")',
      [name, position, department, parseFloat(salary), phone || null, email || null]
    );
    
    const [newEmployee] = await db.query('SELECT * FROM employees WHERE id = ?', [result.insertId]);
    res.status(201).json(newEmployee[0]);
  } catch (error) {
    console.error('Add employee error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update employee
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { name, position, department, salary, phone, email } = req.body;
    const [result] = await db.query(
      'UPDATE employees SET name = ?, position = ?, department = ?, salary = ?, phone = ?, email = ? WHERE id = ?',
      [name, position, department, parseFloat(salary), phone || null, email || null, req.params.id]
    );
    
    if (result.affectedRows > 0) {
      const [updatedEmployee] = await db.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
      res.json(updatedEmployee[0]);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error('Update employee error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete employee (soft delete)
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const [result] = await db.query('UPDATE employees SET status = "inactive" WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows > 0) {
      res.json({ message: 'Employee deleted successfully' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all salaries
app.get('/api/salaries', async (req, res) => {
  try {
    const [salaries] = await db.query(
      'SELECT s.*, e.name as employee_name FROM salaries s JOIN employees e ON s.employee_id = e.id ORDER BY s.id DESC'
    );
    res.json(salaries);
  } catch (error) {
    console.error('Get salaries error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get salary by employee
app.get('/api/salaries/employee/:id', async (req, res) => {
  try {
    const [salaries] = await db.query(
      'SELECT * FROM salaries WHERE employee_id = ? ORDER BY id DESC',
      [req.params.id]
    );
    res.json(salaries);
  } catch (error) {
    console.error('Get employee salaries error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add salary record
app.post('/api/salaries', async (req, res) => {
  try {
    const { employee_id, month, base_salary, bonus, deductions } = req.body;
    const net_salary = parseFloat(base_salary) + parseFloat(bonus || 0) - parseFloat(deductions || 0);
    
    const [result] = await db.query(
      'INSERT INTO salaries (employee_id, month, base_salary, bonus, deductions, net_salary, payment_date, status) VALUES (?, ?, ?, ?, ?, ?, CURDATE(), "paid")',
      [parseInt(employee_id), month, parseFloat(base_salary), parseFloat(bonus || 0), parseFloat(deductions || 0), net_salary]
    );
    
    const [newSalary] = await db.query('SELECT * FROM salaries WHERE id = ?', [result.insertId]);
    res.status(201).json(newSalary[0]);
  } catch (error) {
    console.error('Add salary error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout endpoint
app.post('/logout.php', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out successfully' });
});

// Dashboard stats endpoint
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const [employeeCount] = await db.query('SELECT COUNT(*) as count FROM employees WHERE status = "active"');
    const [salarySum] = await db.query('SELECT SUM(net_salary) as total FROM salaries');
    const [avgSalaryResult] = await db.query('SELECT AVG(salary) as avg FROM employees WHERE status = "active"');
    const [recentPayments] = await db.query(
      'SELECT s.*, e.name as employee_name FROM salaries s JOIN employees e ON s.employee_id = e.id ORDER BY s.id DESC LIMIT 5'
    );
    
    res.json({
      totalEmployees: employeeCount[0].count,
      totalSalaryPaid: salarySum[0].total || 0,
      avgSalary: parseFloat(avgSalaryResult[0].avg || 0).toFixed(2),
      recentPayments
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Insert seed data endpoint (for testing)
app.post('/api/insert-seed-data', async (req, res) => {
  try {
    // Insert sample employees
    await db.query(`
      INSERT IGNORE INTO employees (name, position, department, salary, phone, email, hire_date, status) VALUES
      ('John Doe', 'Software Engineer', 'IT', 75000.00, '555-0101', 'john.doe@company.com', '2024-01-15', 'active'),
      ('Jane Smith', 'HR Manager', 'HR', 65000.00, '555-0102', 'jane.smith@company.com', '2024-02-01', 'active'),
      ('Michael Johnson', 'Financial Analyst', 'Finance', 70000.00, '555-0103', 'michael.j@company.com', '2024-02-15', 'active'),
      ('Emily Davis', 'Marketing Specialist', 'Marketing', 60000.00, '555-0104', 'emily.d@company.com', '2024-03-01', 'active'),
      ('Robert Brown', 'Operations Manager', 'Operations', 72000.00, '555-0105', 'robert.b@company.com', '2024-03-15', 'active')
    `);
    
    res.json({ success: true, message: 'Sample employees added successfully!' });
  } catch (error) {
    console.error('Error inserting seed data:', error);
    res.status(500).json({ error: 'Failed to insert seed data' });
  }
});

// Serve combined page for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Salary Management System Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving frontend from: ${path.join(__dirname, '../frontend')}`);
  console.log(`\n👤 Test credentials:`);
  console.log(`   Admin: username='admin', password='admin123'`);
  console.log(`   Employee: username='employee1', password='emp123'`);
});
