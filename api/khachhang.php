


<?php include "connect.php"; ?> <?php

switch ($method) {
    case 'GET':
		    $data='';
      	$data .= isset($_GET["0"]) ?  $_GET["0"]:'';
      for(  $i=1 ; $i<10 ; $i++ ) {
        $data .= !isset($_GET[$i]) ? '':',';
        $data .= isset($_GET[$i]) ?  $_GET[$i]:'';
      }
        $sql = "select $data from khachhang";
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

?> <?php include "json_encode.php"; ?>