
<?php include "connect.php"; ?> <?php
switch ($method) {
    case 'GET':
    	if ($_GET["request"] == 2){
	        $sql = "SELECT COUNT(*) as COUNT  FROM taikhoan";
	        break;
      	}
      	if ($_GET["request"] == 1){
		  $data='';
	      $data .= isset($_GET["0"]) ?  $_GET["0"]:'';
	      for(  $i=1 ; $i<10 ; $i++ ) {
	        $data .= !isset($_GET[$i]) ? '':',';
	        $data .= isset($_GET[$i]) ?  $_GET[$i]:'';
	      }
	      $filterObject = isset($_GET["filterObject"]) ? $_GET["filterObject"] : '' ;
	      $filterOperation = isset($_GET["filterOperation"]) ? $_GET["filterOperation"] : '' ;
	      $filterValue = isset($_GET["filterValue"]) ? $_GET["filterValue"] : '' ;
	      $arrfilterObject  = preg_split("/[|]+/", $filterObject);
	      $arrfilterOperation  = preg_split("/[&]+/", $filterOperation);
	      $arrfilterValue  = preg_split("/[|]+/", $filterValue);
	      $query = '';
	      if($filterObject){
	        $query .= 'WHERE ';
	        for($j=0 ; $j < count($arrfilterObject) ; $j++ ){
	           $query .= $arrfilterObject[$j].$arrfilterOperation[$j]."'".$arrfilterValue[$j]."'";
	           if ( $j < (count($arrfilterObject)- 1)) {
	             $query .= ' and ';
	           }
	         }
	      }
	      $start = isset($_GET["start"]) ? $_GET["start"] : '' ;
	      $limit  = isset($_GET["limit"]) ? $_GET["limit"] : '' ;
	      $sql = "select $data from taikhoan $query LIMIT $start,$limit";
	      break;
	  }
    case 'POST':
      if ($_POST["request"] == 1){
        $tentk = isset($_POST["TENTAIKHOAN"]) ? $_POST["TENTAIKHOAN"] : '';
        $loaitk= isset($_POST["LOAI_TAIKHOAN"]) ? $_POST["LOAI_TAIKHOAN"]: '';
        $sql = "insert into taikhoan (tentaikhoan,matkhau,loai_taikhoan) values ('$tentk' , 'matkhau', '$loaitk')";
        break;
      }
      if ($_POST["request"] == 2){
        $tentk = isset($_POST["TENTAIKHOAN"]) ? $_POST["LOAI_TAIKHOAN"]: '';
        $loaitk= isset($_POST["LOAI_TAIKHOAN"]) ? $_POST["LOAI_TAIKHOAN"]: '';
        $sql = "UPDATE taikhoan SET loai_taikhoan='$loaitk' WHERE tentaikhoan='$tentk'";
        break;
      }
      if ($_POST["request"] ==  3){
	  	  $tentk = isset($_POST["TENTAIKHOAN"]) ? $_POST["TENTAIKHOAN"]: '';
        $sql = "DELETE FROM taikhoan WHERE tentk='$tentk'";
        break;
      }
	  if ($_POST["request"] == 4){
        	$tentk= isset($_POST["username"]) ? $_POST["username"] : '';
		    $matkhau= isset($_POST["password"]) ? $_POST["password"] : '';
        $sql = "SELECT LOAI_TAIKHOAN FROM taikhoan WHERE STRCMP(TENTAIKHOAN,'$tentk') = 0 AND STRCMP(MATKHAU, PASSWORD('$matkhau')) = 0";
        break;
      }
}
?> <?php include "json_encode.php"; ?>