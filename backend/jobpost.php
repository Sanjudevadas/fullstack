<?php
// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include DB connection
require_once 'database.php';

// Handle GET - Fetch Jobs
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM job_posts ORDER BY id DESC";
    $result = $conn->query($sql);
    $jobs = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $jobs[] = $row;
        }
        echo json_encode($jobs);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to fetch jobs."
        ]);
    }

    $conn->close();
    exit();
}

// Handle POST - Insert Job
$input = json_decode(file_get_contents("php://input"));

if (!$input) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON format."
    ]);
    exit;
}

$title = mysqli_real_escape_string($conn, trim($input->title ?? ''));
$description = mysqli_real_escape_string($conn, trim($input->description ?? ''));
$location = mysqli_real_escape_string($conn, trim($input->location ?? ''));
$type = mysqli_real_escape_string($conn, trim($input->type ?? ''));

if (!$title || !$description || !$location || !$type) {
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required."
    ]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO job_posts (title, description, location, type) VALUES (?, ?, ?, ?)");

if (!$stmt) {
    echo json_encode([
        "status" => "error",
        "message" => "Prepare failed: " . $conn->error
    ]);
    exit;
}

$stmt->bind_param("ssss", $title, $description, $location, $type);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Job post created successfully."
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Insert failed: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
