<?php
session_start();
if (isset($_SESSION['userid'])){
    echo "Du är inloggad!"; //Skriv en funktion som visar information att man är inloggat i webbsidan
}
?>