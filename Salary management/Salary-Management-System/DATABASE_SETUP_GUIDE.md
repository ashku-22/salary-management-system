# 🗄️ Database Setup Guide

## Quick Start Commands

### Windows (PowerShell or CMD)

```powershell
# Navigate to project directory
cd "c:\Users\HP\OneDrive\Desktop\SMS\salary-management-system-1\Salary management\Salary-Management-System"

# Import database schema
mysql -u root -p < database\schema.sql

# Import sample data
mysql -u root -p < database\seed_data.sql

# Install Node.js dependencies
cd backend
npm install

# Start the server
npm start
```

### Alternative: Manual Database Setup

If you prefer using MySQL Workbench or phpMyAdmin:

1. **Open MySQL Workbench**
2. **Create Connection** to localhost
3. **Create Database**:
   ```sql
   CREATE DATABASE salary_management_db;
   USE salary_management_db;
   ```
4. **Run Schema**: Copy and paste contents of `database/schema.sql`
5. **Run Seed Data**: Copy and paste contents of `database/seed_data.sql`

## Database Configuration

Edit `backend/.env`:

```env
# Your MySQL Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD_HERE
DB_NAME=salary_management_db
DB_PORT=3306

# Server Configuration
PORT=3000
NODE_ENV=development

# Session Secret (change in production)
SESSION_SECRET=salary-management-secret-key-change-in-production
```

## Verify Database Connection

After starting the server with `npm start`, you should see:

```
✅ Database connected successfully!
🚀 Salary Management System Server running on http://localhost:3000
📁 Serving frontend from: [path]

👤 Test credentials:
   Admin: username='admin', password='admin123'
   Employee: username='employee1', password='emp123'
```

## Database Tables Overview

### 1. users
Stores user authentication data
```
id | username | password | role | join_date
```

### 2. employees
Stores employee information
```
id | name | position | department | salary | phone | email | hire_date | status
```

### 3. salaries
Stores salary payment records
```
id | employee_id | month | base_salary | bonus | deductions | net_salary | payment_date | status
```

### 4. departments
Stores department information
```
id | name | description
```

## Sample Data Included

- **3 Users**: 1 admin, 2 employees
- **5 Employees**: Across IT, HR, Finance, Marketing, Operations
- **8 Salary Records**: Multiple months of payment data
- **5 Departments**: Pre-configured departments

## Testing the Database Connection

### Test 1: Login
1. Go to http://localhost:3000
2. Login with `admin` / `admin123`
3. Should redirect to dashboard

### Test 2: View Employees
1. Navigate to employees section
2. Should see 5 employees from database

### Test 3: Add Employee
1. Click "Add Employee"
2. Fill form and submit
3. New employee should be saved to database

### Test 4: View Salaries
1. Navigate to salaries section
2. Should see salary records from database

## Common MySQL Commands

```sql
-- Show all databases
SHOW DATABASES;

-- Use the salary database
USE salary_management_db;

-- Show all tables
SHOW TABLES;

-- View users
SELECT * FROM users;

-- View employees
SELECT * FROM employees;

-- View salaries
SELECT * FROM salaries;

-- View departments
SELECT * FROM departments;

-- Check employee count
SELECT COUNT(*) FROM employees WHERE status = 'active';

-- View salary statistics
SELECT 
    COUNT(*) as total_payments,
    SUM(net_salary) as total_paid,
    AVG(net_salary) as average_payment
FROM salaries;
```

## Backup Database

To backup your database:

```bash
mysqldump -u root -p salary_management_db > backup.sql
```

To restore:

```bash
mysql -u root -p salary_management_db < backup.sql
```

## Reset Database

To start fresh:

```sql
DROP DATABASE salary_management_db;
```

Then re-run the schema and seed files.

## Connection Pooling

The application uses MySQL connection pooling for better performance:
- **Connection Limit**: 10 concurrent connections
- **Auto-reconnect**: Enabled
- **Promise-based**: Uses async/await for cleaner code

## Security Notes

⚠️ **Important for Production:**

1. **Change default passwords** in seed_data.sql
2. **Use bcrypt** for password hashing
3. **Update SESSION_SECRET** in .env
4. **Use environment variables** for all sensitive data
5. **Enable SSL** for database connections
6. **Restrict database user permissions**

## Need Help?

- Check `README.md` for full documentation
- See `setup.md` for quick setup
- Review `SETUP_COMPLETE.md` for overview

---

**Database setup is complete! Your website can now connect to MySQL.** ✅
