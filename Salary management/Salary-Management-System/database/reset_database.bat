@echo off
echo Resetting Salary Management Database...
echo.
echo WARNING: This will delete all existing data!
echo.
pause
echo.
echo Step 1: Dropping existing database...
mysql -u root -p -e "DROP DATABASE IF EXISTS salary_management_db;"
if %errorlevel% neq 0 (
    echo Error dropping database!
    pause
    exit /b 1
)
echo Database dropped successfully!
echo.
echo Step 2: Creating fresh database schema...
mysql -u root -p < schema.sql
if %errorlevel% neq 0 (
    echo Error creating schema!
    pause
    exit /b 1
)
echo Schema created successfully!
echo.
echo Step 3: Inserting seed data...
mysql -u root -p < seed_data.sql
if %errorlevel% neq 0 (
    echo Error inserting seed data!
    pause
    exit /b 1
)
echo Seed data inserted successfully!
echo.
echo Database reset complete!
pause
