<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $phone = $input['phone'] ?? '';
    $resume = $input['resume_url'] ?? '';
    $job_id = $input['job_id'] ?? 0;

    if (!$name || !$email || !$phone || !$resume || !$job_id) {
        echo json_encode(["status" => "error", "message" => "All fields required"]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO job_applications (job_id, name, email, phone, resume_url) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("issss", $job_id, $name, $email, $phone, $resume);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Application submitted."]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
