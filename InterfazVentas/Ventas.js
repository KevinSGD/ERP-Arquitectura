// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const openNewSaleModalBtn = document.getElementById('openNewSaleModal');
  const newSaleModal = document.getElementById('newSaleModal');
  const closeModalBtn = document.getElementById('closeModal');
  const cancelSaleButton = document.getElementById('cancelSaleButton');
  const registerSaleButton = document.getElementById('registerSaleButton');
  const cancelClientButton = document.getElementById('cancelClientButton');
  const registerClientButton = document.getElementById('registerClientButton');
  const newClientButton = document.getElementById('newClientButton');
  const clienteSelect = document.getElementById('cliente');

  // Elementos de las pestañas
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  // Estado de la aplicación
  let clienteData = {
      nombre: '',
      apellido: '',
      documento: '',
      email: '',
      telefono: '',
      direccion: '',
      nacionalidad: ''
  };

  // Funciones para el modal
  function openModal() {
      console.log('Abriendo modal');
      newSaleModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Evitar scroll en el body
  }

  function closeModal() {
      console.log('Cerrando modal');
      newSaleModal.classList.remove('active');
      document.body.style.overflow = ''; // Restaurar scroll
  }

  // Funciones para las pestañas
  function switchTab(tabId) {
      console.log('Cambiando a pestaña:', tabId);
      // Desactivar todas las pestañas
      tabButtons.forEach(button => {
          button.classList.remove('active');
      });
      
      tabContents.forEach(content => {
          content.classList.remove('active');
      });
      
      // Activar la pestaña seleccionada
      const selectedButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
      const selectedContent = document.getElementById(`${tabId}-tab`);
      
      if (selectedButton && selectedContent) {
          selectedButton.classList.add('active');
          selectedContent.classList.add('active');
      }
  }

  // Función para registrar un cliente
  function registerClient() {
      // Obtener los valores de los campos
      clienteData.nombre = document.getElementById('nombre').value;
      clienteData.apellido = document.getElementById('apellido').value;
      clienteData.documento = document.getElementById('documento').value;
      clienteData.email = document.getElementById('email').value;
      clienteData.telefono = document.getElementById('telefono').value;
      clienteData.direccion = document.getElementById('direccion').value;
      clienteData.nacionalidad = document.getElementById('nacionalidad').value;
      
      // Validar que al menos nombre y apellido estén completos
      if (!clienteData.nombre || !clienteData.apellido) {
          alert('Por favor complete al menos el nombre y apellido del cliente.');
          return;
      }
      
      // Crear una nueva opción en el select de clientes
      const newOption = document.createElement('option');
      newOption.value = 'nuevo-registrado';
      newOption.text = `${clienteData.nombre} ${clienteData.apellido}`;
      
      // Verificar si ya existe la opción
      let exists = false;
      for (let i = 0; i < clienteSelect.options.length; i++) {
          if (clienteSelect.options[i].value === 'nuevo-registrado') {
              clienteSelect.options[i] = newOption;
              exists = true;
              break;
          }
      }
      
      // Si no existe, añadirla antes de la opción "Registrar nuevo cliente"
      if (!exists) {
          const newClientOption = clienteSelect.querySelector('option[value="nuevo"]');
          if (newClientOption) {
              clienteSelect.insertBefore(newOption, newClientOption);
          } else {
              clienteSelect.add(newOption);
          }
      }
      
      // Seleccionar el nuevo cliente
      clienteSelect.value = 'nuevo-registrado';
      
      // Mostrar mensaje de éxito
      alert(`Cliente ${clienteData.nombre} ${clienteData.apellido} registrado con éxito`);
      
      // Cambiar a la pestaña de venta
      switchTab('venta');
  }

  // Función para registrar una venta
  function registerSale() {
      // Aquí normalmente guardarías los datos de la venta
      alert('Venta registrada con éxito');
      closeModal();
  }

  // Verificar que los elementos existen antes de agregar event listeners
  if (openNewSaleModalBtn) {
      console.log('Botón de nueva venta encontrado');
      openNewSaleModalBtn.addEventListener('click', function(e) {
          console.log('Botón de nueva venta clickeado');
          e.preventDefault();
          openModal();
      });
  } else {
      console.error('Botón de nueva venta no encontrado');
  }

  if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
  }

  if (cancelSaleButton) {
      cancelSaleButton.addEventListener('click', closeModal);
  }

  if (cancelClientButton) {
      cancelClientButton.addEventListener('click', function() {
          switchTab('venta');
      });
  }

  if (registerSaleButton) {
      registerSaleButton.addEventListener('click', registerSale);
  }

  if (registerClientButton) {
      registerClientButton.addEventListener('click', registerClient);
  }

  if (newClientButton) {
      newClientButton.addEventListener('click', function() {
          switchTab('nuevo-cliente');
      });
  }

  // Event listener para cambiar de pestaña
  tabButtons.forEach(button => {
      button.addEventListener('click', function() {
          const tabId = this.getAttribute('data-tab');
          switchTab(tabId);
      });
  });

  // Event listener para el select de clientes
  if (clienteSelect) {
      clienteSelect.addEventListener('change', function(e) {
          if (e.target.value === 'nuevo') {
              switchTab('nuevo-cliente');
          }
      });
  }

  // Cerrar el modal si se hace clic fuera de él
  window.addEventListener('click', function(e) {
      if (e.target === newSaleModal) {
          closeModal();
      }
  });

  // Asegurarse de que la primera pestaña esté activa al cargar
  switchTab('venta');

  // Agregar un event listener global para todos los botones
  document.addEventListener('click', function(e) {
      // Verificar si el elemento clickeado es el botón de nueva venta
      if (e.target.id === 'openNewSaleModal' || e.target.closest('#openNewSaleModal')) {
          console.log('Botón de nueva venta clickeado (delegación)');
          openModal();
      }
  });
});