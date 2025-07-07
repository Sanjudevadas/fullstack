<?php
// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Dependencies
require_once 'database.php';
require_once 'vendor/autoload.php';
require_once 'mail_functions.php'; // contains sendUserConfirmationEmail()

// Read JSON
$input = json_decode(file_get_contents("php://input"), true);
$id = $input['id'] ?? null;
$status = $input['status'] ?? null;

if (!$id || !$status) {
    echo json_encode(["status" => "error", "message" => "Missing ID or status."]);
    exit;
}

// Fetch applicant
$stmt = $conn->prepare("SELECT name, email FROM job_applications WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$applicant = $result->fetch_assoc();
$stmt->close();

if (!$applicant) {
    echo json_encode(["status" => "error", "message" => "Applicant not found."]);
    exit;
}

// Update DB
$update = $conn->prepare("UPDATE job_applications SET status = ? WHERE id = ?");
$update->bind_param("si", $status, $id);
$update->execute();
$update->close();

// Prepare message
$name = $applicant['name'];
$email = $applicant['email'];

if ($status === 'accepted') {
    $subject = '🎉 You have been selected!';
    $body = "Hi $name,<br><br>We're thrilled to inform you that you've been <b>accepted</b> to proceed to the next round of the hiring process.<br><br>Best of luck!<br>SanjYou Careers";
} elseif ($status === 'rejected') {
    $subject = '😔 Application Status Update';
    $body = "Hi $name,<br><br>Thank you for applying. Unfortunately, you were <b>not selected</b> for this opportunity.<br>We wish you the best in your career journey.<br><br>Warm regards,<br>SanjYou Careers";
} else {
    $subject = 'Application Status Update';
    $body = "Hi $name,<br><br>Your application status has been updated to <b>$status</b>.<br><br>Regards,<br>SanjYou Careers";
}

// Send mail
$mailStatus = sendUserConfirmationEmail($name, $email, $subject, $body);

if ($mailStatus === true) {
    echo json_encode(["status" => "success", "message" => "Status updated & email sent."]);
} else {
    echo json_encode(["status" => "error", "message" => $mailStatus]);
}

$conn->close();
