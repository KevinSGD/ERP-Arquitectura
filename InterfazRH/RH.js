document.addEventListener("DOMContentLoaded", function () {
  const addEmployeeBtn = document.getElementById("addEmployeeBtn");
  const employeeModal = document.getElementById("employeeModal");
  const cancelEmployeeBtn = document.getElementById("cancelEmployeeBtn");
  const employeeForm = document.getElementById("employeeForm");
  const employeesTableBody = document.getElementById("employeesTableBody");
  const searchInput = document.getElementById("searchInput");
  
  let employees = [];
  
  // Mostrar modal
  addEmployeeBtn.addEventListener("click", function () {
      employeeModal.style.display = "flex";
      employeeForm.reset();
  });
  
  // Ocultar modal
  cancelEmployeeBtn.addEventListener("click", function () {
      employeeModal.style.display = "none";
  });
  
  // Manejo de formulario para agregar empleado
  employeeForm.addEventListener("submit", function (event) {
      event.preventDefault();
      
      const newEmployee = {
          id: employees.length + 1,
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          email: document.getElementById("email").value,
          department: document.getElementById("department").value,
          role: document.getElementById("role").value,
          hireDate: document.getElementById("hireDate").value,
      };
      
      employees.push(newEmployee);
      renderEmployeesTable();
      employeeModal.style.display = "none";
  });
  
  // Renderizar empleados en la tabla
  function renderEmployeesTable() {
      employeesTableBody.innerHTML = "";
      
      employees.forEach(employee => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${employee.firstName} ${employee.lastName}</td>
              <td>${employee.department}</td>
              <td>${employee.role}</td>
              <td>${employee.hireDate}</td>
              <td><button class="delete-btn" data-id="${employee.id}">❌</button></td>
          `;
          employeesTableBody.appendChild(row);
      });
  }
  
  // Filtrar empleados por nombre o correo
  searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredEmployees = employees.filter(employee => 
          employee.firstName.toLowerCase().includes(searchTerm) || 
          employee.lastName.toLowerCase().includes(searchTerm) || 
          employee.email.toLowerCase().includes(searchTerm)
      );
      
      employeesTableBody.innerHTML = "";
      filteredEmployees.forEach(employee => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${employee.firstName} ${employee.lastName}</td>
              <td>${employee.department}</td>
              <td>${employee.role}</td>
              <td>${employee.hireDate}</td>
              <td><button class="delete-btn" data-id="${employee.id}">❌</button></td>
          `;
          employeesTableBody.appendChild(row);
      });
  });
  
  // Eliminar empleado
  employeesTableBody.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-btn")) {
          const employeeId = parseInt(event.target.getAttribute("data-id"));
          employees = employees.filter(emp => emp.id !== employeeId);
          renderEmployeesTable();
      }
  });
});
