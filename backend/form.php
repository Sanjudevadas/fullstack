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

require_once 'vendor/autoload.php';
require_once 'database.php';
require_once 'sendEmail.php';

// ✅ Load .env variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// ✅ Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
    exit();
}

// ✅ Sanitize inputs
$name = htmlspecialchars(trim($data["name"] ?? ""));
$email = filter_var(trim($data["email"] ?? ""), FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(trim($data["message"] ?? ""));

// ✅ Validate inputs
if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid or missing fields"]);
    exit();
}

// ✅ Save to database
$stmt = $conn->prepare("INSERT INTO user (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
    $mailResult = sendEmail($name, $email, $message);
    $userMailResult = sendUserConfirmationEmail($name, $email);

    if ($mailResult === true && $userMailResult === true) {
        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "message" => "Form submitted, admin notified, and confirmation sent to your email."
        ]);
    } elseif ($mailResult === true) {
        http_response_code(200);
        echo json_encode([
            "status" => "warning",
            "message" => "Form submitted and admin notified, but confirmation email to user failed: $userMailResult"
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Admin email failed: $mailResult"
        ]);
    }
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database insert failed"]);
}

$stmt->close();
$conn->close();
