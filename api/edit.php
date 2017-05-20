<?php
session_start();
?>
<?php
require "newbieConfig.php";
?>
<?php

//pick up the userid from session
$userid= $_SESSION['userid'];

//Select everything except password on the session-userid. Put it in an array and send with json. 
$sql= "SELECT `id`, `firstname`, `lastname`, `company`, `email`, `profilepic`, `website`, `city`, `bio`, `pic1`, `pic2`, `pic3`, `pic4`, `pic5` FROM `Fotografer` WHERE `id`= :id";
$count=$pdo->prepare($sql);
$count->bindParam(":id",$userid,PDO::PARAM_INT,5);
$count->execute();
$row = $count->fetch(PDO::FETCH_OBJ);
$personal = array('info'=>$row);
echo json_encode($personal);

//Update all columns with new values
if(isset($_SESSION['userid'])){
    $sql="UPDATE `Fotografer` SET `firstname`= :firstname,`lastname`= :lastname,`company`= :company, `email`= :email, `profilepic`=:profilepic, `website`= :website, `city`=:city, `bio`= :bio, `pic1`=:pic1, `pic2`=:pic2, `pic3`=:pic3, `pic4`=:pic4, `pic5`=:pic5 WHERE `id`= $userid";
    $stm_update = $pdo->prepare($sql);
    $stm_update->execute(['firstname' => $_POST['ufirstname'], 'lastname' => $_POST['ulastname'], 'company' => $_POST['ucompany'], 'email' => $_POST['uemail'], 'profilepic' => $_POST['uprofilepic'], 'website' => $_POST['uwebsite'], 'city' => $_POST['ucity'], 'bio' => $_POST['ubio'], 'pic1' => $_POST['upic1'], 'pic2' => $_POST['upic2'], 'pic3' => $_POST['upic3'], 'pic4' => $_POST['upic4'], 'pic5' => $_POST['upic5']]);

    $result = $stm_update->fetch(PDO::FETCH_ASSOC);
    $_SESSION['firstname']= $_POST['ufirstname'];
    $_SESSION['lastname']= $_POST['ulastname'];
        echo json_encode(1);
    }else{
       echo json_encode(2); 
}
?>