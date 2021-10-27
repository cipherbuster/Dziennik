<?php 

# SELECT = Switch: R ================================================
/*
$query_string = "
SELECT 	klasa.`id_klasa`, klasa.`nazwa`, klasa.`rok_szkolny`, klasa.`id_wychowawca`,
		nauczyciel.`id_nauczyciel`, nauczyciel.`imie`, nauczyciel.`nazwisko`, nauczyciel.`email`, nauczyciel.`telefon`, nauczyciel.`id_konto`,
        klasa_nauczyciel.`id_klasa_nauczyciel`, klasa_nauczyciel.`id_klasa`, klasa_nauczyciel.`id_nauczyciel`
        
FROM	klasa

JOIN 	klasa_nauczyciel
ON		klasa_nauczyciel.`id_klasa` = klasa.`id_klasa`

JOIN	nauczyciel
ON		klasa_nauczyciel.`id_nauczyciel` = nauczyciel.`id_nauczyciel`

WHERE nauczyciel.`id_nauczyciel` = 1";
$query_param  = Array(
    'query_string' => $query_string,
    'order_by' => 'nauczyciel.`nazwisko`',
    'order_direction' => 'ASC',
    'limit' => '0, 25'
);
*/

$query_string = "SELECT * FROM nauczyciel";
$query_param  = Array(
    'query_string' => $query_string,
    'order_by' => 'nazwisko',
    'order_direction' => 'ASC',
    'limit' => '0, 25'
);



#echo '<br><br>zapytanie: '.$query_string.'<br>';
#================================================


/*
# INSERT = Switch: C ================================================
$query_param  = Array(
    'table_name' =>  'nauczyciel ',
    'table_fields' => Array ('imie'=>'test', 'nazwisko'=>'test', 'email'=>'test', 'telefon'=>'test', 'id_konto'=>1)
);
*/

/*
# UPDATE = Switch: U ================================================
$query_param  = Array(
    'table_name' =>  'nauczyciel ',
    'table_fields' => Array ('id_nauczyciel'=>'1','imie'=>'test2', 'nazwisko'=>'test2', 'email'=>'test2', 'telefon'=>'test2', 'id_konto'=>1)
);
*/

/*
# DELETE = Switch: D ================================================
$query_param  = Array(
    'table_name' => 'nauczyciel',
    'table_fields' => Array ('id_nauczyciel'=> 3)
);
*/
