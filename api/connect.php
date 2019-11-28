




 <?php
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "gpp_project"; 
$id = '';

$con = mysqli_connect($host, $user, $password,$dbname);
// print_r($param["ten"]);die;



$method = $_SERVER['REQUEST_METHOD'];
//$param = (array) json_decode(file_get_contents('php://input'));
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

?>
