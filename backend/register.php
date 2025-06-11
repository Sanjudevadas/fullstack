<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Controll-Allow-Origin: *");
header("content-type: application/json");
header("Access-Control-Allow_Methods:POST");


require_once 'database.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !isset($data->name) ||
    !isset($data->email) ||
    !isset($data->password) ||
    !isset($data->role)

) {
    echo json_encode([
        "status" => "error",
        "message" => "All Fields are Required"

    ]);
}

$name = trim($data->name);
$email = trim($data->email);
$password = $data->password;
$role = $data->role;

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$checkSql = "SElECT * FROM users WHERE email= ?";
$stmt = $conn->prepare($checkSql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    echo json_encode([
        "status" => "error",
        "message" => " Email Already Exists"

    ]);
    exit();
}

//insert User

$sql = "INSERT INTO users (name,email,passowrd,role) VALUES (?,?,?,?)";
$stmt =$conn->prepare($sql);
$stmt->bind_param("ssss", $name,$email,$hashedPassword,$role);


if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "User Registered Successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to Register User"
    ]);
}

?>