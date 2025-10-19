const db = require('./config/database');

async function permanentDeleteEmployee(employeeId) {
  try {
    console.log(`Attempting to permanently delete employee with ID: ${employeeId}...\n`);
    
    // First, get the employee details
    const [employee] = await db.query('SELECT * FROM employees WHERE id = ?', [employeeId]);
    
    if (employee.length === 0) {
      console.log('❌ Employee not found!');
      process.exit(1);
    }
    
    console.log('Employee to permanently delete:');
    console.log(`ID: ${employee[0].id}`);
    console.log(`Name: ${employee[0].name}`);
    console.log(`Position: ${employee[0].position}`);
    console.log(`Department: ${employee[0].department}`);
    console.log(`Salary: $${employee[0].salary}`);
    console.log(`Status: ${employee[0].status}\n`);
    
    // Permanently delete from database
    const [result] = await db.query('DELETE FROM employees WHERE id = ?', [employeeId]);
    
    if (result.affectedRows > 0) {
      console.log('✅ Employee permanently deleted from database!');
      console.log('⚠️  This action cannot be undone.');
    } else {
      console.log('❌ Failed to delete employee');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Get employee ID from command line argument
const employeeId = process.argv[2];

if (!employeeId) {
  console.log('Usage: node permanent_delete.js <employee_id>');
  console.log('Example: node permanent_delete.js 15');
  console.log('⚠️  WARNING: This will permanently delete the employee from the database!');
  process.exit(1);
}

permanentDeleteEmployee(employeeId);
