<?php
include_once('../allowApi.php');
header("Access-Control-Allow-Origin:" . $allowApi);
header("Access-Control-Allow-Methods:GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$id = $_GET['id'];
$id = json_decode($id);
include_once('../config.php');
$id = mysqli_real_escape_string($conn, $id);
$sql = "SELECT * FROM product WHERE id = $id";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
    $responseData = array('status' => 'success','data'=>$data);
    echo json_encode($responseData);
} else {
    $responseData = array('status' => 'danger');
    echo json_encode($responseData);
}
