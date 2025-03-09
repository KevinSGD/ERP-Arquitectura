document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const mainContent = document.getElementById('mainContent');
    const btnRegistro = document.getElementById('btnRegistro');
    const btnHabitaciones = document.getElementById('btnHabitaciones');
    const btnServicios = document.getElementById('btnServicios');
    const btnPagos = document.getElementById('btnPagos');
    const btnBack = document.getElementById('btnBack');
    
    // Array con todos los botones del menú para facilitar la gestión
    const menuButtons = [btnRegistro, btnHabitaciones, btnServicios, btnPagos];
    
    // Función para marcar el botón activo
    function setActiveButton(activeButton) {
        menuButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
    
    // Función para cargar contenido en el área principal
    function loadContent(contentType) {
        // Limpiar el contenido actual
        mainContent.innerHTML = '';
        
        // Crear contenido según la sección seleccionada
        let content = document.createElement('div');
        
        switch(contentType) {
            case 'registro':
                content.innerHTML = `
                    <h2>Registro de Clientes</h2>
                    <form id="formRegistro" class="form-container">
                        <div class="form-group">
                            <label for="nombre">Nombre completo:</label>
                            <input type="text" id="nombre" name="nombre" required>
                        </div>
                        <div class="form-group">
                            <label for="documento">Documento de identidad:</label>
                            <input type="text" id="documento" name="documento" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Correo electrónico:</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="telefono">Teléfono:</label>
                            <input type="tel" id="telefono" name="telefono" required>
                        </div>
                        <div class="form-group">
                            <label for="direccion">Dirección:</label>
                            <input type="text" id="direccion" name="direccion">
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn-primary">Guardar</button>
                            <button type="reset" class="btn-secondary">Limpiar</button>
                        </div>
                    </form>
                `;
                break;
                
            case 'habitaciones':
                content.innerHTML = `
                    <h2>Selección de Habitaciones y Fechas</h2>
                    <form id="formHabitaciones" class="form-container">
                        <div class="form-group">
                            <label for="fechaEntrada">Fecha de entrada:</label>
                            <input type="date" id="fechaEntrada" name="fechaEntrada" required>
                        </div>
                        <div class="form-group">
                            <label for="fechaSalida">Fecha de salida:</label>
                            <input type="date" id="fechaSalida" name="fechaSalida" required>
                        </div>
                        <div class="form-group">
                            <label for="tipoHabitacion">Tipo de habitación:</label>
                            <select id="tipoHabitacion" name="tipoHabitacion" required>
                                <option value="">Seleccione una opción</option>
                                <option value="individual">Individual</option>
                                <option value="doble">Doble</option>
                                <option value="suite">Suite</option>
                                <option value="familiar">Familiar</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="numHabitaciones">Número de habitaciones:</label>
                            <input type="number" id="numHabitaciones" name="numHabitaciones" min="1" value="1" required>
                        </div>
                        <div class="form-group">
                            <label for="numPersonas">Número de personas:</label>
                            <input type="number" id="numPersonas" name="numPersonas" min="1" value="1" required>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn-primary">Continuar</button>
                            <button type="reset" class="btn-secondary">Limpiar</button>
                        </div>
                    </form>
                `;
                break;
                
            case 'servicios':
                content.innerHTML = `
                    <h2>Datos de Servicios</h2>
                    <form id="formServicios" class="form-container">
                        <div class="form-group checkbox-group">
                            <label>Servicios adicionales:</label>
                            <div class="checkbox-item">
                                <input type="checkbox" id="desayuno" name="servicios" value="desayuno">
                                <label for="desayuno">Desayuno incluido</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="wifi" name="servicios" value="wifi">
                                <label for="wifi">WiFi premium</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="spa" name="servicios" value="spa">
                                <label for="spa">Acceso al spa</label>
                            </div>
                            <div class="checkbox-item">
                                <input type="checkbox" id="parking" name="servicios" value="parking">
                                <label for="parking">Estacionamiento</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="comentarios">Comentarios o solicitudes especiales:</label>
                            <textarea id="comentarios" name="comentarios" rows="4"></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn-primary">Continuar</button>
                            <button type="reset" class="btn-secondary">Limpiar</button>
                        </div>
                    </form>
                `;
                break;
                
            case 'pagos':
                content.innerHTML = `
                    <h2>Pagos</h2>
                    <form id="formPagos" class="form-container">
                        <div class="form-group">
                            <label for="metodoPago">Método de pago:</label>
                            <select id="metodoPago" name="metodoPago" required>
                                <option value="">Seleccione una opción</option>
                                <option value="tarjeta">Tarjeta de crédito/débito</option>
                                <option value="transferencia">Transferencia bancaria</option>
                                <option value="efectivo">Efectivo</option>
                            </select>
                        </div>
                        <div id="datosTarjeta" class="form-section hidden">
                            <div class="form-group">
                                <label for="numeroTarjeta">Número de tarjeta:</label>
                                <input type="text" id="numeroTarjeta" name="numeroTarjeta">
                            </div>
                            <div class="form-group">
                                <label for="nombreTarjeta">Nombre en la tarjeta:</label>
                                <input type="text" id="nombreTarjeta" name="nombreTarjeta">
                            </div>
                            <div class="form-row">
                                <div class="form-group half">
                                    <label for="fechaExpiracion">Fecha de expiración:</label>
                                    <input type="text" id="fechaExpiracion" name="fechaExpiracion" placeholder="MM/AA">
                                </div>
                                <div class="form-group half">
                                    <label for="cvv">CVV:</label>
                                    <input type="text" id="cvv" name="cvv" maxlength="4">
                                </div>
                            </div>
                        </div>
                        <div class="resumen-pago">
                            <h3>Resumen de pago</h3>
                            <div class="resumen-item">
                                <span>Habitación:</span>
                                <span>$120.00</span>
                            </div>
                            <div class="resumen-item">
                                <span>Servicios adicionales:</span>
                                <span>$25.00</span>
                            </div>
                            <div class="resumen-item">
                                <span>Impuestos:</span>
                                <span>$14.50</span>
                            </div>
                            <div class="resumen-item total">
                                <span>Total:</span>
                                <span>$159.50</span>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn-primary">Confirmar pago</button>
                            <button type="button" class="btn-secondary">Cancelar</button>
                        </div>
                    </form>
                `;
                
                // Mostrar/ocultar campos de tarjeta según el método de pago seleccionado
                const metodoPago = content.querySelector('#metodoPago');
                const datosTarjeta = content.querySelector('#datosTarjeta');
                
                metodoPago.addEventListener('change', function() {
                    if (this.value === 'tarjeta') {
                        datosTarjeta.classList.remove('hidden');
                    } else {
                        datosTarjeta.classList.add('hidden');
                    }
                });
                break;
                
            default:
                content.innerHTML = `
                    <div class="welcome-message">
                        <h2>Bienvenido al Sistema de Gestión de Clientes</h2>
                        <p>Seleccione una opción del menú para comenzar.</p>
                    </div>
                `;
        }
        
        // Añadir estilos adicionales para los formularios
        const style = document.createElement('style');
        style.textContent = `
            .form-container {
                max-width: 800px;
                margin: 20px 0;
            }
            
            .form-group {
                margin-bottom: 15px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
            }
            
            .form-group input, 
            .form-group select, 
            .form-group textarea {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            
            .form-row {
                display: flex;
                gap: 15px;
            }
            
            .form-group.half {
                width: 50%;
            }
            
            .checkbox-group {
                margin-top: 10px;
            }
            
            .checkbox-item {
                display: flex;
                align-items: center;
                margin-bottom: 8px;
            }
            
            .checkbox-item input {
                width: auto;
                margin-right: 10px;
            }
            
            .checkbox-item label {
                margin-bottom: 0;
                font-weight: normal;
            }
            
            .form-actions {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }
            
            .btn-primary, .btn-secondary {
                padding: 10px 20px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
            }
            
            .btn-primary {
                background-color: #007755;
                color: white;
            }
            
            .btn-secondary {
                background-color: #f0f0f0;
                color: #333;
            }
            
            .hidden {
                display: none;
            }
            
            .resumen-pago {
                margin: 20px 0;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: 4px;
                background-color: #f9f9f9;
            }
            
            .resumen-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                padding-bottom: 8px;
                border-bottom: 1px solid #eee;
            }
            
            .resumen-item.total {
                font-weight: bold;
                border-top: 2px solid #ddd;
                border-bottom: none;
                padding-top: 8px;
                margin-top: 8px;
            }
            
            .welcome-message {
                text-align: center;
                margin-top: 50px;
            }
            
            h2 {
                color: #007755;
                margin-bottom: 20px;
            }
        `;
        
        mainContent.appendChild(style);
        mainContent.appendChild(content);
    }
    
    // Eventos para los botones del menú
    btnRegistro.addEventListener('click', function() {
        setActiveButton(this);
        loadContent('registro');
    });
    
    btnHabitaciones.addEventListener('click', function() {
        setActiveButton(this);
        loadContent('habitaciones');
    });
    
    btnServicios.addEventListener('click', function() {
        setActiveButton(this);
        loadContent('servicios');
    });
    
    btnPagos.addEventListener('click', function() {
        setActiveButton(this);
        loadContent('pagos');
    });
    
    // Evento para el botón de retroceso
    btnBack.addEventListener('click', function() {
        // Aquí puedes implementar la navegación hacia atrás
        // Por ejemplo, volver a la página anterior o a un dashboard
        alert('Volviendo a la página anterior...');
    });
    
    // Cargar contenido inicial (página de bienvenida)
    loadContent();
});