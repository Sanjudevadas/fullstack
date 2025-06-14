<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ✅ CORS HEADERS (fix typo: Controll → Control)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ✅ Handle Preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ✅ Include DB connection
require_once 'database.php';

// ✅ Read incoming JSON
$data = json_decode(file_get_contents("php://input"));

// ✅ Validate fields
if (
    !isset($data->name) ||
    !isset($data->email) ||
    !isset($data->password) ||
    !isset($data->role)
) {
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required."
    ]);
    exit(); // stop script if fields are missing
}

$name = trim($data->name);
$email = trim($data->email);
$password = $data->password;
$role = $data->role;

// ✅ Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// ✅ Check if email already exists
$checkSql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($checkSql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Email already exists."
    ]);
    exit();
}

// ✅ Insert user (❌ FIXED TYPO: `passowrd` → `password`)
$sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email, $hashedPassword, $role);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "User registered successfully."
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to register user."
    ]);
}
?>
