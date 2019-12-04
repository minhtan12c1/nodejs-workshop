
 <?php
// run SQL statement
  mysqli_set_charset($con,"utf8");
  $result = mysqli_query($con,$sql);
  header("Access-Control-Allow-Origin: *");
//print_r($sql);die;
if (!$result) {
  http_response_code(201);
  die(mysqli_error($con));
}

  if ($method == 'GET') {
    if (!$id) echo '[';
      header("Access-Control-Allow-Origin: *");
      header('content-type:application/json'); 
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

?>