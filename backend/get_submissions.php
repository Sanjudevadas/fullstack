<?php
// Enable error reporting (for development only - remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set CORS and content-type headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Include database connection
require_once 'database.php';

// Prepare SQL query
$sql = "SELECT id, name, email, message, created_at FROM user ORDER BY created_at DESC";
$result = $conn->query($sql);

// Check for SQL error
if (!$result) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database query failed",
        "error" => $conn->error
    ]);
    exit();
}

// Fetch results into an array
$submissions = [];
while ($row = $result->fetch_assoc()) {
    $submissions[] = $row;
}

// Return JSON response
echo json_encode($submissions);

// Close DB connection
$conn->close();
?>
