<?php include "connect.php"; ?> <?php
switch ($method) {
    case 'GET':
    if ($_GET["request"] == 2){
          $sql = "SELECT COUNT(*) as COUNT  FROM chinhanh";
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
      $sql = "select ID, $data from chinhanh $query LIMIT $start,$limit";
      break;
    }
    case 'POST':
      if ($_POST["request"] == 1){
        $tent= isset($_POST["TENCHINHANH"]) ? $_POST["TENCHINHANH"] : '';
        $dichi= isset($_POST["DIACHICHINHANH"]) ? $_POST["DIACHICHINHANH"] : '';
        $sql = "insert into chinhanh (tenchinhanh,diachichinhanh,nhathuoc_id) values ('$tent' , '$dichi', '1')";
        break;
      }
      if ($_POST["request"] == 2){
	  	  $id= $_POST["ID"];
        $tent= isset($_POST["TENCHINHANH"])? $_POST["TENCHINHANH"] : '' ;
        $dichi= isset($_POST["DIACHICHINHANH"]) ? $_POST["DIACHICHINHANH"] : '';
        $sql = "UPDATE chinhanh SET tenchinhanh='$loaitk',dichichinhanh='$loaitk' WHERE id='$id' and nhathuoc_id='1' ";
        break;
      }
	  if ($_POST["request"] ==  3){
        $id = isset($_POST["ID"]) ? $_POST["ID"] : '';
        $sql = "DELETE FROM chinhanh WHERE id='$id'";
        break;
      }
}
?> <?php include "json_encode.php"; ?>