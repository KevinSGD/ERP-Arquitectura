document.addEventListener("DOMContentLoaded", () => {
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
  
    // Night rate
    const nightRate = 100
  
    // State variables
    let nights = 1
    let selectedServices = []
    let selectedProducts = []
    let total = 0
  
    // Initialize UI
    initializeUI()
  
    function initializeUI() {
      // Populate services
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
  
      // Populate product options
      const productSelect = document.getElementById("product-select")
      availableProducts.forEach((product) => {
        const option = document.createElement("option")
        option.value = product.id
        option.textContent = `${product.name} ($${product.price})`
        productSelect.appendChild(option)
      })
  
      // Add event listeners
      setupEventListeners()
  
      // Initial calculation
      calculateTotal()
    }
  
    function setupEventListeners() {
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
  
      // Submit button
      document.getElementById("submit-sale").addEventListener("click", submitSale)
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
  
    function submitSale() {
      // Prepare sale data
      const saleData = {
        nights,
        nightRate,
        services: selectedServices.map((id) => availableServices.find((s) => s.id === id)),
        products: selectedProducts,
        total,
      }
  
      console.log("Venta enviada:", saleData)
      alert("¡La venta ha sido creada exitosamente!")
  
      // Reset form
      nights = 1
      selectedServices = []
      selectedProducts = []
  
      // Update UI
      document.getElementById("nights-input").value = nights
      updateNightsCost()
  
      const serviceCheckboxes = document.querySelectorAll(".service-checkbox")
      serviceCheckboxes.forEach((checkbox) => {
        checkbox.checked = false
      })
  
      renderProductsTable()
      calculateTotal()
    }
  })
  
  