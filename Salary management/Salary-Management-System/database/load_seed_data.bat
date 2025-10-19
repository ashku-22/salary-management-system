@echo off
echo Loading seed data into Salary Management Database...
echo.
echo Inserting seed data...
mysql -u root -p < seed_data.sql
if %errorlevel% neq 0 (
    echo Error inserting seed data!
    echo Note: Some data may already exist (this is normal)
    pause
    exit /b 1
)
echo Seed data loaded successfully!
echo.
pause
