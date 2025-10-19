// dashboard.js
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dashboard loaded ✅");

  // Load user info
  loadUserInfo();
  
  // Load dashboard stats
  loadDashboardStats();
  
  // Load employees
  loadEmployees();
});

// Logout function
function logout() {
  fetch('/logout.php', {
    method: 'POST',
    credentials: 'include'
  })
  .then(() => {
    window.location.href = '/';
  })
  .catch(err => {
    console.error('Logout error:', err);
    window.location.href = '/';
  });
}

// Load user info
function loadUserInfo() {
  fetch('/get_user_info.php', {
    credentials: 'include'
  })
  .then(res => res.json())
  .then(data => {
    const userInfo = document.getElementById('userInfo');
    if (userInfo && data.username) {
      userInfo.textContent = `Welcome, ${data.username} (${data.role})`;
    }
  })
  .catch(err => {
    console.error('Failed to load user info:', err);
    window.location.href = '/';
  });
}

// Load dashboard statistics
function loadDashboardStats() {
  fetch('/api/dashboard/stats', {
    credentials: 'include'
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('totalEmployees').textContent = data.totalEmployees || 0;
    document.getElementById('totalSalaryPaid').textContent = '$' + (data.totalSalaryPaid || 0).toLocaleString();
    document.getElementById('avgSalary').textContent = '$' + (data.avgSalary || 0);
    
    // Display recent payments
    displayRecentPayments(data.recentPayments || []);
  })
  .catch(err => {
    console.error('Failed to load dashboard stats:', err);
  });
}

// Load employees
function loadEmployees() {
  fetch('/api/employees', {
    credentials: 'include'
  })
  .then(res => res.json())
  .then(employees => {
    const tbody = document.getElementById('employeeTableBody');
    
    if (employees.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-gray-500">No employees found</td></tr>';
      return;
    }
    
    tbody.innerHTML = employees.map(emp => `
      <tr class="border-b border-gray-100 hover:bg-gray-50">
        <td class="py-3 px-4">${emp.id}</td>
        <td class="py-3 px-4 font-semibold">${emp.name}</td>
        <td class="py-3 px-4">${emp.position}</td>
        <td class="py-3 px-4">${emp.department}</td>
        <td class="py-3 px-4 text-green-600 font-semibold">$${emp.salary.toLocaleString()}</td>
        <td class="py-3 px-4">
          <span class="px-3 py-1 rounded-full text-xs font-semibold ${emp.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
            ${emp.status}
          </span>
        </td>
        <td class="py-3 px-4">
          <div class="flex space-x-2">
            <button onclick="editEmployee(${emp.id})" class="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-all">
              Edit
            </button>
            <button onclick="deleteEmployee(${emp.id}, '${emp.name}')" class="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-all">
              Delete
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  })
  .catch(err => {
    console.error('Failed to load employees:', err);
    const tbody = document.getElementById('employeeTableBody');
    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-red-500">Failed to load employees</td></tr>';
  });
}

// Display recent payments
function displayRecentPayments(payments) {
  const container = document.getElementById('recentPayments');
  
  if (payments.length === 0) {
    container.innerHTML = '<p class="text-center py-8 text-gray-500">No recent payments</p>';
    return;
  }
  
  container.innerHTML = payments.map(payment => `
    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
      <div class="flex items-center space-x-4">
        <div class="bg-green-100 p-3 rounded-full">
          <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div>
          <p class="font-semibold text-gray-800">${payment.employee_name || 'Employee #' + payment.employee_id}</p>
          <p class="text-sm text-gray-500">${payment.month}</p>
        </div>
      </div>
      <div class="text-right">
        <p class="font-bold text-green-600">$${payment.net_salary.toLocaleString()}</p>
        <p class="text-xs text-gray-500">${payment.status}</p>
      </div>
    </div>
  `).join('');
}

// Delete employee function
function deleteEmployee(id, name) {
  if (confirm(`Are you sure you want to delete employee "${name}"? This action cannot be undone.`)) {
    fetch(`/api/employees/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        alert(`Employee "${name}" has been deleted successfully!`);
        // Reload employees and stats
        loadEmployees();
        loadDashboardStats();
      } else {
        alert('Failed to delete employee: ' + (data.error || 'Unknown error'));
      }
    })
    .catch(err => {
      console.error('Delete error:', err);
      alert('Failed to delete employee. Please try again.');
    });
  }
}

// Edit employee function
async function editEmployee(id) {
  try {
    // Fetch employee data
    const response = await fetch(`/api/employees/${id}`, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      alert('Failed to load employee data');
      return;
    }
    
    const employee = await response.json();
    
    // Populate the edit form
    document.getElementById('editEmployeeId').value = employee.id;
    document.getElementById('editName').value = employee.name;
    document.getElementById('editPosition').value = employee.position;
    document.getElementById('editDepartment').value = employee.department;
    document.getElementById('editSalary').value = employee.salary;
    document.getElementById('editPhone').value = employee.phone || '';
    document.getElementById('editEmail').value = employee.email || '';
    
    // Show the modal
    document.getElementById('editModal').classList.remove('hidden');
  } catch (error) {
    console.error('Error loading employee:', error);
    alert('Failed to load employee data');
  }
}

// Close edit modal
function closeEditModal() {
  document.getElementById('editModal').classList.add('hidden');
  document.getElementById('editEmployeeForm').reset();
}

// Handle edit form submission
document.addEventListener('DOMContentLoaded', function() {
  const editForm = document.getElementById('editEmployeeForm');
  if (editForm) {
    editForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const id = document.getElementById('editEmployeeId').value;
      const name = document.getElementById('editName').value;
      const position = document.getElementById('editPosition').value;
      const department = document.getElementById('editDepartment').value;
      const salary = document.getElementById('editSalary').value;
      const phone = document.getElementById('editPhone').value;
      const email = document.getElementById('editEmail').value;
      
      try {
        const response = await fetch(`/api/employees/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            name,
            position,
            department,
            salary: parseFloat(salary),
            phone: phone || null,
            email: email || null
          })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          alert(`Employee "${name}" updated successfully!`);
          closeEditModal();
          loadEmployees();
          loadDashboardStats();
        } else {
          alert('Failed to update employee: ' + (data.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Update error:', error);
        alert('Failed to update employee. Please try again.');
      }
    });
  }
});

