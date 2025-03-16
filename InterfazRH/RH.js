document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Header scroll effect
  const header = document.querySelector(".header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenuCloseBtn = document.querySelector(".mobile-menu-close")
  const mobileMenu = document.querySelector(".mobile-menu")

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active")
    document.body.style.overflow = "hidden"
  })

  mobileMenuCloseBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    document.body.style.overflow = ""
  })

  // Date picker functionality
  const datePickerTriggers = document.querySelectorAll(".date-picker-trigger")
  const datePickers = document.querySelectorAll(".date-picker")

  datePickerTriggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      datePickers[index].classList.toggle("active")

      // Close other date pickers
      datePickers.forEach((picker, i) => {
        if (i !== index) {
          picker.classList.remove("active")
        }
      })
    })
  })

  // Close date pickers when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".date-picker-wrapper")) {
      datePickers.forEach((picker) => {
        picker.classList.remove("active")
      })
    }
  })

  // Simple calendar implementation
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]
  const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  function generateCalendar(datePickerId, displayElement) {
    const datePicker = document.getElementById(datePickerId)
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    // Create calendar header
    const calendarHeader = document.createElement("div")
    calendarHeader.className = "calendar-header"
    calendarHeader.innerHTML = `
      <button class="prev-month"><i class="fas fa-chevron-left"></i></button>
      <div class="current-month">${months[currentMonth]} ${currentYear}</div>
      <button class="next-month"><i class="fas fa-chevron-right"></i></button>
    `

    // Create days header
    const daysHeader = document.createElement("div")
    daysHeader.className = "days-header"
    days.forEach((day) => {
      const dayEl = document.createElement("div")
      dayEl.className = "day-name"
      dayEl.textContent = day
      daysHeader.appendChild(dayEl)
    })

    // Create days grid
    const daysGrid = document.createElement("div")
    daysGrid.className = "days-grid"

    // Get first day of month and total days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate()

    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement("div")
      emptyDay.className = "day empty"
      daysGrid.appendChild(emptyDay)
    }

    // Add days of month
    for (let i = 1; i <= totalDays; i++) {
      const day = document.createElement("div")
      day.className = "day"
      day.textContent = i

      // Highlight today
      if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
        day.classList.add("today")
      }

      // Add click event to select date
      day.addEventListener("click", () => {
        const selectedDate = new Date(currentYear, currentMonth, i)
        const formattedDate = `${i} de ${months[currentMonth]} de ${currentYear}`
        displayElement.textContent = formattedDate
        datePicker.classList.remove("active")
      })

      daysGrid.appendChild(day)
    }

    // Append all elements to calendar
    datePicker.innerHTML = ""
    datePicker.appendChild(calendarHeader)
    datePicker.appendChild(daysHeader)
    datePicker.appendChild(daysGrid)

    // Add month navigation functionality
    const prevMonthBtn = datePicker.querySelector(".prev-month")
    const nextMonthBtn = datePicker.querySelector(".next-month")

    // This would need more implementation for full functionality
  }

  // Initialize calendars
  const arrivalDateDisplay = document
    .querySelector("#arrival-date-picker")
    .previousElementSibling.querySelector(".date-display")
  const departureDateDisplay = document
    .querySelector("#departure-date-picker")
    .previousElementSibling.querySelector(".date-display")

  generateCalendar("arrival-date-picker", arrivalDateDisplay)
  generateCalendar("departure-date-picker", departureDateDisplay)

  // Scroll animations
  const animatedElements = document.querySelectorAll(".fade-in-up, .fade-in-scale")

  function checkScroll() {
    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight * 0.8) {
        element.classList.add("active")
      }
    })
  }

  // Initial check
  checkScroll()

  // Check on scroll
  window.addEventListener("scroll", checkScroll)
})

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const sidebar = document.querySelector(".sidebar")
  const sidebarToggle = document.getElementById("sidebar-toggle")
  const navItems = document.querySelectorAll(".sidebar-nav li")
  const sections = document.querySelectorAll(".section")
  const employeesTableBody = document.getElementById("employees-table-body")
  const addEmployeeBtn = document.getElementById("add-employee-btn")
  const employeeModal = document.getElementById("employee-modal")
  const employeeDetailsModal = document.getElementById("employee-details-modal")
  const confirmationModal = document.getElementById("confirmation-modal")
  const closeModalButtons = document.querySelectorAll(".close-modal")
  const employeeForm = document.getElementById("employee-form")
  const modalTitle = document.getElementById("modal-title")
  const employeeSearch = document.getElementById("employee-search")
  const departmentFilter = document.getElementById("department-filter")
  const statusFilter = document.getElementById("status-filter")
  const editEmployeeBtn = document.getElementById("edit-employee-btn")
  const deleteEmployeeBtn = document.getElementById("delete-employee-btn")
  const confirmActionBtn = document.getElementById("confirm-action-btn")

  // Current employee being edited or viewed
  let currentEmployee = null

  // API endpoints - Reemplazar con tus propios endpoints
  const API_URL = {
    employees: "/api/employees",
    departments: "/api/departments",
    positions: "/api/positions",
  }

  // Toggle sidebar
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed")
  })

  // Navigation
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      navItems.forEach((i) => i.classList.remove("active"))

      // Add active class to clicked item
      this.classList.add("active")

      // Show corresponding section
      const sectionId = this.getAttribute("data-section")
      sections.forEach((section) => {
        section.classList.remove("active")
        if (section.id === sectionId) {
          section.classList.add("active")
        }
      })

      // Cargar datos si es la sección de empleados
      if (sectionId === "employees") {
        fetchEmployees()
      }
    })
  })

  // Fetch employees from API
  async function fetchEmployees() {
    try {
      // Mostrar indicador de carga
      employeesTableBody.innerHTML = '<tr><td colspan="7" class="text-center">Cargando datos...</td></tr>'

      // Fetch data from API
      // Comentado para evitar errores hasta que la API esté lista
      /*
      const response = await fetch(API_URL.employees);
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      const data = await response.json();
      renderEmployeesTable(data);
      */

      // Mientras tanto, mostrar tabla vacía
      renderEmployeesTable([])
    } catch (error) {
      console.error("Error:", error)
      employeesTableBody.innerHTML = `<tr><td colspan="7" class="text-center">Error al cargar los datos: ${error.message}</td></tr>`
    }
  }

  // Populate employees table
  function renderEmployeesTable(data = []) {
    employeesTableBody.innerHTML = ""

    if (data.length === 0) {
      const emptyRow = document.createElement("tr")
      emptyRow.innerHTML = `
        <td colspan="7" class="text-center">No hay datos disponibles. Conecte su base de datos o añada nuevos empleados.</td>
      `
      employeesTableBody.appendChild(emptyRow)
      return
    }

    data.forEach((employee) => {
      const row = document.createElement("tr")

      // Format date for display
      const hireDate = new Date(employee.hireDate)
      const formattedDate = hireDate.toLocaleDateString("es-ES")

      // Determine status class
      let statusClass = ""
      switch (employee.status) {
        case "Activo":
          statusClass = "status-active"
          break
        case "Inactivo":
          statusClass = "status-inactive"
          break
        case "Vacaciones":
          statusClass = "status-vacation"
          break
      }

      row.innerHTML = `
        <td>${employee.id}</td>
        <td>${employee.firstName} ${employee.lastName}</td>
        <td>${employee.department}</td>
        <td>${employee.position}</td>
        <td>${formattedDate}</td>
        <td><span class="status-badge ${statusClass}">${employee.status}</span></td>
        <td>
          <div class="action-buttons">
            <button class="action-btn view-btn" data-id="${employee.id}">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-btn edit-btn" data-id="${employee.id}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" data-id="${employee.id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      `

      employeesTableBody.appendChild(row)
    })

    // Add event listeners to action buttons
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const employeeId = this.getAttribute("data-id")
        viewEmployee(employeeId)
      })
    })

    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const employeeId = this.getAttribute("data-id")
        editEmployee(employeeId)
      })
    })

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const employeeId = this.getAttribute("data-id")
        showDeleteConfirmation(employeeId)
      })
    })
  }

  // Initialize table
  fetchEmployees()

  // Search and filter functionality
  function filterEmployees() {
    const searchTerm = employeeSearch.value.toLowerCase()
    const departmentValue = departmentFilter.value
    const statusValue = statusFilter.value

    // Aquí se implementaría la búsqueda y filtrado con la API
    // Por ahora, simplemente mostramos un mensaje
    employeesTableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center">
          Buscando: "${searchTerm}" 
          ${departmentValue ? `| Departamento: ${departmentValue}` : ""} 
          ${statusValue ? `| Estado: ${statusValue}` : ""}
        </td>
      </tr>
    `

    // Cuando la API esté lista:
    /*
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.append('search', searchTerm);
    if (departmentValue) queryParams.append('department', departmentValue);
    if (statusValue) queryParams.append('status', statusValue);
    
    fetch(`${API_URL.employees}?${queryParams}`)
      .then(response => response.json())
      .then(data => renderEmployeesTable(data))
      .catch(error => console.error('Error:', error));
    */
  }

  employeeSearch.addEventListener("input", filterEmployees)
  departmentFilter.addEventListener("change", filterEmployees)
  statusFilter.addEventListener("change", filterEmployees)

  // Modal functionality
  function openModal(modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  function closeModal(modal) {
    modal.classList.remove("active")
    document.body.style.overflow = ""
  }

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal")
      closeModal(modal)
    })
  })

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(event.target)
    }
  })

  // Add new employee
  addEmployeeBtn.addEventListener("click", () => {
    // Reset form
    employeeForm.reset()
    document.getElementById("employee-id").value = ""
    modalTitle.textContent = "Añadir Nuevo Empleado"
    currentEmployee = null

    openModal(employeeModal)
  })

  // View employee details
  async function viewEmployee(employeeId) {
    try {
      // Fetch employee details from API
      // Comentado hasta que la API esté lista
      /*
      const response = await fetch(`${API_URL.employees}/${employeeId}`);
      if (!response.ok) {
        throw new Error('Error al cargar los datos del empleado');
      }
      const employee = await response.json();
      */

      // Por ahora, mostrar mensaje
      alert(`Ver detalles del empleado con ID: ${employeeId}`)
      return

      // El resto del código se ejecutaría cuando la API esté lista
      // const employee = await response.json(); // Assuming the API returns employee data
      // currentEmployee = employee;

      // Format date for display
      // const hireDate = new Date(employee.hireDate);
      // const formattedDate = hireDate.toLocaleDateString('es-ES');

      // Format salary with currency
      // const formattedSalary = new Intl.NumberFormat('es-ES', {
      //   style: 'currency',
      //   currency: 'EUR'
      // }).format(employee.salary);

      // Update modal with employee details
      // document.getElementById('employee-name').textContent = `${employee.firstName} ${employee.lastName}`;
      // document.getElementById('employee-position').textContent = `${employee.position} - ${employee.department}`;
      // document.getElementById('employee-status').textContent = employee.status;
      // document.getElementById('employee-status').className = `status-badge status-${employee.status.toLowerCase()}`;

      // document.getElementById('detail-id').textContent = employee.id;
      // document.getElementById('detail-department').textContent = employee.department;
      // document.getElementById('detail-email').textContent = employee.email;
      // document.getElementById('detail-phone').textContent = employee.phone;
      // document.getElementById('detail-hire-date').textContent = formattedDate;
      // document.getElementById('detail-salary').textContent = formattedSalary;

      // Set avatar
      // document.getElementById('employee-avatar').src = employee.avatar || `https://randomuser.me/api/portraits/men/1.jpg`;

      // openModal(employeeDetailsModal);
    } catch (error) {
      console.error("Error:", error)
      alert(`Error al cargar los datos del empleado: ${error.message}`)
    }
  }

  // Edit employee
  async function editEmployee(employeeId) {
    try {
      // Fetch employee details from API
      // Comentado hasta que la API esté lista
      /*
      const response = await fetch(`${API_URL.employees}/${employeeId}`);
      if (!response.ok) {
        throw new Error('Error al cargar los datos del empleado');
      }
      const employee = await response.json();
      */

      // Por ahora, mostrar mensaje
      alert(`Editar empleado con ID: ${employeeId}`)
      return

      // El resto del código se ejecutaría cuando la API esté lista
      // const employee = await response.json(); // Assuming the API returns employee data
      // currentEmployee = employee;

      // Fill form with employee data
      // document.getElementById('employee-id').value = employee.id;
      // document.getElementById('first-name').value = employee.firstName;
      // document.getElementById('last-name').value = employee.lastName;
      // document.getElementById('email').value = employee.email;
      // document.getElementById('phone').value = employee.phone;
      // document.getElementById('department').value = employee.department;
      // document.getElementById('position').value = employee.position;
      // document.getElementById('hire-date').value = employee.hireDate;
      // document.getElementById('salary').value = employee.salary;
      // document.getElementById('status').value = employee.status;

      // modalTitle.textContent = 'Editar Empleado';

      // openModal(employeeModal);
    } catch (error) {
      console.error("Error:", error)
      alert(`Error al cargar los datos del empleado: ${error.message}`)
    }
  }

  // Edit from details modal
  editEmployeeBtn.addEventListener("click", () => {
    if (currentEmployee) {
      closeModal(employeeDetailsModal)
      editEmployee(currentEmployee.id)
    }
  })

  // Delete confirmation
  function showDeleteConfirmation(employeeId) {
    currentEmployee = { id: employeeId }

    document.getElementById("confirmation-message").textContent =
      `¿Está seguro de que desea eliminar al empleado con ID ${employeeId}?`

    openModal(confirmationModal)
  }

  // Delete from details modal
  deleteEmployeeBtn.addEventListener("click", () => {
    if (currentEmployee) {
      closeModal(employeeDetailsModal)
      showDeleteConfirmation(currentEmployee.id)
    }
  })

  // Confirm delete
  confirmActionBtn.addEventListener("click", async () => {
    if (currentEmployee) {
      try {
        // Delete employee from API
        // Comentado hasta que la API esté lista
        /*
        const response = await fetch(`${API_URL.employees}/${currentEmployee.id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Error al eliminar el empleado');
        }
        */

        // Por ahora, mostrar mensaje
        alert(`Empleado con ID ${currentEmployee.id} eliminado correctamente`)

        // Close modal
        closeModal(confirmationModal)

        // Refresh employee list
        fetchEmployees()
      } catch (error) {
        console.error("Error:", error)
        alert(`Error al eliminar el empleado: ${error.message}`)
      }
    }
  })

  // Save employee (add or edit)
  employeeForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const employeeId = document.getElementById("employee-id").value
    const firstName = document.getElementById("first-name").value
    const lastName = document.getElementById("last-name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const department = document.getElementById("department").value
    const position = document.getElementById("position").value
    const hireDate = document.getElementById("hire-date").value
    const salary = Number.parseInt(document.getElementById("salary").value)
    const status = document.getElementById("status").value

    const employeeData = {
      firstName,
      lastName,
      email,
      phone,
      department,
      position,
      hireDate,
      salary,
      status,
    }

    if (employeeId) {
      employeeData.id = employeeId
    }

    try {
      // Send data to API
      // Comentado hasta que la API esté lista
      /*
      const url = employeeId 
        ? `${API_URL.employees}/${employeeId}` 
        : API_URL.employees;
        
      const method = employeeId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
      });
      
      if (!response.ok) {
        throw new Error('Error al guardar los datos del empleado');
      }
      */

      // Por ahora, mostrar mensaje
      alert(`Datos del empleado ${employeeId ? "actualizados" : "guardados"} correctamente`)
      console.log("Datos enviados:", employeeData)

      // Close modal
      closeModal(employeeModal)

      // Refresh employee list
      fetchEmployees()
    } catch (error) {
      console.error("Error:", error)
      alert(`Error al guardar los datos: ${error.message}`)
    }
  })

  // Cargar datos iniciales para el dashboard
  function loadDashboardData() {
    // Aquí se cargarían los datos para el dashboard desde la API
    console.log("Cargando datos del dashboard...")
  }

  // Inicializar la aplicación
  loadDashboardData()
})

// Añadir código para la configuración de la base de datos
document.addEventListener("DOMContentLoaded", () => {
  // Formulario de configuración de base de datos
  const dbConfigForm = document.getElementById("db-config-form")
  const testConnectionBtn = document.getElementById("test-connection-btn")

  if (dbConfigForm) {
    dbConfigForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Recopilar datos del formulario
      const dbConfig = {
        host: document.getElementById("db-host").value,
        port: document.getElementById("db-port").value,
        database: document.getElementById("db-name").value,
        type: document.getElementById("db-type").value,
        user: document.getElementById("db-user").value,
        password: document.getElementById("db-password").value,
        apiUrl: document.getElementById("api-url").value,
      }

      // Guardar configuración (en localStorage por ahora)
      localStorage.setItem("dbConfig", JSON.stringify(dbConfig))

      // Mostrar mensaje de éxito
      const successMessage = document.createElement("div")
      successMessage.className = "connection-status connection-success"
      successMessage.textContent =
        "Configuración guardada correctamente. Reinicie la aplicación para aplicar los cambios."

      // Eliminar mensajes anteriores
      const previousMessages = document.querySelectorAll(".connection-status")
      previousMessages.forEach((msg) => msg.remove())

      // Añadir nuevo mensaje
      dbConfigForm.appendChild(successMessage)

      // Actualizar la URL de la API en la aplicación
      if (dbConfig.apiUrl) {
        window.API_URL = {
          employees: `${dbConfig.apiUrl}/employees`,
          departments: `${dbConfig.apiUrl}/departments`,
          positions: `${dbConfig.apiUrl}/positions`,
        }
        console.log("API URL actualizada:", window.API_URL)
      }
    })
  }

  if (testConnectionBtn) {
    testConnectionBtn.addEventListener("click", () => {
      // Recopilar datos del formulario
      const dbConfig = {
        host: document.getElementById("db-host").value,
        port: document.getElementById("db-port").value,
        database: document.getElementById("db-name").value,
        type: document.getElementById("db-type").value,
        user: document.getElementById("db-user").value,
        password: document.getElementById("db-password").value,
        apiUrl: document.getElementById("api-url").value,
      }

      // Simular prueba de conexión
      testConnection(dbConfig)
    })
  }

  // Función para probar la conexión
  function testConnection(config) {
    // Eliminar mensajes anteriores
    const previousMessages = document.querySelectorAll(".connection-status")
    previousMessages.forEach((msg) => msg.remove())

    // Crear mensaje de "probando conexión"
    const testingMessage = document.createElement("div")
    testingMessage.className = "connection-status"
    testingMessage.textContent = "Probando conexión..."
    dbConfigForm.appendChild(testingMessage)

    // Simular una prueba de conexión (en un entorno real, esto sería una llamada a la API)
    setTimeout(() => {
      testingMessage.remove()

      // Determinar si la conexión fue exitosa (simulado)
      const isSuccess = config.host && config.database && config.user

      const statusMessage = document.createElement("div")
      if (isSuccess) {
        statusMessage.className = "connection-status connection-success"
        statusMessage.textContent = "Conexión exitosa a la base de datos."
      } else {
        statusMessage.className = "connection-status connection-error"
        statusMessage.textContent = "Error de conexión. Verifique los datos ingresados."
      }

      dbConfigForm.appendChild(statusMessage)
    }, 1500)
  }

  // Cargar configuración guardada (si existe)
  function loadSavedConfig() {
    const savedConfig = localStorage.getItem("dbConfig")
    if (savedConfig && dbConfigForm) {
      try {
        const config = JSON.parse(savedConfig)

        // Llenar el formulario con los datos guardados
        document.getElementById("db-host").value = config.host || ""
        document.getElementById("db-port").value = config.port || ""
        document.getElementById("db-name").value = config.database || ""
        document.getElementById("db-type").value = config.type || "mysql"
        document.getElementById("db-user").value = config.user || ""
        document.getElementById("db-password").value = config.password || ""
        document.getElementById("api-url").value = config.apiUrl || ""

        // Actualizar la URL de la API en la aplicación
        if (config.apiUrl) {
          window.API_URL = {
            employees: `${config.apiUrl}/employees`,
            departments: `${config.apiUrl}/departments`,
            positions: `${config.apiUrl}/positions`,
          }
          console.log("API URL cargada desde configuración guardada:", window.API_URL)
        }
      } catch (error) {
        console.error("Error al cargar la configuración guardada:", error)
      }
    }
  }

  // Inicializar carga de configuración
  loadSavedConfig()
})

// Mantener el código para las animaciones y efectos visuales
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  if (document.getElementById("current-year")) {
    document.getElementById("current-year").textContent = new Date().getFullYear()
  }

  // Header scroll effect
  const header = document.querySelector(".header")
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }

  // Scroll animations
  const animatedElements = document.querySelectorAll(".fade-in-up, .fade-in-scale")
  function checkScroll() {
    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight * 0.8) {
        element.classList.add("active")
      }
    })
  }

  // Initial check
  checkScroll()

  // Check on scroll
  window.addEventListener("scroll", checkScroll)
})

