




 <?php
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "gpp_project"; 
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
      $sql = "select * from nhanvien";
      break;
    case 'POST':
    case 'POST':
      if ($_POST["request"] == 1){
	  	$taikhoanid = $_POST["TAIKHOAN_ID"];
        $ho = $_POST["HO"];
        $ten = $_POST["TEN"];
        $diachi = $_POST["DIACHI"];
		$sodt = $_POST["SODT"];
		$gioitinh = $_POST["GIOITINH"];
		$chinhanh = $_POST["CHINHANH"];
        $sql = "insert into nhanvien (taikhoan_id,ho,ten,diachi,sodt,gioitinh,chinhanh_id) values ('$taikhoanid', '$ho' , '$ten','$diachi','$sodt', '$gioitinh','chinhanh')";
        break;
      }
      if ($_POST["request"] == 2){
        $id = $_POST["ID"];
       	$taikhoanid = $_POST["TAIKHOAN_ID"];
        $ho = $_POST["HO"];
        $ten = $_POST["TEN"];
        $diachi = $_POST["DIACHI"];
		$sodt = $_POST["SODT"];
		$gioitinh = $_POST["GIOITINH"];
		$chinhanh = $_POST["CHINHANH"];
        $sql = "UPDATE nhanvien SET taikhoan_id='$taikhoanid',ho='$ho',ten='$ten',diachi='$diachi',sodt='$sodt',gioitinh='$gioitinh',chinhanh_id='$chinhanh'  WHERE id='$id'";
        break;
      }
	  if ($_POST["request"] ==  3){
        $id = $_POST["ID"];
        $sql = "DELETE FROM nhanvien WHERE id='$id'";
        break;
      }
}

// run SQL statement
$result = mysqli_query($con,$sql);
 header("Access-Control-Allow-Origin: *");
// die if SQL statement failed
if (!$result) {
  http_response_code(201);
  
  die(mysqli_error($con));
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