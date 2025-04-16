// DOM Elements
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const rememberMeCheckbox = document.getElementById('rememberMe');
const loginBtn = document.getElementById('loginBtn');

// Sample user credentials
const validUsers = [
    { username: 'admin', password: 'admin123', role: 'administrador' },
    { username: 'recepcion', password: 'recepcion123', role: 'recepcion' },
    { username: 'contabilidad', password: 'conta123', role: 'contabilidad' }
];

// Function to toggle password visibility
function togglePasswordVisibility() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    // Toggle icon
    const icon = togglePasswordBtn.querySelector('.material-symbols-outlined');
    icon.textContent = type === 'password' ? 'visibility_off' : 'visibility';
}

// Function to validate login
function validateLogin(username, password) {
    return validUsers.find(user => 
        (user.username === username || user.username === username.toLowerCase()) && 
        user.password === password
    );
}

// Function to handle login
function handleLogin() {
    // Get input values
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    // Basic validation
    if (!username || !password) {
        alert('Por favor complete todos los campos');
        return;
    }
    
    const user = validateLogin(username, password);
    
    if (user) {
        // Save to localStorage if remember me is checked
        if (rememberMeCheckbox.checked) {
            localStorage.setItem('erp_username', username);
        }
        
        // Redirect based on role
        switch (user.role) {
            case 'administrador':
                window.location.href = 'index.html';
                break;
            case 'recepcion':
                window.location.href = 'recepcion.html';
                break;
            case 'contabilidad':
                window.location.href = '../Contabilidad/Transacciones.html';
                break;
            default:
                window.location.href = 'index.html';
        }
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

// Function to check for saved credentials
function checkSavedCredentials() {
    const savedUsername = localStorage.getItem('erp_username');
    
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberMeCheckbox.checked = true;
        passwordInput.focus();
    } else {
        usernameInput.focus();
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved credentials
    checkSavedCredentials();
    
    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
    
    // Handle login button click
    loginBtn.addEventListener('click', handleLogin);
    
    // Handle Enter key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
});