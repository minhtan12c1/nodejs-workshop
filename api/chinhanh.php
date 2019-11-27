




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
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
switch ($method) {
    case 'GET':
		$ten = is_null($_GET["TENCHINHANH"]) ? '' : $_GET["TENCHINHANH"];
        $diachi = is_null($_GET["DIACHICHINHANH"]) ? '' :  $_GET["DIACHICHINHANH"] ;
		$nhathuoc = is_null($_GET["NHATHUOC_ID"]) ? '' :  $_GET["NHATHUOC_ID"] ;
      	$sql = "select ID, $ten,$diachi,$nhathuoc from chinhanh ";
      break;
    case 'POST':
      if ($_POST["request"] == 1){
        $tent= $_POST["TENCHINHANH"];
        $dichi= $_POST["DIACHICHINHANH"];
        $sql = "insert into chinhanh (tenchinhanh,diachichinhanh,nhathuoc_id) values ('$tent' , '$dichi', '1')";
        break;
      }
      if ($_POST["request"] == 2){
	  	$id= $_POST["ID"];
        $tent= $_POST["TENCHINHANH"];
        $dichi= $_POST["DIACHICHINHANH"];
        $sql = "UPDATE chinhanh SET tenchinhanh='$loaitk',dichichinhanh='$loaitk' WHERE id='$id' and nhathuoc_id='1' ";
        break;
      }
	  if ($_POST["request"] ==  3){
        $id = $_POST["ID"];
        $sql = "DELETE FROM chinhanh WHERE id='$id'";
        break;
      }
}
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