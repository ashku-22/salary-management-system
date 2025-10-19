@echo off
echo Checking users in database...
echo.
mysql -u root -p -e "USE salary_management_db; SELECT id, username, password, role FROM users;"
echo.
pause
