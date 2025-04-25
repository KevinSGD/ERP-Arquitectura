// Datos de ejemplo para clientes
let clientes = [
    {
      id: 1,
      nombre: "Juan Pérez",
      documento: "12345678",
      habitacion: "101",
      checkIn: "2023-11-15",
      checkOut: "2023-11-18",
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "María González",
      documento: "87654321",
      habitacion: "202",
      checkIn: "2023-12-01",
      checkOut: "2023-12-05",
      estado: "Activo",
    },
    {
      id: 3,
      nombre: "Carlos Rodríguez",
      documento: "23456789",
      habitacion: "201",
      checkIn: "2023-10-20",
      checkOut: "2023-10-25",
      estado: "Inactivo",
    },
  ]
  
  // Datos de ejemplo para consumos
  const consumos = [
    {
      id: 1,
      fecha: "2023-11-16",
      clienteId: 1,
      cliente: "Juan Pérez",
      habitacion: "101",
      servicio: "Restaurante",
      monto: 45,
    },
    {
      id: 2,
      fecha: "2023-11-17",
      clienteId: 1,
      cliente: "Juan Pérez",
      habitacion: "101",
      servicio: "Minibar",
      monto: 24,
    },
    {
      id: 3,
      fecha: "2023-12-02",
      clienteId: 2,
      cliente: "María González",
      habitacion: "202",
      servicio: "Spa",
      monto: 120,
    },
  ]
  
  // Función para cargar la tabla de clientes
  function cargarTablaClientes() {
    const tabla = document.getElementById("clients-table").getElementsByTagName("tbody")[0]
    const noClients = document.getElementById("no-clients")
  
    // Limpiar tabla
    tabla.innerHTML = ""
  
    if (clientes.length === 0) {
      noClients.classList.remove("hidden")
    } else {
      noClients.classList.add("hidden")
  
      // Agregar filas a la tabla
      clientes.forEach((cliente) => {
        const fila = tabla.insertRow()
  
        // Nombre
        fila.insertCell().textContent = cliente.nombre
  
        // Documento
        fila.insertCell().textContent = cliente.documento
  
        // Habitación
        fila.insertCell().textContent = cliente.habitacion
  
        // Check-in
        fila.insertCell().textContent = formatearFecha(cliente.checkIn)
  
        // Check-out
        fila.insertCell().textContent = formatearFecha(cliente.checkOut)
  
        // Estado
        const celdaEstado = fila.insertCell()
        const spanEstado = document.createElement("span")
        spanEstado.textContent = cliente.estado
        spanEstado.className = "status"
  
        if (cliente.estado === "Activo") {
          spanEstado.classList.add("active")
        } else if (cliente.estado === "Inactivo") {
          spanEstado.classList.add("inactive")
        } else {
          spanEstado.classList.add("pending")
        }
  
        celdaEstado.appendChild(spanEstado)
  
        // Acciones
        const celdaAcciones = fila.insertCell()
        celdaAcciones.className = "actions"
  
        // Botón de editar
        const btnEditar = document.createElement("button")
        btnEditar.innerHTML = '<i class="fas fa-edit"></i>'
        btnEditar.className = "action-btn edit"
        btnEditar.title = "Editar cliente"
        btnEditar.onclick = () => editarCliente(cliente.id)
  
        // Botón de historial
        const btnHistorial = document.createElement("button")
        btnHistorial.innerHTML = '<i class="fas fa-history"></i>'
        btnHistorial.className = "action-btn history"
        btnHistorial.title = "Ver historial"
        btnHistorial.onclick = () => verHistorial(cliente.id)
  
        // Botón de eliminar
        const btnEliminar = document.createElement("button")
        btnEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>'
        btnEliminar.className = "action-btn delete"
        btnEliminar.title = "Eliminar cliente"
        btnEliminar.onclick = () => eliminarCliente(cliente.id)
  
        celdaAcciones.appendChild(btnEditar)
        celdaAcciones.appendChild(btnHistorial)
        celdaAcciones.appendChild(btnEliminar)
      })
    }
  }
  
  // Función para cargar la tabla de consumos
  function cargarTablaConsumos() {
    const tabla = document.getElementById("consumos-table").getElementsByTagName("tbody")[0]
    const noConsumos = document.getElementById("no-consumos")
  
    // Limpiar tabla
    tabla.innerHTML = ""
  
    if (consumos.length === 0) {
      noConsumos.classList.remove("hidden")
    } else {
      noConsumos.classList.add("hidden")
  
      // Agregar filas a la tabla
      consumos.forEach((consumo) => {
        const fila = tabla.insertRow()
  
        // Fecha
        fila.insertCell().textContent = formatearFecha(consumo.fecha)
  
        // Cliente
        fila.insertCell().textContent = consumo.cliente
  
        // Habitación
        fila.insertCell().textContent = consumo.habitacion
  
        // Servicio
        fila.insertCell().textContent = consumo.servicio
  
        // Monto
        fila.insertCell().textContent = `$${consumo.monto.toFixed(2)}`
      })
    }
  }
  
  // Función para formatear fechas
  function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr)
    return fecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }
  
  // Función para editar cliente
  function editarCliente(clienteId) {
    alert(`Editar cliente con ID: ${clienteId}`)
    // Aquí iría la lógica para editar un cliente
  }
  
  // Función para ver historial de cliente
  function verHistorial(clienteId) {
    alert(`Ver historial del cliente con ID: ${clienteId}`)
    // Aquí iría la lógica para mostrar el historial
  }
  
  // Función para eliminar cliente
  function eliminarCliente(clienteId) {
    if (confirm("¿Está seguro de que desea eliminar este cliente? Esta acción no se puede deshacer.")) {
      clientes = clientes.filter((c) => c.id !== clienteId)
      cargarTablaClientes()
      alert("Cliente eliminado correctamente")
    }
  }
  
  // Función para abrir modal de check-in
  function abrirModalCheckin() {
    const modal = document.getElementById("checkin-modal")
    modal.style.display = "block"
  
    // Limpiar formulario
    document.getElementById("checkin-form").reset()
  
    // Cargar lista de clientes
    const selectCliente = document.getElementById("cliente-checkin")
    selectCliente.innerHTML = '<option value="">Seleccionar cliente...</option>'
  
    clientes.forEach((cliente) => {
      const option = document.createElement("option")
      option.value = cliente.id
      option.textContent = `${cliente.nombre} - ${cliente.documento}`
      selectCliente.appendChild(option)
    })
  
    // Establecer fecha actual como predeterminada
    const hoy = new Date().toISOString().split("T")[0]
    document.getElementById("fecha-entrada").value = hoy
  
    // Establecer fecha de salida predeterminada (día siguiente)
    const manana = new Date()
    manana.setDate(manana.getDate() + 1)
    document.getElementById("fecha-salida").value = manana.toISOString().split("T")[0]
  }
  
  // Función para abrir modal de búsqueda
  function abrirModalBusqueda() {
    const modal = document.getElementById("search-modal")
    modal.style.display = "block"
  
    // Limpiar búsqueda anterior
    document.getElementById("search-input").value = ""
    document.getElementById("filter-type").value = "todos"
  
    // Cargar todos los clientes en la tabla de resultados
    const tabla = document.getElementById("search-results-table").getElementsByTagName("tbody")[0]
    tabla.innerHTML = ""
  
    clientes.forEach((cliente) => {
      const fila = tabla.insertRow()
  
      fila.insertCell().textContent = cliente.nombre
      fila.insertCell().textContent = cliente.documento
      fila.insertCell().textContent = cliente.habitacion
  
      const celdaEstado = fila.insertCell()
      const spanEstado = document.createElement("span")
      spanEstado.textContent = cliente.estado
      spanEstado.className = "status"
  
      if (cliente.estado === "Activo") {
        spanEstado.classList.add("active")
      } else if (cliente.estado === "Inactivo") {
        spanEstado.classList.add("inactive")
      } else {
        spanEstado.classList.add("pending")
      }
  
      celdaEstado.appendChild(spanEstado)
  
      const celdaAcciones = fila.insertCell()
      celdaAcciones.className = "actions"
  
      const btnSeleccionar = document.createElement("button")
      btnSeleccionar.innerHTML = '<i class="fas fa-check-circle"></i>'
      btnSeleccionar.className = "action-btn"
      btnSeleccionar.title = "Seleccionar cliente"
      btnSeleccionar.onclick = () => seleccionarCliente(cliente.id)
  
      celdaAcciones.appendChild(btnSeleccionar)
    })
  }
  
  // Función para seleccionar cliente desde la búsqueda
  function seleccionarCliente(clienteId) {
    const cliente = clientes.find((c) => c.id === clienteId)
    if (cliente) {
      alert(`Cliente seleccionado: ${cliente.nombre}`)
      document.getElementById("search-modal").style.display = "none"
    }
  }
  
  // Función para buscar clientes
  function buscarClientes() {
    const searchInput = document.getElementById("search-input").value.toLowerCase()
    const filterType = document.getElementById("filter-type").value
  
    let clientesFiltrados
  
    if (!searchInput) {
      clientesFiltrados = clientes
    } else if (filterType === "todos") {
      clientesFiltrados = clientes.filter(
        (cliente) =>
          cliente.nombre.toLowerCase().includes(searchInput) ||
          cliente.documento.toLowerCase().includes(searchInput) ||
          cliente.habitacion.toLowerCase().includes(searchInput),
      )
    } else {
      clientesFiltrados = clientes.filter((cliente) => cliente[filterType].toLowerCase().includes(searchInput))
    }
  
    const tabla = document.getElementById("search-results-table").getElementsByTagName("tbody")[0]
    const noResults = document.getElementById("no-search-results")
  
    tabla.innerHTML = ""
  
    if (clientesFiltrados.length === 0) {
      noResults.classList.remove("hidden")
    } else {
      noResults.classList.add("hidden")
  
      clientesFiltrados.forEach((cliente) => {
        const fila = tabla.insertRow()
  
        fila.insertCell().textContent = cliente.nombre
        fila.insertCell().textContent = cliente.documento
        fila.insertCell().textContent = cliente.habitacion
  
        const celdaEstado = fila.insertCell()
        const spanEstado = document.createElement("span")
        spanEstado.textContent = cliente.estado
        spanEstado.className = "status"
  
        if (cliente.estado === "Activo") {
          spanEstado.classList.add("active")
        } else if (cliente.estado === "Inactivo") {
          spanEstado.classList.add("inactive")
        } else {
          spanEstado.classList.add("pending")
        }
  
        celdaEstado.appendChild(spanEstado)
  
        const celdaAcciones = fila.insertCell()
        celdaAcciones.className = "actions"
  
        const btnSeleccionar = document.createElement("button")
        btnSeleccionar.innerHTML = '<i class="fas fa-check-circle"></i>'
        btnSeleccionar.className = "action-btn"
        btnSeleccionar.title = "Seleccionar cliente"
        btnSeleccionar.onclick = () => seleccionarCliente(cliente.id)
  
        celdaAcciones.appendChild(btnSeleccionar)
      })
    }
  }
  
  // Event Listeners
  document.addEventListener("DOMContentLoaded", () => {
    // Cargar datos iniciales
    cargarTablaClientes()
    cargarTablaConsumos()
  
    // Mostrar mensaje en el gráfico de ocupación
    document.getElementById("ocupacion-chart").textContent = "No hay datos de ocupación disponibles"
  
    // Botón para check-in cliente
    document.getElementById("check-in-cliente").addEventListener("click", (e) => {
      e.preventDefault()
      abrirModalCheckin()
    })
  
    // Botón para buscar cliente
    document.getElementById("buscar-cliente").addEventListener("click", (e) => {
      e.preventDefault()
      abrirModalBusqueda()
    })
  
    // Botón de búsqueda en el modal
    document.getElementById("search-btn").addEventListener("click", buscarClientes)
  
    // Búsqueda al presionar Enter
    document.getElementById("search-input").addEventListener("keyup", (e) => {
      if (e.key === "Enter") buscarClientes()
    })
  
    // Cerrar modales
    document.querySelectorAll(".close").forEach((element) => {
      element.addEventListener("click", () => {
        document.querySelectorAll(".modal").forEach((modal) => {
          modal.style.display = "none"
        })
      })
    })
  
    // Botón para cancelar check-in
    document.getElementById("cancel-checkin").addEventListener("click", () => {
      document.getElementById("checkin-modal").style.display = "none"
    })
  
    // Envío de formulario de check-in
    document.getElementById("checkin-form").addEventListener("submit", (e) => {
      e.preventDefault()
  
      alert("Check-in registrado correctamente")
      document.getElementById("checkin-modal").style.display = "none"
    })
  
    // Cerrar modales al hacer clic fuera de ellos
    window.addEventListener("click", (e) => {
      document.querySelectorAll(".modal").forEach((modal) => {
        if (e.target === modal) {
          modal.style.display = "none"
        }
      })
    })
  
    // Botones del menú
    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", (e) => {
        // Remover clase active de todos los elementos del menú
        document.querySelectorAll(".menu li").forEach((item) => {
          item.classList.remove("active")
        })
  
        // Agregar clase active al elemento padre del enlace clickeado
        link.parentElement.classList.add("active")
      })
    })
  
    // Botón para cambiar módulo
    document.querySelector(".btn-cambiar").addEventListener("click", (e) => {
      e.preventDefault()
      alert("Cambiando de módulo...")
    })
  
    // Botón para cerrar sesión
    document.querySelector(".btn-cerrar").addEventListener("click", (e) => {
      e.preventDefault()
      if (confirm("¿Está seguro de que desea cerrar sesión?")) {
        alert("Sesión cerrada correctamente")
      }
    })
  
    // Enlace "Ver todos" en las tablas
    document.querySelectorAll(".view-all").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        alert("Mostrando todos los registros...")
      })
    })
  })
  