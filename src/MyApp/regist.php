<?php

$host = "localhost";
$username = "debian-sys-maint";
$password = "J8J9st6geWQ8UY5z";
$dbname = "users";

$connection = mysqli_connect($host, $username, $password, $dbname);

if(isset($_GET['name'])){

    $name = $_GET['name'];
    $query_1 = mysqli_query($connection, "INSERT INTO users (name) VALUES ('$name')");
} else {

    $query_2 = mysqli_query($connection, "SELECT name FROM users");

    $array = array();
    while($result = mysqli_fetch_assoc($query_2)){
        $array[] = $result;
    }

    echo json_encode($array);
}


