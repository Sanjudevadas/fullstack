<?php
// --- CORS HEADERS ---
// Allow requests from any origin (frontend on a different port)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit();
}

// --- Read JSON input ---
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $name = $data["name"];
    $email = $data["email"];
    $subject = $data["subject"];

    // Return data back as JSON response
    echo json_encode([
        "status" => "success",
        "message" => "Form received",
        "data" => $data
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid input"
    ]);
}
?>
