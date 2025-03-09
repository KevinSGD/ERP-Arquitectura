document.addEventListener("DOMContentLoaded", () => {
  // Initial inventory data
  let inventoryData = [
    {
      id: 1,
      name: "Jabón líquido para manos",
      category: "Limpieza",
      quantity: 45,
      unit: "Litro",
      status: "in-stock",
      lastUpdated: "4/3/2024",
    },
    {
      id: 2,
      name: "Toallas de papel",
      category: "Limpieza",
      quantity: 120,
      unit: "Paquete",
      status: "in-stock",
      lastUpdated: "6/3/2024",
    },
    {
      id: 3,
      name: "Café en grano",
      category: "Alimentos",
      quantity: 8,
      unit: "Kilogramo",
      status: "low-stock",
      lastUpdated: "29/2/2024",
    },
    {
      id: 4,
      name: "Agua mineral",
      category: "Bebidas",
      quantity: 85,
      unit: "Unidad",
      status: "in-stock",
      lastUpdated: "8/3/2024",
    },
  ]

  // Available services
  const availableServices = [
    { id: "spa", name: "Servicio de Spa", price: 50 },
    { id: "transport", name: "Transporte al Aeropuerto", price: 30 },
    { id: "laundry", name: "Servicio de Lavandería", price: 20 },
    { id: "gym", name: "Acceso al Gimnasio", price: 15 },
    { id: "tour", name: "Tour Guiado", price: 45 },
  ]

  // Available products
  const availableProducts = [
    { id: "soap", name: "Jabón de Lujo", price: 5, category: "toiletry" },
    { id: "shampoo", name: "Champú Premium", price: 7, category: "toiletry" },
    { id: "toothbrush", name: "Kit de Cepillo de Dientes", price: 4, category: "toiletry" },
    { id: "towel", name: "Toalla Extra", price: 3, category: "toiletry" },
    { id: "slippers", name: "Pantuflas de Hotel", price: 8, category: "toiletry" },
    { id: "breakfast", name: "Desayuno", price: 15, category: "food" },
    { id: "lunch", name: "Almuerzo", price: 25, category: "food" },
    { id: "dinner", name: "Cena", price: 30, category: "food" },
    { id: "snack", name: "Caja de Snacks", price: 10, category: "food" },
    { id: "minibar", name: "Artículos de Minibar", price: 12, category: "food" },
  ]

  // Sample sales data
  let salesData = [
    {
      id: "VNT-001",
      customer: "Juan Pérez",
      date: "2024-03-01",
      nights: 3,
      total: 450,
      status: "completed",
      services: ["spa", "transport"],
      products: [
        { id: "soap", name: "Jabón de Lujo", price: 5, quantity: 3 },
        { id: "breakfast", name: "Desayuno", price: 15, quantity: 3 },
      ],
      paymentMethod: "credit",
    },
    {
      id: "VNT-002",
      customer: "María González",
      date: "2024-03-05",
      nights: 2,
      total: 280,
      status: "completed",
      services: ["gym"],
      products: [
        { id: "shampoo", name: "Champú Premium", price: 7, quantity: 2 },
        { id: "dinner", name: "Cena", price: 30, quantity: 2 },
      ],
      paymentMethod: "cash",
    },
    {
      id: "VNT-003",
      customer: "Carlos Rodríguez",
      date: "2024-03-08",
      nights: 1,
      total: 150,
      status: "pending",
      services: ["tour"],
      products: [{ id: "minibar", name: "Artículos de Minibar", price: 12, quantity: 1 }],
      paymentMethod: "transfer",
    },
    {
      id: "VNT-004",
      customer: "Ana Martínez",
      date: "2024-03-10",
      nights: 4,
      total: 620,
      status: "completed",
      services: ["spa", "laundry", "gym"],
      products: [
        { id: "breakfast", name: "Desayuno", price: 15, quantity: 4 },
        { id: "lunch", name: "Almuerzo", price: 25, quantity: 2 },
      ],
      paymentMethod: "debit",
    },
    {
      id: "VNT-005",
      customer: "Roberto Sánchez",
      date: "2024-03-15",
      nights: 2,
      total: 320,
      status: "cancelled",
      services: ["transport", "tour"],
      products: [{ id: "dinner", name: "Cena", price: 30, quantity: 2 }],
      paymentMethod: "credit",
    },
  ]

  // Night rate
  const nightRate = 100

  // State variables for sale form
  let nights = 1
  let selectedServices = []
  let selectedProducts = []
  let total = 0
  let editingSaleId = null

  // DOM Elements
  const sidebarToggle = document.getElementById("sidebar-toggle")
  const sidebar = document.querySelector(".sidebar")
  const modal = document.getElementById("item-modal")
  const saleModal = document.getElementById("sale-modal")
  const viewSaleModal = document.getElementById("view-sale-modal")
  const addItemButton = document.getElementById("add-item")
  const addSaleButton = document.getElementById("add-sale")
  const cancelItemButton = document.getElementById("cancel-item")
  const cancelSaleButton = document.getElementById("cancel-sale")
  const itemForm = document.getElementById("item-form")
  const saleForm = document.getElementById("sale-form")
  const searchInput = document.getElementById("search-input")
  const statusFilter = document.getElementById("status-filter")
  const dateFilter = document.getElementById("date-filter")
  const categoryFilter = document.getElementById("category-filter")
  const filterButton = document.getElementById("filter-button")

  // Initialize UI
  initializeUI()

  // Toggle sidebar
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active")
  })

  // Modal handlers
  addItemButton.addEventListener("click", () => {
    openModal()
  })

  addSaleButton.addEventListener("click", () => {
    openSaleModal()
  })

  cancelItemButton.addEventListener("click", () => {
    closeModal()
  })

  cancelSaleButton.addEventListener("click", () => {
    closeSaleModal()
  })

  document.querySelector(".modal-close").addEventListener("click", () => {
    closeModal()
  })

  document.querySelectorAll(".modal-close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal")
      if (modal.id === "sale-modal") {
        closeSaleModal()
      } else {
        closeViewSaleModal()
      }
    })
  })

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })

  window.addEventListener("click", (e) => {
    if (e.target === saleModal) {
      closeSaleModal()
    } else if (e.target === viewSaleModal) {
      closeViewSaleModal()
    }
  })

  // Form submission
  itemForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = {
      id: Date.now(), // Use timestamp as temporary ID
      name: document.getElementById("item-name").value,
      category: document.getElementById("item-category").value,
      quantity: Number.parseInt(document.getElementById("item-quantity").value),
      unit: document.getElementById("item-unit").value,
      status: getStatus(Number.parseInt(document.getElementById("item-quantity").value)),
      lastUpdated: new Date().toLocaleDateString(),
    }

    addInventoryItem(formData)
    closeModal()
    renderInventoryTable()
  })

  saleForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = {
      id: editingSaleId || `VNT-${String(salesData.length + 1).padStart(3, "0")}`,
      customer: document.getElementById("customer-name").value,
      date: new Date().toISOString().split("T")[0],
      nights: nights,
      total: total,
      status: "completed",
      services: selectedServices,
      products: selectedProducts.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      })),
      paymentMethod: document.getElementById("payment-method").value,
    }

    if (editingSaleId) {
      // Update existing sale
      const index = salesData.findIndex((sale) => sale.id === editingSaleId)
      if (index !== -1) {
        salesData[index] = formData
      }
      editingSaleId = null
    } else {
      // Add new sale
      salesData.push(formData)
    }

    closeSaleModal()
    renderSalesTable()
    updateStats()
  })

  // Filter handlers
  filterButton.addEventListener("click", () => {
    renderInventoryTable()
  })

  searchInput.addEventListener("input", () => {
    renderInventoryTable()
  })

  filterButton.addEventListener("click", () => {
    renderSalesTable()
  })

  searchInput.addEventListener("input", () => {
    renderSalesTable()
  })

  // Functions
  function renderInventoryTable() {
    const tableBody = document.getElementById("inventory-table-body")
    const searchTerm = searchInput.value.toLowerCase()
    const categoryValue = categoryFilter.value

    // Filter data
    const filteredData = inventoryData.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm)
      const matchesCategory = !categoryValue || item.category === categoryValue
      return matchesSearch && matchesCategory
    })

    // Render table
    tableBody.innerHTML = filteredData
      .map(
        (item) => `
            <tr>
              <td>${item.id}</td>
              <td>${item.name}</td>
              <td>${item.category}</td>
              <td>${item.quantity} ${item.unit}</td>
              <td>
                <span class="status-badge ${item.status}">${getStatusText(item.status)}</span>
              </td>
              <td>${item.lastUpdated}</td>
              <td>
                <div class="action-buttons">
                  <button class="btn-icon" onclick="editInventoryItem(${item.id})">
                    <i class='bx bx-edit-alt'></i>
                  </button>
                  <button class="btn-icon" onclick="deleteInventoryItem(${item.id})">
                    <i class='bx bx-trash'></i>
                  </button>
                </div>
              </td>
            </tr>
          `,
      )
      .join("")
  }

  function openModal(itemData = null) {
    modal.classList.add("active")
    if (itemData) {
      // Fill form with item data for editing
      document.getElementById("item-name").value = itemData.name
      document.getElementById("item-category").value = itemData.category.toLowerCase()
      document.getElementById("item-quantity").value = itemData.quantity
      document.getElementById("item-unit").value = itemData.unit.toLowerCase()
      document.getElementById("modal-title").textContent = "Editar Artículo"
    } else {
      // Clear form for new item
      itemForm.reset()
      document.getElementById("modal-title").textContent = "Agregar Artículo"
    }
  }

  function closeModal() {
    modal.classList.remove("active")
    itemForm.reset()
  }

  function getStatus(quantity) {
    if (quantity <= 0) return "out-stock"
    if (quantity <= 10) return "low-stock"
    return "in-stock"
  }

  function addInventoryItem(item) {
    inventoryData.push(item)
    updateStats()
  }

  function deleteInventoryItem(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
      inventoryData = inventoryData.filter((item) => item.id !== id)
      renderInventoryTable()
      updateStats()
    }
  }

  function editInventoryItem(id) {
    const item = inventoryData.find((item) => item.id === id)
    if (item) {
      openModal(item)
    }
  }

  function initializeUI() {
    // Populate services in the form
    const servicesContainer = document.getElementById("services-container")
    availableServices.forEach((service) => {
      const serviceElement = document.createElement("div")
      serviceElement.className = "service-item"
      serviceElement.innerHTML = `
                <input type="checkbox" id="service-${service.id}" class="service-checkbox">
                <label for="service-${service.id}" class="service-label">
                    ${service.name} ($${service.price})
                </label>
            `
      servicesContainer.appendChild(serviceElement)
    })

    // Populate product options in the form
    const productSelect = document.getElementById("product-select")
    availableProducts.forEach((product) => {
      const option = document.createElement("option")
      option.value = product.id
      option.textContent = `${product.name} ($${product.price})`
      productSelect.appendChild(option)
    })

    // Add event listeners for the sale form
    setupSaleFormEventListeners()

    // Initial render
    renderSalesTable()
    updateStats()
  }

  function setupSaleFormEventListeners() {
    // Nights controls
    document.getElementById("decrease-nights").addEventListener("click", () => {
      if (nights > 1) {
        nights--
        document.getElementById("nights-input").value = nights
        updateNightsCost()
        calculateTotal()
      }
    })

    document.getElementById("increase-nights").addEventListener("click", () => {
      nights++
      document.getElementById("nights-input").value = nights
      updateNightsCost()
      calculateTotal()
    })

    document.getElementById("nights-input").addEventListener("change", (e) => {
      const value = Number.parseInt(e.target.value) || 1
      nights = Math.max(1, value)
      e.target.value = nights
      updateNightsCost()
      calculateTotal()
    })

    // Services checkboxes
    const serviceCheckboxes = document.querySelectorAll(".service-checkbox")
    serviceCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const serviceId = e.target.id.replace("service-", "")
        if (e.target.checked) {
          selectedServices.push(serviceId)
        } else {
          selectedServices = selectedServices.filter((id) => id !== serviceId)
        }
        calculateTotal()
      })
    })

    // Add product button
    document.getElementById("add-product").addEventListener("click", () => {
      const productSelect = document.getElementById("product-select")
      const productId = productSelect.value

      if (productId) {
        addProduct(productId)
        productSelect.value = ""
        renderProductsTable()
        calculateTotal()
      }
    })
  }

  function updateNightsCost() {
    const nightsCost = nights * nightRate
    document.getElementById("nights-cost").textContent = `$${nightRate} por noche × ${nights} noches = $${nightsCost}`
  }

  function addProduct(productId) {
    const product = availableProducts.find((p) => p.id === productId)
    if (!product) return

    const existingProduct = selectedProducts.find((p) => p.id === productId)
    if (existingProduct) {
      existingProduct.quantity += 1
    } else {
      selectedProducts.push({
        ...product,
        quantity: 1,
      })
    }
  }

  function removeProduct(productId) {
    const existingProduct = selectedProducts.find((p) => p.id === productId)
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1
      } else {
        selectedProducts = selectedProducts.filter((p) => p.id !== productId)
      }
      renderProductsTable()
      calculateTotal()
    }
  }

  function deleteProduct(productId) {
    selectedProducts = selectedProducts.filter((p) => p.id !== productId)
    renderProductsTable()
    calculateTotal()
  }

  function renderProductsTable() {
    const container = document.getElementById("products-table-container")

    if (selectedProducts.length === 0) {
      container.innerHTML = ""
      return
    }

    container.innerHTML = `
            <table class="products-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="products-table-body">
                    <!-- Product rows will be added here -->
                </tbody>
            </table>
        `

    const tableBody = document.getElementById("products-table-body")
    selectedProducts.forEach((product) => {
      const row = document.createElement("tr")
      row.innerHTML = `
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>
                    <div class="quantity-control">
                        <button type="button" class="btn-quantity decrease-quantity" data-id="${product.id}">-</button>
                        <span>${product.quantity}</span>
                        <button type="button" class="btn-quantity increase-quantity" data-id="${product.id}">+</button>
                    </div>
                </td>
                <td>$${product.price * product.quantity}</td>
                <td>
                    <button type="button" class="btn-remove" data-id="${product.id}">Eliminar</button>
                </td>
            `
      tableBody.appendChild(row)
    })

    // Add event listeners for quantity buttons
    document.querySelectorAll(".decrease-quantity").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-id")
        removeProduct(productId)
      })
    })

    document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-id")
        addProduct(productId)
      })
    })

    document.querySelectorAll(".btn-remove").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-id")
        deleteProduct(productId)
      })
    })
  }

  function calculateTotal() {
    // Nights cost
    const nightsCost = nights * nightRate

    // Services cost
    const servicesCost = selectedServices.reduce((sum, serviceId) => {
      const service = availableServices.find((s) => s.id === serviceId)
      return sum + (service ? service.price : 0)
    }, 0)

    // Products cost
    const productsCost = selectedProducts.reduce((sum, product) => {
      return sum + product.price * product.quantity
    }, 0)

    total = nightsCost + servicesCost + productsCost
    document.getElementById("total-display").textContent = `Total: $${total}`
  }

  function openSaleModal(saleId = null) {
    saleModal.classList.add("active")

    // Reset form state
    nights = 1
    selectedServices = []
    selectedProducts = []
    document.getElementById("nights-input").value = nights
    updateNightsCost()

    const serviceCheckboxes = document.querySelectorAll(".service-checkbox")
    serviceCheckboxes.forEach((checkbox) => {
      checkbox.checked = false
    })

    renderProductsTable()

    if (saleId) {
      // Edit existing sale
      const sale = salesData.find((s) => s.id === saleId)
      if (sale) {
        editingSaleId = saleId
        document.getElementById("modal-title").textContent = "Editar Venta"
        document.getElementById("customer-name").value = sale.customer

        // Set nights
        nights = sale.nights
        document.getElementById("nights-input").value = nights
        updateNightsCost()

        // Set services
        selectedServices = [...sale.services]
        serviceCheckboxes.forEach((checkbox) => {
          const serviceId = checkbox.id.replace("service-", "")
          checkbox.checked = selectedServices.includes(serviceId)
        })

        // Set products
        selectedProducts = sale.products.map((p) => ({
          ...p,
          category: availableProducts.find((ap) => ap.id === p.id)?.category || "",
        }))
        renderProductsTable()

        // Set payment method
        document.getElementById("payment-method").value = sale.paymentMethod

        // Calculate total
        calculateTotal()
      }
    } else {
      // New sale
      editingSaleId = null
      document.getElementById("modal-title").textContent = "Nueva Venta"
      document.getElementById("customer-name").value = ""
      document.getElementById("payment-method").value = "cash"
      calculateTotal()
    }
  }

  function closeSaleModal() {
    saleModal.classList.remove("active")
    editingSaleId = null
  }

  function openViewSaleModal(saleId) {
    const sale = salesData.find((s) => s.id === saleId)
    if (!sale) return

    const container = document.getElementById("sale-details-container")

    // Get service names
    const services = sale.services
      .map((serviceId) => {
        const service = availableServices.find((s) => s.id === serviceId)
        return service ? `${service.name} ($${service.price})` : ""
      })
      .filter(Boolean)

    // Calculate subtotals
    const nightsSubtotal = sale.nights * nightRate
    const servicesSubtotal = sale.services.reduce((sum, serviceId) => {
      const service = availableServices.find((s) => s.id === serviceId)
      return sum + (service ? service.price : 0)
    }, 0)
    const productsSubtotal = sale.products.reduce((sum, product) => {
      return sum + product.price * product.quantity
    }, 0)

    container.innerHTML = `
            <div class="sale-details">
                <div class="detail-section">
                    <h3 class="detail-header">Información General</h3>
                    <div class="detail-row">
                        <span class="detail-label">ID de Venta:</span>
                        <span class="detail-value">${sale.id}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Cliente:</span>
                        <span class="detail-value">${sale.customer}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Fecha:</span>
                        <span class="detail-value">${formatDate(sale.date)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Estado:</span>
                        <span class="status-badge ${sale.status}">${getStatusText(sale.status)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Método de Pago:</span>
                        <span class="detail-value">${getPaymentMethodText(sale.paymentMethod)}</span>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3 class="detail-header">Detalles de Hospedaje</h3>
                    <div class="detail-row">
                        <span class="detail-label">Noches:</span>
                        <span class="detail-value">${sale.nights}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Precio por Noche:</span>
                        <span class="detail-value">$${nightRate}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Subtotal Hospedaje:</span>
                        <span class="detail-value">$${nightsSubtotal}</span>
                    </div>
                </div>
                
                ${
                  services.length > 0
                    ? `
                <div class="detail-section">
                    <h3 class="detail-header">Servicios Adicionales</h3>
                    ${services
                      .map(
                        (service) => `
                        <div class="detail-row">
                            <span class="detail-label">${service}</span>
                        </div>
                    `,
                      )
                      .join("")}
                    <div class="detail-row">
                        <span class="detail-label">Subtotal Servicios:</span>
                        <span class="detail-value">$${servicesSubtotal}</span>
                    </div>
                </div>
                `
                    : ""
                }
                
                ${
                  sale.products.length > 0
                    ? `
                <div class="detail-section">
                    <h3 class="detail-header">Productos</h3>
                    <table class="products-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sale.products
                              .map(
                                (product) => `
                                <tr>
                                    <td>${product.name}</td>
                                    <td>$${product.price}</td>
                                    <td>${product.quantity}</td>
                                    <td>$${product.price * product.quantity}</td>
                                </tr>
                            `,
                              )
                              .join("")}
                        </tbody>
                    </table>
                    <div class="detail-row" style="margin-top: 1rem;">
                        <span class="detail-label">Subtotal Productos:</span>
                        <span class="detail-value">$${productsSubtotal}</span>
                    </div>
                </div>
                `
                    : ""
                }
                
                <div class="detail-section">
                    <div class="detail-row" style="font-size: 1.25rem; font-weight: bold;">
                        <span class="detail-label">TOTAL:</span>
                        <span class="detail-value">$${sale.total}</span>
                    </div>
                </div>
            </div>
        `

    viewSaleModal.classList.add("active")
  }

  function closeViewSaleModal() {
    viewSaleModal.classList.remove("active")
  }

  function renderSalesTable() {
    const tableBody = document.getElementById("sales-table-body")
    const searchTerm = searchInput.value.toLowerCase()
    const statusValue = statusFilter.value
    const dateValue = dateFilter.value

    // Filter data
    const filteredData = salesData.filter((sale) => {
      const matchesSearch =
        sale.customer.toLowerCase().includes(searchTerm) || sale.id.toLowerCase().includes(searchTerm)
      const matchesStatus = !statusValue || sale.status === statusValue
      const matchesDate = !dateValue || sale.date === dateValue
      return matchesSearch && matchesStatus && matchesDate
    })

    // Render table
    tableBody.innerHTML = filteredData
      .map(
        (sale) => `
            <tr>
                <td>${sale.id}</td>
                <td>${sale.customer}</td>
                <td>${formatDate(sale.date)}</td>
                <td>${sale.nights}</td>
                <td>$${sale.total}</td>
                <td>
                    <span class="status-badge ${sale.status}">
                        ${getStatusText(sale.status)}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="viewSale('${sale.id}')">
                            <i class='bx bx-show'></i>
                        </button>
                        <button class="btn-icon" onclick="editSale('${sale.id}')">
                            <i class='bx bx-edit-alt'></i>
                        </button>
                        <button class="btn-icon" onclick="deleteSale('${sale.id}')">
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                </td>
            </tr>
        `,
      )
      .join("")
  }

  function updateStats() {
    const totalItems = inventoryData.length
    const lowStockItems = inventoryData.filter((item) => item.status === "low-stock").length
    const outOfStockItems = inventoryData.filter((item) => item.status === "out-stock").length

    const totalSales = salesData.reduce((sum, sale) => sum + sale.total, 0)
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()

    const monthlySales = salesData.filter((sale) => {
      const saleDate = new Date(sale.date)
      return saleDate.getMonth() + 1 === currentMonth && saleDate.getFullYear() === currentYear
    }).length

    const pendingSales = salesData.filter((sale) => sale.status === "pending").length

    document.querySelector(".stats-grid").innerHTML = `
            <div class="stat-card">
                <div class="stat-icon blue">
                    <i class='bx bx-package'></i>
                </div>
                <div class="stat-info">
                    <span class="stat-label">Total de Artículos</span>
                    <span class="stat-value">${totalItems}</span>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon yellow">
                    <i class='bx bx-error'></i>
                </div>
                <div class="stat-info">
                    <span class="stat-label">Artículos Bajos</span>
                    <span class="stat-value">${lowStockItems}</span>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon red">
                    <i class='bx bx-x-circle'></i>
                </div>
                <div class="stat-info">
                    <span class="stat-label">Artículos Agotados</span>
                    <span class="stat-value">${outOfStockItems}</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon blue">
                    <i class='bx bx-dollar'></i>
                </div>
                <div class="stat-info">
                    <span class="stat-label">Ventas Totales</span>
                    <span class="stat-value">$${totalSales}</span>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon green">
                    <i class='bx bx-calendar-check'></i>
                </div>
                <div class="stat-info">
                    <span class="stat-label">Ventas del Mes</span>
                    <span class="stat-value">${monthlySales}</span>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon purple">
                    <i class='bx bx-time'></i>
                </div>
                <div class="stat-info">
                    <span class="stat-label">Ventas Pendientes</span>
                    <span class="stat-value">${pendingSales}</span>
                </div>
            </div>
        `
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES")
  }

  function getStatusText(status) {
    switch (status) {
      case "in-stock":
        return "En Stock"
      case "low-stock":
        return "Stock Bajo"
      case "out-stock":
        return "Agotado"
      case "completed":
        return "Completada"
      case "pending":
        return "Pendiente"
      case "cancelled":
        return "Cancelada"
      default:
        return status
    }
  }

  function getPaymentMethodText(method) {
    switch (method) {
      case "cash":
        return "Efectivo"
      case "credit":
        return "Tarjeta de Crédito"
      case "debit":
        return "Tarjeta de Débito"
      case "transfer":
        return "Transferencia"
      default:
        return method
    }
  }

  function viewSale(saleId) {
    openViewSaleModal(saleId)
  }

  function editSale(saleId) {
    openSaleModal(saleId)
  }

  function deleteSale(saleId) {
    if (confirm("¿Estás seguro de que deseas eliminar esta venta?")) {
      salesData = salesData.filter((sale) => sale.id !== saleId)
      renderSalesTable()
      updateStats()
    }
  }

  // Make functions available globally
  window.editInventoryItem = editInventoryItem
  window.deleteInventoryItem = deleteInventoryItem
  window.viewSale = viewSale
  window.editSale = editSale
  window.deleteSale = deleteSale

  // Initial render
  renderInventoryTable()
  renderSalesTable()
  updateStats()
})

