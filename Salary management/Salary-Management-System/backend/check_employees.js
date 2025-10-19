const db = require('./config/database');

async function checkEmployees() {
  try {
    console.log('Checking all employees in database...\n');
    
    const [employees] = await db.query('SELECT * FROM employees ORDER BY id');
    
    console.log(`Total employees found: ${employees.length}\n`);
    
    if (employees.length === 0) {
      console.log('No employees in database!');
    } else {
      console.log('Employee List:');
      console.log('ID | Name | Position | Department | Salary | Status');
      console.log('---|------|----------|------------|--------|-------');
      employees.forEach(emp => {
        console.log(`${emp.id} | ${emp.name} | ${emp.position} | ${emp.department} | $${emp.salary} | ${emp.status}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkEmployees();
