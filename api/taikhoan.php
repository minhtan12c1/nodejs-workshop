




 <?php
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "gpp_project"; 
$id = '';

$con = mysqli_connect($host, $user, $password,$dbname);
// print_r($param["ten"]);die;



$method = $_SERVER['REQUEST_METHOD'];
$param = (array) json_decode(file_get_contents('php://input'));
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
switch ($method) {
    case 'GET':
      $sql = "select * from taikhoan";
      break;
    case 'POST':
    case 'POST':
      if ($_POST["request"] == 1){
        $tentk = $_POST["TENTAIKHOAN"];
        $loaitk= $_POST["LOAI_TAIKHOAN"];
        $sql = "insert into taikhoan (tentaikhoan,matkhau,loai_taikhoan) values ('$tentk' , 'matkhau', '$loaitk')";
        break;
      }
      if ($_POST["request"] == 2){
        $tentk = $_POST["TENTAIKHOAN"];
        $loaitk= $_POST["LOAI_TAIKHOAN"];
        $sql = "UPDATE taikhoan SET loai_taikhoan='$loaitk' WHERE tentaikhoan='$tentk'";
        break;
      }
	   if ($_POST["request"] == 4){
        $tentk= $_POST["username"];
		 $matkhau= $_POST["password"];
        $sql = "SELECT LOAI_TAIKHOAN FROM taikhoan WHERE STRCMP(TENTAIKHOAN,'$tentk') = 0 AND STRCMP(MATKHAU, PASSWORD('$matkhau')) = 0";
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