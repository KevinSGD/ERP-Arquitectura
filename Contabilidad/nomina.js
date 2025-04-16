let employees = [
    {
        id: 1,
        code: 'EMP001',
        firstName: 'Juan',
        lastName: 'Pérez',
        fullName: 'Juan Pérez',
        idNumber: '12345678',
        birthDate: '1985-05-15',
        address: 'Calle Principal 123',
        phone: '555-1234',
        email: 'juan.perez@hotel.com',
        department: 'Recepción',
        position: 'Recepcionista',
        hireDate: '2020-03-10',
        contractType: 'Indefinido',
        schedule: 'Mañana (6:00 - 14:00)',
        supervisor: '',
        baseSalary: 1200.00,
        paymentFrequency: 'Quincenal',
        bankAccount: '1234567890',
        bankName: 'Banco Nacional',
        benefits: {
            healthInsurance: true,
            mealAllowance: true,
            transportAllowance: false,
            bonusEligible: true
        },
        notes: '',
        status: 'Activo',
        lastPayment: '2023-04-30',
        paymentHistory: [
            { date: '2023-04-30', period: '16-30 Abril 2023', amount: 600.00 },
            { date: '2023-04-15', period: '1-15 Abril 2023', amount: 600.00 },
            { date: '2023-03-31', period: '16-31 Marzo 2023', amount: 600.00 }
        ]
    },
    {
        id: 2,
        code: 'EMP002',
        firstName: 'María',
        lastName: 'García',
        fullName: 'María García',
        idNumber: '87654321',
        birthDate: '1990-08-22',
        address: 'Avenida Central 456',
        phone: '555-5678',
        email: 'maria.garcia@hotel.com',
        department: 'Limpieza',
        position: 'Supervisora de Limpieza',
        hireDate: '2019-06-15',
        contractType: 'Indefinido',
        schedule: 'Mañana (6:00 - 14:00)',
        supervisor: '',
        baseSalary: 1000.00,
        paymentFrequency: 'Quincenal',
        bankAccount: '0987654321',
        bankName: 'Banco Nacional',
        benefits: {
            healthInsurance: true,
            mealAllowance: true,
            transportAllowance: true,
            bonusEligible: true
        },
        notes: 'Empleada del mes en Marzo 2023',
        status: 'Activo',
        lastPayment: '2023-04-30',
        paymentHistory: [
            { date: '2023-04-30', period: '16-30 Abril 2023', amount: 500.00 },
            { date: '2023-04-15', period: '1-15 Abril 2023', amount: 500.00 },
            { date: '2023-03-31', period: '16-31 Marzo 2023', amount: 500.00 }
        ]
    },
    {
        id: 3,
        code: 'EMP003',
        firstName: 'Carlos',
        lastName: 'López',
        fullName: 'Carlos López',
        idNumber: '23456789',
        birthDate: '1988-11-10',
        address: 'Calle Secundaria 789',
        phone: '555-9012',
        email: 'carlos.lopez@hotel.com',
        department: 'Cocina',
        position: 'Chef',
        hireDate: '2021-01-05',
        contractType: 'Indefinido',
        schedule: 'Tarde (14:00 - 22:00)',
        supervisor: '',
        baseSalary: 1500.00,
        paymentFrequency: 'Quincenal',
        bankAccount: '2345678901',
        bankName: 'Banco Internacional',
        benefits: {
            healthInsurance: true,
            mealAllowance: true,
            transportAllowance: true,
            bonusEligible: true
        },
        notes: 'Especialista en cocina internacional',
        status: 'Activo',
        lastPayment: '2023-04-30',
        paymentHistory: [
            { date: '2023-04-30', period: '16-30 Abril 2023', amount: 750.00 },
            { date: '2023-04-15', period: '1-15 Abril 2023', amount: 750.00 },
            { date: '2023-03-31', period: '16-31 Marzo 2023', amount: 750.00 }
        ]
    },
    {
        id: 4,
        code: 'EMP004',
        firstName: 'Ana',
        lastName: 'Martínez',
        fullName: 'Ana Martínez',
        idNumber: '34567890',
        birthDate: '1992-03-25',
        address: 'Avenida Norte 321',
        phone: '555-3456',
        email: 'ana.martinez@hotel.com',
        department: 'Restaurante',
        position: 'Mesera',
        hireDate: '2022-02-15',
        contractType: 'Temporal',
        schedule: 'Rotativo',
        supervisor: 'Carlos López',
        baseSalary: 800.00,
        paymentFrequency: 'Quincenal',
        bankAccount: '3456789012',
        bankName: 'Banco Nacional',
        benefits: {
            healthInsurance: true,
            mealAllowance: true,
            transportAllowance: false,
            bonusEligible: false
        },
        notes: '',
        status: 'Vacaciones',
        lastPayment: '2023-04-30',
        paymentHistory: [
            { date: '2023-04-30', period: '16-30 Abril 2023', amount: 400.00 },
            { date: '2023-04-15', period: '1-15 Abril 2023', amount: 400.00 },
            { date: '2023-03-31', period: '16-31 Marzo 2023', amount: 400.00 }
        ]
    },
    {
        id: 5,
        code: 'EMP005',
        firstName: 'Pedro',
        lastName: 'Sánchez',
        fullName: 'Pedro Sánchez',
        idNumber: '45678901',
        birthDate: '1980-07-12',
        address: 'Calle Este 654',
        phone: '555-7890',
        email: 'pedro.sanchez@hotel.com',
        department: 'Mantenimiento',
        position: 'Técnico de Mantenimiento',
        hireDate: '2018-09-01',
        contractType: 'Indefinido',
        schedule: 'Mañana (6:00 - 14:00)',
        supervisor: '',
        baseSalary: 1100.00,
        paymentFrequency: 'Quincenal',
        bankAccount: '4567890123',
        bankName: 'Banco Internacional',
        benefits: {
            healthInsurance: true,
            mealAllowance: true,
            transportAllowance: true,
            bonusEligible: true
        },
        notes: 'Certificado en sistemas eléctricos',
        status: 'Activo',
        lastPayment: '2023-04-30',
        paymentHistory: [
            { date: '2023-04-30', period: '16-30 Abril 2023', amount: 550.00 },
            { date: '2023-04-15', period: '1-15 Abril 2023', amount: 550.00 },
            { date: '2023-03-31', period: '16-31 Marzo 2023', amount: 550.00 }
        ]
    },
    {
        id: 6,
        code: 'EMP006',
        firstName: 'Laura',
        lastName: 'Rodríguez',
        fullName: 'Laura Rodríguez',
        idNumber: '56789012',
        birthDate: '1987-12-03',
        address: 'Avenida Sur 987',
        phone: '555-2345',
        email: 'laura.rodriguez@hotel.com',
        department: 'Administración',
        position: 'Contadora',
        hireDate: '2019-11-15',
        contractType: 'Indefinido',
        schedule: 'Administrativo (9:00 - 17:00)',
        supervisor: '',
        baseSalary: 1800.00,
        paymentFrequency: 'Mensual',
        bankAccount: '5678901234',
        bankName: 'Banco Nacional',
        benefits: {
            healthInsurance: true,
            mealAllowance: false,
            transportAllowance: false,
            bonusEligible: true
        },
        notes: '',
        status: 'Activo',
        lastPayment: '2023-04-30',
        paymentHistory: [
            { date: '2023-04-30', period: 'Abril 2023', amount: 1800.00 },
            { date: '2023-03-31', period: 'Marzo 2023', amount: 1800.00 },
            { date: '2023-02-28', period: 'Febrero 2023', amount: 1800.00 }
        ]
    }
];

// DOM elements
const employeesTableBody = document.getElementById('employeesTableBody');
const searchInput = document.getElementById('searchInput');
const departmentFilter = document.getElementById('departmentFilter');
const statusFilter = document.getElementById('statusFilter');
const newEmployeeBtn = document.getElementById('newEmployeeBtn');
const newPayrollBtn = document.getElementById('newPayrollBtn');
const employeeModal = document.getElementById('employeeModal');
const closeEmployeeModal = document.getElementById('closeEmployeeModal');
const cancelEmployee = document.getElementById('cancelEmployee');
const employeeForm = document.getElementById('employeeForm');
const employeeModalTitle = document.getElementById('employeeModalTitle');
const employeeId = document.getElementById('employeeId');
const employeeCode = document.getElementById('employeeCode');
const employeeStatus = document.getElementById('employeeStatus');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const idNumber = document.getElementById('idNumber');
const birthDate = document.getElementById('birthDate');
const address = document.getElementById('address');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const department = document.getElementById('department');
const position = document.getElementById('position');
const hireDate = document.getElementById('hireDate');
const contractType = document.getElementById('contractType');
const schedule = document.getElementById('schedule');
const supervisor = document.getElementById('supervisor');
const baseSalary = document.getElementById('baseSalary');
const paymentFrequency = document.getElementById('paymentFrequency');
const bankAccount = document.getElementById('bankAccount');
const bankName = document.getElementById('bankName');
const healthInsurance = document.getElementById('healthInsurance');
const mealAllowance = document.getElementById('mealAllowance');
const transportAllowance = document.getElementById('transportAllowance');
const bonusEligible = document.getElementById('bonusEligible');
const notes = document.getElementById('notes');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const payrollModal = document.getElementById('payrollModal');
const closePayrollModal = document.getElementById('closePayrollModal');
const cancelPayroll = document.getElementById('cancelPayroll');
const payrollForm = document.getElementById('payrollForm');
const payrollPeriod = document.getElementById('payrollPeriod');
const paymentDate = document.getElementById('paymentDate');
const departmentPayroll = document.getElementById('departmentPayroll');
const selectAllEmployees = document.getElementById('selectAllEmployees');
const payrollEmployeeList = document.getElementById('payrollEmployeeList');
const totalEmployees = document.getElementById('totalEmployees');
const totalBaseSalary = document.getElementById('totalBaseSalary');
const totalBonuses = document.getElementById('totalBonuses');
const totalDeductions = document.getElementById('totalDeductions');
const totalPayroll = document.getElementById('totalPayroll');
const employeeDetailsModal = document.getElementById('employeeDetailsModal');
const closeDetailsModal = document.getElementById('closeDetailsModal');
const employeeDetailsContent = document.getElementById('employeeDetailsContent');
const closeDetails = document.getElementById('closeDetails');
const editFromDetails = document.getElementById('editFromDetails');
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const cancelDelete = document.getElementById('cancelDelete');
const confirmDelete = document.getElementById('confirmDelete');

let currentEmployeeId = null;
let isNewEmployee = false;
let expandedEmployeeId = null;

// Function to render employees
function renderEmployees() {
    // Filter employees based on search and filters
    const searchTerm = searchInput.value.toLowerCase();
    const departmentValue = departmentFilter.value;
    const statusValue = statusFilter.value;
    
    const filteredEmployees = employees.filter(employee => {
        const matchesSearch = employee.fullName.toLowerCase().includes(searchTerm) || 
                             employee.code.toLowerCase().includes(searchTerm) ||
                             employee.department.toLowerCase().includes(searchTerm);
        
        const matchesDepartment = !departmentValue || employee.department === departmentValue;
        const matchesStatus = !statusValue || employee.status === statusValue;
        
        return matchesSearch && matchesDepartment && matchesStatus;
    });
    
    employeesTableBody.innerHTML = '';
    
    if (filteredEmployees.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="9" style="text-align: center; padding: 20px;">
                No se encontraron empleados. 
                <button class="add-empty-btn">Agregar un nuevo empleado</button>
            </td>
        `;
        employeesTableBody.appendChild(emptyRow);
        
        document.querySelector('.add-empty-btn').addEventListener('click', openNewEmployeeModal);
        return;
    }
    
    filteredEmployees.forEach(employee => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', employee.id);
        
        // Format salary with currency
        const formattedSalary = `$${employee.baseSalary.toFixed(2)}`;
        
        row.innerHTML = `
            <td>
                <button class="expand-btn" data-id="${employee.id}">
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
            </td>
            <td>${employee.code}</td>
            <td>${employee.fullName}</td>
            <td>${employee.department}</td>
            <td>${employee.position}</td>
            <td>
                <span class="employee-status status-${employee.status.toLowerCase()}">${employee.status}</span>
            </td>
            <td class="amount">${formattedSalary}</td>
            <td>${employee.lastPayment}</td>
            <td class="action-buttons">
                <button class="action-btn view-btn" data-id="${employee.id}" title="Ver detalles">
                    <span class="material-symbols-outlined">visibility</span>
                </button>
                <button class="action-btn edit-btn" data-id="${employee.id}" title="Editar">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="action-btn delete-btn" data-id="${employee.id}" title="Eliminar">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        `;
        
        employeesTableBody.appendChild(row);
        
        // Create details row
        const detailsRow = document.createElement('tr');
        detailsRow.className = 'employee-details-row';
        detailsRow.style.display = 'none';
        
        // Create details content
        let detailsContent = `
            <td colspan="9">
                <div class="employee-quick-details">
                    <div class="details-grid">
                        <div class="details-item">
                            <span class="details-label">Teléfono:</span> ${employee.phone}
                        </div>
                        <div class="details-item">
                            <span class="details-label">Email:</span> ${employee.email}
                        </div>
                        <div class="details-item">
                            <span class="details-label">Fecha de Contratación:</span> ${employee.hireDate}
                        </div>
                        <div class="details-item">
                            <span class="details-label">Tipo de Contrato:</span> ${employee.contractType}
                        </div>
                        <div class="details-item">
                            <span class="details-label">Horario:</span> ${employee.schedule}
                        </div>
                        <div class="details-item">
                            <span class="details-label">Frecuencia de Pago:</span> ${employee.paymentFrequency}
                        </div>
                    </div>
                    <div class="details-actions">
                        <button class="btn btn-view-details" data-id="${employee.id}">Ver todos los detalles</button>
                    </div>
                </div>
            </td>
        `;
        
        detailsRow.innerHTML = detailsContent;
        employeesTableBody.appendChild(detailsRow);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.view-btn, .btn-view-details').forEach(btn => {
        btn.addEventListener('click', handleViewEmployee);
    });
    
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', handleEditEmployee);
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteEmployee);
    });
    
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', toggleEmployeeDetails);
    });
}

// Function to toggle employee details
function toggleEmployeeDetails(e) {
    const button = e.currentTarget;
    const employeeId = parseInt(button.getAttribute('data-id'));
    const row = button.closest('tr');
    const detailsRow = row.nextElementSibling;
    
    if (button.classList.contains('expanded')) {
        // Hide details
        button.classList.remove('expanded');
        detailsRow.style.display = 'none';
        expandedEmployeeId = null;
    } else {
        // Hide any previously expanded details
        document.querySelectorAll('.expand-btn.expanded').forEach(btn => {
            btn.classList.remove('expanded');
            btn.closest('tr').nextElementSibling.style.display = 'none';
        });
        
        // Show details
        button.classList.add('expanded');
        detailsRow.style.display = 'table-row';
        expandedEmployeeId = employeeId;
    }
}

// Function to populate supervisor dropdown
function populateSupervisors() {
    supervisor.innerHTML = '<option value="">Seleccionar supervisor</option>';
    
    employees.forEach(emp => {
        const option = document.createElement('option');
        option.value = emp.fullName;
        option.textContent = `${emp.fullName} (${emp.position})`;
        supervisor.appendChild(option);
    });
}

// Function to open employee modal for new employee
function openNewEmployeeModal() {
    isNewEmployee = true;
    employeeModalTitle.textContent = 'Nuevo Empleado';
    employeeId.value = '';
    employeeForm.reset();
    
    // Generate next employee code
    const lastEmployee = employees.length > 0 ? employees[employees.length - 1] : { code: 'EMP000' };
    const lastNumber = parseInt(lastEmployee.code.replace('EMP', ''));
    employeeCode.value = `EMP${String(lastNumber + 1).padStart(3, '0')}`;
    
    // Set today's date for hire date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    hireDate.value = formattedDate;
    
    // Set default values
    employeeStatus.value = 'Activo';
    baseSalary.value = '0.00';
    
    // Populate supervisors
    populateSupervisors();
    
    // Show first tab
    showTab('personal');
    
    // Clear validation errors
    clearValidationErrors();
    
    // Show the modal with animation
    employeeModal.style.display = 'flex';
    employeeModal.style.opacity = '0';
    setTimeout(() => {
        employeeModal.style.opacity = '1';
    }, 10);
    
    // Add visual feedback to the button
    newEmployeeBtn.classList.add('active-btn');
    setTimeout(() => {
        newEmployeeBtn.classList.remove('active-btn');
    }, 300);
}

// Function to open employee modal for editing
function openEditEmployeeModal(employee) {
    isNewEmployee = false;
    employeeModalTitle.textContent = 'Editar Empleado';
    
    // Populate form fields
    employeeId.value = employee.id;
    employeeCode.value = employee.code;
    employeeStatus.value = employee.status;
    firstName.value = employee.firstName;
    lastName.value = employee.lastName;
    idNumber.value = employee.idNumber;
    birthDate.value = employee.birthDate;
    address.value = employee.address;
    phone.value = employee.phone;
    email.value = employee.email;
    department.value = employee.department;
    position.value = employee.position;
    hireDate.value = employee.hireDate;
    contractType.value = employee.contractType;
    schedule.value = employee.schedule;
    baseSalary.value = employee.baseSalary;
    paymentFrequency.value = employee.paymentFrequency;
    bankAccount.value = employee.bankAccount;
    bankName.value = employee.bankName;
    healthInsurance.checked = employee.benefits.healthInsurance;
    mealAllowance.checked = employee.benefits.mealAllowance;
    transportAllowance.checked = employee.benefits.transportAllowance;
    bonusEligible.checked = employee.benefits.bonusEligible;
    notes.value = employee.notes || '';
    
    // Populate supervisors
    populateSupervisors();
    supervisor.value = employee.supervisor;
    
    // Show first tab
    showTab('personal');
    
    // Clear validation errors
    clearValidationErrors();
    
    // Show the modal with animation
    employeeModal.style.display = 'flex';
    employeeModal.style.opacity = '0';
    setTimeout(() => {
        employeeModal.style.opacity = '1';
    }, 10);
}

// Function to show employee details
function showEmployeeDetails(employee) {
    // Format dates
    const birthDateObj = new Date(employee.birthDate);
    const formattedBirthDate = `${birthDateObj.getDate()}/${birthDateObj.getMonth() + 1}/${birthDateObj.getFullYear()}`;
    
    const hireDateObj = new Date(employee.hireDate);
    const formattedHireDate = `${hireDateObj.getDate()}/${hireDateObj.getMonth() + 1}/${hireDateObj.getFullYear()}`;
    
    // Create details HTML
    let detailsHTML = `
        <div class="details-section">
            <h3>Información Personal</h3>
            <div class="details-grid">
                <div class="details-item">
                    <span class="details-label">Nombre Completo:</span> ${employee.fullName}
                </div>
                <div class="details-item">
                    <span class="details-label">Código de Empleado:</span> ${employee.code}
                </div>
                <div class="details-item">
                    <span class="details-label">Identificación:</span> ${employee.idNumber}
                </div>
                <div class="details-item">
                    <span class="details-label">Fecha de Nacimiento:</span> ${formattedBirthDate}
                </div>
                <div class="details-item">
                    <span class="details-label">Dirección:</span> ${employee.address}
                </div>
                <div class="details-item">
                    <span class="details-label">Teléfono:</span> ${employee.phone}
                </div>
                <div class="details-item">
                    <span class="details-label">Email:</span> ${employee.email}
                </div>
                <div class="details-item">
                    <span class="details-label">Estado:</span> 
                    <span class="employee-status status-${employee.status.toLowerCase()}">${employee.status}</span>
                </div>
            </div>
        </div>
        
        <div class="details-section">
            <h3>Información Laboral</h3>
            <div class="details-grid">
                <div class="details-item">
                    <span class="details-label">Departamento:</span> ${employee.department}
                </div>
                <div class="details-item">
                    <span class="details-label">Cargo:</span> ${employee.position}
                </div>
                <div class="details-item">
                    <span class="details-label">Fecha de Contratación:</span> ${formattedHireDate}
                </div>
                <div class="details-item">
                    <span class="details-label">Tipo de Contrato:</span> ${employee.contractType}
                </div>
                <div class="details-item">
                    <span class="details-label">Horario:</span> ${employee.schedule}
                </div>
                <div class="details-item">
                    <span class="details-label">Supervisor:</span> ${employee.supervisor || 'N/A'}
                </div>
            </div>
        </div>
        
        <div class="details-section">
            <h3>Información de Pago</h3>
            <div class="details-grid">
                <div class="details-item">
                    <span class="details-label">Salario Base:</span> $${employee.baseSalary.toFixed(2)}
                </div>
                <div class="details-item">
                    <span class="details-label">Frecuencia de Pago:</span> ${employee.paymentFrequency}
                </div>
                <div class="details-item">
                    <span class="details-label">Cuenta Bancaria:</span> ${employee.bankAccount}
                </div>
                <div class="details-item">
                    <span class="details-label">Banco:</span> ${employee.bankName}
                </div>
                <div class="details-item">
                    <span class="details-label">Último Pago:</span> ${employee.lastPayment}
                </div>
            </div>
            
            <div class="details-item" style="margin-top: 10px;">
                <span class="details-label">Beneficios:</span>
                <ul style="margin-top: 5px; padding-left: 20px;">
                    ${employee.benefits.healthInsurance ? '<li>Seguro de Salud</li>' : ''}
                    ${employee.benefits.mealAllowance ? '<li>Subsidio de Alimentación</li>' : ''}
                    ${employee.benefits.transportAllowance ? '<li>Subsidio de Transporte</li>' : ''}
                    ${employee.benefits.bonusEligible ? '<li>Elegible para Bonificaciones</li>' : ''}
                </ul>
            </div>
            
            ${employee.notes ? `
            <div class="details-item" style="margin-top: 10px;">
                <span class="details-label">Notas:</span>
                <p style="margin-top: 5px;">${employee.notes}</p>
            </div>
            ` : ''}
        </div>
        
        <div class="payment-history">
            <h3>Historial de Pagos</h3>
            <table class="payment-history-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Período</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // Add payment history
    if (employee.paymentHistory && employee.paymentHistory.length > 0) {
        employee.paymentHistory.forEach(payment => {
            detailsHTML += `
                <tr>
                    <td>${payment.date}</td>
                    <td>${payment.period}</td>
                    <td>$${payment.amount.toFixed(2)}</td>
                </tr>
            `;
        });
    } else {
        detailsHTML += `
            <tr>
                <td colspan="3" style="text-align: center;">No hay pagos registrados</td>
            </tr>
        `;
    }
    
    detailsHTML += `
                </tbody>
            </table>
        </div>
    `;
    
    // Set content and show modal
    employeeDetailsContent.innerHTML = detailsHTML;
    currentEmployeeId = employee.id;
    
    employeeDetailsModal.style.display = 'flex';
    employeeDetailsModal.style.opacity = '0';
    setTimeout(() => {
        employeeDetailsModal.style.opacity = '1';
    }, 10);
}

// Function to open payroll modal
function openPayrollModal() {
    // Reset form
    payrollForm.reset();
    
    // Set today's date for payment date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    paymentDate.value = formattedDate;
    
    // Populate employee list
    populatePayrollEmployees();
    
    // Show the modal with animation
    payrollModal.style.display = 'flex';
    payrollModal.style.opacity = '0';
    setTimeout(() => {
        payrollModal.style.opacity = '1';
    }, 10);
    
    // Add visual feedback to the button
    newPayrollBtn.classList.add('active-btn');
    setTimeout(() => {
        newPayrollBtn.classList.remove('active-btn');
    }, 300);
}

// Function to populate payroll employees
function populatePayrollEmployees() {
    payrollEmployeeList.innerHTML = '';
    
    // Filter by department if selected
    const departmentValue = departmentPayroll.value;
    const filteredEmployees = departmentValue ? 
        employees.filter(emp => emp.department === departmentValue && emp.status === 'Activo') : 
        employees.filter(emp => emp.status === 'Activo');
    
    if (filteredEmployees.length === 0) {
        payrollEmployeeList.innerHTML = '<p style="text-align: center; padding: 10px;">No hay empleados activos en este departamento</p>';
        updatePayrollSummary();
        return;
    }
    
    filteredEmployees.forEach(employee => {
        const listItem = document.createElement('div');
        listItem.className = 'employee-list-item';
        
        listItem.innerHTML = `
            <input type="checkbox" class="employee-checkbox" id="emp-${employee.id}" data-id="${employee.id}" data-salary="${employee.baseSalary}">
            <label for="emp-${employee.id}">${employee.fullName} - ${employee.position}</label>
            <span class="employee-salary">$${employee.baseSalary.toFixed(2)}</span>
        `;
        
        payrollEmployeeList.appendChild(listItem);
    });
    
    // Add event listeners to checkboxes
    document.querySelectorAll('.employee-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updatePayrollSummary);
    });
    
    // Update summary
    updatePayrollSummary();
}

// Function to update payroll summary
function updatePayrollSummary() {
    const selectedEmployees = document.querySelectorAll('.employee-checkbox:checked');
    const count = selectedEmployees.length;
    
    let baseSalaryTotal = 0;
    let bonusesTotal = 0;
    let deductionsTotal = 0;
    
    selectedEmployees.forEach(checkbox => {
        const employeeId = parseInt(checkbox.getAttribute('data-id'));
        const employee = employees.find(emp => emp.id === employeeId);
        
        if (employee) {
            // Calculate based on payment frequency
            let salaryAmount = employee.baseSalary;
            if (employee.paymentFrequency === 'Quincenal') {
                salaryAmount = employee.baseSalary / 2;
            } else if (employee.paymentFrequency === 'Semanal') {
                salaryAmount = employee.baseSalary / 4;
            }
            
            baseSalaryTotal += salaryAmount;
            
            // Add bonuses (example: 5% for eligible employees)
            if (employee.benefits.bonusEligible) {
                bonusesTotal += salaryAmount * 0.05;
            }
            
            // Add deductions (example: 10% for health insurance)
            if (employee.benefits.healthInsurance) {
                deductionsTotal += salaryAmount * 0.1;
            }
        }
    });
    
    const payrollTotal = baseSalaryTotal + bonusesTotal - deductionsTotal;
    
    totalEmployees.textContent = count;
    totalBaseSalary.textContent = `$${baseSalaryTotal.toFixed(2)}`;
    totalBonuses.textContent = `$${bonusesTotal.toFixed(2)}`;
    totalDeductions.textContent = `$${deductionsTotal.toFixed(2)}`;
    totalPayroll.textContent = `$${payrollTotal.toFixed(2)}`;
}

// Function to close employee modal
function closeEmployeeModalFunc() {
    // Hide the modal with animation
    employeeModal.style.opacity = '0';
    setTimeout(() => {
        employeeModal.style.display = 'none';
    }, 300);
}

// Function to close payroll modal
function closePayrollModalFunc() {
    // Hide the modal with animation
    payrollModal.style.opacity = '0';
    setTimeout(() => {
        payrollModal.style.display = 'none';
    }, 300);
}

// Function to close employee details modal
function closeEmployeeDetailsModalFunc() {
    // Hide the modal with animation
    employeeDetailsModal.style.opacity = '0';
    setTimeout(() => {
        employeeDetailsModal.style.display = 'none';
        currentEmployeeId = null;
    }, 300);
}

// Function to close delete modal
function closeDeleteModalFunc() {
    // Hide the modal with animation
    deleteModal.style.opacity = '0';
    setTimeout(() => {
        deleteModal.style.display = 'none';
        currentEmployeeId = null;
    }, 300);
}

// Function to handle view employee button click
let handleViewEmployee = function(e) {
    const id = parseInt(e.currentTarget.getAttribute('data-id'));
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        showEmployeeDetails(employee);
    }
}

// Function to handle edit employee button click
let handleEditEmployee = function(e) {
    const id = parseInt(e.currentTarget.getAttribute('data-id'));
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        openEditEmployeeModal(employee);
    }
}

// Function to handle delete employee button click
let handleDeleteEmployee = function(e) {
    const id = parseInt(e.currentTarget.getAttribute('data-id'));
    const employee = employees.find(emp => emp.id === id);

    if (employee) {
        currentEmployeeId = id;
        
        // Update delete confirmation message
        const confirmMessage = document.querySelector('#deleteModal p');
        confirmMessage.innerHTML = `¿Está seguro que desea eliminar al empleado <strong>${employee.fullName}</strong> (${employee.code})?`;
        
        // Show the modal with animation
        deleteModal.style.display = 'flex';
        deleteModal.style.opacity = '0';
        setTimeout(() => {
            deleteModal.style.opacity = '1';
        }, 10);
    }
}

// Function to delete employee
function deleteEmployee() {
    if (currentEmployeeId) {
        const index = employees.findIndex(emp => emp.id === currentEmployeeId);
        if (index !== -1) {
            // Remove the employee
            employees.splice(index, 1);
            
            // Show success message
            showNotification('Empleado eliminado correctamente', 'success');
            
            closeDeleteModalFunc();
            renderEmployees();
            populateSupervisors();
        }
    }
}

// Function to show tab
function showTab(tabId) {
    // Hide all tabs
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(`${tabId}-tab`).classList.add('active');
    
    // Add active class to clicked button
    document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
}

// Function to validate the employee form
function validateEmployeeForm() {
    let isValid = true;
    clearValidationErrors();
    
    // Validate required fields in personal tab
    if (!employeeCode.value.trim()) {
        showValidationError(employeeCode, 'El código de empleado es obligatorio');
        isValid = false;
    }
    
    if (!firstName.value.trim()) {
        showValidationError(firstName, 'El nombre es obligatorio');
        isValid = false;
    }
    
    if (!lastName.value.trim()) {
        showValidationError(lastName, 'Los apellidos son obligatorios');
        isValid = false;
    }
    
    if (!idNumber.value.trim()) {
        showValidationError(idNumber, 'El número de identificación es obligatorio');
        isValid = false;
    }
    
    if (!birthDate.value) {
        showValidationError(birthDate, 'La fecha de nacimiento es obligatoria');
        isValid = false;
    }
    
    if (!address.value.trim()) {
        showValidationError(address, 'La dirección es obligatoria');
        isValid = false;
    }
    
    if (!phone.value.trim()) {
        showValidationError(phone, 'El teléfono es obligatorio');
        isValid = false;
    }
    
    if (!email.value.trim()) {
        showValidationError(email, 'El correo electrónico es obligatorio');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showValidationError(email, 'El correo electrónico no es válido');
        isValid = false;
    }
    
    // Validate required fields in employment tab
    if (!department.value) {
        showValidationError(department, 'El departamento es obligatorio');
        isValid = false;
    }
    
    if (!position.value.trim()) {
        showValidationError(position, 'El cargo es obligatorio');
        isValid = false;
    }
    
    if (!hireDate.value) {
        showValidationError(hireDate, 'La fecha de contratación es obligatoria');
        isValid = false;
    }
    
    // Validate required fields in payment tab
    if (baseSalary.value === '' || isNaN(parseFloat(baseSalary.value)) || parseFloat(baseSalary.value) < 0) {
        showValidationError(baseSalary, 'El salario base debe ser un número válido');
        isValid = false;
    }
    
    if (!bankAccount.value.trim()) {
        showValidationError(bankAccount, 'La cuenta bancaria es obligatoria');
        isValid = false;
    }
    
    if (!bankName.value.trim()) {
        showValidationError(bankName, 'El banco es obligatorio');
        isValid = false;
    }
    
    return isValid;
}

// Function to validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to show validation error
function showValidationError(element, message) {
    const formGroup = element.closest('.form-group');
    const errorElement = document.createElement('div');
    errorElement.className = 'validation-error';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
    element.classList.add('error-input');
    
    // Show the tab containing the error
    const tabContent = element.closest('.tab-content');
    if (tabContent && !tabContent.classList.contains('active')) {
        const tabId = tabContent.id.replace('-tab', '');
        showTab(tabId);
    }
}

// Function to clear validation errors
function clearValidationErrors() {
    document.querySelectorAll('.validation-error').forEach(el => el.remove());
    document.querySelectorAll('.error-input').forEach(el => el.classList.remove('error-input'));
}

// Function to save employee
function saveEmployee(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateEmployeeForm()) {
        return;
    }
    
    const id = employeeId.value ? parseInt(employeeId.value) : Math.max(0, ...employees.map(emp => emp.id)) + 1;
    const code = employeeCode.value.trim();
    const status = employeeStatus.value;
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const fullName = `${firstNameValue} ${lastNameValue}`;
    const idNumberValue = idNumber.value.trim();
    const birthDateValue = birthDate.value;
    const addressValue = address.value.trim();
    const phoneValue = phone.value.trim();
    const emailValue = email.value.trim();
    const departmentValue = department.value;
    const positionValue = position.value.trim();
    const hireDateValue = hireDate.value;
    const contractTypeValue = contractType.value;
    const scheduleValue = schedule.value;
    const supervisorValue = supervisor.value;
    const baseSalaryValue = parseFloat(baseSalary.value);
    const paymentFrequencyValue = paymentFrequency.value;
    const bankAccountValue = bankAccount.value.trim();
    const bankNameValue = bankName.value.trim();
    const notesValue = notes.value.trim();
    
    const benefits = {
        healthInsurance: healthInsurance.checked,
        mealAllowance: mealAllowance.checked,
        transportAllowance: transportAllowance.checked,
        bonusEligible: bonusEligible.checked
    };
    
    // Get today's date for last payment if it's a new employee
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const employeeData = {
        id,
        code,
        firstName: firstNameValue,
        lastName: lastNameValue,
        fullName,
        idNumber: idNumberValue,
        birthDate: birthDateValue,
        address: addressValue,
        phone: phoneValue,
        email: emailValue,
        department: departmentValue,
        position: positionValue,
        hireDate: hireDateValue,
        contractType: contractTypeValue,
        schedule: scheduleValue,
        supervisor: supervisorValue,
        baseSalary: baseSalaryValue,
        paymentFrequency: paymentFrequencyValue,
        bankAccount: bankAccountValue,
        bankName: bankNameValue,
        benefits,
        notes: notesValue,
        status,
        lastPayment: isNewEmployee ? formattedDate : employees.find(emp => emp.id === id)?.lastPayment || formattedDate,
        paymentHistory: isNewEmployee ? [] : employees.find(emp => emp.id === id)?.paymentHistory || []
    };
    
    if (employeeId.value) {
        // Update existing employee
        const index = employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            employees[index] = employeeData;
            showNotification('Empleado actualizado correctamente', 'success');
        }
    } else {
        // Add new employee
        employees.push(employeeData);
        showNotification('Empleado agregado correctamente', 'success');
    }
    
    closeEmployeeModalFunc();
    renderEmployees();
    populateSupervisors();
}

// Function to process payroll
function processPayroll(e) {
    e.preventDefault();
    
    // Validate form
    if (!payrollPeriod.value) {
        showValidationError(payrollPeriod, 'Debe seleccionar un período');
        return;
    }
    
    if (!paymentDate.value) {
        showValidationError(paymentDate, 'La fecha de pago es obligatoria');
        return;
    }
    
    const selectedEmployees = document.querySelectorAll('.employee-checkbox:checked');
    if (selectedEmployees.length === 0) {
        showNotification('Debe seleccionar al menos un empleado', 'error');
        return;
    }
    
    // Process payment for each selected employee
    selectedEmployees.forEach(checkbox => {
        const employeeId = parseInt(checkbox.getAttribute('data-id'));
        const employee = employees.find(emp => emp.id === employeeId);
        
        if (employee) {
            // Calculate payment amount based on frequency
            let paymentAmount = employee.baseSalary;
            if (employee.paymentFrequency === 'Quincenal') {
                paymentAmount = employee.baseSalary / 2;
            } else if (employee.paymentFrequency === 'Semanal') {
                paymentAmount = employee.baseSalary / 4;
            }
            
            // Add bonuses if eligible
            if (employee.benefits.bonusEligible) {
                paymentAmount += paymentAmount * 0.05;
            }
            
            // Subtract deductions
            if (employee.benefits.healthInsurance) {
                paymentAmount -= paymentAmount * 0.1;
            }
            
            // Update employee payment history
            employee.paymentHistory.unshift({
                date: paymentDate.value,
                period: payrollPeriod.value,
                amount: paymentAmount
            });
            
            // Update last payment date
            employee.lastPayment = paymentDate.value;
        }
    });
    
    showNotification(`Pago procesado para ${selectedEmployees.length} empleados`, 'success');
    closePayrollModalFunc();
    renderEmployees();
}

// Function to show notification
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        document.body.appendChild(notification);
    }
    
    // Set notification content and class
    notification.textContent = message;
    notification.className = `notification ${type}`;
    
    // Show notification
    notification.style.display = 'block';
    notification.style.opacity = '0';
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initial render
    renderEmployees();
    populateSupervisors();
    
    // Filter events
    searchInput.addEventListener('input', renderEmployees);
    departmentFilter.addEventListener('change', renderEmployees);
    statusFilter.addEventListener('change', renderEmployees);
    
    // New employee button
    newEmployeeBtn.addEventListener('click', function(e) {
        // Prevent multiple clicks
        if (this.classList.contains('processing')) {
            return;
        }
        
        // Add processing class
        this.classList.add('processing');
        
        // Visual feedback
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        // Open modal
        openNewEmployeeModal();
        
        // Remove ripple and processing class
        setTimeout(() => {
            ripple.remove();
            this.classList.remove('processing');
        }, 600);
    });
    
    // New payroll button
    newPayrollBtn.addEventListener('click', function(e) {
        // Prevent multiple clicks
        if (this.classList.contains('processing')) {
            return;
        }
        
        // Add processing class
        this.classList.add('processing');
        
        // Visual feedback
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        // Open modal
        openPayrollModal();
        
        // Remove ripple and processing class
        setTimeout(() => {
            ripple.remove();
            this.classList.remove('processing');
        }, 600);
    });
    
    // Tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });
    
    // Department filter in payroll modal
    departmentPayroll.addEventListener('change', populatePayrollEmployees);
    
    // Select all employees checkbox
    selectAllEmployees.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.employee-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
        updatePayrollSummary();
    });
    
    // Modal close events
    closeEmployeeModal.addEventListener('click', closeEmployeeModalFunc);
    cancelEmployee.addEventListener('click', closeEmployeeModalFunc);
    closePayrollModal.addEventListener('click', closePayrollModalFunc);
    cancelPayroll.addEventListener('click', closePayrollModalFunc);
    closeDetailsModal.addEventListener('click', closeEmployeeDetailsModalFunc);
    closeDetails.addEventListener('click', closeEmployeeDetailsModalFunc);
    
    // Edit from details button
    editFromDetails.addEventListener('click', function() {
        if (currentEmployeeId) {
            const employee = employees.find(emp => emp.id === currentEmployeeId);
            if (employee) {
                closeEmployeeDetailsModalFunc();
                setTimeout(() => {
                    openEditEmployeeModal(employee);
                }, 300);
            }
        }
    });
    
    // Close modal when clicking outside
    employeeModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeEmployeeModalFunc();
        }
    });
    
    payrollModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closePayrollModalFunc();
        }
    });
    
    employeeDetailsModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeEmployeeDetailsModalFunc();
        }
    });
    
    deleteModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeDeleteModalFunc();
        }
    });
    
    // Form submit
    employeeForm.addEventListener('submit', saveEmployee);
    payrollForm.addEventListener('submit', processPayroll);
    
    // Delete modal events
    closeDeleteModal.addEventListener('click', closeDeleteModalFunc);
    cancelDelete.addEventListener('click', closeDeleteModalFunc);
    confirmDelete.addEventListener('click', deleteEmployee);
    
    // Menu buttons with navigation
    const menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            menuButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            console.log(`Selected menu: ${this.textContent}`);

            // Abrir interfaz según el texto del botón
            switch (this.textContent.trim()) {
                case 'Transacciones':
                    window.location.href = 'Transacciones.html';
                    break;
                case 'Cuenta contable':
                    window.location.href = 'CuentaC.html';
                    break;
                case 'Facturación':
                    window.location.href = 'Factura.html';
                    break;
                case 'Nomina':
                    window.location.href = 'Nomina.html';
                    break;
            }
        });
    });
    
    // Back button
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        console.log('Back button clicked');
        // Redirigir a la página principal o anterior
        window.location.href = 'index.html';
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Escape key to close modals
        if (e.key === 'Escape') {
            if (employeeModal.style.display === 'flex') {
                closeEmployeeModalFunc();
            }
            if (payrollModal.style.display === 'flex') {
                closePayrollModalFunc();
            }
            if (employeeDetailsModal.style.display === 'flex') {
                closeEmployeeDetailsModalFunc();
            }
            if (deleteModal.style.display === 'flex') {
                closeDeleteModalFunc();
            }
        }
        
        // Alt+N to open new employee modal
        if (e.altKey && e.key === 'n') {
            e.preventDefault();
            openNewEmployeeModal();
        }
        
        // Alt+P to open payroll modal
        if (e.altKey && e.key === 'p') {
            e.preventDefault();
            openPayrollModal();
        }
    });
});

// Function declarations to resolve "undeclared variable" errors
function clearValidationErrors() {
    document.querySelectorAll('.validation-error').forEach(el => el.remove());
    document.querySelectorAll('.error-input').forEach(el => el.classList.remove('error-input'));
}