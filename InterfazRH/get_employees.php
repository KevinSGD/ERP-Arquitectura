<?php
header('Content-Type: application/json');

// Conexión a la base de datos
$servername = "localhost"; // Cambia esto según tu configuración
$username = "root"; // Cambia esto según tu configuración
$password = ""; // Cambia esto según tu configuración
$dbname = "proyecto erp"; // Cambia esto según tu configuración

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta para obtener los empleados
$sql = "SELECT id, nombre, departamento, puesto, fecha_contratacion, estado FROM empleados";
$result = $conn->query($sql);

$employees = array();

if ($result->num_rows > 0) {
    // Salida de cada fila
    while($row = $result->fetch_assoc()) {
        $employees[] = $row;
    }
}

$conn->close();

// Devolver los datos en formato JSON
echo json_encode($employees);
?>