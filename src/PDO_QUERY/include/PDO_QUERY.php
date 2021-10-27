<?php
/*
* @author Piotr Chmielewski
*
*Funkcje do obsługi zapytań MySql
*/

Class PDO_QUERY{

    private $pdo;
    private $is_error;
    private $error_description;
    public  $success_description;


    public function setPDO($pdo)
    {
        $this->pdo=$pdo;
        $this->is_error=FALSE;
    } 


    function query_list($crud, $components)
    {

        switch ($crud) {
        /*
        *Wybranie rodzaju działania C, R, U, D
        */
            case "C":
                /*
                *Dodawanie
                */
                try{       
                    //definiujemy zmienne
                    $query ='';
                    $field_name='(';
                    $field_value='(';
                    $sendValue ='';
                    $stmtValue =''; 
                    //budujemy stringi do zapytanie sql
                    foreach ($components['table_fields'] as $name => $value){ 
                        $field_name .= '`'.$name.'`, ';
                        $field_value .= ':'.$name.', ';                       
                    }
                    //pozbywamy się przecinka z końca zapytania
                    $field_name = substr($field_name, 0, strlen($field_name)-2).')';
                    $field_value = substr($field_value, 0, strlen($field_value)-2).')';
                    //budujemy zapytanie
                    $query = 'INSERT INTO '.$components['table_name'].' '.$field_name.' VALUES '.$field_value;
                    $stmt = $this->pdo->prepare($query);

                    //bindujemy przekazane wartości z nazwami tabeli
                    foreach ($components['table_fields'] as $name => $value){ 
        
                        $sendValue =$value;
                        $stmtValue = ":".$name;
                        $stmt->bindValue($stmtValue,$sendValue,PDO::PARAM_STR);
                    }    
                    //wykonujemy zapytanie
                    $result = $stmt->execute();
        
                    if($result==TRUE){
                        $this->is_error=FALSE;
                        $this->error_description="";
                        $this->success_description="Dodano nowe dane!";
                    }
                    $stmt->closeCursor();
                }
                catch(PDOException $e)
                {
                    $this->is_error=TRUE;
                    $this->error_description="Nie udało się dodać rekordu do bazy danych: ".$e->getMessage();
                    return;
                } 
                break;

            case "R":
                /*
                *Odczytywanie
                */

                //Definiujemy zmienne
                $query ='';
                $this->pdo_result_array=array();
        
                //sprawdzenie czy połączenie z BD powiodło się
                if($this->pdo==null){
                    $this->is_error=TRUE;
                    $this->error_description="Brak połączenia z bazą danych";
                    return;
                }
                try{ 
                    //pobieramy zawartość zapytania 
                    $query = $components['query_string'].' ORDER BY '.$components['order_by']." ".$components['order_direction'];
        
                    $stmt = $this->pdo->prepare($query);
                    $result = $stmt->execute();

                    if($result==TRUE){
                        $this->is_error=FALSE;
                        $this->error_description="";
                        $this->pdo_result_array=$stmt->fetchAll(PDO::FETCH_ASSOC); 
                    }
                    $stmt->closeCursor();
                }
                catch(PDOException $e)
                {
                    $this->is_error=TRUE;
                    $this->error_description="Nie udało się odczytać danych z bazy: ".$e->getMessage();
                    return;
                }
                return $this->pdo_result_array;
                break;

            case "U":
                /*
                *Aktualizowanie
                */
                if($this->pdo==null){
                    $this->is_error=TRUE;
                    $this->error_description="Brak połączenia z bazą danych";
                    return;
                }
                try{      
                    //definiujemy zmienne
                    $field_name = '';
                    $field_value = '';
                    $set_value = '';
                    $query ='';
                    $field_tab_name ='';
                    $sendValue ='';
                    $stmtValue =''; 

                    //odcinamy z tablicy 'components' pierwszy element (id) wpisanej tablicy 'table_fields'
                    $table_id = array_slice($components['table_fields'], 0, 1);
                    $table_fields = array_slice($components['table_fields'], 1, );
                    //przypisujemy wartość id

                    //SET - budujemy stringi do zapytania sql 
                    foreach ($table_fields as $name => $value){ 
                        $field_name = '`'.$name.'`';
                        $field_value = $name;
                        $set_value .= $field_name.' = :'.$field_value.', ';
                    }
                    //pozbywamy się przecinka z końca zapytania
                    $set_value = substr($set_value, 0, strlen($set_value)-2);
                                
                    //WHERE - budujemy stringi do zapytania sql 
                    foreach ($table_id as $name => $value){ 
                        $field_tab_name = $name;
                        $where_value = '`'.$field_tab_name.'` = :'.$field_tab_name;
                    }
                                    
                    $query = 'UPDATE '.$components['table_name'].' SET '.$set_value.' WHERE '.$where_value;
                    $stmt = $this->pdo->prepare($query);

                    //bindujemy przekazane wartości z nazwami tabeli
                    foreach ($components['table_fields'] as $name => $value){                
                        $sendValue = $value;
                        $stmtValue = ":".$name;
                        $stmt->bindValue($stmtValue,$sendValue,PDO::PARAM_STR);
                    }
        
                    $result = $stmt->execute();
                    if($result==TRUE){
                        $this->is_error=FALSE;
                        $this->error_description="";
                        $this->success_description="Zaktualizowano dane!";
                    }
                    $stmt->closeCursor();
                }
                catch(PDOException $e)
                {
                    $this->is_error=TRUE;
                    $this->error_description="Nie udało się zmienić danych: ".$e->getMessage();
                    return;
                }
                break;

            case "D":
            /*
            Usuwanie
            */
                //Definiujemy zmienne
                $field_tab_name ='';
                $query='';
                $sendValue ='';
                $stmtValue =''; 

                if($this->pdo==null){
                    $this->is_error=TRUE; 
                    $this->is_errorDescription="Brak połączenia z bazą danych";
                    return;
                } 
                    //odcinamy z tablicy 'components' pierwszy element (id) wpisanej tablicy 'table_fields'
                    $table_id = array_slice($components['table_fields'], 0, 1);
                    //WHERE - budujemy stringi do zapytania sql 
                    
                    foreach ($table_id as $name => $value){ 
                        $field_tab_name = $name;
                        $where_value = '`'.$field_tab_name.'` = :'.$field_tab_name;
                    }
                    //tworzymy gotowe zapytanie
                    $query = 'DELETE FROM '.$components['table_name'].' WHERE '.$where_value;
                    $stmt = $this->pdo->prepare($query);
                    //bindujemy zmienne do zapytania PDO
                    foreach ($table_id as $name => $value){                
                        $sendValue = $value;
                        $stmtValue = ":".$name;
                        $stmt->bindValue($stmtValue,$sendValue,PDO::PARAM_STR);
                    }                       
                    $result = $stmt->execute();

                    if($result==TRUE){
                        $this->is_error=FALSE;
                        $this->error_description="";
                        $this->success_description="Usunięto dane!";
                    }
                    $stmt->closeCursor();

            break;   

            default:
                echo "Brak instrukcji Switch dla wskazanego parametru";                
            }

    }


    /*
    * Metoda sprawdzająca czy błąd wystąpił
    */
    public function getError()
    {
        $error=$this->is_error;
        $this->is_error=FALSE;
        return $error;
    }
    /*
    * Metoda pobierająca opis błędu
    */
    public function getErrorDescription()
    {
        $error_description=$this->error_description;
        $this->error_description="";
        return $error_description;
    }
    /*
    * Metoda pobierająca opis komunikatu
    */
    public function getSuccessDescription()
    {
        $success_description=$this->success_description;
        $this->success_description="";
        return $success_description;
    }
}