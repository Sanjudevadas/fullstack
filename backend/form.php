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

require_once 'database.php';
require 'sendEmail.php';

// Load .env variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

/**
 * Verify Google reCAPTCHA token
 * @param string $token
 * @return bool
 */
function verifyRecaptcha($token) {
    $secretKey = getenv('RECAPTCHA_SECRET_KEY');
    $url = 'https://www.google.com/recaptcha/api/siteverify';

    $data = http_build_query([
        'secret' => $secretKey,
        'response' => $token
    ]);

    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => $data,
        ],
    ];
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === false) {
        return false;
    }

    $responseData = json_decode($result, true);
    return isset($responseData['success']) && $responseData['success'] === true;
}

$data = json_decode(file_get_contents("php://input"), true);

// Check reCAPTCHA token first
$recaptchaToken = $data['recaptchaToken'] ?? '';

if (!$recaptchaToken || !verifyRecaptcha($recaptchaToken)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "reCAPTCHA verification failed. Please try again."]);
    exit();
}

if ($data) {
    $name = htmlspecialchars(trim($data["name"] ?? ""));
    $email = filter_var(trim($data["email"] ?? ""), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($data["message"] ?? ""));

    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid or missing fields"]);
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO user (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);

    if ($stmt->execute()) {
        // Send email to admin
        $mailResult = sendEmail($name, $email, $message);

        // Send confirmation email to user
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
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}
