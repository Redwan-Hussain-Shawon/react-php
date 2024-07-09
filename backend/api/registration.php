<?php
include_once('../allowApi.php');
header("Access-Control-Allow-Origin:" . $allowApi);
header("Access-Control-Allow-Headers:Content-Type,Authorization");
header("Content-Type: application/json");
include_once('../config.php');
$data = file_get_contents("php://input");
$data = json_decode($data);
$name = mysqli_real_escape_string($conn, $data->name);
$email = mysqli_real_escape_string($conn, $data->email);
$password = mysqli_real_escape_string($conn, $data->password);
$number = mysqli_real_escape_string($conn, $data->number);
$response = [];
$hasTrue = true;
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $response[] = ['status' => 'error', 'name' => 'email', 'message' => 'email not valid'];
  $hasTrue = false;
}

if (strlen($password) < 4) {
  $response[] = ['status' => 'error', 'name' => 'password', 'message' => 'password lenght to small minmum 4 chracter enter'];
  $hasTrue = false;
}
if ($hasTrue) {
  $password = password_hash($password,PASSWORD_DEFAULT);
  $sql = "INSERT INTO user(name,email,password,number)VALUES('$name','$email','$password','$number')";
  if ($conn->query($sql)) {
    $response[] = ['status' => 'success', 'message' => 'Registration successful! You can now log in to your account.'];
  }
}
echo json_encode($response);
