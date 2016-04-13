<?php
header('Access-Control-Allow-Origin: *');
// ini_set('display_errors', 'On');
// error_reporting(E_ALL | E_STRICT);
$groupid = $_POST["groupid"];
include('./hidden/config.php');
// include('./hidden/function.php');
$conn = mysql_connect(DB_HOST, DB_USER, DB_PASS);
if(! $conn )
{
    die('Could not connect: ' . mysql_error());
}
mysql_select_db(DB_NAME);
mysql_query("SET NAMES utf8");

if ( $groupid) {
    $sql =  "SELECT id, groupid, heading, name
    FROM drawings
    WHERE groupid = '".$groupid."'
    ORDER BY groupid DESC";
}
else {
    $sql =  "SELECT id, groupid, heading, name
    FROM drawings
    ORDER BY groupid DESC";
}
$result = mysql_query($sql, $conn);

if (! $result){
    print('Database error: ' . mysql_error());
}

$to_encode = array();
while($row = mysql_fetch_assoc($result)) {
    $to_encode[] = $row;
}
echo json_encode($to_encode);
?>