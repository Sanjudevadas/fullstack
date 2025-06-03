<?php
$servername = "localhost";
$username = "root";       // default XAMPP username
$password = "";           // default XAMPP password is empty
$dbname = "users";        // your created database

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Don't use die() with echo - it breaks JSON responses
    error_log("Connection failed: " . $conn->connect_error);
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

// Remove this line - it breaks JSON responses:
// echo "✅ Connected successfully to database!";
?>