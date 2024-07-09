<?php
include_once('../allowApi.php');
header("Access-Control-Allow-Origin:" . $allowApi);
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include_once('../config.php');
$data = file_get_contents("php://input");
$data = json_decode($data);
$email = mysqli_real_escape_string($conn, $data->email);
$sql = "SELECT * FROM cart WHERE email='$email'";
if ($result = $conn->query($sql)) {
    $item =[];
    while($row = $result->fetch_assoc()){
        $item[] = $row;
    }
    $response = ['status' => 'success', 'data'=>$item];
    echo json_encode($response);
}else{
    echo 'ok';
}


