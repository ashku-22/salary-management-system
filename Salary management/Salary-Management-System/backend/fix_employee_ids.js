const db = require('./config/database');

async function fixEmployeeIds() {
  try {
    console.log('Fixing employee IDs to be sequential...\n');
    
    // Get all employees ordered by current ID
    const [employees] = await db.query('SELECT * FROM employees ORDER BY id');
    
    console.log(`Found ${employees.length} employees\n`);
    console.log('Current IDs:', employees.map(e => e.id).join(', '));
    console.log('\nRenumbering employees...\n');
    
    // Temporarily disable foreign key checks
    await db.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // Create a temporary table to store the mapping
    const updates = [];
    
    // First, move all IDs to temporary high numbers to avoid conflicts
    for (let i = 0; i < employees.length; i++) {
      const tempId = 1000 + i;
      await db.query('UPDATE employees SET id = ? WHERE id = ?', [tempId, employees[i].id]);
    }
    
    // Then, assign new sequential IDs starting from 1
    for (let i = 0; i < employees.length; i++) {
      const newId = i + 1;
      const tempId = 1000 + i;
      await db.query('UPDATE employees SET id = ? WHERE id = ?', [newId, tempId]);
      
      console.log(`✅ ${employees[i].name}: ID ${employees[i].id} → ${newId}`);
      updates.push({ oldId: employees[i].id, newId: newId, name: employees[i].name });
    }
    
    // Re-enable foreign key checks
    await db.query('SET FOREIGN_KEY_CHECKS = 1');
    
    // Reset auto-increment to continue from the last ID
    const nextId = employees.length + 1;
    await db.query(`ALTER TABLE employees AUTO_INCREMENT = ${nextId}`);
    
    console.log('\n✅ Employee IDs have been fixed!');
    console.log(`Next auto-increment ID will be: ${nextId}`);
    
    // Show final result
    console.log('\n📊 Final ID sequence:');
    const [finalEmployees] = await db.query('SELECT id, name, position, department FROM employees ORDER BY id');
    finalEmployees.forEach(emp => {
      console.log(`ID ${emp.id}: ${emp.name} - ${emp.position} (${emp.department})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixEmployeeIds();
