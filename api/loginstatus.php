<?php
session_start();
require "newbieConfig.php";
if (isset($_SESSION['userid'])){
    $res = new stdClass();
    $res->id = $_SESSION['userid'];
    $res->firstname = $_SESSION['firstname'];
    $res->lastname = $_SESSION['lastname'];
    $res->status = true;
    echo json_encode ($res);
}else{
  $res = new stdClass();
  $res->status = FALSE;
  echo json_encode ($res);
}
?>
