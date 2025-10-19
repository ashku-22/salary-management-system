@echo off
echo Setting up Salary Management Database...
echo.
echo Step 1: Creating database schema...
mysql -u root -p < schema.sql
if %errorlevel% neq 0 (
    echo Error creating schema!
    pause
    exit /b 1
)
echo Schema created successfully!
echo.
echo Step 2: Inserting seed data...
mysql -u root -p < seed_data.sql
if %errorlevel% neq 0 (
    echo Error inserting seed data!
    pause
    exit /b 1
)
echo Seed data inserted successfully!
echo.
echo Database setup complete!
pause
