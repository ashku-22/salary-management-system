@echo off
echo Checking Salary Management Database...
echo.
mysql -u root -p -e "USE salary_management_db; SELECT 'Users:' as Table_Name, COUNT(*) as Count FROM users UNION ALL SELECT 'Employees:', COUNT(*) FROM employees UNION ALL SELECT 'Salaries:', COUNT(*) FROM salaries UNION ALL SELECT 'Departments:', COUNT(*) FROM departments;"
echo.
pause
