// Datos iniciales (simulando una base de datos)
let employees = [
    { id: 1, name: "Ana García", position: "Recepcionista", department: "Recepción", status: "Activo", joinDate: "2022-05-15" },
    { id: 2, name: "Carlos Rodríguez", position: "Chef", department: "Cocina", status: "Activo", joinDate: "2021-11-03" },
    { id: 3, name: "María López", position: "Camarera", department: "Limpieza", status: "Activo", joinDate: "2023-01-20" },
    { id: 4, name: "Juan Martínez", position: "Gerente", department: "Administración", status: "Activo", joinDate: "2020-08-10" },
    { id: 5, name: "Laura Sánchez", position: "Botones", department: "Servicio", status: "Inactivo", joinDate: "2022-03-25" }
];

let departments = [
    { id: 1, name: "Recepción", manager: "Juan Martínez", employees: 5, description: "Gestión de check-in, check-out y atención al cliente" },
    { id: 2, name: "Cocina", manager: "Carlos Rodríguez", employees: 8, description: "Preparación de alimentos y gestión del menú" },
    { id: 3, name: "Limpieza", manager: "María López", employees: 12, description: "Mantenimiento de habitaciones y áreas comunes" },
    { id: 4, name: "Administración", manager: "Ana García", employees: 3, description: "Gestión financiera y administrativa del hotel" },
    { id: 5, name: "Servicio", manager: "Pedro Sánchez", employees: 6, description: "Atención personalizada a huéspedes" },
    { id: 6, name: "Mantenimiento", manager: "Luis Fernández", employees: 4, description: "Reparaciones y mantenimiento de instalaciones" }
];

// Variables para el elemento a eliminar
let deleteItemId = null;
let deleteItemType = null;

// Elementos DOM
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const employeeSearch = document.getElementById('employee-search');
const addEmployeeBtn = document.getElementById('add-employee-btn');
const addDepartmentBtn = document.getElementById('add-department-btn');
const employeeModal = document.getElementById('employee-modal');
const departmentModal = document.getElementById('department-modal');
const confirmModal = document.getElementById('confirm-modal');
const employeeForm = document.getElementById('employee-form');
const departmentForm = document.getElementById('department-form');
const cancelEmployeeBtn = document.getElementById('cancel-employee-btn');
const cancelDepartmentBtn = document.getElementById('cancel-department-btn');
const cancelConfirmBtn = document.getElementById('cancel-confirm-btn');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const closeModalButtons = document.querySelectorAll('.close-modal');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    renderEmployees();
    renderDepartments();
    setupEventListeners();
});

// Configurar listeners de eventos
function setupEventListeners() {
    // Cambio de pestañas
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            changeTab(tabId);
        });
    });

    // Búsqueda de empleados
    employeeSearch.addEventListener('input', () => {
        renderEmployees(employeeSearch.value);
    });

    // Botones para abrir modales
    addEmployeeBtn.addEventListener('click', () => openEmployeeModal());
    addDepartmentBtn.addEventListener('click', () => openDepartmentModal());

    // Botones para cerrar modales
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            employeeModal.style.display = 'none';
            departmentModal.style.display = 'none';
            confirmModal.style.display = 'none';
        });
    });

    // Botones de cancelar
    cancelEmployeeBtn.addEventListener('click', () => employeeModal.style.display = 'none');
    cancelDepartmentBtn.addEventListener('click', () => departmentModal.style.display = 'none');
    cancelConfirmBtn.addEventListener('click', () => confirmModal.style.display = 'none');

    // Envío de formularios
    employeeForm.addEventListener('submit', handleEmployeeSubmit);
    departmentForm.addEventListener('submit', handleDepartmentSubmit);

    // Botón de confirmar eliminación
    confirmDeleteBtn.addEventListener('click', handleConfirmDelete);
}

// Cambiar pestaña activa
function changeTab(tabId) {
    tabButtons.forEach(button => {
        if (button.getAttribute('data-tab') === tabId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    tabContents.forEach(content => {
        if (content.id === tabId) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// Renderizar lista de empleados
function renderEmployees(searchTerm = '') {
    const tbody = document.querySelector('#employees-table tbody');
    tbody.innerHTML = '';

    const filteredEmployees = employees.filter(employee => 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredEmployees.forEach(employee => {
        const row = document.createElement('tr');
        
        // Formatear fecha
        const joinDate = new Date(employee.joinDate).toLocaleDateString();
        
        // Crear clase para el estado
        const statusClass = `status status-${employee.status.toLowerCase()}`;
        
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.department}</td>
            <td><span class="${statusClass}">${employee.status}</span></td>
            <td>${joinDate}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editEmployee(${employee.id})">
                    <i class="fas fa-edit">✏️</i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteEmployee(${employee.id})">
                    <i class="fas fa-trash">🗑️</i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Renderizar lista de departamentos
function renderDepartments() {
    const tbody = document.querySelector('#departments-table tbody');
    tbody.innerHTML = '';

    departments.forEach(department => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${department.id}</td>
            <td>${department.name}</td>
            <td>${department.manager}</td>
            <td>${department.employees}</td>
            <td>${department.description}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editDepartment(${department.id})">
                    <i class="fas fa-edit">✏️</i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteDepartment(${department.id})">
                    <i class="fas fa-trash">🗑️</i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Abrir modal para añadir empleado
function openEmployeeModal(employee = null) {
    const modalTitle = document.getElementById('employee-modal-title');
    const employeeId = document.getElementById('employee-id');
    const employeeName = document.getElementById('employee-name');
    const employeePosition = document.getElementById('employee-position');
    const employeeDepartment = document.getElementById('employee-department');
    const employeeStatus = document.getElementById('employee-status');
    const employeeJoinDate = document.getElementById('employee-join-date');

    if (employee) {
        modalTitle.textContent = 'Editar Empleado';
        employeeId.value = employee.id;
        employeeName.value = employee.name;
        employeePosition.value = employee.position;
        employeeDepartment.value = employee.department;
        employeeStatus.value = employee.status;
        employeeJoinDate.value = employee.joinDate;
    } else {
        modalTitle.textContent = 'Añadir Nuevo Empleado';
        employeeForm.reset();
        employeeId.value = '';
        // Establecer fecha actual por defecto
        employeeJoinDate.value = new Date().toISOString().split('T')[0];
    }

    employeeModal.style.display = 'block';
}

// Abrir modal para añadir departamento
function openDepartmentModal(department = null) {
    const modalTitle = document.getElementById('department-modal-title');
    const departmentId = document.getElementById('department-id');
    const departmentName = document.getElementById('department-name');
    const departmentManager = document.getElementById('department-manager');
    const departmentEmployees = document.getElementById('department-employees');
    const departmentDescription = document.getElementById('department-description');

    if (department) {
        modalTitle.textContent = 'Editar Departamento';
        departmentId.value = department.id;
        departmentName.value = department.name;
        departmentManager.value = department.manager;
        departmentEmployees.value = department.employees;
        departmentDescription.value = department.description;
    } else {
        modalTitle.textContent = 'Añadir Nuevo Departamento';
        departmentForm.reset();
        departmentId.value = '';
    }

    departmentModal.style.display = 'block';
}

// Manejar envío del formulario de empleado
function handleEmployeeSubmit(e) {
    e.preventDefault();
    
    const employeeId = document.getElementById('employee-id').value;
    const name = document.getElementById('employee-name').value;
    const position = document.getElementById('employee-position').value;
    const department = document.getElementById('employee-department').value;
    const status = document.getElementById('employee-status').value;
    const joinDate = document.getElementById('employee-join-date').value;
    
    if (employeeId) {
        // Actualizar empleado existente
        const index = employees.findIndex(emp => emp.id === parseInt(employeeId));
        if (index !== -1) {
            employees[index] = {
                id: parseInt(employeeId),
                name,
                position,
                department,
                status,
                joinDate
            };
        }
    } else {
        // Añadir nuevo empleado
        const newId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
        employees.push({
            id: newId,
            name,
            position,
            department,
            status,
            joinDate
        });
    }
    
    renderEmployees();
    employeeModal.style.display = 'none';
}

// Manejar envío del formulario de departamento
function handleDepartmentSubmit(e) {
    e.preventDefault();
    
    const departmentId = document.getElementById('department-id').value;
    const name = document.getElementById('department-name').value;
    const manager = document.getElementById('department-manager').value;
    const employeesCount = parseInt(document.getElementById('department-employees').value);
    const description = document.getElementById('department-description').value;
    
    if (departmentId) {
        // Actualizar departamento existente
        const index = departments.findIndex(dept => dept.id === parseInt(departmentId));
        if (index !== -1) {
            departments[index] = {
                id: parseInt(departmentId),
                name,
                manager,
                employees: employeesCount,
                description
            };
        }
    } else {
        // Añadir nuevo departamento
        const newId = departments.length > 0 ? Math.max(...departments.map(dept => dept.id)) + 1 : 1;
        departments.push({
            id: newId,
            name,
            manager,
            employees: employeesCount,
            description
        });
    }
    
    renderDepartments();
    departmentModal.style.display = 'none';
}

// Editar empleado
function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        openEmployeeModal(employee);
    }
}

// Eliminar empleado
function deleteEmployee(id) {
    deleteItemId = id;
    deleteItemType = 'employee';
    document.getElementById('confirm-message').textContent = '¿Está seguro que desea eliminar este empleado?';
    confirmModal.style.display = 'block';
}

// Editar departamento
function editDepartment(id) {
    const department = departments.find(dept => dept.id === id);
    if (department) {
        openDepartmentModal(department);
    }
}

// Eliminar departamento
function deleteDepartment(id) {
    deleteItemId = id;
    deleteItemType = 'department';
    document.getElementById('confirm-message').textContent = '¿Está seguro que desea eliminar este departamento?';
    confirmModal.style.display = 'block';
}

// Manejar confirmación de eliminación
function handleConfirmDelete() {
    if (deleteItemType === 'employee') {
        employees = employees.filter(emp => emp.id !== deleteItemId);
        renderEmployees();
    } else if (deleteItemType === 'department') {
        departments = departments.filter(dept => dept.id !== deleteItemId);
        renderDepartments();
    }
    
    confirmModal.style.display = 'none';
    deleteItemId = null;
    deleteItemType = null;
}

// Cerrar modales al hacer clic fuera del contenido
window.addEventListener('click', function(event) {
    if (event.target === employeeModal) {
        employeeModal.style.display = 'none';
    }
    if (event.target === departmentModal) {
        departmentModal.style.display = 'none';
    }
    if (event.target === confirmModal) {
        confirmModal.style.display = 'none';
    }
});