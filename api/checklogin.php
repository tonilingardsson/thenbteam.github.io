<?php
session_start();
?>
<?php
require('newbieConfig.php');

// username and password sent from form
$email=$_POST['email'];
$password=$_POST['password'];

//check the db for a user with the right email
$sqlquery="SELECT * FROM `Fotografer` WHERE `email`= '$email'";
$stm= $pdo->prepare($sqlquery);
try{
    $stm->execute();
}
catch (PDOException $e){
    echo "Error: " . $e->getMessage();
}
//check if the email matches with the db
if($stm->rowCount() == 1){
    $result = $stm->fetch(PDO::FETCH_ASSOC);
    //Check if the password matches with the db
    if(password_verify($password, $result['password'])){
        //Save data in sessions
        $_SESSION['userid']= $result['id'];
        $_SESSION['firstname']= $result['firstname'];
        $_SESSION['lastname']= $result['lastname'];
        $_SESSION['status']=true;
    echo json_encode(TRUE);
    }else{
    // If the there is no match, send false to front
    echo json_encode(FALSE);
    }    
}else{
    // If the there is no match, send false to front
    echo json_encode(FALSE);
}
?>