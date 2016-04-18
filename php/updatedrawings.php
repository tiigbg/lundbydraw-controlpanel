<?php

header('Access-Control-Allow-Origin: *');
// ini_set('display_errors', 'On');
// error_reporting(E_ALL | E_STRICT);

include('./config.php');

$data;
$drawings;

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    echo "post!";
    $data = json_decode(file_get_contents("php://input"),true);
    $drawings = $data["drawings"];
    echo json_encode($drawings);
}
else {
    $drawings = $_POST["drawings"];
}

$conn = mysql_connect(DB_HOST, DB_USER, DB_PASS);
if(! $conn ) {
    die('Could not connect: ' . mysql_error());

}

mysql_select_db(DB_NAME);
mysql_query("SET NAMES utf8");

foreach($drawings as $drawing) { //foreach element in $drawings
    echo "hello";
    $groupid = $drawing["groupid"];
    $heading = $drawing["heading"];
    $name = $drawing["name"];
    if ($drawing["id"]il) {

    }
    echo $name;
    $testresult = mysql_query(
        "SELECT * FROM drawings WHERE (groupid='".$groupid."' AND name= '".$name."') LIMIT 1", $conn);
    if(mysql_fetch_array($testresult) == false) {
        $result = mysql_query("INSERT INTO drawings ".
                              "(groupid, name, heading) ".
                              "VALUES ".
                              "('$groupid','$name','$heading')",$conn);
    }
    else {
        $id = $drawing["id"];
        $result = mysql_query("UPDATE drawings
    SET drawings.groupid= '".$groupid."', drawings.name= '".$name."', drawings.heading= '".$heading."'
    WHERE id = '".$id."'", $conn);
    }
    // return 'Available';

    if (! $result){
        print('Database error: ' . mysql_error());
    }

}

echo json_encode($drawings);
?>
