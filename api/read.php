<?php
session_start();
?>

<?php
require "newbieConfig.php";

//Name, company, city
$sql= "SELECT `id`, `firstname`, `lastname`, `company`, `city` FROM `Fotografer` ORDER BY `firstname` ASC";
$count=$pdo->prepare($sql);
$count->execute();
$row = $count->fetchAll(PDO::FETCH_OBJ);
echo json_encode($row);
?>