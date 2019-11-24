




 <?php
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "gp_project"; 
$id = '';

$con = mysqli_connect($host, $user, $password,$dbname);




$method = $_SERVER['REQUEST_METHOD'];

//$input = json_decode(file_get_contents('php://input'),true);
$param = (array) json_decode(file_get_contents('php://input'));

if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

// $param = (array) json_decode(file_get_contents('php://input'));
// print_r($param["ten"]);die;
switch ($method) {
    case 'GET':
      $sql = "select * from khachhang";
      break;
    case 'POST':
    case 'POST':
      if ($_POST["request"] == 1){
        $ho = $_POST["HO"];
        $ten = $_POST["TEN"];
        $email = $_POST["EMAIL"];
        $sql = "insert into khachhang (taikhoan_id,ho,ten,email,gioitinh) values ('tan1', '$ho' , '$ten', '$email','1')";
        break;
      }
      if ($_POST["request"] == 2){
        $id = $_POST["ID"];
        $ho = $_POST["HO"];
        $ten = $_POST["TEN"];
		$diachi = $_POST["DIACHI"];
        $email = $_POST["EMAIL"];
        $sql = "UPDATE khachhang SET ho='$ho',ten='$ten',diachi='$diachi',email='$email' WHERE id='$id'";
        break;
      }
	  if ($_POST["request"] ==  3){
        $id = $_POST["ID"];
        $sql = "DELETE FROM khachhang WHERE id='$id'";
        break;
      }
}

// run SQL statement
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(201);
 // die(mysqli_error($con));
}

if ($method == 'GET') {
    if (!$id) echo '[';
    header("Access-Control-Allow-Origin: *");
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
  } elseif ($method == 'POST') {
    header("Access-Control-Allow-Origin: *");
    echo json_encode($result);
  } else {
    echo mysqli_affected_rows($con);
  }

$con->close();