




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
		$taikhoanid = isset($_GET["TAIKHOAN_ID"]) ? $_GET["TAIKHOAN_ID"].',' : '';
        $ho = isset($_GET["HO"]) ?  $_GET["HO"].',' : '' ;
        $ten = isset($_GET["TEN"]) ? $_GET["TEN"].',':'';
        $diachi =isset($_GET["DIACHI"]) ?   $_GET["DIACHI"].',':'' ;
		$sodt = isset($_GET["SODT"]) ?   $_GET["SODT"].',':'';
		$email =isset($_GET["EMAIL"]) ? $_GET["EMAIL"].',':'' ; 
		$gioitinh = isset($_GET["GIOITINH"]) ?   $_GET["GIOITINH"].',':'';
      $sql = "select $taikhoanid $ho $ten  $diachi $sodt $email $gioitinh ID from khachhang";
      break;
    case 'POST':
      if ($_POST["request"] == 1){
	  	$taikhoanid = isset($_POST["TAIKHOAN_ID"]) ? $_POST["TAIKHOAN_ID"] :'';
        $ho = isset($_POST["HO"]) ?   $_POST["HO"] :'' ;
        $ten = isset($_POST["TEN"]) ?  $_POST["TEN"] :'' ;
        $diachi =isset($_POST["DIACHI"]) ?   $_POST["DIACHI"] :'' ;
		$sodt = isset($_POST["SODT"]) ?  $_POST["SODT"] :'';
		$email =isset($_POST["EMAIL"]) ?  $_POST["EMAIL"]:'' ; 
		$gioitinh = isset($_POST["GIOITINH"]) ?  $_POST["GIOITINH"] :'';
        $sql = "insert into khachhang (taikhoan_id,ho,ten,diachi,sodt,email,gioitinh) values ('$taikhoanid', '$ho' , '$ten','$diachi','$sodt', '$email','$gioitinh')";
        break;
      }
      if ($_POST["request"] == 2){
        $id =  isset($_POST["ID"]) ?  $_POST["ID"]:'';
       $taikhoanid = isset($_POST["TAIKHOAN_ID"]) ? $_POST["TAIKHOAN_ID"] :'';
        $ho = isset($_POST["HO"]) ?   $_POST["HO"] :'' ;
        $ten = isset($_POST["TEN"]) ?  $_POST["TEN"] :'' ;
        $diachi =isset($_POST["DIACHI"]) ?   $_POST["DIACHI"] :'' ;
		$sodt = isset($_POST["SODT"]) ?  $_POST["SODT"] :'';
		$email =isset($_POST["EMAIL"]) ?  $_POST["EMAIL"]:'' ; 
		$gioitinh = isset($_POST["GIOITINH"]) ?  $_POST["GIOITINH"] :'';
        $sql = "UPDATE khachhang SET taikhoan_id='$taikhoanid',ho='$ho',ten='$ten',diachi='$diachi',sodt='$sodt',email='$email',gioitinh='$gioitinh' WHERE id='$id'";
        break;
      }
	  if ($_POST["request"] ==  3){
	  	 $id =  isset($_POST["ID"]) ?  $_POST["ID"]:'';
        $sql = "DELETE FROM khachhang WHERE id='$id'";
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