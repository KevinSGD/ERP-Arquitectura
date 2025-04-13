// Sample data for invoices
let invoices = [
    { 
        id: 1, 
        number: 'F001-00001', 
        date: '2023-05-01', 
        client: 'Juan Pérez', 
        status: 'Pagada', 
        total: 150.00,
        items: [
            { description: 'Servicio de consultoría', quantity: 1, price: 150.00 }
        ]
    },
    { 
        id: 2, 
        number: 'F001-00002', 
        date: '2023-05-02', 
        client: 'María García', 
        status: 'Pendiente', 
        total: 300.00,
        items: [
            { description: 'Diseño de logo', quantity: 1, price: 200.00 },
            { description: 'Tarjetas de presentación', quantity: 100, price: 1.00 }
        ]
    },
    { 
        id: 3, 
        number: 'F001-00003', 
        date: '2023-05-03', 
        client: 'Carlos López', 
        status: 'Vencida', 
        total: 100.00,
        items: [
            { description: 'Mantenimiento web', quantity: 1, price: 100.00 }
        ]
    },
    { 
        id: 4, 
        number: 'F001-00004', 
        date: '2023-05-04', 
        client: 'Ana Martínez', 
        status: 'Pagada', 
        total: 350.00,
        items: [
            { description: 'Desarrollo de aplicación', quantity: 1, price: 350.00 }
        ]
    },
    { 
        id: 5, 
        number: 'F001-00005', 
        date: '2023-05-05', 
        client: 'Pedro Sánchez', 
        status: 'Pendiente', 
        total: 120.00,
        items: [
            { description: 'Soporte técnico', quantity: 2, price: 60.00 }
        ]
    }
];

// DOM elements
const invoicesTableBody = document.getElementById('invoicesTableBody');
const newInvoiceBtn = document.getElementById('newInvoiceBtn');
const invoiceModal = document.getElementById('invoiceModal');
const closeModal = document.getElementById('closeModal');
const cancelInvoice = document.getElementById('cancelInvoice');
const invoiceForm = document.getElementById('invoiceForm');
const modalTitle = document.getElementById('modalTitle');
const invoiceId = document.getElementById('invoiceId');
const invoiceNumber = document.getElementById('invoiceNumber');
const invoiceDate = document.getElementById('invoiceDate');
const invoiceClient = document.getElementById('invoiceClient');
const invoiceStatus = document.getElementById('invoiceStatus');
const invoiceItems = document.getElementById('invoiceItems');
const addItemBtn = document.getElementById('addItemBtn');
const subtotalAmount = document.getElementById('subtotalAmount');
const taxAmount = document.getElementById('taxAmount');
const totalAmount = document.getElementById('totalAmount');
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const cancelDelete = document.getElementById('cancelDelete');
const confirmDelete = document.getElementById('confirmDelete');
const invoiceItemTemplate = document.getElementById('invoiceItemTemplate');

let currentInvoiceId = null;
let isNewInvoice = false;
let expandedInvoiceId = null;

// Function to render invoices
function renderInvoices() {
    invoicesTableBody.innerHTML = '';
    
    if (invoices.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="6" style="text-align: center; padding: 20px;">
                No se encontraron facturas. 
                <button class="add-empty-btn">Crear una nueva factura</button>
            </td>
        `;
        invoicesTableBody.appendChild(emptyRow);
        
        document.querySelector('.add-empty-btn').addEventListener('click', openNewInvoiceModal);
        return;
    }
    
    invoices.forEach(invoice => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', invoice.id);
        
        // Format date for display
        const dateObj = new Date(invoice.date);
        const formattedDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
        
        // Format amount with currency
        const formattedTotal = `$${invoice.total.toFixed(2)}`;
        
        row.innerHTML = `
            <td>
                <button class="expand-btn" data-id="${invoice.id}">
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
            </td>
            <td>
                ${invoice.number}
                <span class="invoice-status status-${invoice.status.toLowerCase()}">${invoice.status}</span>
            </td>
            <td>${formattedDate}</td>
            <td>${invoice.client}</td>
            <td class="amount">${formattedTotal}</td>
            <td class="action-buttons">
                <button class="action-btn edit-btn" data-id="${invoice.id}" title="Editar">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="action-btn delete-btn" data-id="${invoice.id}" title="Eliminar">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        `;
        
        invoicesTableBody.appendChild(row);
        
        // Create details row
        const detailsRow = document.createElement('tr');
        detailsRow.className = 'details-row';
        detailsRow.style.display = 'none';
        
        // Calculate subtotal and tax
        const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        const tax = subtotal * 0.16; // 16% tax
        
        // Create details content
        let detailsContent = `
            <td colspan="6">
                <div class="invoice-details" id="details-${invoice.id}">
                    <h3>Detalles de Factura: ${invoice.number}</h3>
                    <p><strong>Cliente:</strong> ${invoice.client}</p>
                    <p><strong>Fecha:</strong> ${formattedDate}</p>
                    <p><strong>Estado:</strong> ${invoice.status}</p>
                    
                    <table class="details-table">
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        // Add items to details
        invoice.items.forEach(item => {
            const itemTotal = item.quantity * item.price;
            detailsContent += `
                <tr>
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>$${itemTotal.toFixed(2)}</td>
                </tr>
            `;
        });
        
        // Add summary to details
        detailsContent += `
                        </tbody>
                    </table>
                    
                    <div class="details-summary">
                        <div><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</div>
                        <div><strong>IVA (16%):</strong> $${tax.toFixed(2)}</div>
                        <div><strong>Total:</strong> $${invoice.total.toFixed(2)}</div>
                    </div>
                </div>
            </td>
        `;
        
        detailsRow.innerHTML = detailsContent;
        invoicesTableBody.appendChild(detailsRow);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', handleEditInvoice);
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteInvoice);
    });
    
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', toggleInvoiceDetails);
    });
}

// Function to toggle invoice details
function toggleInvoiceDetails(e) {
    const button = e.currentTarget;
    const invoiceId = parseInt(button.getAttribute('data-id'));
    const row = button.closest('tr');
    const detailsRow = row.nextElementSibling;
    
    if (button.classList.contains('expanded')) {
        // Hide details
        button.classList.remove('expanded');
        detailsRow.style.display = 'none';
        expandedInvoiceId = null;
    } else {
        // Hide any previously expanded details
        document.querySelectorAll('.expand-btn.expanded').forEach(btn => {
            btn.classList.remove('expanded');
            btn.closest('tr').nextElementSibling.style.display = 'none';
        });
        
        // Show details
        button.classList.add('expanded');
        detailsRow.style.display = 'table-row';
        expandedInvoiceId = invoiceId;
    }
}

// Function to open invoice modal for new invoice
function openNewInvoiceModal() {
    isNewInvoice = true;
    modalTitle.textContent = 'Nueva Factura';
    invoiceId.value = '';
    invoiceForm.reset();
    
    // Generate next invoice number
    const lastInvoice = invoices.length > 0 ? invoices[invoices.length - 1] : { number: 'F001-00000' };
    const lastNumber = parseInt(lastInvoice.number.split('-')[1]);
    invoiceNumber.value = `F001-${String(lastNumber + 1).padStart(5, '0')}`;
    
    // Set today's date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    invoiceDate.value = formattedDate;
    
    // Clear items
    invoiceItems.innerHTML = '';
    
    // Add one empty item
    addInvoiceItem();
    
    // Update totals
    updateInvoiceTotals();
    
    // Clear validation errors
    clearValidationErrors();
    
    // Show the modal with animation
    invoiceModal.style.display = 'flex';
    invoiceModal.style.opacity = '0';
    setTimeout(() => {
        invoiceModal.style.opacity = '1';
    }, 10);
    
    // Add visual feedback to the button
    newInvoiceBtn.classList.add('active-btn');
    setTimeout(() => {
        newInvoiceBtn.classList.remove('active-btn');
    }, 300);
}

// Function to open invoice modal for editing
function openEditInvoiceModal(invoice) {
    isNewInvoice = false;
    modalTitle.textContent = 'Editar Factura';
    invoiceId.value = invoice.id;
    invoiceNumber.value = invoice.number;
    invoiceDate.value = invoice.date;
    invoiceClient.value = invoice.client;
    invoiceStatus.value = invoice.status;
    
    // Clear items
    invoiceItems.innerHTML = '';
    
    // Add invoice items
    invoice.items.forEach(item => {
        addInvoiceItem(item);
    });
    
    // Update totals
    updateInvoiceTotals();
    
    // Clear validation errors
    clearValidationErrors();
    
    // Show the modal with animation
    invoiceModal.style.display = 'flex';
    invoiceModal.style.opacity = '0';
    setTimeout(() => {
        invoiceModal.style.opacity = '1';
    }, 10);
}

// Function to add an invoice item to the form
function addInvoiceItem(item = null) {
    const template = invoiceItemTemplate.content.cloneNode(true);
    const itemElement = template.querySelector('.invoice-item');
    
    const nameInput = itemElement.querySelector('.item-name');
    const qtyInput = itemElement.querySelector('.item-qty');
    const priceInput = itemElement.querySelector('.item-unit-price');
    const totalElement = itemElement.querySelector('.item-total');
    const removeButton = itemElement.querySelector('.btn-remove-item');
    
    // Set values if editing
    if (item) {
        nameInput.value = item.description;
        qtyInput.value = item.quantity;
        priceInput.value = item.price;
        totalElement.textContent = `$${(item.quantity * item.price).toFixed(2)}`;
    }
    
    // Add event listeners for calculations
    qtyInput.addEventListener('input', () => {
        updateItemTotal(itemElement);
        updateInvoiceTotals();
    });
    
    priceInput.addEventListener('input', () => {
        updateItemTotal(itemElement);
        updateInvoiceTotals();
    });
    
    // Add event listener for remove button
    removeButton.addEventListener('click', () => {
        itemElement.remove();
        updateInvoiceTotals();
    });
    
    invoiceItems.appendChild(itemElement);
}

// Function to update an item's total
function updateItemTotal(itemElement) {
    const qtyInput = itemElement.querySelector('.item-qty');
    const priceInput = itemElement.querySelector('.item-unit-price');
    const totalElement = itemElement.querySelector('.item-total');
    
    const quantity = parseFloat(qtyInput.value) || 0;
    const price = parseFloat(priceInput.value) || 0;
    const total = quantity * price;
    
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Function to update invoice totals
function updateInvoiceTotals() {
    let subtotal = 0;
    
    // Calculate subtotal from all items
    document.querySelectorAll('.invoice-item').forEach(item => {
        const qtyInput = item.querySelector('.item-qty');
        const priceInput = item.querySelector('.item-unit-price');
        
        const quantity = parseFloat(qtyInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        
        subtotal += quantity * price;
    });
    
    const tax = subtotal * 0.16; // 16% tax
    const total = subtotal + tax;
    
    subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
    taxAmount.textContent = `$${tax.toFixed(2)}`;
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

// Function to close invoice modal
function closeInvoiceModal() {
    // Hide the modal with animation
    invoiceModal.style.opacity = '0';
    setTimeout(() => {
        invoiceModal.style.display = 'none';
    }, 300);
}

// Function to handle edit invoice button click
function handleEditInvoice(e) {
    const id = parseInt(e.currentTarget.getAttribute('data-id'));
    const invoice = invoices.find(inv => inv.id === id);
    if (invoice) {
        openEditInvoiceModal(invoice);
    }
}

// Function to handle delete invoice button click
function handleDeleteInvoice(e) {
    const id = parseInt(e.currentTarget.getAttribute('data-id'));
    const invoice = invoices.find(inv => inv.id === id);

    if (invoice) {
        currentInvoiceId = id;

        // Update delete confirmation message
        const confirmMessage = document.querySelector('#deleteModal p');
        confirmMessage.innerHTML = `¿Está seguro que desea eliminar la factura <strong>${invoice.number}</strong> de <strong>${invoice.client}</strong>?`;

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
        currentInvoiceId = null;
    }, 300);
}

// Function to delete invoice
function deleteInvoice() {
    if (currentInvoiceId) {
        const index = invoices.findIndex(inv => inv.id === currentInvoiceId);
        if (index !== -1) {
            // Remove the invoice
            invoices.splice(index, 1);
            
            // Show success message
            showNotification('Factura eliminada correctamente', 'success');
            
            closeDeleteModalFunc();
            renderInvoices();
        }
    }
}

// Function to validate the invoice form
function validateInvoiceForm() {
    let isValid = true;
    clearValidationErrors();
    
    // Validate client
    if (!invoiceClient.value) {
        showValidationError(invoiceClient, 'Debe seleccionar un cliente');
        isValid = false;
    }
    
    // Validate date
    if (!invoiceDate.value) {
        showValidationError(invoiceDate, 'La fecha es obligatoria');
        isValid = false;
    }
    
    // Validate items
    const items = document.querySelectorAll('.invoice-item');
    if (items.length === 0) {
        showValidationError(addItemBtn, 'Debe agregar al menos un producto o servicio');
        isValid = false;
    } else {
        items.forEach(item => {
            const nameInput = item.querySelector('.item-name');
            const qtyInput = item.querySelector('.item-qty');
            const priceInput = item.querySelector('.item-unit-price');
            
            if (!nameInput.value.trim()) {
                showValidationError(nameInput, 'La descripción es obligatoria');
                isValid = false;
            }
            
            if (!qtyInput.value || parseInt(qtyInput.value) <= 0) {
                showValidationError(qtyInput, 'La cantidad debe ser mayor que cero');
                isValid = false;
            }
            
            if (!priceInput.value || parseFloat(priceInput.value) <= 0) {
                showValidationError(priceInput, 'El precio debe ser mayor que cero');
                isValid = false;
            }
        });
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

// Function to save invoice
function saveInvoice(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateInvoiceForm()) {
        return;
    }
    
    // Collect items data
    const items = [];
    document.querySelectorAll('.invoice-item').forEach(item => {
        const nameInput = item.querySelector('.item-name');
        const qtyInput = item.querySelector('.item-qty');
        const priceInput = item.querySelector('.item-unit-price');
        
        items.push({
            description: nameInput.value.trim(),
            quantity: parseInt(qtyInput.value),
            price: parseFloat(priceInput.value)
        });
    });
    
    // Calculate total
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const tax = subtotal * 0.16; // 16% tax
    const total = subtotal + tax;
    
    const id = invoiceId.value ? parseInt(invoiceId.value) : Math.max(0, ...invoices.map(inv => inv.id)) + 1;
    const number = invoiceNumber.value;
    const date = invoiceDate.value;
    const client = invoiceClient.value;
    const status = invoiceStatus.value;
    
    if (invoiceId.value) {
        // Update existing invoice
        const index = invoices.findIndex(inv => inv.id === id);
        if (index !== -1) {
            invoices[index] = { id, number, date, client, status, total, items };
            showNotification('Factura actualizada correctamente', 'success');
        }
    } else {
        // Add new invoice
        invoices.push({ id, number, date, client, status, total, items });
        showNotification('Factura creada correctamente', 'success');
    }
    
    closeInvoiceModal();
    renderInvoices();
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
    renderInvoices();
    
    // New invoice button with visual feedback
    newInvoiceBtn.addEventListener('click', function(e) {
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
        openNewInvoiceModal();
        
        // Remove ripple and processing class
        setTimeout(() => {
            ripple.remove();
            this.classList.remove('processing');
        }, 600);
    });
    
    // Add item button
    addItemBtn.addEventListener('click', () => {
        addInvoiceItem();
    });
    
    // Modal close events
    closeModal.addEventListener('click', closeInvoiceModal);
    cancelInvoice.addEventListener('click', closeInvoiceModal);
    
    // Close modal when clicking outside
    invoiceModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeInvoiceModal();
        }
    });
    
    deleteModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeDeleteModalFunc();
        }
    });
    
    // Form submit
    invoiceForm.addEventListener('submit', saveInvoice);
    
    // Delete modal events
    closeDeleteModal.addEventListener('click', closeDeleteModalFunc);
    cancelDelete.addEventListener('click', closeDeleteModalFunc);
    confirmDelete.addEventListener('click', deleteInvoice);
    
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
            if (invoiceModal.style.display === 'flex') {
                closeInvoiceModal();
            }
            if (deleteModal.style.display === 'flex') {
                closeDeleteModalFunc();
            }
        }
        
        // Alt+N to open new invoice modal
        if (e.altKey && e.key === 'n') {
            e.preventDefault();
            openNewInvoiceModal();
        }
    });
});