


<?php include "connect.php"; ?> <?php

switch ($method) {
    case 'GET':
    if ($_GET["request"] == 2){
          $sql = "SELECT COUNT(*) as COUNT  FROM `sanpham` sp 
              inner join sptheotk sptk on sp.ID=sptk.SANPHAM_ID  
              inner join `loaisanpham` lsp on sp.LOAI_ID=lsp.ID 
              inner join `nhasanxuat` nsx on sp.NSX_ID=nsx.ID ";
          break;
        }
    if ($_GET["request"] == 1){
		    $data='';
      	$data .= isset($_GET["0"]) ?  $_GET["0"]:'';
      for(  $i=1 ; $i<10 ; $i++ ) {
        $data .= !isset($_GET[$i]) ? '':',';
        $data .= isset($_GET[$i]) ?  $_GET[$i]:'';
      };
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
      $sql = "SELECT sp.ID,sp.TENSANPHAM,lsp.TEN_LOAISP,nsx.TEN_NSX,sp.DONVITINH,tb1.GIASANPHAM as GIABAN,sp.IMAGE,sp.MOTA 
      FROM `sanpham` sp 
      inner join sptheotk sptk on sp.ID=sptk.SANPHAM_ID  
      inner join `loaisanpham` lsp on sp.LOAI_ID=lsp.ID 
      inner join `nhasanxuat` nsx on sp.NSX_ID=nsx.ID 
      inner join (SELECT DISTINCT `NGAY_ID`,`SANPHAM_ID`,`GIASANPHAM` FROM `giatheongay` ORDER by `NGAY_ID` ASC  ) as tb1   on sp.ID=tb1.SANPHAM_ID 
      GROUP by TENSANPHAM  LIMIT $start,$limit";
      //$sql = "select $data from sanpham $query LIMIT $start,$limit";
      break;
    }
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