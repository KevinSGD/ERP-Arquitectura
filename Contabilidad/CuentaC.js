// Sample data for accounts
let accounts = [
    { id: 1, code: '1000', name: 'Activos', type: 'Activo', balance: 0.00 },
    { id: 2, code: '2000', name: 'Pasivos', type: 'Pasivo', balance: 0.00 },
    { id: 3, code: '3000', name: 'Patrimonio', type: 'Patrimonio', balance: 0.00 },
    { id: 4, code: '4000', name: 'Ingresos', type: 'Ingreso', balance: 10000.00 },
    { id: 5, code: '5000', name: 'Gastos', type: 'Gasto', balance: 3000.00 }
];

// DOM elements
const accountsTableBody = document.getElementById('accountsTableBody');
const searchInput = document.getElementById('searchInput');
const newAccountBtn = document.getElementById('newAccountBtn');
const accountModal = document.getElementById('accountModal');
const closeModal = document.getElementById('closeModal');
const cancelAccount = document.getElementById('cancelAccount');
const accountForm = document.getElementById('accountForm');
const modalTitle = document.getElementById('modalTitle');
const accountId = document.getElementById('accountId');
const accountCode = document.getElementById('accountCode');
const accountName = document.getElementById('accountName');
const accountType = document.getElementById('accountType');
const accountBalance = document.getElementById('accountBalance');
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const cancelDelete = document.getElementById('cancelDelete');
const confirmDelete = document.getElementById('confirmDelete');

let currentAccountId = null;
let isNewAccount = false;

// Function to render accounts
function renderAccounts(accountsToRender) {
    accountsTableBody.innerHTML = '';
    
    if (accountsToRender.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="5" style="text-align: center; padding: 20px;">
                No se encontraron cuentas. 
                <button class="add-empty-btn">Agregar una nueva cuenta</button>
            </td>
        `;
        accountsTableBody.appendChild(emptyRow);
        
        document.querySelector('.add-empty-btn').addEventListener('click', openNewAccountModal);
        return;
    }
    
    accountsToRender.forEach(account => {
        const row = document.createElement('tr');
        
        // Format balance with currency
        const formattedBalance = `$${account.balance.toFixed(2)}`;
        
        row.innerHTML = `
            <td>${account.code}</td>
            <td>${account.name}</td>
            <td>${account.type}</td>
            <td class="amount">${formattedBalance}</td>
            <td class="action-buttons">
                <button class="action-btn edit-btn" data-id="${account.id}" title="Editar">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="action-btn delete-btn" data-id="${account.id}" title="Eliminar">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        `;
        
        accountsTableBody.appendChild(row);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', handleEditAccount);
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteAccount);
    });
}

// Function to filter accounts
function filterAccounts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filtered = accounts.filter(account => {
        const matchesCode = account.code.toLowerCase().includes(searchTerm);
        const matchesName = account.name.toLowerCase().includes(searchTerm);
        const matchesType = account.type.toLowerCase().includes(searchTerm);
        
        return matchesCode || matchesName || matchesType;
    });
    
    renderAccounts(filtered);
}

// Function to open account modal for new account
function openNewAccountModal() {
    isNewAccount = true;
    modalTitle.textContent = 'Nueva Cuenta';
    accountId.value = '';
    accountForm.reset();
    
    // Set default values
    accountBalance.value = '0.00';
    accountType.value = 'Activo';
    
    // Generate next available code
    const maxCode = Math.max(...accounts.map(a => parseInt(a.code) || 0));
    accountCode.value = (maxCode + 1000).toString();
    
    // Clear validation errors
    clearValidationErrors();
    
    // Show the modal with animation
    accountModal.style.display = 'flex';
    accountModal.style.opacity = '0';
    setTimeout(() => {
        accountModal.style.opacity = '1';
    }, 10);
    
    // Focus on the name field
    setTimeout(() => {
        accountName.focus();
    }, 300);
    
    // Add visual feedback to the button
    newAccountBtn.classList.add('active-btn');
    setTimeout(() => {
        newAccountBtn.classList.remove('active-btn');
    }, 300);
}

// Function to open account modal for editing
function openEditAccountModal(account) {
    isNewAccount = false;
    modalTitle.textContent = 'Editar Cuenta';
    accountId.value = account.id;
    accountCode.value = account.code;
    accountName.value = account.name;
    accountType.value = account.type;
    accountBalance.value = account.balance;
    
    // Clear validation errors
    clearValidationErrors();
    
    // Show the modal with animation
    accountModal.style.display = 'flex';
    accountModal.style.opacity = '0';
    setTimeout(() => {
        accountModal.style.opacity = '1';
    }, 10);
    
    // Focus on the name field
    setTimeout(() => {
        accountName.focus();
    }, 300);
}

// Function to close account modal
function closeAccountModal() {
    // Hide the modal with animation
    accountModal.style.opacity = '0';
    setTimeout(() => {
        accountModal.style.display = 'none';
    }, 300);
}

// Function to handle edit account button click
function handleEditAccount(e) {
    const id = parseInt(e.currentTarget.getAttribute('data-id'));
    const account = accounts.find(a => a.id === id);
    if (account) {
        openEditAccountModal(account);
    }
}

// Function to handle delete account button click
function handleDeleteAccount(e) {
    const id = parseInt(e.currentTarget.getAttribute('data-id'));
    const account = accounts.find(a => a.id === id);
    
    if (account) {
        currentAccountId = id;
        
        // Update delete confirmation message
        const confirmMessage = document.querySelector('#deleteModal p');
        confirmMessage.innerHTML = `¿Está seguro que desea eliminar la cuenta <strong>${account.name} (${account.code})</strong>?`;
        
        // Show the modal with animation
        deleteModal.style.display = 'flex';
        deleteModal.style.opacity = '0';
        setTimeout(() => {
            deleteModal.style.opacity = '1';
        }, 10);
    }
}

// Function to close delete modal
function closeDeleteModalFunc() {
    // Hide the modal with animation
    deleteModal.style.opacity = '0';
    setTimeout(() => {
        deleteModal.style.display = 'none';
        currentAccountId = null;
    }, 300);
}

// Function to delete account
function deleteAccount() {
    if (currentAccountId) {
        const index = accounts.findIndex(a => a.id === currentAccountId);
        if (index !== -1) {
            // Remove the account
            accounts.splice(index, 1);
            
            // Show success message
            showNotification('Cuenta eliminada correctamente', 'success');
            
            closeDeleteModalFunc();
            filterAccounts();
        }
    }
}

// Function to validate the account form
function validateAccountForm() {
    let isValid = true;
    clearValidationErrors();
    
    // Validate code
    if (!accountCode.value.trim()) {
        showValidationError(accountCode, 'El código es obligatorio');
        isValid = false;
    } else if (isNewAccount && accounts.some(a => a.code === accountCode.value.trim())) {
        showValidationError(accountCode, 'Este código ya está en uso');
        isValid = false;
    }
    
    // Validate name
    if (!accountName.value.trim()) {
        showValidationError(accountName, 'El nombre es obligatorio');
        isValid = false;
    }
    
    // Validate balance
    if (accountBalance.value === '' || isNaN(parseFloat(accountBalance.value))) {
        showValidationError(accountBalance, 'El saldo debe ser un número válido');
        isValid = false;
    }
    
    return isValid;
}

// Function to show validation error
function showValidationError(element, message) {
    const formGroup = element.closest('.form-group');
    const errorElement = document.createElement('div');
    errorElement.className = 'validation-error';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
    element.classList.add('error-input');
}

// Function to clear validation errors
function clearValidationErrors() {
    document.querySelectorAll('.validation-error').forEach(el => el.remove());
    document.querySelectorAll('.error-input').forEach(el => el.classList.remove('error-input'));
}

// Function to save account
function saveAccount(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateAccountForm()) {
        return;
    }
    
    const id = accountId.value ? parseInt(accountId.value) : Math.max(0, ...accounts.map(a => a.id)) + 1;
    const code = accountCode.value.trim();
    const name = accountName.value.trim();
    const type = accountType.value;
    const balance = parseFloat(accountBalance.value);
    
    if (accountId.value) {
        // Update existing account
        const index = accounts.findIndex(a => a.id === id);
        if (index !== -1) {
            accounts[index] = { id, code, name, type, balance };
            showNotification('Cuenta actualizada correctamente', 'success');
        }
    } else {
        // Add new account
        accounts.push({ id, code, name, type, balance });
        showNotification('Cuenta agregada correctamente', 'success');
    }
    
    closeAccountModal();
    filterAccounts();
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
    renderAccounts(accounts);
    
    // Filter events
    searchInput.addEventListener('input', filterAccounts);
    
    // New account button with visual feedback
    newAccountBtn.addEventListener('click', function(e) {
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
        openNewAccountModal();
        
        // Remove ripple and processing class
        setTimeout(() => {
            ripple.remove();
            this.classList.remove('processing');
        }, 600);
    });
    
    // Modal close events
    closeModal.addEventListener('click', closeAccountModal);
    cancelAccount.addEventListener('click', closeAccountModal);
    
    // Close modal when clicking outside
    accountModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeAccountModal();
        }
    });
    
    deleteModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeDeleteModalFunc();
        }
    });
    
    // Form submit
    accountForm.addEventListener('submit', saveAccount);
    
    // Delete modal events
    closeDeleteModal.addEventListener('click', closeDeleteModalFunc);
    cancelDelete.addEventListener('click', closeDeleteModalFunc);
    confirmDelete.addEventListener('click', deleteAccount);
    
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
                    window.location.href = 'cuenta.html';
                    break;
                case 'Facturación':
                    window.location.href = 'facturacion.html';
                    break;
                case 'Nomina':
                    window.location.href = 'nomina.html';
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
            if (accountModal.style.display === 'flex') {
                closeAccountModal();
            }
            if (deleteModal.style.display === 'flex') {
                closeDeleteModalFunc();
            }
        }
        
        // Alt+N to open new account modal
        if (e.altKey && e.key === 'n') {
            e.preventDefault();
            openNewAccountModal();
        }
    });
});