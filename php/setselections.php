<?php
header('Access-Control-Allow-Origin: *');
// ini_set('display_errors', 'On');
// error_reporting(E_ALL | E_STRICT);
$groupid = $_POST["groupid"];
$heading = $_POST["heading"];
$name = $_POST["name"];

include('./config.php');
$conn = mysql_connect(DB_HOST, DB_USER, DB_PASS);
if(! $conn )
{
    die('Could not connect: ' . mysql_error());
}
mysql_select_db(DB_NAME);
mysql_query("SET NAMES utf8");

$result = Mysql_query("UPDATE selections
SET selections.groupid= '".$groupid."', selections.name= '".$name."', selections.heading= '".$heading."'
WHERE id = 1", $conn);

if (! $result){
    print('Database error: ' . mysql_error());
}

echo json_encode("OK");
?>