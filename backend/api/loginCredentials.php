<?php 
include_once('../allowApi.php');
header("Access-Control-Allow-Origin:".$allowApi);
header('Access-Control-Allow-Headers:Content-Type,Authorization');
header("Content-Type:application/json");
include('../config.php');
$data = file_get_contents("php://input");
$data = json_decode($data);
$response = [];
$email = mysqli_real_escape_string($conn,$data->email);
$password = mysqli_real_escape_string($conn,$data->password);
$sql = "SELECT * FROM user WHERE email='$email'";
$result = $conn->query($sql);
if($result->num_rows>0){
    $row = $result->fetch_assoc();
    $password_old = $row['password'];
    if (password_verify($password,$password_old)){
       echo json_encode($response = ['status' => 'success', 'message' => 'Login successful']);
    } else {
        echo json_encode($response = ['status' => 'danger', 'name' => 'password', 'message' => 'Password does not match']);
    }
}else{
    echo json_encode($response=['status'=>'danger','name'=>'email','message'=>'email address not match']);
}


?>