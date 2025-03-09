document.addEventListener('DOMContentLoaded', function() {
    // Sample inventory data
    const inventoryData = [
      { id: 1, name: 'Jabón líquido para manos', category: 'Limpieza', quantity: 45, unit: 'Litro', status: 'en-stock', updated: '2024-03-05' },
      { id: 2, name: 'Toallas de papel', category: 'Limpieza', quantity: 120, unit: 'Paquete', status: 'en-stock', updated: '2024-03-07' },
      { id: 3, name: 'Café en grano', category: 'Alimentos', quantity: 8, unit: 'Kilogramo', status: 'bajo-stock', updated: '2024-03-01' },
      { id: 4, name: 'Agua mineral', category: 'Bebidas', quantity: 85, unit: 'Botella', status: 'en-stock', updated: '2024-03-08' },
      { id: 5, name: 'Champú', category: 'Amenidades', quantity: 65, unit: 'Botella', status: 'en-stock', updated: '2024-02-28' },
      { id: 6, name: 'Acondicionador', category: 'Amenidades', quantity: 60, unit: 'Botella', status: 'en-stock', updated: '2024-02-28' },
      { id: 7, name: 'Gel de baño', category: 'Amenidades', quantity: 5, unit: 'Botella', status: 'bajo-stock', updated: '2024-03-02' },
      { id: 8, name: 'Bombillas LED', category: 'Mantenimiento', quantity: 0, unit: 'Unidad', status: 'agotado', updated: '2024-02-25' },
      { id: 9, name: 'Detergente para ropa', category: 'Limpieza', quantity: 25, unit: 'Kilogramo', status: 'en-stock', updated: '2024-03-06' },
      { id: 10, name: 'Jugo de naranja', category: 'Bebidas', quantity: 0, unit: 'Litro', status: 'agotado', updated: '2024-02-20' },
    ];

    // DOM Elements
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const inventoryTableBody = document.getElementById('inventoryTableBody');
    const addItemBtn = document.getElementById('addItemBtn');
    const itemModal = document.getElementById('itemModal');
    const modalTitle = document.getElementById('modalTitle');
    const itemForm = document.getElementById('itemForm');
    const cancelItemBtn = document.getElementById('cancelItemBtn');
    const deleteModal = document.getElementById('deleteModal');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const pagination = document.getElementById('pagination');
    const itemsShowing = document.getElementById('itemsShowing');
    const totalItems = document.getElementById('totalItems');

    // Variables
    let currentItemId = null;
    let filteredData = [...inventoryData];
    let currentPage = 1;
    const itemsPerPage = 10;

    // Toggle sidebar
    toggleSidebarBtn.addEventListener('click', function() {
      sidebar.classList.toggle('sidebar-collapsed');
      mainContent.classList.toggle('main-content-expanded');
    });

    // Render inventory table
    function renderInventoryTable() {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = filteredData.slice(startIndex, endIndex);
      
      inventoryTableBody.innerHTML = '';
      
      if (paginatedData.length === 0) {
        inventoryTableBody.innerHTML = `
          <tr>
            <td colspan="7" class="text-center py-4">No se encontraron artículos</td>
          </tr>
        `;
        return;
      }
      
      paginatedData.forEach(item => {
        const statusBadge = getStatusBadge(item.status);
        
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <div class="font-medium">${item.name}</div>
          </td>
          <td>${item.category}</td>
          <td>${item.quantity}</td>
          <td>${item.unit}</td>
          <td>${statusBadge}</td>
          <td>${formatDate(item.updated)}</td>
          <td>
            <div class="flex space-x-2">
              <button class="btn btn-icon btn-outline edit-btn" data-id="${item.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tooltip">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                  <path d="m15 5 4 4"></path>
                  <span class="tooltip-text">Editar</span>
                </svg>
              </button>
              <button class="btn btn-icon btn-outline delete-btn" data-id="${item.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500 tooltip">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <span class="tooltip-text">Eliminar</span>
                </svg>
              </button>
            </div>
          </td>
        `;
        
        inventoryTableBody.appendChild(row);
      });
      
      // Update pagination info
      updatePaginationInfo();
      
      // Add event listeners to edit and delete buttons
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const itemId = parseInt(this.getAttribute('data-id'));
          openEditItemModal(itemId);
        });
      });
      
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const itemId = parseInt(this.getAttribute('data-id'));
          openDeleteModal(itemId);
        });
      });
    }

    // Get status badge HTML
    function getStatusBadge(status) {
      switch (status) {
        case 'en-stock':
          return '<span class="badge badge-green">En Stock</span>';
        case 'bajo-stock':
          return '<span class="badge badge-yellow">Bajo Stock</span>';
        case 'agotado':
          return '<span class="badge badge-red">Agotado</span>';
        default:
          return '';
      }
    }

    // Format date
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES');
    }

    // Update pagination info
    function updatePaginationInfo() {
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);
      const startItem = (currentPage - 1) * itemsPerPage + 1;
      const endItem = Math.min(currentPage * itemsPerPage, filteredData.length);
      
      itemsShowing.textContent = `${startItem}-${endItem}`;
      totalItems.textContent = filteredData.length;
      
      // Update pagination links
      renderPagination(totalPages);
    }

    // Render pagination
    function renderPagination(totalPages) {
      pagination.innerHTML = '';
      
      // Previous button
      const prevLi = document.createElement('li');
      prevLi.className = 'pagination-item';
      prevLi.innerHTML = `
        <a href="#" class="pagination-link ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}" data-page="prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </a>
      `;
      pagination.appendChild(prevLi);
      
      // Page numbers
      const maxVisiblePages = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      // First page
      if (startPage > 1) {
        const firstLi = document.createElement('li');
        firstLi.className = 'pagination-item';
        firstLi.innerHTML = `<a href="#" class="pagination-link" data-page="1">1</a>`;
        pagination.appendChild(firstLi);
        
        if (startPage > 2) {
          const ellipsisLi = document.createElement('li');
          ellipsisLi.className = 'pagination-item';
          ellipsisLi.innerHTML = `<span class="pagination-link">...</span>`;
          pagination.appendChild(ellipsisLi);
        }
      }
      
      // Page numbers
      for (let i = startPage; i <= endPage; i++) {
        const pageLi = document.createElement('li');
        pageLi.className = 'pagination-item';
        pageLi.innerHTML = `<a href="#" class="pagination-link ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
        pagination.appendChild(pageLi);
      }
      
      // Last page
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          const ellipsisLi = document.createElement('li');
          ellipsisLi.className = 'pagination-item';
          ellipsisLi.innerHTML = `<span class="pagination-link">...</span>`;
          pagination.appendChild(ellipsisLi);
        }
        
        const lastLi = document.createElement('li');
        lastLi.className = 'pagination-item';
        lastLi.innerHTML = `<a href="#" class="pagination-link" data-page="${totalPages}">${totalPages}</a>`;
        pagination.appendChild(lastLi);
      }
      
      // Next button
      const nextLi = document.createElement('li');
      nextLi.className = 'pagination-item';
      nextLi.innerHTML = `
        <a href="#" class="pagination-link ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}" data-page="next">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </a>
      `;
      pagination.appendChild(nextLi);
      
      // Add event listeners to pagination links
      document.querySelectorAll('.pagination-link[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const page = this.getAttribute('data-page');
          
          if (page === 'prev') {
            if (currentPage > 1) {
              currentPage--;
            }
          } else if (page === 'next') {
            if (currentPage < totalPages) {
              currentPage++;
            }
          } else {
            currentPage = parseInt(page);
          }
          
          renderInventoryTable();
        });
      });
    }

    // Open add item modal
    function openAddItemModal() {
      modalTitle.textContent = 'Agregar Artículo';
      itemForm.reset();
      currentItemId = null;
      itemModal.classList.add('active');
    }

    // Open edit item modal
    function openEditItemModal(itemId) {
      const item = inventoryData.find(item => item.id === itemId);
      if (!item) return;
      
      modalTitle.textContent = 'Editar Artículo';
      
      document.getElementById('itemName').value = item.name;
      document.getElementById('itemCategory').value = item.category.toLowerCase();
      document.getElementById('itemQuantity').value = item.quantity;
      document.getElementById('itemUnit').value = item.unit.toLowerCase();
      document.getElementById('itemMinQuantity').value = item.status === 'bajo-stock' ? Math.ceil(item.quantity * 1.5) : Math.ceil(item.quantity * 0.2);
      document.getElementById('itemDescription').value = 'Descripción del artículo ' + item.name;
      
      currentItemId = itemId;
      itemModal.classList.add('active');
    }

    // Close item modal
    function closeItemModal() {
      itemModal.classList.remove('active');
    }

    // Open delete modal
    function openDeleteModal(itemId) {
      currentItemId = itemId;
      deleteModal.classList.add('active');
    }

    // Close delete modal
    function closeDeleteModal() {
      deleteModal.classList.remove('active');
    }

    // Apply filters
    function applyFilters() {
      const searchTerm = searchInput.value.toLowerCase();
      const categoryValue = categoryFilter.value;
      const statusValue = statusFilter.value;
      
      filteredData = inventoryData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryValue || item.category.toLowerCase() === categoryValue;
        const matchesStatus = !statusValue || item.status === statusValue;
        
        return matchesSearch && matchesCategory && matchesStatus;
      });
      
      currentPage = 1;
      renderInventoryTable();
    }

    // Event Listeners
    addItemBtn.addEventListener('click', openAddItemModal);
    cancelItemBtn.addEventListener('click', closeItemModal);
    cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    applyFiltersBtn.addEventListener('click', applyFilters);
    
    // Form submission
    itemForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(itemForm);
      const itemData = {
        name: formData.get('name'),
        category: formData.get('category'),
        quantity: parseInt(formData.get('quantity')),
        unit: formData.get('unit'),
        minQuantity: parseInt(formData.get('minQuantity')),
        description: formData.get('description')
      };
      
      // Determine status based on quantity and minQuantity
      if (itemData.quantity === 0) {
        itemData.status = 'agotado';
      } else if (itemData.quantity < itemData.minQuantity) {
        itemData.status = 'bajo-stock';
      } else {
        itemData.status = 'en-stock';
      }
      
      // Add updated date
      itemData.updated = new Date().toISOString().split('T')[0];
      
      if (currentItemId) {
        // Edit existing item
        const index = inventoryData.findIndex(item => item.id === currentItemId);
        if (index !== -1) {
          inventoryData[index] = { ...inventoryData[index], ...itemData };
        }
      } else {
        // Add new item
        const newId = Math.max(...inventoryData.map(item => item.id), 0) + 1;
        inventoryData.push({ id: newId, ...itemData });
      }
      
      closeItemModal();
      applyFilters(); // Re-apply filters and render table
    });
    
    // Delete item
    confirmDeleteBtn.addEventListener('click', function() {
      if (currentItemId) {
        const index = inventoryData.findIndex(item => item.id === currentItemId);
        if (index !== -1) {
          inventoryData.splice(index, 1);
        }
      }
      
      closeDeleteModal();
      applyFilters(); // Re-apply filters and render table
    });
    
    // Initialize
    renderInventoryTable();
  });