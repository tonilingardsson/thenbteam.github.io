<?php
session_start();
?>

<?php
require "newbieConfig.php";


$userid= $_POST['id'];

$sql= "SELECT `id`, `firstname`, `lastname`, `company`, `email`, `profilepic`, `website`, `city`, `bio`, `pic1`, `pic2`, `pic3`, `pic4`, `pic5` FROM `Fotografer` WHERE `id`= :id";
$count=$pdo->prepare($sql);
$count->bindParam(":id",$userid,PDO::PARAM_INT,5);
$count->execute();
$row = $count->fetch(PDO::FETCH_OBJ);
$personal = array('info'=>$row);
echo json_encode($personal);

?>
