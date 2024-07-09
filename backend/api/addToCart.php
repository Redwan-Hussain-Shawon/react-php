<?php 
include_once('../allowApi.php');
header("Access-Control-Allow-Origin:".$allowApi);
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include_once('../config.php');
$data = file_get_contents("php://input");
$data = json_decode($data);
$email = mysqli_real_escape_string($conn,$data->email);
$product_id = mysqli_real_escape_string($conn,$data->product_id);
$sql = "SELECT * FROM cart WHERE product_id=$product_id";
$result = $conn->query($sql);
if($result->num_rows<1){
$sql1 = "INSERT INTO cart(email,product_id) VALUES('$email',$product_id)";
if($conn->query($sql1)){
 $response = ['status'=>'success','message'=>'product succfully added to cart'];
}else{
    $response = ['status'=>'danger','message'=>'server error try again'];
}
}else{
    $response = ['status'=>'danger','message'=>'your product alrady add your cart'];

}
echo json_encode($response);


?>