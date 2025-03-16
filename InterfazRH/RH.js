document.addEventListener('DOMContentLoaded', function() {
  // Sample employees data
  const employeesData = [
    { id: 1, firstName: 'Juan', lastName: 'Pérez', email: 'juan.perez@hotel.com', phone: '+52 123 456 7890', address: 'Av. Principal #123, Ciudad', department: 'recepcion', role: 'recepcionista', hireDate: '2022-05-15', status: 'activo', salary: 15000, performance: 85 },
    { id: 2, firstName: 'María', lastName: 'González', email: 'maria.gonzalez@hotel.com', phone: '+52 234 567 8901', address: 'Calle 45 #678, Ciudad', department: 'limpieza', role: 'camarero', hireDate: '2021-08-10', status: 'activo', salary: 12000, performance: 90 },
    { id: 3, firstName: 'Carlos', lastName: 'Rodríguez', email: 'carlos.rodriguez@hotel.com', phone: '+52 345 678 9012', address: 'Blvd. Central #456, Ciudad', department: 'cocina', role: 'cocinero', hireDate: '2023-01-20', status: 'activo', salary: 18000, performance: 75 },
    { id: 4, firstName: 'Ana', lastName: 'Martínez', email: 'ana.martinez@hotel.com', phone: '+52 456 789 0123', address: 'Av. Norte #789, Ciudad', department: 'restaurante', role: 'mesero', hireDate: '2022-11-05', status: 'descansando', salary: 13000, performance: 80 },
    { id: 5, firstName: 'Roberto', lastName: 'López', email: 'roberto.lopez@hotel.com', phone: '+52 567 890 1234', address: 'Calle Sur #234, Ciudad', department: 'mantenimiento', role: 'mantenimiento', hireDate: '2021-03-15', status: 'activo', salary: 14000, performance: 95 },
    { id: 6, firstName: 'Laura', lastName: 'Sánchez', email: 'laura.sanchez@hotel.com', phone: '+52 678 901 2345', address: 'Av. Este #567, Ciudad', department: 'administracion', role: 'administrativo', hireDate: '2022-07-01', status: 'activo', salary: 16000, performance: 88 },
    { id: 7, firstName: 'Miguel', lastName: 'Hernández', email: 'miguel.hernandez@hotel.com', phone: '+52 789 012 3456', address: 'Calle Oeste #890, Ciudad', department: 'recepcion', role: 'recepcionista', hireDate: '2023-02-10', status: 'activo', salary: 15000, performance: 82 },
    { id: 8, firstName: 'Sofía', lastName: 'Díaz', email: 'sofia.diaz@hotel.com', phone: '+52 890 123 4567', address: 'Blvd. Principal #123, Ciudad', department: 'limpieza', role: 'camarero', hireDate: '2021-10-20', status: 'despedido', salary: 12000, performance: 60 }
  ];

  // Sample contracts data
  const contractsData = [
    { id: 1, employeeId: 1, type: 'indefinido', startDate: '2022-05-15', endDate: null, status: 'activo' },
    { id: 2, employeeId: 2, type: 'temporal', startDate: '2021-08-10', endDate: '2022-08-10', status: 'finalizado' },
    { id: 3, employeeId: 2, type: 'indefinido', startDate: '2022-08-11', endDate: null, status: 'activo' },
    { id: 4, employeeId: 3, type: 'temporal', startDate: '2023-01-20', endDate: '2023-07-20', status: 'activo' },
    { id: 5, employeeId: 4, type: 'indefinido', startDate: '2022-11-05', endDate: null, status: 'activo' },
    { id: 6, employeeId: 5, type: 'indefinido', startDate: '2021-03-15', endDate: null, status: 'activo' },
    { id: 7, employeeId: 6, type: 'temporal', startDate: '2022-07-01', endDate: '2023-01-01', status: 'finalizado' },
    { id: 8, employeeId: 6, type: 'indefinido', startDate: '2023-01-02', endDate: null, status: 'activo' },
    { id: 9, employeeId: 7, type: 'practicas', startDate: '2023-02-10', endDate: '2023-08-10', status: 'activo' },
    { id: 10, employeeId: 8, type: 'indefinido', startDate: '2021-10-20', endDate: '2023-03-15', status: 'finalizado' }
  ];

  // Sample payments data
  const paymentsData = [
    { id: 1, employeeId: 1, period: 'Enero 2024', paymentDate: '2024-01-31', grossAmount: 18200, deductions: 4140, netAmount: 14060 },
    { id: 2, employeeId: 1, period: 'Febrero 2024', paymentDate: '2024-02-29', grossAmount: 17500, deductions: 3950, netAmount: 13550 },
    { id: 3, employeeId: 1, period: 'Marzo 2024', paymentDate: '2024-03-31', grossAmount: 18800, deductions: 4320, netAmount: 14480 }
  ];

  // DOM Elements
  const toggleSidebarBtn = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const employeesTableBody = document.getElementById('employeesTableBody');
  const addEmployeeBtn = document.getElementById('addEmployeeBtn');
  const employeeModal = document.getElementById('employeeModal');
  const employeeForm = document.getElementById('employeeForm');
  const cancelEmployeeBtn = document.getElementById('cancelEmployeeBtn');
  const employeeDetailModal = document.getElementById('employeeDetailModal');
  const employeeTabs = document.getElementById('employeeTabs');
  const tabContents = document.querySelectorAll('.tab-content');
  const contractModal = document.getElementById('contractModal');
  const contractForm = document.getElementById('contractForm');
  const cancelContractBtn = document.getElementById('cancelContractBtn');
  const printContractBtn = document.getElementById('printContractBtn');
  const generateContractBtn = document.getElementById('generateContractBtn');
  const searchInput = document.getElementById('searchInput');
  const departmentFilter = document.getElementById('departmentFilter');
  const statusFilter = document.getElementById('statusFilter');
  const applyFiltersBtn = document.getElementById('applyFilters');
  const saveEmployeeChangesBtn = document.getElementById('saveEmployeeChangesBtn');

  // Variables
  let currentEmployeeId = null;
  let filteredData = [...employeesData];

  // Toggle sidebar
  toggleSidebarBtn.addEventListener('click', function() {
    sidebar.classList.toggle('sidebar-collapsed');
    mainContent.classList.toggle('main-content-expanded');
  });

  // Render employees table
  function renderEmployeesTable() {
    employeesTableBody.innerHTML = '';
    
    if (filteredData.length === 0) {
      employeesTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4">No se encontraron empleados</td>
        </tr>
      `;
      return;
    }
    
    filteredData.forEach(employee => {
      const statusBadge = getStatusBadge(employee.status);
      const fullName = `${employee.firstName} ${employee.lastName}`;
      const departmentName = getDepartmentName(employee.department);
      const roleName = getRoleName(employee.role);
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <div class="flex items-center">
            <div class="avatar mr-3">${getInitials(fullName)}</div>
            <div>
              <div class="font-medium">${fullName}</div>
              <div class="text-sm text-gray-500">${employee.email}</div>
            </div>
          </div>
        </td>
        <td>${departmentName}</td>
        <td>${roleName}</td>
        <td>${formatDate(employee.hireDate)}</td>
        <td>${statusBadge}</td>
        <td>
          <div class="flex space-x-2">
            <button class="btn btn-icon btn-outline view-employee-btn" data-id="${employee.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tooltip">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
                <span class="tooltip-text">Ver</span>
              </svg>
            </button>
            <button class="btn btn-icon btn-outline edit-employee-btn" data-id="${employee.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tooltip">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                <path d="m15 5 4 4"></path>
                <span class="tooltip-text">Editar</span>
              </svg>
            </button>
            <button class="btn btn-icon btn-outline contract-btn" data-id="${employee.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tooltip">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <path d="M14 2v6h6"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
                <path d="M10 9H8"></path>
                <span class="tooltip-text">Contrato</span>
              </svg>
            </button>
          </div>
        </td>
      `;
      
      employeesTableBody.appendChild(row);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.view-employee-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const employeeId = parseInt(this.getAttribute('data-id'));
        openEmployeeDetailModal(employeeId);
      });
    });
    
    document.querySelectorAll('.edit-employee-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const employeeId = parseInt(this.getAttribute('data-id'));
        openEditEmployeeModal(employeeId);
      });
    });
    
    document.querySelectorAll('.contract-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const employeeId = parseInt(this.getAttribute('data-id'));
        openEmployeeDetailModal(employeeId, 'contract');
      });
    });
  }

  // Get status badge HTML
  function getStatusBadge(status) {
    switch (status) {
      case 'activo':
        return '<span class="badge badge-green">Activo</span>';
      case 'descansando':
        return '<span class="badge badge-yellow">Descansando</span>';
      case 'despedido':
        return '<span class="badge badge-red">Despedido</span>';
      default:
        return '';
    }
  }

  // Get department name
  function getDepartmentName(department) {
    const departments = {
      'recepcion': 'Recepción',
      'limpieza': 'Limpieza',
      'cocina': 'Cocina',
      'restaurante': 'Restaurante',
      'mantenimiento': 'Mantenimiento',
      'administracion': 'Administración'
    };
    return departments[department] || department;
  }

  // Get role name
  function getRoleName(role) {
    const roles = {
      'recepcionista': 'Recepcionista',
      'camarero': 'Camarero/a',
      'cocinero': 'Cocinero/a',
      'mesero': 'Mesero/a',
      'mantenimiento': 'Técnico de Mantenimiento',
      'gerente': 'Gerente',
      'administrativo': 'Administrativo'
    };
    return roles[role] || role;
  }

  // Get initials from name
  function getInitials(name) {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  // Format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  }

  // Open add employee modal
  function openAddEmployeeModal() {
    document.getElementById('modalTitle').textContent = 'Agregar Empleado';
    employeeForm.reset();
    currentEmployeeId = null;
    employeeModal.classList.add('active');
  }

  // Open edit employee modal
  function openEditEmployeeModal(employeeId) {
    const employee = employeesData.find(emp => emp.id === employeeId);
    if (!employee) return;
    
    document.getElementById('modalTitle').textContent = 'Editar Empleado';
    
    document.getElementById('firstName').value = employee.firstName;
    document.getElementById('lastName').value = employee.lastName;
    document.getElementById('email').value = employee.email;
    document.getElementById('phone').value = employee.phone;
    document.getElementById('address').value = employee.address;
    document.getElementById('department').value = employee.department;
    document.getElementById('role').value = employee.role;
    document.getElementById('hireDate').value = employee.hireDate;
    document.getElementById('salary').value = employee.salary;
    
    currentEmployeeId = employeeId;
    employeeModal.classList.add('active');
  }

  // Open employee detail modal
  function openEmployeeDetailModal(employeeId, activeTab = 'info') {
    const employee = employeesData.find(emp => emp.id === employeeId);
    if (!employee) return;
    
    currentEmployeeId = employeeId;
    
    // Set employee details
    document.getElementById('employeeDetailTitle').textContent = `${employee.firstName} ${employee.lastName}`;
    document.getElementById('employeeAvatar').textContent = getInitials(`${employee.firstName} ${employee.lastName}`);
    document.getElementById('employeeName').textContent = `${employee.firstName} ${employee.lastName}`;
    document.getElementById('employeePosition').textContent = getRoleName(employee.role);
    document.getElementById('employeeEmail').textContent = employee.email;
    document.getElementById('employeePhone').textContent = employee.phone;
    document.getElementById('employeeAddress').textContent = employee.address;
    document.getElementById('employeePerformance').textContent = `${employee.performance}%`;
    document.getElementById('employeePerformanceBar').style.width = `${employee.performance}%`;
    
    document.getElementById('employeeDepartment').value = employee.department;
    document.getElementById('employeeRole').value = employee.role;
    document.getElementById('employeeStatus').value = employee.status;
    document.getElementById('employeeHireDate').value = employee.hireDate;
    document.getElementById('employeeNotes').value = 'Empleado con buen desempeño. Puntual y responsable.';
    
    // Load contracts
    loadEmployeeContracts(employeeId);
    
    // Load payroll data
    loadEmployeePayroll(employeeId);
    
    // Set active tab
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    
    document.querySelector(`.tab[data-tab="${activeTab}"]`).classList.add('active');
    document.getElementById(`${activeTab}Tab`).classList.add('active');
    
    employeeDetailModal.classList.add('active');
  }

  // Load employee contracts
  function loadEmployeeContracts(employeeId) {
    const contractsTableBody = document.getElementById('contractsTableBody');
    contractsTableBody.innerHTML = '';
    
    const employeeContracts = contractsData.filter(contract => contract.employeeId === employeeId);
    
    if (employeeContracts.length === 0) {
      contractsTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-4">No hay contratos registrados</td>
        </tr>
      `;
      return;
    }
    
    employeeContracts.forEach(contract => {
      const row = document.createElement('tr');
      const contractType = getContractTypeName(contract.type);
      const contractStatus = getContractStatusBadge(contract.status);
      
      row.innerHTML = `
        <td>${contractType}</td>
        <td>${formatDate(contract.startDate)}</td>
        <td>${contract.endDate ? formatDate(contract.endDate) : 'N/A'}</td>
        <td>${contractStatus}</td>
        <td>
          <div class="flex space-x-2">
            <button class="btn btn-icon btn-outline view-contract-btn" data-id="${contract.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tooltip">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
                <span class="tooltip-text">Ver</span>
              </svg>
            </button>
            <button class="btn btn-icon btn-outline print-contract-btn" data-id="${contract.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tooltip">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect width="12" height="8" x="6" y="14"></rect>
                <span class="tooltip-text">Imprimir</span>
              </svg>
            </button>
          </div>
        </td>
      `;
      
      contractsTableBody.appendChild(row);
    });
  }

  // Get contract type name
  function getContractTypeName(type) {
    const types = {
      'indefinido': 'Indefinido',
      'temporal': 'Temporal',
      'practicas': 'Prácticas'
    };
    return types[type] || type;
  }

  // Get contract status badge
  function getContractStatusBadge(status) {
    switch (status) {
      case 'activo':
        return '<span class="badge badge-green">Activo</span>';
      case 'finalizado':
        return '<span class="badge badge-purple">Finalizado</span>';
      default:
        return '';
    }
  }

  // Load employee payroll
  function loadEmployeePayroll(employeeId) {
    const paymentsTableBody = document.getElementById('paymentsTableBody');
    paymentsTableBody.innerHTML = '';
    
    const employeePayments = paymentsData.filter(payment => payment.employeeId === employeeId);
    
    if (employeePayments.length === 0) {
      paymentsTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-4">No hay pagos registrados</td>
        </tr>
      `;
    } else {
      employeePayments.forEach(payment => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${payment.period}</td>
          <td>${formatDate(payment.paymentDate)}</td>
          <td>$${payment.grossAmount.toFixed(2)}</td>
          <td>$${payment.deductions.toFixed(2)}</td>
          <td>$${payment.netAmount.toFixed(2)}</td>
        `;
        paymentsTableBody.appendChild(row);
      });
    }
    
    // Set payroll details
    const employee = employeesData.find(emp => emp.id === employeeId);
    if (employee) {
      document.getElementById('baseSalary').textContent = `$${employee.salary.toFixed(2)}`;
      document.getElementById('bonuses').textContent = '$2,000.00';
      document.getElementById('overtime').textContent = '$1,200.00';
      document.getElementById('grossTotal').textContent = `$${(employee.salary + 2000 + 1200).toFixed(2)}`;
      
      const taxes = (employee.salary + 2000 + 1200) * 0.15;
      const socialSecurity = (employee.salary + 2000 + 1200) * 0.05;
      const otherDeductions = 500;
      const totalDeductions = taxes + socialSecurity + otherDeductions;
      const netTotal = (employee.salary + 2000 + 1200) - totalDeductions;
      
      document.getElementById('taxes').textContent = `$${taxes.toFixed(2)}`;
      document.getElementById('socialSecurity').textContent = `$${socialSecurity.toFixed(2)}`;
      document.getElementById('otherDeductions').textContent = `$${otherDeductions.toFixed(2)}`;
      document.getElementById('netTotal').textContent = `$${netTotal.toFixed(2)}`;
    }
  }

  // Open contract modal
  function openContractModal() {
    const employee = employeesData.find(emp => emp.id === currentEmployeeId);
    if (!employee) return;
    
    contractForm.reset();
    
    // Set default values
    document.getElementById('contractSalary').value = employee.salary;
    document.getElementById('contractStartDate').value = new Date().toISOString().split('T')[0];
    
    // Update contract preview
    updateContractPreview(employee);
    
    contractModal.classList.add('active');
  }

  // Update contract preview
  function updateContractPreview(employee) {
    const contractType = document.getElementById('contractType').value || 'indefinido';
    const contractStartDate = document.getElementById('contractStartDate').value || new Date().toISOString().split('T')[0];
    const contractEndDate = document.getElementById('contractEndDate').value || '';
    const contractSalary = document.getElementById('contractSalary').value || employee.salary;
    const contractTerms = document.getElementById('contractTerms').value || 'El empleado se compromete a cumplir con las políticas y procedimientos internos del hotel, así como a mantener la confidencialidad de la información a la que tenga acceso.';
    
    document.getElementById('contractDate').textContent = formatDate(new Date().toISOString().split('T')[0]);
    document.getElementById('contractEmployeeName').textContent = `${employee.firstName} ${employee.lastName}`;
    document.getElementById('contractEmployeeAddress').textContent = employee.address;
    document.getElementById('contractEmployeePosition').textContent = getRoleName(employee.role);
    document.getElementById('contractEmployeeDepartment').textContent = getDepartmentName(employee.department);
    document.getElementById('contractTypeText').textContent = getContractTypeName(contractType).toLowerCase();
    document.getElementById('contractStartDateText').textContent = formatDate(contractStartDate);
    
    if (contractType === 'indefinido') {
      document.getElementById('contractEndDateSection').style.display = 'none';
    } else {
      document.getElementById('contractEndDateSection').style.display = 'inline';
      document.getElementById('contractEndDateText').textContent = contractEndDate ? formatDate(contractEndDate) : 'por definir';
    }
    
    document.getElementById('contractSalaryText').textContent = `$${parseFloat(contractSalary).toFixed(2)}`;
    document.getElementById('contractTermsText').textContent = contractTerms;
  }

  // Close modals
  function closeEmployeeModal() {
    employeeModal.classList.remove('active');
  }
  
  function closeEmployeeDetailModal() {
    employeeDetailModal.classList.remove('active');
  }
  
  function closeContractModal() {
    contractModal.classList.remove('active');
  }

  // Apply filters
  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const departmentValue = departmentFilter.value;
    const statusValue = statusFilter.value;
    
    filteredData = employeesData.filter(employee => {
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm) || employee.email.toLowerCase().includes(searchTerm);
      const matchesDepartment = !departmentValue || employee.department === departmentValue;
      const matchesStatus = !statusValue || employee.status === statusValue;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
    
    renderEmployeesTable();
  }

  // Event Listeners
  addEmployeeBtn.addEventListener('click', openAddEmployeeModal);
  cancelEmployeeBtn.addEventListener('click', closeEmployeeModal);
  generateContractBtn.addEventListener('click', openContractModal);
  cancelContractBtn.addEventListener('click', closeContractModal);
  applyFiltersBtn.addEventListener('click', applyFilters);
  
  // Tab navigation
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      document.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('active');
      });
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      this.classList.add('active');
      document.getElementById(`${tabId}Tab`).classList.add('active');
    });
  });
  
  // Contract form events
  document.getElementById('contractType').addEventListener('change', function() {
    const contractType = this.value;
    const durationField = document.getElementById('contractDuration');
    const endDateField = document.getElementById('contractEndDate');
    
    if (contractType === 'indefinido') {
      durationField.disabled = true;
      endDateField.disabled = true;
    } else {
      durationField.disabled = false;
      endDateField.disabled = false;
    }
    
    const employee = employeesData.find(emp => emp.id === currentEmployeeId);
    if (employee) {
      updateContractPreview(employee);
    }
  });
  
  document.getElementById('contractStartDate').addEventListener('change', function() {
    const employee = employeesData.find(emp => emp.id === currentEmployeeId);
    if (employee) {
      updateContractPreview(employee);
    }
  });
  
  document.getElementById('contractEndDate').addEventListener('change', function() {
    const employee = employeesData.find(emp => emp.id === currentEmployeeId);
    if (employee) {
      updateContractPreview(employee);
    }
  });
  
  document.getElementById('contractSalary').addEventListener('input', function() {
    const employee = employeesData.find(emp => emp.id === currentEmployeeId);
    if (employee) {
      updateContractPreview(employee);
    }
  });
  
  document.getElementById('contractTerms').addEventListener('input', function() {
    const employee = employeesData.find(emp => emp.id === currentEmployeeId);
    if (employee) {
      updateContractPreview(employee);
    }
  });
  
  // Print contract
  printContractBtn.addEventListener('click', function() {
    const contractPreview = document.getElementById('contractPreview');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Contrato de Trabajo</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.5;
              margin: 2cm;
            }
            h1 {
              font-size: 18px;
              text-align: center;
              margin-bottom: 24px;
            }
            h2 {
              font-size: 14px;
              margin-top: 24px;
              margin-bottom: 8px;
            }
            p {
              margin-bottom: 12px;
            }
            .signature {
              margin-top: 48px;
              display: flex;
              justify-content: space-between;
            }
            .signature-line {
              width: 200px;
              border-top: 1px solid #000;
              margin-top: 48px;
              padding-top: 8px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          ${contractPreview.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  });
  
  // Save employee changes
  saveEmployeeChangesBtn.addEventListener('click', function() {
    const employee = employeesData.find(emp => emp.id === currentEmployeeId);
    if (!employee) return;
    
    employee.department = document.getElementById('employeeDepartment').value;
    employee.role = document.getElementById('employeeRole').value;
    employee.status = document.getElementById('employeeStatus').value;
    employee.hireDate = document.getElementById('employeeHireDate').value;
    
    // Update UI
    document.getElementById('employeePosition').textContent = getRoleName(employee.role);
    
    // Refresh table
    applyFilters();
    
    alert('Cambios guardados correctamente');
  });
  
  // Form submissions
  employeeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(employeeForm);
    const employeeData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      department: formData.get('department'),
      role: formData.get('role'),
      hireDate: formData.get('hireDate'),
      salary: parseFloat(formData.get('salary')),
      status: 'activo',
      performance: 80
    };
    
    if (currentEmployeeId) {
      // Edit existing employee
      const index = employeesData.findIndex(emp => emp.id === currentEmployeeId);
      if (index !== -1) {
        employeesData[index] = { ...employeesData[index], ...employeeData };
      }
    } else {
      // Add new employee
      const newId = Math.max(...employeesData.map(emp => emp.id), 0) + 1;
      employeesData.push({ id: newId, ...employeeData });
    }
    
    closeEmployeeModal();
    applyFilters(); // Re-apply filters and render table
  });
  
  contractForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(contractForm);
    const contractData = {
      employeeId: currentEmployeeId,
      type: formData.get('contractType'),
      startDate: formData.get('contractStartDate'),
      endDate: formData.get('contractEndDate') || null,
      status: 'activo'
    };
    
    // Add new contract
    const newId = Math.max(...contractsData.map(contract => contract.id), 0) + 1;
    contractsData.push({ id: newId, ...contractData });
    
    closeContractModal();
    loadEmployeeContracts(currentEmployeeId);
    
    alert('Contrato generado correctamente');
  });

  // Close modal buttons
  document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });
  
  // Initialize
  renderEmployeesTable();
});