
let transacciones = [
    {
      id: 1,
      fecha: "2023-11-01",
      tipo: "ingreso",
      categoria: "hospedaje",
      descripcion: "Reserva habitación 201 - Juan Pérez",
      metodoPago: "tarjeta",
      referencia: "Factura #001",
      monto: 1200.0,
      origen: "ventas",
      usuario: "Admin",
    },
    {
      id: 2,
      fecha: "2023-11-02",
      tipo: "ingreso",
      categoria: "restaurante",
      descripcion: "Consumo restaurante - María López",
      metodoPago: "efectivo",
      referencia: "Factura #002",
      monto: 350.0,
      origen: "ventas",
      usuario: "Admin",
    },
    {
      id: 3,
      fecha: "2023-11-03",
      tipo: "egreso",
      categoria: "compras",
      descripcion: "Compra de insumos para minibar",
      metodoPago: "transferencia",
      referencia: "Factura #A123",
      monto: 500.0,
      origen: "inventario",
      usuario: "Admin",
    },
    {
      id: 4,
      fecha: "2023-11-05",
      tipo: "egreso",
      categoria: "sueldos",
      descripcion: "Pago de nómina - Primera quincena",
      metodoPago: "transferencia",
      referencia: "Transferencia #45678",
      monto: 5000.0,
      origen: "contabilidad",
      usuario: "Admin",
    },
    {
      id: 5,
      fecha: "2023-11-07",
      tipo: "egreso",
      categoria: "servicios",
      descripcion: "Pago servicio de electricidad",
      metodoPago: "transferencia",
      referencia: "Recibo #E789",
      monto: 1200.0,
      origen: "contabilidad",
      usuario: "Admin",
    },
    {
      id: 6,
      fecha: "2023-11-10",
      tipo: "ingreso",
      categoria: "spa",
      descripcion: "Servicios de spa - Varios clientes",
      metodoPago: "tarjeta",
      referencia: "Factura #003",
      monto: 800.0,
      origen: "ventas",
      usuario: "Admin",
    },
    {
      id: 7,
      fecha: "2023-11-12",
      tipo: "egreso",
      categoria: "mantenimiento",
      descripcion: "Reparación aire acondicionado",
      metodoPago: "efectivo",
      referencia: "Recibo #M123",
      monto: 350.0,
      origen: "contabilidad",
      usuario: "Admin",
    },
    {
      id: 8,
      fecha: "2023-11-15",
      tipo: "ingreso",
      categoria: "eventos",
      descripcion: "Reserva salón para conferencia",
      metodoPago: "transferencia",
      referencia: "Factura #004",
      monto: 2500.0,
      origen: "ventas",
      usuario: "Admin",
    },
    {
      id: 9,
      fecha: "2023-11-18",
      tipo: "egreso",
      categoria: "impuestos",
      descripcion: "Pago de impuestos mensuales",
      metodoPago: "transferencia",
      referencia: "Declaración #T456",
      monto: 1800.0,
      origen: "contabilidad",
      usuario: "Admin",
    },
    {
      id: 10,
      fecha: "2023-11-20",
      tipo: "egreso",
      categoria: "marketing",
      descripcion: "Campaña publicitaria en redes sociales",
      metodoPago: "tarjeta",
      referencia: "Factura #P789",
      monto: 500.0,
      origen: "contabilidad",
      usuario: "Admin",
    },
  ]
  
  // Inicialización
  document.addEventListener("DOMContentLoaded", () => {
    // Mostrar fecha actual
    const fechaActual = new Date()
    document.getElementById("current-date").textContent = fechaActual.toLocaleDateString()
  
    // Establecer fecha actual en los campos de fecha
    const hoy = fechaActual.toISOString().split("T")[0]
    document.getElementById("ingreso-fecha").value = hoy
    document.getElementById("egreso-fecha").value = hoy
  
    // Inicializar navegación
    initNavigation()
  
    // Cargar datos iniciales
    cargarDashboard()
    cargarTablaIngresos()
    cargarTablaEgresos()
    cargarHistorialTransacciones()
  
    // Inicializar gráficos
    inicializarGraficos()
  
    // Verificar si hay transacciones pendientes de otros módulos
    verificarTransaccionesPendientes()
  
    // Configurar evento para mostrar/ocultar campos de fecha personalizada
    document.getElementById("reporte-periodo").addEventListener("change", function () {
      if (this.value === "personalizado") {
        document.getElementById("periodo-personalizado").classList.remove("hidden")
      } else {
        document.getElementById("periodo-personalizado").classList.add("hidden")
      }
    })
  })
  
  // Navegación
  function initNavigation() {
    const navItems = document.querySelectorAll(".nav-item")
  
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Remover clase active de todos los items
        navItems.forEach((i) => i.classList.remove("active"))
  
        // Agregar clase active al item seleccionado
        this.classList.add("active")
  
        // Obtener sección a mostrar
        const sectionId = this.getAttribute("data-section")
  
        // Ocultar todas las secciones
        document.querySelectorAll(".content-section").forEach((section) => {
          section.classList.remove("active")
        })
  
        // Mostrar sección seleccionada
        document.getElementById(sectionId).classList.add("active")
      })
    })
  }
  
  // Dashboard
  function cargarDashboard() {
    const periodo = document.getElementById("periodo-dashboard").value
  
    // Calcular fechas según el periodo seleccionado
    const fechaActual = new Date()
    const fechaInicio = new Date()
  
    if (periodo === "mes") {
      fechaInicio.setDate(1) // Primer día del mes actual
    } else if (periodo === "trimestre") {
      fechaInicio.setMonth(Math.floor(fechaInicio.getMonth() / 3) * 3, 1) // Primer día del trimestre actual
    } else if (periodo === "anio") {
      fechaInicio.setMonth(0, 1) // Primer día del año actual
    }
  
    // Filtrar transacciones por periodo
    const transaccionesPeriodo = transacciones.filter((t) => {
      const fechaTransaccion = new Date(t.fecha)
      return fechaTransaccion >= fechaInicio && fechaTransaccion <= fechaActual
    })
  
    // Calcular totales
    const ingresos = transaccionesPeriodo.filter((t) => t.tipo === "ingreso").reduce((total, t) => total + t.monto, 0)
  
    const egresos = transaccionesPeriodo.filter((t) => t.tipo === "egreso").reduce((total, t) => total + t.monto, 0)
  
    const balance = ingresos - egresos
  
    // Calcular saldo actual (todos los tiempos)
    const totalIngresos = transacciones.filter((t) => t.tipo === "ingreso").reduce((total, t) => total + t.monto, 0)
  
    const totalEgresos = transacciones.filter((t) => t.tipo === "egreso").reduce((total, t) => total + t.monto, 0)
  
    const saldoActual = totalIngresos - totalEgresos
  
    // Actualizar estadísticas en el dashboard
    document.getElementById("total-ingresos").textContent = formatCurrency(ingresos)
    document.getElementById("total-egresos").textContent = formatCurrency(egresos)
    document.getElementById("balance-total").textContent = formatCurrency(balance)
    document.getElementById("saldo-actual").textContent = formatCurrency(saldoActual)
  
    // Cargar transacciones recientes
    cargarTransaccionesRecientes()
  
    // Actualizar gráficos
    actualizarGraficos(transaccionesPeriodo)
  }
  
  function cargarTransaccionesRecientes() {
    const tablaBody = document.querySelector("#tabla-transacciones-recientes tbody")
    tablaBody.innerHTML = ""
  
    // Obtener las últimas 5 transacciones
    const transaccionesRecientes = [...transacciones].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 5)
  
    transaccionesRecientes.forEach((transaccion) => {
      const tr = document.createElement("tr")
      tr.innerHTML = `
        <td>${formatDate(transaccion.fecha)}</td>
        <td>${transaccion.tipo === "ingreso" ? '<span class="badge ingreso">Ingreso</span>' : '<span class="badge egreso">Egreso</span>'}</td>
        <td>${transaccion.categoria}</td>
        <td>${transaccion.descripcion}</td>
        <td class="${transaccion.tipo === "ingreso" ? "text-success" : "text-danger"}">${formatCurrency(transaccion.monto)}</td>
        <td>${transaccion.origen}</td>
      `
  
      tablaBody.appendChild(tr)
    })
  }
  
  // Gráficos
  function inicializarGraficos() {
    // Crear gráficos vacíos que se actualizarán después
    const ctxIngresosEgresos = document.getElementById("ingresos-egresos-chart").getContext("2d")
    const ctxEgresosCategorias = document.getElementById("egresos-categoria-chart").getContext("2d")
  
    // Gráfico de Ingresos vs Egresos
    window.ingresosEgresosChart = new Chart(ctxIngresosEgresos, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "Ingresos",
            backgroundColor: "#4CAF50",
            data: [],
          },
          {
            label: "Egresos",
            backgroundColor: "#F44336",
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => "$" + value.toLocaleString(),
            },
          },
        },
      },
    })
  
    // Gráfico de Distribución de Egresos
    window.egresosCategoriaChart = new Chart(ctxEgresosCategorias, {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ["#FF5722", "#9C27B0", "#3F51B5", "#009688", "#FFC107", "#795548", "#607D8B", "#E91E63"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
    })
  }
  
  function actualizarGraficos(transaccionesFiltradas) {
    // Actualizar gráfico de Ingresos vs Egresos por mes
    const meses = {}
  
    // Inicializar datos por mes
    for (let i = 0; i < 6; i++) {
      const fecha = new Date()
      fecha.setMonth(fecha.getMonth() - i)
      const mesKey = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`
      meses[mesKey] = { ingresos: 0, egresos: 0 }
    }
  
    // Agrupar transacciones por mes
    transaccionesFiltradas.forEach((t) => {
      const fecha = new Date(t.fecha)
      const mesKey = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`
  
      if (meses[mesKey]) {
        if (t.tipo === "ingreso") {
          meses[mesKey].ingresos += t.monto
        } else {
          meses[mesKey].egresos += t.monto
        }
      }
    })
  
    // Preparar datos para el gráfico
    const labels = Object.keys(meses)
      .sort()
      .map((key) => {
        const [year, month] = key.split("-")
        return new Date(year, month - 1).toLocaleDateString(undefined, { month: "short", year: "numeric" })
      })
  
    const ingresos = Object.keys(meses)
      .sort()
      .map((key) => meses[key].ingresos)
    const egresos = Object.keys(meses)
      .sort()
      .map((key) => meses[key].egresos)
  
    // Actualizar gráfico de Ingresos vs Egresos
    window.ingresosEgresosChart.data.labels = labels
    window.ingresosEgresosChart.data.datasets[0].data = ingresos
    window.ingresosEgresosChart.data.datasets[1].data = egresos
    window.ingresosEgresosChart.update()
  
    // Actualizar gráfico de Distribución de Egresos por categoría
    const categorias = {}
  
    // Agrupar egresos por categoría
    transaccionesFiltradas
      .filter((t) => t.tipo === "egreso")
      .forEach((t) => {
        if (!categorias[t.categoria]) {
          categorias[t.categoria] = 0
        }
        categorias[t.categoria] += t.monto
      })
  
    // Preparar datos para el gráfico
    const categoriasLabels = Object.keys(categorias)
    const categoriasData = Object.values(categorias)
  
    // Actualizar gráfico de Distribución de Egresos
    window.egresosCategoriaChart.data.labels = categoriasLabels
    window.egresosCategoriaChart.data.datasets[0].data = categoriasData
    window.egresosCategoriaChart.update()
  }
  
  // Funciones para Ingresos
  function guardarIngreso() {
    // Obtener datos del formulario
    const fecha = document.getElementById("ingreso-fecha").value
    const categoria = document.getElementById("ingreso-categoria").value
    const descripcion = document.getElementById("ingreso-descripcion").value
    const metodoPago = document.getElementById("ingreso-metodo").value
    const referencia = document.getElementById("ingreso-referencia").value
    const monto = Number.parseFloat(document.getElementById("ingreso-monto").value)
  
    // Validar datos
    if (!fecha || !categoria || !descripcion || !metodoPago || isNaN(monto) || monto <= 0) {
      alert("Por favor complete todos los campos obligatorios correctamente")
      return
    }
  
    // Crear nueva transacción
    const nuevaTransaccion = {
      id: transacciones.length > 0 ? Math.max(...transacciones.map((t) => t.id)) + 1 : 1,
      fecha,
      tipo: "ingreso",
      categoria,
      descripcion,
      metodoPago,
      referencia,
      monto,
      origen: "contabilidad",
      usuario: "Admin",
    }
  
    // Guardar transacción
    transacciones.push(nuevaTransaccion)
  
    // Guardar en localStorage para compartir con otros módulos
    guardarDatosEnLocalStorage()
  
    // Mostrar mensaje de éxito
    alert("Ingreso registrado correctamente")
  
    // Limpiar formulario
    limpiarFormulario("ingreso-form")
  
    // Actualizar tablas y dashboard
    cargarDashboard()
    cargarTablaIngresos()
    cargarHistorialTransacciones()
  }
  
  function cargarTablaIngresos() {
    const tablaBody = document.querySelector("#tabla-ingresos tbody")
    tablaBody.innerHTML = ""
  
    // Filtrar solo ingresos y ordenar por fecha (más recientes primero)
    const ingresos = transacciones
      .filter((t) => t.tipo === "ingreso")
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  
    ingresos.forEach((ingreso) => {
      const tr = document.createElement("tr")
      tr.innerHTML = `
        <td>${formatDate(ingreso.fecha)}</td>
        <td>${ingreso.categoria}</td>
        <td>${ingreso.descripcion}</td>
        <td>${ingreso.metodoPago}</td>
        <td>${ingreso.referencia}</td>
        <td>${formatCurrency(ingreso.monto)}</td>
        <td>
          <button type="button" class="btn-secondary" onclick="verTransaccion(${ingreso.id})">
            <span class="material-symbols-outlined">visibility</span>
          </button>
          <button type="button" class="btn-secondary" onclick="eliminarTransaccion(${ingreso.id})">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </td>
      `
  
      tablaBody.appendChild(tr)
    })
  }
  
  function filtrarIngresos() {
    const fechaInicio = document.getElementById("ingreso-fecha-inicio").value
    const fechaFin = document.getElementById("ingreso-fecha-fin").value
  
    const tablaBody = document.querySelector("#tabla-ingresos tbody")
    tablaBody.innerHTML = ""
  
    // Filtrar ingresos por fecha
    let ingresosFiltrados = transacciones.filter((t) => t.tipo === "ingreso")
  
    if (fechaInicio) {
      ingresosFiltrados = ingresosFiltrados.filter((t) => t.fecha >= fechaInicio)
    }
  
    if (fechaFin) {
      ingresosFiltrados = ingresosFiltrados.filter((t) => t.fecha <= fechaFin)
    }
  
    // Ordenar por fecha (más recientes primero)
    ingresosFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  
    ingresosFiltrados.forEach((ingreso) => {
      const tr = document.createElement("tr")
      tr.innerHTML = `
        <td>${formatDate(ingreso.fecha)}</td>
        <td>${ingreso.categoria}</td>
        <td>${ingreso.descripcion}</td>
        <td>${ingreso.metodoPago}</td>
        <td>${ingreso.referencia}</td>
        <td>${formatCurrency(ingreso.monto)}</td>
        <td>
          <button type="button" class="btn-secondary" onclick="verTransaccion(${ingreso.id})">
            <span class="material-symbols-outlined">visibility</span>
          </button>
          <button type="button" class="btn-secondary" onclick="eliminarTransaccion(${ingreso.id})">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </td>
      `
  
      tablaBody.appendChild(tr)
    })
  }
  
  // Funciones para Egresos
  function guardarEgreso() {
    // Obtener datos del formulario
    const fecha = document.getElementById("egreso-fecha").value
    const categoria = document.getElementById("egreso-categoria").value
    const descripcion = document.getElementById("egreso-descripcion").value
    const metodoPago = document.getElementById("egreso-metodo").value
    const referencia = document.getElementById("egreso-referencia").value
    const monto = Number.parseFloat(document.getElementById("egreso-monto").value)
  
    // Validar datos
    if (!fecha || !categoria || !descripcion || !metodoPago || isNaN(monto) || monto <= 0) {
      alert("Por favor complete todos los campos obligatorios correctamente")
      return
    }
  
    // Crear nueva transacción
    const nuevaTransaccion = {
      id: transacciones.length > 0 ? Math.max(...transacciones.map((t) => t.id)) + 1 : 1,
      fecha,
      tipo: "egreso",
      categoria,
      descripcion,
      metodoPago,
      referencia,
      monto,
      origen: "contabilidad",
      usuario: "Admin",
    }
  
    // Guardar transacción
    transacciones.push(nuevaTransaccion)
  
    // Guardar en localStorage para compartir con otros módulos
    guardarDatosEnLocalStorage()
  
    // Mostrar mensaje de éxito
    alert("Egreso registrado correctamente")
  
    // Limpiar formulario
    limpiarFormulario("egreso-form")
  
    // Actualizar tablas y dashboard
    cargarDashboard()
    cargarTablaEgresos()
    cargarHistorialTransacciones()
  }
  
  function cargarTablaEgresos() {
    const tablaBody = document.querySelector("#tabla-egresos tbody")
    tablaBody.innerHTML = ""
  
    // Filtrar solo egresos y ordenar por fecha (más recientes primero)
    const egresos = transacciones.filter((t) => t.tipo === "egreso").sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  
    egresos.forEach((egreso) => {
      const tr = document.createElement("tr")
      tr.innerHTML = `
        <td>${formatDate(egreso.fecha)}</td>
        <td>${egreso.categoria}</td>
        <td>${egreso.descripcion}</td>
        <td>${egreso.metodoPago}</td>
        <td>${egreso.referencia}</td>
        <td>${formatCurrency(egreso.monto)}</td>
        <td>
          <button type="button" class="btn-secondary" onclick="verTransaccion(${egreso.id})">
            <span class="material-symbols-outlined">visibility</span>
          </button>
          <button type="button" class="btn-secondary" onclick="eliminarTransaccion(${egreso.id})">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </td>
      `
  
      tablaBody.appendChild(tr)
    })
  }
  
  function filtrarEgresos() {
    const fechaInicio = document.getElementById("egreso-fecha-inicio").value
    const fechaFin = document.getElementById("egreso-fecha-fin").value
  
    const tablaBody = document.querySelector("#tabla-egresos tbody")
    tablaBody.innerHTML = ""
  
    // Filtrar egresos por fecha
    let egresosFiltrados = transacciones.filter((t) => t.tipo === "egreso")
  
    if (fechaInicio) {
      egresosFiltrados = egresosFiltrados.filter((t) => t.fecha >= fechaInicio)
    }
  
    if (fechaFin) {
      egresosFiltrados = egresosFiltrados.filter((t) => t.fecha <= fechaFin)
    }
  
    // Ordenar por fecha (más recientes primero)
    egresosFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  
    egresosFiltrados.forEach((egreso) => {
      const tr = document.createElement("tr")
      tr.innerHTML = `
        <td>${formatDate(egreso.fecha)}</td>
        <td>${egreso.categoria}</td>
        <td>${egreso.descripcion}</td>
        <td>${egreso.metodoPago}</td>
        <td>${egreso.referencia}</td>
        <td>${formatCurrency(egreso.monto)}</td>
        <td>
          <button type="button" class="btn-secondary" onclick="verTransaccion(${egreso.id})">
            <span class="material-symbols-outlined">visibility</span>
          </button>
          <button type="button" class="btn-secondary" onclick="eliminarTransaccion(${egreso.id})">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </td>
      `
  
      tablaBody.appendChild(tr)
    })
  }
  
  // Funciones para Historial
  function cargarHistorialTransacciones() {
    const tablaBody = document.querySelector("#tabla-historial tbody")
    tablaBody.innerHTML = ""
  
    // Ordenar transacciones por fecha (más recientes primero)
    const transaccionesOrdenadas = [...transacciones].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  
    transaccionesOrdenadas.forEach((transaccion) => {
      const tr = document.createElement("tr")
      tr.innerHTML = `
        <td>${formatDate(transaccion.fecha)}</td>
        <td>${transaccion.tipo === "ingreso" ? '<span class="badge ingreso">Ingreso</span>' : '<span class="badge egreso">Egreso</span>'}</td>
        <td>${transaccion.categoria}</td>
        <td>${transaccion.descripcion}</td>
        <td>${transaccion.metodoPago}</td>
        <td>${transaccion.referencia}</td>
        <td class="${transaccion.tipo === "ingreso" ? "text-success" : "text-danger"}">${formatCurrency(transaccion.monto)}</td>
        <td>${transaccion.origen}</td>
        <td>
          <button type="button" class="btn-secondary" onclick="verTransaccion(${transaccion.id})">
            <span class="material-symbols-outlined">visibility</span>
          </button>
          <button type="button" class="btn-secondary" onclick="eliminarTransaccion(${transaccion.id})">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </td>
      `
  
      tablaBody.appendChild(tr)
    })
  
    // Calcular totales
    const ingresos = transacciones.filter((t) => t.tipo === "ingreso").reduce((total, t) => total + t.monto, 0)
  
    const egresos = transacciones.filter((t) => t.tipo === "egreso").reduce((total, t) => total + t.monto, 0)
  
    const balance = ingresos - egresos
  
    // Actualizar resumen
    document.getElementById("historial-total-ingresos").textContent = formatCurrency(ingresos)
    document.getElementById("historial-total-egresos").textContent = formatCurrency(egresos)
    document.getElementById("historial-balance").textContent = formatCurrency(balance)
  }
  
  function filtrarHistorial() {
    const tipo = document.getElementById("historial-tipo").value
    const categoria = document.getElementById("historial-categoria").value
    const fechaInicio = document.getElementById("historial-fecha-inicio").value
    const fechaFin = document.getElementById("historial-fecha-fin").value
    const busqueda = document.getElementById("historial-buscar").value.toLowerCase()
  
    const tablaBody = document.querySelector("#tabla-historial tbody")
    tablaBody.innerHTML = ""
  
    // Filtrar transacciones
    let transaccionesFiltradas = [...transacciones]
  
    if (tipo !== "todos") {
      transaccionesFiltradas = transaccionesFiltradas.filter((t) => t.tipo === tipo)
    }
  
    if (categoria !== "todas") {
      transaccionesFiltradas = transaccionesFiltradas.filter((t) => t.categoria === categoria)
    }
  
    if (fechaInicio) {
      transaccionesFiltradas = transaccionesFiltradas.filter((t) => t.fecha >= fechaInicio)
    }
  
    if (fechaFin) {
      transaccionesFiltradas = transaccionesFiltradas.filter((t) => t.fecha <= fechaFin)
    }
  
    if (busqueda) {
      transaccionesFiltradas = transaccionesFiltradas.filter(
        (t) => t.descripcion.toLowerCase().includes(busqueda) || t.referencia.toLowerCase().includes(busqueda),
      )
    }
  
    // Ordenar por fecha (más recientes primero)
    transaccionesFiltradas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  
    transaccionesFiltradas.forEach((transaccion) => {
      const tr = document.createElement("tr")
      tr.innerHTML = `
        <td>${formatDate(transaccion.fecha)}</td>
        <td>${transaccion.tipo === "ingreso" ? '<span class="badge ingreso">Ingreso</span>' : '<span class="badge egreso">Egreso</span>'}</td>
        <td>${transaccion.categoria}</td>
        <td>${transaccion.descripcion}</td>
        <td>${transaccion.metodoPago}</td>
        <td>${transaccion.referencia}</td>
        <td class="${transaccion.tipo === "ingreso" ? "text-success" : "text-danger"}">${formatCurrency(transaccion.monto)}</td>
        <td>${transaccion.origen}</td>
        <td>
          <button type="button" class="btn-secondary" onclick="verTransaccion(${transaccion.id})">
            <span class="material-symbols-outlined">visibility</span>
          </button>
          <button type="button" class="btn-secondary" onclick="eliminarTransaccion(${transaccion.id})">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </td>
      `
  
      tablaBody.appendChild(tr)
    })
  
    // Calcular totales filtrados
    const ingresos = transaccionesFiltradas.filter((t) => t.tipo === "ingreso").reduce((total, t) => total + t.monto, 0)
  
    const egresos = transaccionesFiltradas.filter((t) => t.tipo === "egreso").reduce((total, t) => total + t.monto, 0)
  
    const balance = ingresos - egresos
  
    // Actualizar resumen
    document.getElementById("historial-total-ingresos").textContent = formatCurrency(ingresos)
    document.getElementById("historial-total-egresos").textContent = formatCurrency(egresos)
    document.getElementById("historial-balance").textContent = formatCurrency(balance)
  }
  
  // Funciones para Reportes
  function generarReporte() {
    const tipoReporte = document.getElementById("reporte-tipo").value
    const periodoReporte = document.getElementById("reporte-periodo").value
  
    // Calcular fechas según el periodo seleccionado
    const fechaActual = new Date()
    let fechaInicio = new Date()
    let fechaFin = new Date()
    let tituloReporte = ""
  
    if (periodoReporte === "diario") {
      fechaInicio = new Date(fechaActual.setHours(0, 0, 0, 0))
      tituloReporte = `Reporte Diario - ${formatDate(fechaInicio.toISOString().split("T")[0])}`
    } else if (periodoReporte === "semanal") {
      fechaInicio = new Date(fechaActual)
      fechaInicio.setDate(fechaInicio.getDate() - fechaInicio.getDay())
      tituloReporte = `Reporte Semanal - ${formatDate(fechaInicio.toISOString().split("T")[0])} al ${formatDate(fechaFin.toISOString().split("T")[0])}`
    } else if (periodoReporte === "mensual") {
      fechaInicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1)
      tituloReporte = `Reporte Mensual - ${fechaInicio.toLocaleDateString(undefined, { month: "long", year: "numeric" })}`
    } else if (periodoReporte === "trimestral") {
      const trimestre = Math.floor(fechaActual.getMonth() / 3)
      fechaInicio = new Date(fechaActual.getFullYear(), trimestre * 3, 1)
      fechaFin = new Date(fechaActual.getFullYear(), trimestre * 3 + 3, 0)
      tituloReporte = `Reporte Trimestral - ${fechaInicio.toLocaleDateString(undefined, { month: "long" })} a ${fechaFin.toLocaleDateString(undefined, { month: "long", year: "numeric" })}`
    } else if (periodoReporte === "anual") {
      fechaInicio = new Date(fechaActual.getFullYear(), 0, 1)
      tituloReporte = `Reporte Anual - ${fechaActual.getFullYear()}`
    } else if (periodoReporte === "personalizado") {
      fechaInicio = new Date(document.getElementById("reporte-fecha-inicio").value)
      fechaFin = new Date(document.getElementById("reporte-fecha-fin").value)
      tituloReporte = `Reporte Personalizado - ${formatDate(fechaInicio.toISOString().split("T")[0])} al ${formatDate(fechaFin.toISOString().split("T")[0])}`
    }
  
    // Filtrar transacciones por periodo
    const transaccionesFiltradas = transacciones.filter((t) => {
      const fechaTransaccion = new Date(t.fecha)
      return fechaTransaccion >= fechaInicio && fechaTransaccion <= fechaFin
    })
  
    // Mostrar sección de reporte
    document.getElementById("reporte-generado").classList.remove("hidden")
  
    // Generar contenido según el tipo de reporte
    if (tipoReporte === "balance") {
      generarReporteBalance(transaccionesFiltradas, tituloReporte)
    } else if (tipoReporte === "resultados") {
      generarReporteResultados(transaccionesFiltradas, tituloReporte)
    } else if (tipoReporte === "flujo") {
      generarReporteFlujo(transaccionesFiltradas, tituloReporte)
    } else if (tipoReporte === "categorias") {
      generarReporteCategorias(transaccionesFiltradas, tituloReporte)
    }
  }
  
  function generarReporteBalance(transaccionesFiltradas, titulo) {
    document.getElementById("reporte-titulo").textContent = `Balance General - ${titulo}`
  
    const contenidoReporte = document.getElementById("reporte-contenido")
  
    // Calcular totales
    const ingresos = transaccionesFiltradas.filter((t) => t.tipo === "ingreso").reduce((total, t) => total + t.monto, 0)
  
    const egresos = transaccionesFiltradas.filter((t) => t.tipo === "egreso").reduce((total, t) => total + t.monto, 0)
  
    const balance = ingresos - egresos
  
    // Crear HTML del reporte
    const html = `
      <div class="report-header">
        <div class="report-meta">
          <p><strong>Fecha de generación:</strong> ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
          <p><strong>Generado por:</strong> Admin</p>
        </div>
        <div class="report-summary">
          <div class="summary-stats">
            <div class="stat-item">
              <span class="stat-label">Total Ingresos:</span>
              <span class="stat-value">${formatCurrency(ingresos)}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Total Egresos:</span>
              <span class="stat-value">${formatCurrency(egresos)}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Balance:</span>
              <span class="stat-value">${formatCurrency(balance)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <h4>Activos</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Concepto</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Efectivo y Equivalentes</td>
              <td>${formatCurrency(balance > 0 ? balance : 0)}</td>
            </tr>
            <tr>
              <td>Cuentas por Cobrar</td>
              <td>${formatCurrency(0)}</td>
            </tr>
            <tr>
              <td>Inventario</td>
              <td>${formatCurrency(0)}</td>
            </tr>
            <tr>
              <td><strong>Total Activos</strong></td>
              <td><strong>${formatCurrency(balance > 0 ? balance : 0)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h4>Pasivos y Patrimonio</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Concepto</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cuentas por Pagar</td>
              <td>${formatCurrency(0)}</td>
            </tr>
            <tr>
              <td>Préstamos</td>
              <td>${formatCurrency(0)}</td>
            </tr>
            <tr>
              <td>Patrimonio</td>
              <td>${formatCurrency(balance > 0 ? balance : 0)}</td>
            </tr>
            <tr>
              <td><strong>Total Pasivos y Patrimonio</strong></td>
              <td><strong>${formatCurrency(balance > 0 ? balance : 0)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  
    contenidoReporte.innerHTML = html
  }
  
  function generarReporteResultados(transaccionesFiltradas, titulo) {
    document.getElementById("reporte-titulo").textContent = `Estado de Resultados - ${titulo}`
  
    const contenidoReporte = document.getElementById("reporte-contenido")
  
    // Agrupar ingresos por categoría
    const ingresosPorCategoria = {}
    transaccionesFiltradas
      .filter((t) => t.tipo === "ingreso")
      .forEach((t) => {
        if (!ingresosPorCategoria[t.categoria]) {
          ingresosPorCategoria[t.categoria] = 0
        }
        ingresosPorCategoria[t.categoria] += t.monto
      })
  
    // Agrupar egresos por categoría
    const egresosPorCategoria = {}
    transaccionesFiltradas
      .filter((t) => t.tipo === "egreso")
      .forEach((t) => {
        if (!egresosPorCategoria[t.categoria]) {
          egresosPorCategoria[t.categoria] = 0
        }
        egresosPorCategoria[t.categoria] += t.monto
      })
  
    // Calcular totales
    const totalIngresos = Object.values(ingresosPorCategoria).reduce((sum, value) => sum + value, 0)
    const totalEgresos = Object.values(egresosPorCategoria).reduce((sum, value) => sum + value, 0)
    const utilidad = totalIngresos - totalEgresos
  
    // Crear HTML del reporte
    let html = `
      <div class="report-header">
        <div class="report-meta">
          <p><strong>Fecha de generación:</strong> ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
          <p><strong>Generado por:</strong> Admin</p>
        </div>
        <div class="report-summary">
          <div class="summary-stats">
            <div class="stat-item">
              <span class="stat-label">Total Ingresos:</span>
              <span class="stat-value">${formatCurrency(totalIngresos)}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Total Egresos:</span>
              <span class="stat-value">${formatCurrency(totalEgresos)}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Utilidad Neta:</span>
              <span class="stat-value">${formatCurrency(utilidad)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <h4>Ingresos</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Monto</th>
              <th>Porcentaje</th>
            </tr>
          </thead>
          <tbody>
    `
  
    // Agregar filas de ingresos
    Object.entries(ingresosPorCategoria).forEach(([categoria, monto]) => {
      const porcentaje = (monto / totalIngresos) * 100
      html += `
        <tr>
          <td>${categoria}</td>
          <td>${formatCurrency(monto)}</td>
          <td>${porcentaje.toFixed(2)}%</td>
        </tr>
      `
    })
  
    html += `
            <tr>
              <td><strong>Total Ingresos</strong></td>
              <td><strong>${formatCurrency(totalIngresos)}</strong></td>
              <td><strong>100%</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h4>Egresos</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Monto</th>
              <th>Porcentaje</th>
            </tr>
          </thead>
          <tbody>
    `
  
    // Agregar filas de egresos
    Object.entries(egresosPorCategoria).forEach(([categoria, monto]) => {
      const porcentaje = (monto / totalEgresos) * 100
      html += `
        <tr>
          <td>${categoria}</td>
          <td>${formatCurrency(monto)}</td>
          <td>${porcentaje.toFixed(2)}%</td>
        </tr>
      `
    })
  
    html += `
            <tr>
              <td><strong>Total Egresos</strong></td>
              <td><strong>${formatCurrency(totalEgresos)}</strong></td>
              <td><strong>100%</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h4>Resultado</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Concepto</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Ingresos</td>
              <td>${formatCurrency(totalIngresos)}</td>
            </tr>
            <tr>
              <td>Total Egresos</td>
              <td>${formatCurrency(totalEgresos)}</td>
            </tr>
            <tr>
              <td><strong>Utilidad Neta</strong></td>
              <td><strong>${formatCurrency(utilidad)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  
    contenidoReporte.innerHTML = html
  }
  
  function generarReporteFlujo(transaccionesFiltradas, titulo) {
    document.getElementById("reporte-titulo").textContent = `Flujo de Efectivo - ${titulo}`
  
    const contenidoReporte = document.getElementById("reporte-contenido")
  
    // Agrupar transacciones por fecha
    const transaccionesPorFecha = {}
  
    transaccionesFiltradas.forEach((t) => {
      if (!transaccionesPorFecha[t.fecha]) {
        transaccionesPorFecha[t.fecha] = {
          ingresos: 0,
          egresos: 0,
        }
      }
  
      if (t.tipo === "ingreso") {
        transaccionesPorFecha[t.fecha].ingresos += t.monto
      } else {
        transaccionesPorFecha[t.fecha].egresos += t.monto
      }
    })
  
    // Calcular totales
    const totalIngresos = transaccionesFiltradas
      .filter((t) => t.tipo === "ingreso")
      .reduce((total, t) => total + t.monto, 0)
  
    const totalEgresos = transaccionesFiltradas
      .filter((t) => t.tipo === "egreso")
      .reduce((total, t) => total + t.monto, 0)
  
    const flujoNeto = totalIngresos - totalEgresos
  
    // Crear HTML del reporte
    let html = `
      <div class="report-header">
        <div class="report-meta">
          <p><strong>Fecha de generación:</strong> ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
          <p><strong>Generado por:</strong> Admin</p>
        </div>
        <div class="report-summary">
          <div class="summary-stats">
            <div class="stat-item">
              <span class="stat-label">Total Entradas:</span>
              <span class="stat-value">${formatCurrency(totalIngresos)}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Total Salidas:</span>
              <span class="stat-value">${formatCurrency(totalEgresos)}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Flujo Neto:</span>
              <span class="stat-value">${formatCurrency(flujoNeto)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <h4>Detalle de Flujo de Efectivo</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Entradas</th>
              <th>Salidas</th>
              <th>Flujo Neto</th>
              <th>Saldo Acumulado</th>
            </tr>
          </thead>
          <tbody>
    `
  
    // Ordenar fechas
    const fechasOrdenadas = Object.keys(transaccionesPorFecha).sort()
  
    // Calcular saldo acumulado
    let saldoAcumulado = 0
  
    // Agregar filas por fecha
    fechasOrdenadas.forEach((fecha) => {
      const ingresos = transaccionesPorFecha[fecha].ingresos
      const egresos = transaccionesPorFecha[fecha].egresos
      const flujoNeto = ingresos - egresos
  
      saldoAcumulado += flujoNeto
  
      html += `
        <tr>
          <td>${formatDate(fecha)}</td>
          <td>${formatCurrency(ingresos)}</td>
          <td>${formatCurrency(egresos)}</td>
          <td>${formatCurrency(flujoNeto)}</td>
          <td>${formatCurrency(saldoAcumulado)}</td>
        </tr>
      `
    })
  
    html += `
          </tbody>
        </table>
      </div>
    `
  
    contenidoReporte.innerHTML = html
  }
  
  function generarReporteCategorias(transaccionesFiltradas, titulo) {
    document.getElementById("reporte-titulo").textContent = `Gastos por Categoría - ${titulo}`
  
    const contenidoReporte = document.getElementById("reporte-contenido")
  
    // Agrupar egresos por categoría
    const egresosPorCategoria = {}
    transaccionesFiltradas
      .filter((t) => t.tipo === "egreso")
      .forEach((t) => {
        if (!egresosPorCategoria[t.categoria]) {
          egresosPorCategoria[t.categoria] = 0
        }
        egresosPorCategoria[t.categoria] += t.monto
      })
  
    // Calcular total de egresos
    const totalEgresos = Object.values(egresosPorCategoria).reduce((sum, value) => sum + value, 0)
  
    // Crear HTML del reporte
    let html = `
      <div class="report-header">
        <div class="report-meta">
          <p><strong>Fecha de generación:</strong> ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
          <p><strong>Generado por:</strong> Admin</p>
        </div>
        <div class="report-summary">
          <div class="summary-stats">
            <div class="stat-item">
              <span class="stat-label">Total Egresos:</span>
              <span class="stat-value">${formatCurrency(totalEgresos)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chart-container" style="height: 400px; margin-bottom: 2rem;">
        <canvas id="reporte-categorias-chart"></canvas>
      </div>
      
      <h4>Detalle de Gastos por Categoría</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Monto</th>
              <th>Porcentaje</th>
            </tr>
          </thead>
          <tbody>
    `
  
    // Agregar filas por categoría
    Object.entries(egresosPorCategoria)
      .sort((a, b) => b[1] - a[1]) // Ordenar por monto (mayor a menor)
      .forEach(([categoria, monto]) => {
        const porcentaje = (monto / totalEgresos) * 100
  
        html += `
          <tr>
            <td>${categoria}</td>
            <td>${formatCurrency(monto)}</td>
            <td>${porcentaje.toFixed(2)}%</td>
          </tr>
        `
      })
  
    html += `
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>${formatCurrency(totalEgresos)}</strong></td>
              <td><strong>100%</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  
    contenidoReporte.innerHTML = html
  
    // Crear gráfico de categorías
    setTimeout(() => {
      const ctx = document.getElementById("reporte-categorias-chart").getContext("2d")
  
      // Preparar datos para el gráfico
      const categorias = Object.keys(egresosPorCategoria)
      const montos = Object.values(egresosPorCategoria)
  
      // Colores para las categorías
      const colores = ["#FF5722", "#9C27B0", "#3F51B5", "#009688", "#FFC107", "#795548", "#607D8B", "#E91E63"]
  
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: categorias,
          datasets: [
            {
              data: montos,
              backgroundColor: colores.slice(0, categorias.length),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
            },
          },
        },
      })
    }, 100)
  }
  
  function generarReporteRapido(tipo) {
    // Establecer valores en el formulario
    document.getElementById("reporte-tipo").value = tipo
    document.getElementById("reporte-periodo").value = "mensual"
    document.getElementById("periodo-personalizado").classList.add("hidden")
  
    // Generar reporte
    generarReporte()
  }
  
  // Funciones para ver y editar transacciones
  function verTransaccion(id) {
    const transaccion = transacciones.find((t) => t.id === id)
  
    if (transaccion) {
      // Llenar modal con datos de la transacción
      document.getElementById("detalle-fecha").textContent = formatDate(transaccion.fecha)
      document.getElementById("detalle-tipo").textContent = transaccion.tipo === "ingreso" ? "Ingreso" : "Egreso"
      document.getElementById("detalle-categoria").textContent = transaccion.categoria
      document.getElementById("detalle-descripcion").textContent = transaccion.descripcion
      document.getElementById("detalle-monto").textContent = formatCurrency(transaccion.monto)
      document.getElementById("detalle-metodo").textContent = transaccion.metodoPago
      document.getElementById("detalle-referencia").textContent = transaccion.referencia
      document.getElementById("detalle-origen").textContent = transaccion.origen
  
      // Abrir modal
      document.getElementById("ver-transaccion-modal").style.display = "block"
    }
  }
  
  function editarTransaccion() {
    // Cerrar modal de detalles
    cerrarModal("ver-transaccion-modal")
  
    // Obtener datos de la transacción
    const fecha = document.getElementById("detalle-fecha").textContent
    const tipo = document.getElementById("detalle-tipo").textContent === "Ingreso" ? "ingreso" : "egreso"
    const categoria = document.getElementById("detalle-categoria").textContent
    const descripcion = document.getElementById("detalle-descripcion").textContent
    const monto = document.getElementById("detalle-monto").textContent
    const metodoPago = document.getElementById("detalle-metodo").textContent
    const referencia = document.getElementById("detalle-referencia").textContent
  
    // Buscar ID de la transacción
    const transaccion = transacciones.find(
      (t) => t.fecha === fecha.split("/").reverse().join("-") && t.descripcion === descripcion,
    )
  
    if (!transaccion) return
  
    // Llenar formulario de edición
    document.getElementById("editar-transaccion-id").value = transaccion.id
    document.getElementById("editar-transaccion-tipo").value = tipo
    document.getElementById("editar-fecha").value = transaccion.fecha
    document.getElementById("editar-descripcion").value = descripcion
    document.getElementById("editar-monto").value = transaccion.monto
    document.getElementById("editar-metodo").value = metodoPago.toLowerCase()
    document.getElementById("editar-referencia").value = referencia
  
    // Llenar categorías según el tipo
    const selectCategoria = document.getElementById("editar-categoria")
    selectCategoria.innerHTML = ""
  
    if (tipo === "ingreso") {
      const categorias = ["hospedaje", "restaurante", "spa", "eventos", "otros"]
      categorias.forEach((cat) => {
        const option = document.createElement("option")
        option.value = cat
        option.textContent = cat
        selectCategoria.appendChild(option)
      })
    } else {
      const categorias = [
        "sueldos",
        "compras",
        "servicios",
        "mantenimiento",
        "impuestos",
        "alquiler",
        "marketing",
        "otros",
      ]
      categorias.forEach((cat) => {
        const option = document.createElement("option")
        option.value = cat
        option.textContent = cat
        selectCategoria.appendChild(option)
      })
    }
  
    // Seleccionar la categoría actual
    selectCategoria.value = categoria
  
    // Abrir modal de edición
    document.getElementById("editar-transaccion-modal").style.display = "block"
  }
  
  function guardarEdicionTransaccion() {
    // Obtener datos del formulario
    const id = Number.parseInt(document.getElementById("editar-transaccion-id").value)
    const tipo = document.getElementById("editar-transaccion-tipo").value
    const fecha = document.getElementById("editar-fecha").value
    const categoria = document.getElementById("editar-categoria").value
    const descripcion = document.getElementById("editar-descripcion").value
    const metodoPago = document.getElementById("editar-metodo").value
    const referencia = document.getElementById("editar-referencia").value
    const monto = Number.parseFloat(document.getElementById("editar-monto").value)
  
    // Validar datos
    if (!fecha || !categoria || !descripcion || !metodoPago || isNaN(monto) || monto <= 0) {
      alert("Por favor complete todos los campos obligatorios correctamente")
      return
    }
  
    // Buscar índice de la transacción
    const index = transacciones.findIndex((t) => t.id === id)
  
    if (index >= 0) {
      // Guardar origen original
      const origen = transacciones[index].origen
  
      // Actualizar transacción
      transacciones[index] = {
        id,
        fecha,
        tipo,
        categoria,
        descripcion,
        metodoPago,
        referencia,
        monto,
        origen,
        usuario: "Admin",
      }
  
      // Guardar en localStorage para compartir con otros módulos
      guardarDatosEnLocalStorage()
  
      // Mostrar mensaje de éxito
      alert("Transacción actualizada correctamente")
  
      // Cerrar modal
      cerrarModal("editar-transaccion-modal")
  
      // Actualizar tablas y dashboard
      cargarDashboard()
      cargarTablaIngresos()
      cargarTablaEgresos()
      cargarHistorialTransacciones()
    }
  }
  
  function eliminarTransaccion(id) {
    // Confirmar eliminación
    if (confirm("¿Está seguro de que desea eliminar esta transacción?")) {
      // Buscar índice de la transacción
      const index = transacciones.findIndex((t) => t.id === id)
  
      if (index >= 0) {
        // Eliminar transacción
        transacciones.splice(index, 1)
  
        // Guardar en localStorage para compartir con otros módulos
        guardarDatosEnLocalStorage()
  
        // Mostrar mensaje de éxito
        alert("Transacción eliminada correctamente")
  
        // Actualizar tablas y dashboard
        cargarDashboard()
        cargarTablaIngresos()
        cargarTablaEgresos()
        cargarHistorialTransacciones()
      }
    }
  }
  
  // Funciones para modales
  function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = "none"
  }
  
  // Funciones para exportar
  function exportarIngresos() {
    alert("Exportando ingresos a Excel...")
    // En una implementación real, se generaría un archivo Excel para descargar
  }
  
  function exportarEgresos() {
    alert("Exportando egresos a Excel...")
    // En una implementación real, se generaría un archivo Excel para descargar
  }
  
  function exportarHistorial() {
    alert("Exportando historial a Excel...")
    // En una implementación real, se generaría un archivo Excel para descargar
  }
  
  function exportarReporteExcel() {
    alert("Exportando reporte a Excel...")
    // En una implementación real, se generaría un archivo Excel para descargar
  }
  
  function exportarReportePDF() {
    alert("Exportando reporte a PDF...")
    // En una implementación real, se generaría un archivo PDF para descargar
  }
  
  function imprimirReporte() {
    window.print()
  }
  
  // Funciones para limpiar formularios
  function limpiarFormulario(formId) {
    document.getElementById(formId).reset()
  
    // Si es el formulario de ingreso o egreso, establecer la fecha actual
    if (formId === "ingreso-form" || formId === "egreso-form") {
      const hoy = new Date().toISOString().split("T")[0]
      document.getElementById(formId === "ingreso-form" ? "ingreso-fecha" : "egreso-fecha").value = hoy
    }
  }
  
  // Funciones para ver todas las transacciones
  function verTodasTransacciones() {
    // Cambiar a la sección de historial
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active")
    })
  
    document.querySelectorAll(".content-section").forEach((section) => {
      section.classList.remove("active")
    })
  
    // Activar sección de historial
    document.querySelector('[data-section="historial"]').classList.add("active")
    document.getElementById("historial").classList.add("active")
  
    // Restablecer filtros
    document.getElementById("historial-tipo").value = "todos"
    document.getElementById("historial-categoria").value = "todas"
    document.getElementById("historial-fecha-inicio").value = ""
    document.getElementById("historial-fecha-fin").value = ""
    document.getElementById("historial-buscar").value = ""
  
    // Cargar todas las transacciones
    cargarHistorialTransacciones()
  }
  
  // Funciones para sincronizar con otros módulos
  function sincronizarIngresosVentas() {
    // Simular carga de datos
    document.querySelector("#tabla-ingresos-pendientes tbody").innerHTML = `
      <tr>
        <td colspan="6" class="text-center">Cargando datos de ventas...</td>
      </tr>
    `
  
    // Simular tiempo de carga
    setTimeout(() => {
      // Verificar si hay ventas pendientes
      const ventasPendientes = JSON.parse(localStorage.getItem("ventas_pendientes") || "[]")
  
      if (ventasPendientes.length === 0) {
        document.querySelector("#tabla-ingresos-pendientes tbody").innerHTML = `
          <tr>
            <td colspan="6" class="text-center">No hay ingresos pendientes de ventas</td>
          </tr>
        `
        return
      }
  
      // Mostrar ventas pendientes
      const tablaBody = document.querySelector("#tabla-ingresos-pendientes tbody")
      tablaBody.innerHTML = ""
  
      ventasPendientes.forEach((venta, index) => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
          <td>${formatDate(venta.fecha)}</td>
          <td>${venta.tipo}</td>
          <td>${venta.cliente}</td>
          <td>${venta.descripcion}</td>
          <td>${formatCurrency(venta.monto)}</td>
          <td>
            <button type="button" class="btn-primary" onclick="registrarIngresoVenta(${index})">
              <span class="material-symbols-outlined">add_circle</span> Registrar
            </button>
          </td>
        `
  
        tablaBody.appendChild(tr)
      })
    }, 1000)
  }
  
  function registrarIngresoVenta(index) {
    // Obtener ventas pendientes
    const ventasPendientes = JSON.parse(localStorage.getItem("ventas_pendientes") || "[]")
  
    if (index >= ventasPendientes.length) return
  
    const venta = ventasPendientes[index]
  
    // Crear nueva transacción
    const nuevaTransaccion = {
      id: transacciones.length > 0 ? Math.max(...transacciones.map((t) => t.id)) + 1 : 1,
      fecha: venta.fecha || new Date().toISOString().split("T")[0],
      tipo: "ingreso",
      categoria: venta.tipo === "hospedaje" ? "hospedaje" : "restaurante",
      descripcion: venta.descripcion,
      metodoPago: venta.metodoPago || "efectivo",
      referencia: venta.referencia || `Venta #${Math.floor(Math.random() * 1000) + 1}`,
      monto: venta.monto,
      origen: "ventas",
      usuario: "Admin",
    }
  
    // Guardar transacción
    transacciones.push(nuevaTransaccion)
  
    // Eliminar venta de pendientes
    ventasPendientes.splice(index, 1)
    localStorage.setItem("ventas_pendientes", JSON.stringify(ventasPendientes))
  
    // Guardar en localStorage para compartir con otros módulos
    guardarDatosEnLocalStorage()
  
    // Mostrar mensaje de éxito
    alert("Ingreso registrado correctamente")
  
    // Actualizar tablas y dashboard
    cargarDashboard()
    cargarTablaIngresos()
    cargarHistorialTransacciones()
  
    // Actualizar tabla de ingresos pendientes
    sincronizarIngresosVentas()
  }
  
  function sincronizarEgresosInventario() {
    // Simular carga de datos
    document.querySelector("#tabla-egresos-pendientes tbody").innerHTML = `
      <tr>
        <td colspan="6" class="text-center">Cargando datos de inventario...</td>
      </tr>
    `
  
    // Simular tiempo de carga
    setTimeout(() => {
      // Verificar si hay compras pendientes
      const comprasPendientes = JSON.parse(localStorage.getItem("inventario_compras_pendientes") || "[]")
  
      if (comprasPendientes.length === 0) {
        document.querySelector("#tabla-egresos-pendientes tbody").innerHTML = `
          <tr>
            <td colspan="6" class="text-center">No hay egresos pendientes de inventario</td>
          </tr>
        `
        return
      }
  
      // Mostrar compras pendientes
      const tablaBody = document.querySelector("#tabla-egresos-pendientes tbody")
      tablaBody.innerHTML = ""
  
      comprasPendientes.forEach((compra, index) => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
          <td>${formatDate(compra.fecha)}</td>
          <td>${compra.tipo}</td>
          <td>${compra.proveedor}</td>
          <td>${compra.descripcion}</td>
          <td>${formatCurrency(compra.monto)}</td>
          <td>
            <button type="button" class="btn-primary" onclick="registrarEgresoInventario(${index})">
              <span class="material-symbols-outlined">add_circle</span> Registrar
            </button>
          </td>
        `
  
        tablaBody.appendChild(tr)
      })
    }, 1000)
  }
  
  function registrarEgresoInventario(index) {
    // Obtener compras pendientes
    const comprasPendientes = JSON.parse(localStorage.getItem("inventario_compras_pendientes") || "[]")
  
    if (index >= comprasPendientes.length) return
  
    const compra = comprasPendientes[index]
  
    // Crear nueva transacción
    const nuevaTransaccion = {
      id: transacciones.length > 0 ? Math.max(...transacciones.map((t) => t.id)) + 1 : 1,
      fecha: compra.fecha || new Date().toISOString().split("T")[0],
      tipo: "egreso",
      categoria: "compras",
      descripcion: compra.descripcion,
      metodoPago: compra.metodoPago || "transferencia",
      referencia: compra.referencia || `Factura #${Math.floor(Math.random() * 1000) + 1}`,
      monto: compra.monto,
      origen: "inventario",
      usuario: "Admin",
    }
  
    // Guardar transacción
    transacciones.push(nuevaTransaccion)
  
    // Eliminar compra de pendientes
    comprasPendientes.splice(index, 1)
    localStorage.setItem("inventario_compras_pendientes", JSON.stringify(comprasPendientes))
  
    // Guardar en localStorage para compartir con otros módulos
    guardarDatosEnLocalStorage()
  
    // Mostrar mensaje de éxito
    alert("Egreso registrado correctamente")
  
    // Actualizar tablas y dashboard
    cargarDashboard()
    cargarTablaEgresos()
    cargarHistorialTransacciones()
  
    // Actualizar tabla de egresos pendientes
    sincronizarEgresosInventario()
  }
  
  // Funciones para compartir datos entre módulos usando localStorage
  function guardarDatosEnLocalStorage() {
    localStorage.setItem("contabilidad_transacciones", JSON.stringify(transacciones))
  }
  
  function cargarDatosDeLocalStorage() {
    const transaccionesGuardadas = localStorage.getItem("contabilidad_transacciones")
  
    if (transaccionesGuardadas) {
      transacciones = JSON.parse(transaccionesGuardadas)
    }
  }
  
  // Verificar si hay transacciones pendientes de otros módulos
  function verificarTransaccionesPendientes() {
    // Verificar si hay ventas pendientes
    const ventasPendientes = JSON.parse(localStorage.getItem("ventas_pendientes") || "[]")
  
    if (ventasPendientes.length > 0) {
      // Notificar al usuario
      alert(`Hay ${ventasPendientes.length} ingresos pendientes de ventas por registrar.`)
    }
  
    // Verificar si hay compras pendientes
    const comprasPendientes = JSON.parse(localStorage.getItem("inventario_compras_pendientes") || "[]")
  
    if (comprasPendientes.length > 0) {
      // Notificar al usuario
      alert(`Hay ${comprasPendientes.length} egresos pendientes de inventario por registrar.`)
    }
  
    // Cargar datos actualizados
    cargarDatosDeLocalStorage()
  }
  
  // Función para cerrar sesión
  function cerrarSesion() {
    if (confirm("¿Está seguro que desea cerrar sesión?")) {
      alert("Sesión cerrada correctamente")
      // En una implementación real, aquí se redireccionaría a la página de login
      // window.location.href = "login.html";
    }
  }
  
  // Funciones de utilidad
  function formatCurrency(amount) {
    return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
  
  // Inicializar datos al cargar la página
  window.addEventListener("load", () => {
    cargarDatosDeLocalStorage()
    guardarDatosEnLocalStorage() // Guardar datos iniciales si no existen
  })
  