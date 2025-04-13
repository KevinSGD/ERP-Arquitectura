document.addEventListener('DOMContentLoaded', function() {
    
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
                    window.location.href = 'cuenta.html';
                    break;
                case 'Facturación':
                    window.location.href = 'facturacion.html';
                    break;
                case 'Nomina':
                    window.location.href = 'nomina.html';
                    break;
            }
        });
    });

    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        console.log('Back button clicked');
        // Puedes poner aquí: window.history.back(); si quieres que vuelva a la anterior
    });

    const profileButton = document.querySelector('.profile-button');
    if (profileButton) {
        profileButton.addEventListener('click', function() {
            console.log('Profile button clicked');
        });
    }
});
