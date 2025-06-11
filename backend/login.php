<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'db.php'; // your DB connection file

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($data->email ?? '');
    $password = trim($data->password ?? '');

    if (empty($email) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "Email and password are required."]);
        exit;
    }

    $sql = "SELECT id, name, email, password, role FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);

    if ($stmt->execute()) {
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();

            if (password_verify($password, $user['password'])) {
                echo json_encode([
                    "status" => "success",
                    "message" => "Login successful",
                    "user" => [
                        "id" => $user['id'],
                        "name" => $user['name'],
                        "email" => $user['email'],
                        "role" => $user['role'] // e.g., "admin" or "candidate"
                    ]
                ]);
            } else {
                echo json_encode(["status" => "error", "message" => "Incorrect password."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "User not found."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Query failed."]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}

?>