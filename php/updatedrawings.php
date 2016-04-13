<?php
header('Access-Control-Allow-Origin: *');
// ini_set('display_errors', 'On');
// error_reporting(E_ALL | E_STRICT);

include('./config.php');

$data;

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $data = json_decode(file_get_contents("php://input"),true);
}
$drawings = $data["drawings"];

$conn = mysql_connect(DB_HOST, DB_USER, DB_PASS);
if(! $conn ) {
    die('Could not connect: ' . mysql_error());
}

mysql_select_db(DB_NAME);
mysql_query("SET NAMES utf8");

foreach($drawings as $drawing) { //foreach element in $drawings

    $groupid = $drawing["groupid"];
    $heading = $drawing["heading"];
    $name = $drawing["name"];

    $result = Mysql_query("UPDATE drawings
    SET drawings.groupid= '".$groupid."', drawings.name= '".$name."', drawings.heading= '".$heading."'
    WHERE groupid = '".$groupid."' AND name = '".$name."'", $conn);

    if (! $result){
        print('Database error: ' . mysql_error());
    }

}

echo json_encode($_POST);
?>