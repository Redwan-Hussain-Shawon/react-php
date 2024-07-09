<?php
include_once('../allowApi.php');
header("Access-Control-Allow-Origin:" . $allowApi);
header("Access-Control-Allow-Headers:Content-Type,Authorization");
header("Content-Type:application/json");
include('../config.php');
$data = file_get_contents("php://input");
$data = json_decode($data);
$name = mysqli_real_escape_string($conn, $data->name);
$email = mysqli_real_escape_string($conn, $data->email);
$image = mysqli_real_escape_string($conn, $data->image);
$sql = "SELECT * FROM user WHERE email='$email'";
$result = $conn->query($sql);
if ($result->num_rows === 0) {
    $sql = "INSERT INTO user(name,email,img)VALUES('$name','$email','$image')";
    if ($conn->query($sql)) {
        echo json_encode(['status' => 'success']);
    }
}else{
    echo json_encode(['status' => 'success']);
}
