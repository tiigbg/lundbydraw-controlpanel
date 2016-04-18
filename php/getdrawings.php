<?php
header('Access-Control-Allow-Origin: *');
// ini_set('display_errors', 'On');
// error_reporting(E_ALL | E_STRICT);
include('./config.php');
$conn = mysql_connect(DB_HOST, DB_USER, DB_PASS);
if(! $conn )
{
    die('Could not connect: ' . mysql_error());
}
mysql_select_db(DB_NAME);
mysql_query("SET NAMES utf8");

$sql =  "SELECT id, groupid, heading, name
FROM drawings
ORDER BY groupid DESC";

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