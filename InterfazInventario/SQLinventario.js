const mysql = require('mysql');

// Configuración de la conexión
const connection = mysql.createConnection({
    host: 'localhost', // Cambia si usas un servidor remoto
    user: 'root', // Reemplaza con tu usuario de MySQL
    password: 'tu_contraseña', // Reemplaza con tu contraseña de MySQL
    database: 'Inventarios'
});

// Conectar a MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err.message);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Exportar la conexión para usarla en otros archivos
module.exports = connection;
