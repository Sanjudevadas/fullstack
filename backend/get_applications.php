<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'database.php';

$sql = "SELECT * FROM job_applications ORDER BY submitted_at DESC";
$result = $conn->query($sql);

$applications = [];

while ($row = $result->fetch_assoc()) {
  $applications[] = $row;
}

echo json_encode($applications);
$conn->close();
