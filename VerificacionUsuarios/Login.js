


document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    const eyeOffIcon = document.getElementById('eyeOffIcon');
    const submitButton = document.getElementById('submitButton');
    
    // Toggle password visibility
    function togglePasswordVisibility() {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.style.display = 'none';
        eyeOffIcon.style.display = 'block';
      } else {
        passwordInput.type = 'password';
        eyeIcon.style.display = 'block';
        eyeOffIcon.style.display = 'none';
      }
    }
    
    eyeIcon.addEventListener('click', togglePasswordVisibility);
    eyeOffIcon.addEventListener('click', togglePasswordVisibility);
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Iniciando sesión...';
      
      // Simulate login request
      setTimeout(function() {
        console.log('Login attempt with:', {
          email: emailInput.value,
          password: passwordInput.value
        });
        
        // Here you would normally handle the response from your server
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = 'Iniciar Sesión';
        
        // Optional: redirect on success
        // window.location.href = '/dashboard.html';
      }, 1500);
    });
  });