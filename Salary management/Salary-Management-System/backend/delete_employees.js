const db = require('./config/database');

async function deleteEmployees() {
  try {
    console.log('Deleting employees with IDs 5 to 10...');
    
    const [result] = await db.query(
      'DELETE FROM employees WHERE id >= 5 AND id <= 10'
    );
    
    console.log(`✅ Deleted ${result.affectedRows} employee(s)`);
    
    // Show remaining employees
    const [employees] = await db.query('SELECT id, name, position FROM employees ORDER BY id');
    console.log('\nRemaining employees:');
    employees.forEach(emp => {
      console.log(`  ID ${emp.id}: ${emp.name} - ${emp.position}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

deleteEmployees();
