# Quick Setup Guide

Follow these steps to get your Salary Management System up and running:

## Step 1: Install MySQL

If you don't have MySQL installed:
- **Windows**: Download from [MySQL Downloads](https://dev.mysql.com/downloads/installer/)
- **Mac**: `brew install mysql`
- **Linux**: `sudo apt-get install mysql-server`

## Step 2: Start MySQL Service

**Windows:**
```bash
# Open Services and start MySQL80 service
# Or use command prompt as administrator:
net start MySQL80
```

**Mac:**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo service mysql start
```

## Step 3: Create Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE salary_management_db;
```

Or use the provided SQL files:

**Windows Command Prompt:**
```bash
cd "c:\Users\HP\OneDrive\Desktop\SMS\salary-management-system-1\Salary management\Salary-Management-System"
mysql -u root -p < database\schema.sql
mysql -u root -p < database\seed_data.sql
```

**Mac/Linux Terminal:**
```bash
cd "/path/to/Salary-Management-System"
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed_data.sql
```

## Step 4: Install Node.js Dependencies

```bash
cd backend
npm install
```

## Step 5: Configure Database Connection

Edit `backend/.env` file with your MySQL password:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
DB_NAME=salary_management_db
DB_PORT=3306
```

## Step 6: Start the Server

```bash
npm start
```

You should see:
```
✅ Database connected successfully!
🚀 Salary Management System Server running on http://localhost:3000
```

## Step 7: Open in Browser

Navigate to: **http://localhost:3000**

Login with:
- Username: `admin`
- Password: `admin123`

---

## Common Issues & Solutions

### Issue: "Cannot connect to MySQL"
**Solution:** 
- Check if MySQL is running
- Verify your password in `.env` file
- Try: `mysql -u root -p` to test connection

### Issue: "Database does not exist"
**Solution:**
- Run the schema.sql file manually
- Or create database: `CREATE DATABASE salary_management_db;`

### Issue: "Port 3000 already in use"
**Solution:**
- Change PORT in `.env` to 3001 or another available port

### Issue: "Module not found"
**Solution:**
```bash
cd backend
rm -rf node_modules
npm install
```

---

## Testing the Application

1. **Login** - Use admin/admin123
2. **View Dashboard** - See statistics and recent payments
3. **Manage Employees** - Add, edit, or delete employees
4. **Process Salaries** - Add salary records with bonuses/deductions
5. **View Reports** - Check salary history

---

## Need Help?

Check the main README.md for detailed documentation and API endpoints.
