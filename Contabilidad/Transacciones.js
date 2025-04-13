// Sample data for transactions
let transactions = [
    { id: 1, date: '2023-06-01', description: 'Renta habitación 101', amount: 450.00, type: 'ingreso' },
    { id: 2, date: '2023-05-01', description: 'Compra suministros', amount: 85.00, type: 'gasto' },
    { id: 3, date: '2023-05-02', description: 'Servicio de restaurante', amount: 75.00, type: 'ingreso' },
    { id: 4, date: '2023-05-03', description: 'Pago nómina', amount: 3000.00, type: 'gasto' },
    { id: 5, date: '2023-05-04', description: 'Renta sala de conferencias', amount: 120.00, type: 'ingreso' }
];

// DOM elements
const transactionsTableBody = document.getElementById('transactionsTableBody');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const dateFilter = document.getElementById('dateFilter');
const newTransactionBtn = document.getElementById('newTransactionBtn');
const transactionModal = document.getElementById('transactionModal');
const closeModal = document.getElementById('closeModal');
const cancelTransaction = document.getElementById('cancelTransaction');
const transactionForm = document.getElementById('transactionForm');
const modalTitle = document.getElementById('modalTitle');
const transactionId = document.getElementById('transactionId');
const transactionDate = document.getElementById('transactionDate');
const transactionDescription = document.getElementById('transactionDescription');
const transactionAmount = document.getElementById('transactionAmount');
const transactionType = document.getElementById('transactionType');
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const cancelDelete = document.getElementById('cancelDelete');
const confirmDelete = document.getElementById('confirmDelete');

let currentTransactionId = null;
let isNewTransaction = false;

// Function to render transactions
function renderTransactions(transactionsToRender) {
    transactionsTableBody.innerHTML = '';
    
    if (transactionsToRender.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="6" style="text-align: center; padding: 20px;">
                No se encontraron transacciones. 
                <button class="add-empty-btn">Agregar una nueva transacción</button>
            </td>
        `;
        transactionsTableBody.appendChild(emptyRow);
        
        document.querySelector('.add-empty-btn').addEventListener('click', openNewTransactionModal);
        return;
    }
    
    transactionsToRender.forEach(transaction => {
        const row = document.createElement('tr');
        
        // Format date for display
        const dateObj = new Date(transaction.date);
        const formattedDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
        
        // Format amount with currency
        const formattedAmount = `$${transaction.amount.toFixed(2)}`;
        
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${formattedDate}</td>
            <td>${transaction.description}</td>
            <td class="amount">${formattedAmount}</td>
            <td>
                <span class="transaction-type type-${transaction.type}">
                    ${transaction.type === 'ingreso' ? 'Ingreso' : 'Gasto'}
                </span>
            </td>
            <td class="action-buttons">
                <button class="action-btn edit-btn" data-id="${transaction.id}" title="Editar">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="action-btn delete-btn" data-id="${transaction.id}" title="Eliminar">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        `;
        
        transactionsTableBody.appendChild(row);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', handleEditTransaction);
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteTransaction);
    });
}

// Function to filter transactions
function filterTransactions() {
    const searchTerm = searchInput.value.toLowerCase();
    const typeValue = typeFilter.value;
    const dateValue = dateFilter.value;
    
    const filtered = transactions.filter(transaction => {
        const matchesSearch = transaction.description.toLowerCase().includes(searchTerm);
        const matchesType = typeValue === '' || transaction.type === typeValue;
        const matchesDate = dateValue === '' || transaction.date === dateValue;
        
        return matchesSearch && matchesType && matchesDate;
    });
    
    renderTransactions(filtered);
}

// Function to open transaction modal for new transaction
function openNewTransactionModal() {
    isNewTransaction = true;
    modalTitle.textContent = 'Nueva Transacción';
    transactionId.value = '';
    transactionForm.reset();
    
    // Set today's date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    transactionDate.value = formattedDate;
    
    // Set default values
    transactionType.value = 'ingreso';
    
    // Clear validation errors
    clearValidationErrors();
    
    // Show the modal with animation
    transactionModal.style.display = 'flex';
    transactionModal.style.opacity = '0';
    setTimeout(() => {
        transactionModal.style.opacity = '1';
    }, 10);
    
    // Focus on the first field
    setTimeout(() => {
        transactionDescription.focus();
    }, 300);
    
    // Add visual feedback to the button
    newTransactionBtn.classList.add('active-btn');
    setTimeout(() => {
        newTransactionBtn.classList.remove('active-btn');
    }, 300);
}

// Function to open transaction modal for editing
function openEditTransactionModal(transaction) {
    isNewTransaction = false;
    modalTitle.textContent = 'Editar Transacción';
    transactionId.value = transaction.id;
    transactionDate.value = transaction.date;
    transactionDescription.value = transaction.description;
    transactionAmount.value = transaction.amount;
    transactionType.value = transaction.type;
    
    // Clear validation errors
    clearValidationErrors();
    
    // Show the modal with animation
    transactionModal.style.display = 'flex';
    transactionModal.style.opacity = '0';
    setTimeout(() => {
        transactionModal.style.opacity = '1';
    }, 10);
    
    // Focus on the description field
    setTimeout(() => {
        transactionDescription.focus();
    }, 300);
}

// Function to close transaction modal
function closeTransactionModal() {
    // Hide the modal with animation
    transactionModal.style.opacity = '0';
    setTimeout(() => {
        transactionModal.style.display = 'none';
    }, 300);
}

// Function to handle edit transaction button click
function handleEditTransaction(e) {
    const id = parseInt(e.currentTarget.getAttribute('data-id'));
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
        openEditTransactionModal(transaction);
    }
}

// Function to handle delete transaction button click
function handleDeleteTransaction(e) {
    const id = parseInt(e.currentTarget.getAttribute('data-id'));
    const transaction = transactions.find(t => t.id === id);
    
    if (transaction) {
        currentTransactionId = id;
        
        // Update delete confirmation message
        const confirmMessage = document.querySelector('#deleteModal p');
        confirmMessage.innerHTML = `¿Está seguro que desea eliminar la transacción <strong>${transaction.description}</strong>?`;
        
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
        currentTransactionId = null;
    }, 300);
}

// Function to delete transaction
function deleteTransaction() {
    if (currentTransactionId) {
        const index = transactions.findIndex(t => t.id === currentTransactionId);
        if (index !== -1) {
            // Remove the transaction
            transactions.splice(index, 1);
            
            // Show success message
            showNotification('Transacción eliminada correctamente', 'success');
            
            closeDeleteModalFunc();
            filterTransactions();
        }
    }
}

// Function to validate the transaction form
function validateTransactionForm() {
    let isValid = true;
    clearValidationErrors();
    
    // Validate description
    if (!transactionDescription.value.trim()) {
        showValidationError(transactionDescription, 'La descripción es obligatoria');
        isValid = false;
    }
    
    // Validate amount
    if (!transactionAmount.value || parseFloat(transactionAmount.value) <= 0) {
        showValidationError(transactionAmount, 'El monto debe ser mayor que cero');
        isValid = false;
    }
    
    // Validate date
    if (!transactionDate.value) {
        showValidationError(transactionDate, 'La fecha es obligatoria');
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

// Function to save transaction
function saveTransaction(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateTransactionForm()) {
        return;
    }
    
    const id = transactionId.value ? parseInt(transactionId.value) : Math.max(0, ...transactions.map(t => t.id)) + 1;
    const date = transactionDate.value;
    const description = transactionDescription.value.trim();
    const amount = parseFloat(transactionAmount.value);
    const type = transactionType.value;
    
    if (transactionId.value) {
        // Update existing transaction
        const index = transactions.findIndex(t => t.id === id);
        if (index !== -1) {
            transactions[index] = { id, date, description, amount, type };
            showNotification('Transacción actualizada correctamente', 'success');
        }
    } else {
        // Add new transaction
        transactions.push({ id, date, description, amount, type });
        showNotification('Transacción agregada correctamente', 'success');
    }
    
    closeTransactionModal();
    filterTransactions();
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
    renderTransactions(transactions);
    
    // Filter events
    searchInput.addEventListener('input', filterTransactions);
    typeFilter.addEventListener('change', filterTransactions);
    dateFilter.addEventListener('change', filterTransactions);
    
    // New transaction button with visual feedback
    newTransactionBtn.addEventListener('click', function(e) {
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
        openNewTransactionModal();
        
        // Remove ripple and processing class
        setTimeout(() => {
            ripple.remove();
            this.classList.remove('processing');
        }, 600);
    });
    
    // Modal close events
    closeModal.addEventListener('click', closeTransactionModal);
    cancelTransaction.addEventListener('click', closeTransactionModal);
    
    // Close modal when clicking outside
    transactionModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeTransactionModal();
        }
    });
    
    deleteModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeDeleteModalFunc();
        }
    });
    
    // Form submit
    transactionForm.addEventListener('submit', saveTransaction);
    
    // Delete modal events
    closeDeleteModal.addEventListener('click', closeDeleteModalFunc);
    cancelDelete.addEventListener('click', closeDeleteModalFunc);
    confirmDelete.addEventListener('click', deleteTransaction);
    
    // Menu buttons
    const menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            menuButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Back button
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        console.log('Back button clicked');
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Escape key to close modals
        if (e.key === 'Escape') {
            if (transactionModal.style.display === 'flex') {
                closeTransactionModal();
            }
            if (deleteModal.style.display === 'flex') {
                closeDeleteModalFunc();
            }
        }
        
        // Alt+N to open new transaction modal
        if (e.altKey && e.key === 'n') {
            e.preventDefault();
            openNewTransactionModal();
        }
    });
});