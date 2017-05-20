<?php
session_start();
require "newbieConfig.php";

//delete user
if(isset($_SESSION['userid'])) {
    $sql = "DELETE FROM `Fotografer` WHERE `id` = :id";
    $stm_delete = $pdo->prepare($sql);
    $stm_delete->execute(['id'=>$_SESSION['userid']]);
 echo json_encode(TRUE);
 session_destroy();   
}else{
    echo json_encode(FALSE);
}
?>
