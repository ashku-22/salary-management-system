const db = require('./config/database');

async function changeEmployeeId(oldId, newId) {
  try {
    console.log(`Changing employee ID from ${oldId} to ${newId}...\n`);
    
    // Get the employee details
    const [employee] = await db.query('SELECT * FROM employees WHERE id = ?', [oldId]);
    
    if (employee.length === 0) {
      console.log('❌ Employee not found!');
      process.exit(1);
    }
    
    console.log('Employee to update:');
    console.log(`Current ID: ${employee[0].id}`);
    console.log(`Name: ${employee[0].name}`);
    console.log(`Position: ${employee[0].position}`);
    console.log(`Department: ${employee[0].department}`);
    console.log(`Salary: $${employee[0].salary}\n`);
    
    // Check if new ID already exists
    const [existing] = await db.query('SELECT * FROM employees WHERE id = ?', [newId]);
    if (existing.length > 0) {
      console.log(`❌ ID ${newId} is already in use by ${existing[0].name}`);
      process.exit(1);
    }
    
    // Disable foreign key checks temporarily
    await db.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // Update the ID
    const [result] = await db.query('UPDATE employees SET id = ? WHERE id = ?', [newId, oldId]);
    
    // Re-enable foreign key checks
    await db.query('SET FOREIGN_KEY_CHECKS = 1');
    
    if (result.affectedRows > 0) {
      console.log(`✅ Employee ID changed successfully!`);
      console.log(`${employee[0].name}: ID ${oldId} → ${newId}`);
    } else {
      console.log('❌ Failed to update employee ID');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Get IDs from command line arguments
const oldId = process.argv[2];
const newId = process.argv[3];

if (!oldId || !newId) {
  console.log('Usage: node change_employee_id.js <old_id> <new_id>');
  console.log('Example: node change_employee_id.js 9 8');
  process.exit(1);
}

changeEmployeeId(oldId, newId);
