const db = require('./config/database');

async function deleteEmployee(employeeId) {
  try {
    console.log(`Attempting to delete employee with ID: ${employeeId}...\n`);
    
    // First, get the employee details
    const [employee] = await db.query('SELECT * FROM employees WHERE id = ?', [employeeId]);
    
    if (employee.length === 0) {
      console.log('❌ Employee not found!');
      process.exit(1);
    }
    
    console.log('Employee to delete:');
    console.log(`ID: ${employee[0].id}`);
    console.log(`Name: ${employee[0].name}`);
    console.log(`Position: ${employee[0].position}`);
    console.log(`Department: ${employee[0].department}`);
    console.log(`Salary: $${employee[0].salary}`);
    console.log(`Status: ${employee[0].status}\n`);
    
    // Soft delete - set status to inactive
    const [result] = await db.query('UPDATE employees SET status = "inactive" WHERE id = ?', [employeeId]);
    
    if (result.affectedRows > 0) {
      console.log('✅ Employee deleted successfully (status set to inactive)!');
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
  console.log('Usage: node delete_employee.js <employee_id>');
  console.log('Example: node delete_employee.js 15');
  process.exit(1);
}

deleteEmployee(employeeId);
