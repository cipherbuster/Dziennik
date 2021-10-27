<?php
include_once './config/settings.php';
include_once './include/PDO_QUERY.php';
include_once './include/polecenia.php';

$pdo = new PDO("$DBEngine:host=$DBServer;dbname=$DBName;$DBPort=3306", $DBUser, $DBPass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//Tworzymy nowy obiekt
$PDO_QUERY = new PDO_QUERY;
$PDO_QUERY->setPDO($pdo);

        //operacje CRUD
        $Wynik = $PDO_QUERY->query_list("R", $query_param);
        if($PDO_QUERY->getError()){
            $TRESC=$PDO_QUERY->getErrorDescription();
        }else{
            $TRESC=$PDO_QUERY->getSuccessDescription();
        }  

        //Wyświetlanie wyniku zapytania
        if($Wynik == TRUE){
            foreach ($Wynik as $name => $value){
                foreach ($value as $name => $value){
                echo  $name.': '.$value.'<br>';
                }
                echo '<br>';
            }
        }else{
            echo json_encode($TRESC);
        }

       