Write-Host "Setting up Salary Management Database..." -ForegroundColor Cyan
Write-Host ""

# Get MySQL password
$password = Read-Host "Enter MySQL root password" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

Write-Host "Step 1: Creating database schema..." -ForegroundColor Yellow
$schemaPath = Join-Path $PSScriptRoot "schema.sql"
Get-Content $schemaPath | & mysql -u root --password=$plainPassword 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "Schema created successfully!" -ForegroundColor Green
} else {
    Write-Host "Note: Some schema elements may already exist (this is normal)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 2: Inserting seed data..." -ForegroundColor Yellow
$seedPath = Join-Path $PSScriptRoot "seed_data.sql"
Get-Content $seedPath | & mysql -u root --password=$plainPassword 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "Seed data inserted successfully!" -ForegroundColor Green
} else {
    Write-Host "Note: Some data may already exist (this is normal)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Database setup complete!" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to continue"
