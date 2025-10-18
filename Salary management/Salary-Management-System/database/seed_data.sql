-- Seed data for Salary Management System

USE salary_management_db;

-- Insert default users (password is hashed in application)
-- Note: Passwords will be hashed by bcrypt in the application
-- Default passwords: admin123 for admin, emp123 for employees
INSERT INTO users (username, password, role, join_date) VALUES
('admin', 'admin123', 'admin', '2024-01-01'),
('employee1', 'emp123', 'employee', '2024-02-15'),
('employee2', 'emp123', 'employee', '2024-03-01');

-- Insert departments
INSERT INTO departments (name, description) VALUES
('IT', 'Information Technology Department'),
('HR', 'Human Resources Department'),
('Finance', 'Finance and Accounting Department'),
('Marketing', 'Marketing and Sales Department'),
('Operations', 'Operations and Logistics Department');

-- Insert sample employees
INSERT INTO employees (name, position, department, salary, phone, email, hire_date, status) VALUES
('John Doe', 'Software Engineer', 'IT', 75000.00, '555-0101', 'john.doe@company.com', '2024-01-15', 'active'),
('Jane Smith', 'HR Manager', 'HR', 65000.00, '555-0102', 'jane.smith@company.com', '2024-02-01', 'active'),
('Michael Johnson', 'Financial Analyst', 'Finance', 70000.00, '555-0103', 'michael.j@company.com', '2024-02-15', 'active'),
('Emily Davis', 'Marketing Specialist', 'Marketing', 60000.00, '555-0104', 'emily.d@company.com', '2024-03-01', 'active'),
('Robert Brown', 'Operations Manager', 'Operations', 72000.00, '555-0105', 'robert.b@company.com', '2024-03-15', 'active');

-- Insert sample salary records
INSERT INTO salaries (employee_id, month, base_salary, bonus, deductions, net_salary, payment_date, status) VALUES
(1, 'January 2024', 75000.00, 5000.00, 2000.00, 78000.00, '2024-01-31', 'paid'),
(2, 'January 2024', 65000.00, 3000.00, 1500.00, 66500.00, '2024-01-31', 'paid'),
(3, 'January 2024', 70000.00, 4000.00, 1800.00, 72200.00, '2024-01-31', 'paid'),
(1, 'February 2024', 75000.00, 6000.00, 2000.00, 79000.00, '2024-02-29', 'paid'),
(2, 'February 2024', 65000.00, 3500.00, 1500.00, 67000.00, '2024-02-29', 'paid'),
(3, 'February 2024', 70000.00, 4500.00, 1800.00, 72700.00, '2024-02-29', 'paid'),
(4, 'March 2024', 60000.00, 3000.00, 1400.00, 61600.00, '2024-03-31', 'paid'),
(5, 'March 2024', 72000.00, 4200.00, 1900.00, 74300.00, '2024-03-31', 'paid');
