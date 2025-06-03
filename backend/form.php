<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Include the database connection
require_once 'database.php';

// Read and sanitize input
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $name = htmlspecialchars(trim($data["name"] ?? ""));
    $email = filter_var(trim($data["email"] ?? ""), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($data["message"] ?? "")); // Changed from "subject" to "message"

    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid or missing fields"]);
        exit();
    }

    // Insert into database - Updated to use "message" column
    $stmt = $conn->prepare("INSERT INTO user (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Form submitted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Database insert failed"]);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}
?>