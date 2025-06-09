<?php

header("Access-Controll-Allow_Origin: * ");
header("Content-Type:application/json");

require_once 'database.php';

$result = $conn->query("SELECT id, name, email, message, created_at FROM user ORDER BY created_at DESC");

$submissions = [];

while ($row = $result->fetch_assoc()) {
    $submissions[] = $row;
}

echo json_encode($submissions);

$conn->close();


?>