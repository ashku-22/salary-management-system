# Salary Management System

A modern full-stack web application for managing employee salaries, built with **Node.js/Express** backend and **MySQL** database.

## Features

- 🔐 **User Authentication** - Login system with session management
- 👥 **Employee Management** - Add, update, view, and delete employees
- 💰 **Salary Processing** - Track salary payments with bonuses and deductions
- 📊 **Dashboard Analytics** - View statistics and recent payments
- 🎨 **Modern UI** - Beautiful responsive design with TailwindCSS
- 🗄️ **Database Integration** - MySQL database with proper relationships

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Frontend**: HTML5, TailwindCSS, Vanilla JavaScript
- **Session Management**: express-session
- **Security**: bcrypt for password hashing

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) (v5.7 or higher)
- npm (comes with Node.js)

## Installation & Setup

### 1. Clone the Repository

```bash
cd "Salary management/Salary-Management-System"
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Configure Database

**Option A: Using MySQL Command Line**

```bash
mysql -u root -p < ../database/schema.sql
mysql -u root -p < ../database/seed_data.sql
```

**Option B: Using MySQL Workbench or phpMyAdmin**

1. Open MySQL Workbench or phpMyAdmin
2. Create a new database named `salary_management_db`
3. Import `database/schema.sql`
4. Import `database/seed_data.sql`

### 4. Configure Environment Variables

The `.env` file is already created in the backend folder. Update it with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=salary_management_db
DB_PORT=3306

PORT=3000
NODE_ENV=development

SESSION_SECRET=your-secret-key-here
```

### 5. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### 6. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Default Login Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Employee Account:**
- Username: `employee1`
- Password: `emp123`

## Project Structure

```
Salary-Management-System/
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection configuration
│   ├── node_modules/            # Dependencies
│   ├── .env                     # Environment variables
│   ├── .env.example            # Example environment file
│   ├── package.json            # Node.js dependencies
│   └── server.js               # Main server file
├── database/
│   ├── schema.sql              # Database schema
│   └── seed_data.sql           # Sample data
├── frontend/
│   ├── js/                     # JavaScript files
│   ├── index.html              # Landing page
│   └── style.css               # Styles
└── README.md                   # This file
```

## API Endpoints

### Authentication
- `POST /login.php` - User login
- `POST /logout.php` - User logout
- `GET /get_user_info.php` - Get current user info

### Employees
- `GET /api/employees` - Get all active employees
- `GET /api/employees/:id` - Get single employee
- `POST /api/employees` - Add new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee (soft delete)

### Salaries
- `GET /api/salaries` - Get all salary records
- `GET /api/salaries/employee/:id` - Get salaries for specific employee
- `POST /api/salaries` - Add new salary record

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Database Schema

### Tables

**users** - User authentication
- id, username, password, role, join_date

**employees** - Employee information
- id, name, position, department, salary, phone, email, hire_date, status

**salaries** - Salary records
- id, employee_id, month, base_salary, bonus, deductions, net_salary, payment_date, status

**departments** - Department information
- id, name, description

## Troubleshooting

### Database Connection Issues

If you see "Database connection failed":
1. Ensure MySQL is running
2. Check your `.env` file credentials
3. Verify the database exists: `SHOW DATABASES;`

### Port Already in Use

If port 3000 is already in use, change the PORT in `.env` file:
```env
PORT=3001
```

### Module Not Found Errors

Run:
```bash
cd backend
npm install
```

## Future Enhancements

- [ ] Password hashing with bcrypt
- [ ] Role-based access control
- [ ] Export reports to PDF/Excel
- [ ] Email notifications for salary payments
- [ ] Advanced filtering and search
- [ ] Attendance tracking integration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is created for educational purposes.

## Support

For issues and questions, please open an issue in the repository.
