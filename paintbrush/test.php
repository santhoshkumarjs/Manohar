<?php require 'framework/initialise/framework.init.php'; 

$sql = "select * from category where id < 5";
$data = $db['master']->getResults($sql);

print_r($data);


?>