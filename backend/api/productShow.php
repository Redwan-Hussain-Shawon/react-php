<?php
include_once('../allowApi.php');
header("Access-Control-Allow-Origin:".$allowApi);
header("Access-Control-Allow-Methods: GET");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once('../config.php');
$sql = "SELECT * FROM product";

$result = $conn->query($sql);
$data = [];

while($row = $result->fetch_assoc()){
    $data[]= $row;
}

echo json_encode($data);



?>