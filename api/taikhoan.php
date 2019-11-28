
<?php include "connect.php"; ?> <?php
switch ($method) {
    case 'GET':
		$data='';
      $data .= isset($_GET["0"]) ?  $_GET["0"]:'';
      for(  $i=1 ; $i<10 ; $i++ ) {
        $data .= !isset($_GET[$i]) ? '':',';
        $data .= isset($_GET[$i]) ?  $_GET[$i]:'';
      }
      $sql = "select $data from taikhoan";
      break;
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
?> <?php include "json_encode.php"; ?>