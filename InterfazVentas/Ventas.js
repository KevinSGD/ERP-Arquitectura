// Elementos DOM
const detallesBtn = document.getElementById('detalles-btn');
const informacionBtn = document.getElementById('informacion-btn');
const inventarioBtn = document.getElementById('inventario-btn');
const contentArea = document.getElementById('content-area');
const headerTitle = document.getElementById('header-title');
const menuButtons = document.querySelectorAll('.menu-button');
const addSaleModal = document.getElementById('add-sale-modal');
const closeModalBtn = document.getElementById('close-modal');
const cancelFormBtn = document.getElementById('cancel-form');
const addSaleForm = document.getElementById('add-sale-form');

// Estado de la aplicación
let activeSection = 'detalles'; // Iniciar con detalles de venta activo

// Contenido de las secciones
const sectionContents = {
  detalles: `
    <div class="content-section" id="detalles-section">
      <div class="sales-list-container">
        <div class="section-content">
          <div class="sales-list-header">
            <button class="add-sale-button" id="add-sale-btn">
              <span>+</span> Añadir venta
            </button>
          </div>
          <div class="sales-list-content" id="sales-list">
            <!-- Aquí irá la lista de ventas cuando se agreguen -->
          </div>
        </div>
      </div>
    </div>
  `,
  informacion: `
    <div class="content-section" id="informacion-section">
      <h2 class="section-title">Lista de ventas</h2>
      <div class="section-content">
        <div class="sales-info-list" id="sales-info-list">
          <!-- Aquí se cargarán las ventas guardadas -->
        </div>
      </div>
    </div>
  `,
  inventario: `
    <div class="content-section" id="inventario-section">
      <h2 class="section-title">Resumen de inventario</h2>
      <div class="section-content">
        <p>Aquí se mostrará el resumen del inventario actual.</p>
      </div>
    </div>
  `,
  placeholder: `
    <div class="placeholder-content">
      <div class="placeholder-image"></div>
    </div>
  `
};

// Función para actualizar el título del encabezado
function updateHeaderTitle(section) {
  if (section === 'detalles') {
    headerTitle.textContent = 'Detalle de Ventas';
  } else if (section === 'informacion') {
    headerTitle.textContent = 'Información de venta';
  } else if (section === 'inventario') {
    headerTitle.textContent = 'Resumen de inventario';
  } else {
    headerTitle.textContent = 'Ventas';
  }
}

// Función para cambiar de sección
function changeSection(section) {
  // Remover clase activa de todos los botones
  menuButtons.forEach(button => {
    button.classList.remove('active');
  });
  
  // Si ya estamos en la sección activa, la cerramos
  if (activeSection === section && section !== 'detalles') {
    activeSection = null;
    contentArea.innerHTML = sectionContents.placeholder;
    updateHeaderTitle(null);
    return;
  }
  
  // Actualizar sección activa
  activeSection = section;
  
  // Marcar el botón como activo
  if (section === 'detalles') {
    detallesBtn.classList.add('active');
  } else if (section === 'informacion') {
    informacionBtn.classList.add('active');
  } else if (section === 'inventario') {
    inventarioBtn.classList.add('active');
  }
  
  // Actualizar título del encabezado
  updateHeaderTitle(section);
  
  // Actualizar contenido
  contentArea.innerHTML = sectionContents[section];
  
  // Si estamos en la sección de detalles, añadir event listener al botón de añadir venta
  if (section === 'detalles') {
    const addSaleBtn = document.getElementById('add-sale-btn');
    if (addSaleBtn) {
      addSaleBtn.addEventListener('click', openAddSaleModal);
    }
    
    // Cargar ventas guardadas
    loadSavedSales();
  }
  
  // Si estamos en la sección de información, cargar las ventas guardadas
  if (section === 'informacion') {
    loadSalesInfo();
  }
}

// Función para cargar información de ventas en el formato exacto solicitado
function loadSalesInfo() {
  const salesInfoList = document.getElementById('sales-info-list');
  if (!salesInfoList) return;
  
  // Limpiar contenido existente excepto los ejemplos estáticos
  const staticExamples = salesInfoList.querySelectorAll('.sale-info-item');
  const exampleCount = Math.min(staticExamples.length, 2); // Mantener solo los 2 primeros ejemplos
  
  while (salesInfoList.children.length > exampleCount) {
    salesInfoList.removeChild(salesInfoList.lastChild);
  }
  
  try {
    const sales = JSON.parse(localStorage.getItem('hotel_sales') || '[]');
    
    // Si hay ventas guardadas, añadirlas después de los ejemplos estáticos
    if (sales.length > 0) {
      sales.forEach((sale, index) => {
        const saleInfoItem = document.createElement('div');
        saleInfoItem.className = 'sale-info-item';
        
        // Crear el contenido en el formato exacto solicitado
        saleInfoItem.innerHTML = `
          <p class="sale-info-title">Venta #${index + 1}</p>
          <p class="sale-info-description">${sale.product} - Cliente: ${sale.guestName} ${sale.guestLastName}, Valor: ${sale.value}, Fecha: ${sale.date}</p>
          <div class="sale-info-additional">
            <p>Empleado: ${sale.employeeName} ${sale.employeeLastName} (Código: ${sale.employeeCode})</p>
            <p>Método de pago: ${sale.paymentMethod}</p>
            <p>Habitación: ${sale.room}</p>
          </div>
        `;
        
        salesInfoList.appendChild(saleInfoItem);
      });
    } else {
      // Si no hay ventas, mostrar mensaje después de los ejemplos estáticos
      const noSalesMessage = document.createElement('div');
      noSalesMessage.className = 'sale-info-item';
      noSalesMessage.innerHTML = '<p class="text-gray-500">No hay ventas registradas</p>';
      salesInfoList.appendChild(noSalesMessage);
    }
  } catch (error) {
    console.error('Error al cargar información de ventas:', error);
    
    // Mostrar mensaje de error
    const errorMessage = document.createElement('div');
    errorMessage.className = 'sale-info-item';
    errorMessage.innerHTML = '<p class="text-red-500">Error al cargar las ventas</p>';
    salesInfoList.appendChild(errorMessage);
  }
}

// Función para abrir el modal de añadir venta
function openAddSaleModal() {
  addSaleModal.classList.add('active');
  
  // Establecer la fecha actual en el campo de fecha
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;
}

// Función para cerrar el modal
function closeAddSaleModal() {
  addSaleModal.classList.remove('active');
  addSaleForm.reset();
}

// Función para guardar venta en archivo plano (simulado con localStorage)
function saveSale(saleData) {
  try {
    // En un entorno real, esto enviaría los datos a un servidor para guardar en un archivo
    // Aquí simulamos con localStorage
    const sales = JSON.parse(localStorage.getItem('hotel_sales') || '[]');
    const newSale = {
      ...saleData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    sales.push(newSale);
    localStorage.setItem('hotel_sales', JSON.stringify(sales));
    
    return newSale;
  } catch (error) {
    console.error('Error al guardar la venta:', error);
    throw new Error('No se pudo guardar la venta');
  }
}

// Función para cargar ventas guardadas
function loadSavedSales() {
  const salesList = document.getElementById('sales-list');
  if (!salesList) return;
  
  // Limpiar lista
  salesList.innerHTML = '';
  
  try {
    const sales = JSON.parse(localStorage.getItem('hotel_sales') || '[]');
    
    if (sales.length === 0) {
      salesList.innerHTML = '<p class="p-4 text-gray-500">No hay ventas registradas</p>';
      return;
    }
    
    // Mostrar ventas en la lista
    sales.forEach((sale, index) => {
      const saleItem = document.createElement('div');
      saleItem.className = 'sale-item';
      saleItem.innerHTML = `
        <p class="sale-item-title">Venta #${index + 1}</p>
        <p class="sale-item-detail">${sale.product} - Cliente: ${sale.guestName} ${sale.guestLastName}, Valor: ${sale.value}, Fecha: ${sale.date}</p>
        <p class="sale-item-detail">Empleado: ${sale.employeeName} ${sale.employeeLastName} (Código: ${sale.employeeCode})</p>
        <p class="sale-item-detail">Método de pago: ${sale.paymentMethod} - Habitación: ${sale.room}</p>
      `;
      salesList.appendChild(saleItem);
    });
  } catch (error) {
    console.error('Error al cargar las ventas:', error);
    salesList.innerHTML = '<p class="p-4 text-red-500">Error al cargar las ventas</p>';
  }
}

// Event listeners
detallesBtn.addEventListener('click', () => changeSection('detalles'));
informacionBtn.addEventListener('click', () => changeSection('informacion'));
inventarioBtn.addEventListener('click', () => changeSection('inventario'));

// Event listeners para el modal
closeModalBtn.addEventListener('click', closeAddSaleModal);
cancelFormBtn.addEventListener('click', closeAddSaleModal);

// Event listener para el formulario
addSaleForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Recopilar datos del formulario
  const formData = {
    guestName: document.getElementById('guest-name').value,
    guestLastName: document.getElementById('guest-lastname').value,
    room: document.getElementById('room').value,
    employeeName: document.getElementById('employee-name').value,
    employeeLastName: document.getElementById('employee-lastname').value,
    employeeCode: document.getElementById('employee-code').value,
    product: document.getElementById('product').value,
    value: document.getElementById('value').value,
    paymentMethod: document.getElementById('payment-method').value,
    date: document.getElementById('date').value
  };
  
  try {
    // Guardar venta
    const savedSale = saveSale(formData);
    
    // Añadir a la lista
    const salesList = document.getElementById('sales-list');
    if (salesList) {
      // Eliminar mensaje de "No hay ventas" si existe
      if (salesList.innerHTML.includes('No hay ventas registradas')) {
        salesList.innerHTML = '';
      }
      
      const saleItem = document.createElement('div');
      saleItem.className = 'sale-item';
      saleItem.innerHTML = `
        <p class="sale-item-title">Venta #${salesList.children.length + 1}</p>
        <p class="sale-item-detail">${formData.product} - Cliente: ${formData.guestName} ${formData.guestLastName}, Valor: ${formData.value}, Fecha: ${formData.date}</p>
        <p class="sale-item-detail">Empleado: ${formData.employeeName} ${formData.employeeLastName} (Código: ${formData.employeeCode})</p>
        <p class="sale-item-detail">Método de pago: ${formData.paymentMethod} - Habitación: ${formData.room}</p>
      `;
      salesList.appendChild(saleItem);
    }
    
    // Cerrar modal
    closeAddSaleModal();
    
    // Mostrar mensaje de éxito
    alert('Venta guardada correctamente');
  } catch (error) {
    alert('Error al guardar la venta');
  }
});

// Inicializar con la sección de detalles activa
changeSection('detalles');