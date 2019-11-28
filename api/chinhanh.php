<?php include "connect.php"; ?> <?php
switch ($method) {
    case 'GET':
		    $data='';
      	$data .= isset($_GET["0"]) ?  $_GET["0"]:'';
      for(  $i=1 ; $i<10 ; $i++ ) {
        $data .= !isset($_GET[$i]) ? '':',';
        $data .= isset($_GET[$i]) ?  $_GET[$i]:'';
      }
      	$sql = "select ID, $data from chinhanh ";
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
?> <?php include "json_encode.php"; ?>