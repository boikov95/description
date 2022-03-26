<?php

header('Access-Control-Allow-Origin:*');
// Объявляем нужные константы
define('DB_HOST', 'localhost');
define('DB_USER', 'sa');
define('DB_PASSWORD', 'escort');
define('DB_NAME', 'categories');


// Подключаемся к базе данных
function connectDB() {
    $errorMessage = 'Невозможно подключиться к серверу базы данных';
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    if (!$conn)
        throw new Exception($errorMessage);
    else {
        $query = $conn->query('set names utf8');
        if (!$query)
            throw new Exception($errorMessage);
        else
            return $conn;
    }
}

// Вытаскиваем категории из БД
function getCategories($db) {
    $query = "
        SELECT
           id AS `id`,
           IF (parent_id = 0, '#', parent_id) AS `parent`,
           category as `text`
        FROM
           categories WHERE id>0 order by id asc       
    ";
    $data = $db->query($query);
    $categories = array();
    while ($row = $data->fetch_assoc()) {
        array_push($categories, array(
            'id' => $row['id'],
            'parent' => $row['parent'],
            'text' => $row['text']
        ));
    }
    return $categories;
}
// Вытаскиваем комментарии из БД
function getComment($db) {
    $query = "
        SELECT
           name, text, date_add
        FROM
           comments where public=1 order by id desc       
    ";
    $data = $db->query($query);
    $comment = array();
    while ($row = $data->fetch_assoc()) {
        array_push($comment, array(
            'name' => $row['name'],
            'text' => $row['text'],
            'date_add' => $row['date_add']
        ));
    }
    return $comment;
}
// Вытаскиваем теги
function loadTegi($db) {
    $query = "
        SELECT
           name
        FROM
           tegi       
    ";
    $data = $db->query($query);
    $name = array();
    while ($row = $data->fetch_assoc()) {
        array_push($name, array(
            'name' => $row['name'],
            'flag' => false
        ));
    }
    return $name;
}
// Вытаскиваем последние данные о документах
function getLastDocument($db) {   
    $query = "
        SELECT
           id, category
        FROM
           categories where date>(select date_sub(CURDATE(), interval 7 day))
    ";
    $data = $db->query($query);
    $name = array();
    while ($row = $data->fetch_assoc()) {
        array_push($name, array(
            'id' => $row['id'],
            'category' => $row['category']
        ));
    }
    return $name;
}
// Вытаскиваем последние 15 указаний
function getInstructions($db, $where) {
    $query = "
        SELECT
           a.category as country, b.text, b.date, b.teg
        FROM
           instructions b inner join categories a on a.id=b.id where $where order by b.date desc limit 5       
    ";
    $data = $db->query($query);
    $instruction = array();
    while ($row = $data->fetch_assoc()) {
        array_push($instruction, array(
            'country' => $row['country'],
            'text' => $row['text'],
            'date' => date('d.m.Y H:i:s', strtotime($row['date'])),
            'teg' => $row['teg'],
        ));
    }
    return $instruction;
}
//Вытаскиваем текс
function loadtext($db, $id) {
    $query = "
        SELECT
           a.text, a.flag_image, a.flag_pdf, a.countpdf, a.nameimage, a.idimage, count(b.idimage) as count
        FROM
           documenttext as a left outer join documentimage as b on a.id=b.idcategories and a.idimage=b.idimage 
        WHERE a.id=$id  group by a.text, b.idimage order by a.position"
    ;
    $data = $db->query($query);
    $categories = array();
    while ($row = $data->fetch_assoc()) {
        array_push($categories, array(
            'text' => $row['text'],            
            'flag_image' => $row['flag_image'],
            'flag_pdf' => $row['flag_pdf'],
            'countpdf' => $row['countpdf'],
            'nameimage' => $row['nameimage'],
            'idimage' => $row['idimage'],
            'count' => $row['count']
    ));            
    }
    return $categories;
}

//Вытаскиваем pdf
function loadpdf($db, $id, $idpdf, $position) {
    $query = "
        SELECT
           pdf
        FROM
           documentpdf 
        WHERE id=$id  and idpdf=$idpdf and position=$position"
    ;
    $data = $db->query($query);
    while ($row = $data->fetch_assoc()) {
        $pdf = $row['pdf'];          
    }
    return $pdf;
}

//Вытаскиваем фото
function loadimage($db, $id, $idimage, $position) {
    $query = "
        SELECT
           image 
        FROM
           documentimage where idcategories=$id and idimage=$idimage and position=$position";
    $data = $db->query($query);
    while ($row = $data->fetch_assoc()) {
    $image = $row['image'];        
    }
    return $image;       
    }    
    //Вытаскиваем изображение страны
    function loadcountryimage($db, $id) {
    $query = "SELECT
           IF (image is null, (select image FROM
           categories where id='0'),  image) as image 
           FROM
           categories where id=$id";
    $data = $db->query($query);
    while ($row = $data->fetch_assoc()) {
    $image = $row['image'];        
    }
    return $image;  
         
    }  
    
// Добавление комментария в БД
function setComment($db, $FIO, $text, $data) {    
    $query = "insert into comments (name, text, date_add, public) value ('$FIO', '$text', '$data', '0')";
    //$query = "update categories set number = number + 1 where parent_id = $parentId and number >= $position";
    $db->query($query);
    //$query = "update categories set parent_id = $parentId, number = $position where id = $categoryId";
    //$db->query($query);
}

// Добавление статистики
function getStatistic($db, $id, $category){
    $query = "select if ((select count(count) from statistic where id=$id)=0, 0, (select count from statistic where id=$id)) as kol from statistic";    
    $data = $db->query($query);
    while ($row = $data->fetch_assoc()) {
        $kol = $row['kol'];        
        }
    //$kol=$kol+1

    $query = "insert into statistic(id, text, count) value($id, '$category', $kol+1)
    ON DUPLICATE KEY UPDATE count=VALUES(count)";
    $db->query($query);
    
}
// Добавление узла к дереву в БД
function setNode($db, $idparent, $textnode, $id) {
    $query = "insert into categories (id, category, parent_id) value ('$id', '$textnode', '$idparent')";
    $db->query($query);
}

// Добавление фото из формы
function addimage($db) {
    $diff = count($_FILES['image']) - count($_FILES['image'], COUNT_RECURSIVE);
    $idcategor=$_POST['idcategor'];
    $position=$_POST['position'];
    $textform=($_POST['val1']);
    $nameimage=($_POST['val2']);
    $idposition=($_POST['idposition']);
    
    if ($idposition==1)
    {
    $position_image='0'; 
    if ($position==1)
    {
    $query = "delete from documenttext where id='$idcategor'"; 
    $db->query($query); 
    }
    $arr=array();
    $arr=$_POST['nodele'];
    if ($diff==0)
    {
    if (count($arr)==0) 
    {
    $query = "insert into documenttext (id, text, flag_image, position) value ('$idcategor', '$textform', '0', '$position')";
    $db->query($query);
    }
    else 
    {
    $query = "insert into documenttext (id, text, flag_image, nameimage, idimage, position) value ('$idcategor', '$textform', '1', '$nameimage', '$position', '$position')";
    $db->query($query);
    //$position_image='0';
    foreach ($arr as $value) {
    $position_image=$position_image+1;
    $image=base64_decode($value);
    $query="insert into documentimage (idcategories, idimage, image, position) value ('$idcategor', '$position', '" . mysql_real_escape_string($image) . "', '$position_image')";    
    $db->query($query);    
    }    
    }
    }
    else {  
    //$position_image='0';    
    $query = "insert into documenttext (id, text, flag_image, nameimage, idimage, position) value ('$idcategor', '$textform', '1', '$nameimage', '$position', '$position')";
    $db->query($query);
    if (count($arr)!=0) 
    {
    //$position_image=$position_image+1;
    foreach ($arr as $value) {
    $position_image=$position_image+1;
    $image=base64_decode($value);
    $query="insert into documentimage (idcategories, idimage, image, position) value ('$idcategor', '$position', '" . mysql_real_escape_string($image) . "', '$position_image')";    
    $db->query($query); 
    //$position_image=$position_image+1;
    }    
    }
    $files = array();
    //$diff = count($_FILES['image']) - count($_FILES['image'], COUNT_RECURSIVE);
    if ($diff != 0) {
		foreach($_FILES['image'] as $k => $l) {
			foreach($l as $i => $v) {
				$files[$i][$k] = $v;
			}
		}		
	
    //$position_image='0';
    foreach ($files as $file) {
    $position_image=$position_image+1;
    $image_old = file_get_contents( $file['tmp_name'] );
    list($width, $height)=getimagesize($file['tmp_name']);
    $new_width=2000;
    $ratio=$new_width / $width;
    $new_height=$height*$ratio;
    $image_new = imagecreatetruecolor($new_width, $new_height);
    $image_itog = imagecreatefromstring($image_old);
    imagecopyresampled($image_new, $image_itog, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
    ob_start();
    imagejpeg($image_new, null, 75);
    $content = ob_get_clean();
    $image = mysql_escape_string( $content );
    $query="insert into documentimage (idcategories, idimage, image, position) value ('$idcategor', '$position', '$image', $position_image)";    
    $db->query($query); 
    }
    }
    
    }
}
}

function deletefrom($db, $id) {
    if (!empty($_POST['nodele'])){
    //$image_="OK";    
    //$image_=substr($_POST['nodele'], 0, 100);
    $image_=$_POST['nodele'];
    //$imagewq=mysql_escape_string($image_);
    //header('Content-type:image/*');
    //$imagemy=urldecode($image_);
    $image_=base64_decode($image_);
    //$image="123";
    }
    
    //$content=file_get_contents($image_);
    //file_put_contens('img.jpg', base64_decode($image_));
    //$image_=$_POST['nodele'];
       
    //$arr=array();
    //$arr=$_POST['nodele'];   
    //foreach ($arr as $value) {
    //$idimage=$value; 
    //$idimage=substr($value, 0, 1); 
    //$idimage=$idimage.", ".(string)substr($value, 0, strpos($value, "_"));
    
    //$diff = ($_POST['nodele'][1]);
    //$idimage=$idimage+","+substr($value, 0, strpos($value, "_")-1); 
   //(string)(substr($value, 0, strpos($value, "_"))+',vfvf');
    //$query="insert into document (id, text) value ('29', '$imagencode')";
    //$query="insert into document (id, text, image) value ('31', '$image_', _binary'".addcslashes($image, "\x00\'\"\r\n")."')";   
    $query="insert into documentimage (idcategories, idimage, image, position) value ('26', '9', '" . mysql_real_escape_string($image_) . "', '1')";    
    $db->query($query);
    
}
// Получение id добавленного нода
//function getidNode($db) {
//    $query = "
//        SELECT
//           max(id) as id
//        FROM
//           categories";
//    $data = $db->query($query);
//    while ($row = $data->fetch_assoc()) {
//    $id = $row['id'];  
//    }
//    return $id; 
//}
// Получение фото страны
function get_imagecountry($db, $idcategories) {
    $query = "
        SELECT
           IF (image is null, 0, 1) as image
        FROM
           categories where id='$idcategories'";
    $data = $db->query($query);
    while ($row = $data->fetch_assoc()) {
    $id = $row['image']; 
    }
    //if (strnatcmp($id, 'NULL')){$id='1';}
    //else {$id='0';}  
    return $id; 
}
// Переменовываем узел в дереве в БД
function renameNode($db, $id, $textnode) {   
    $query = "update categories set category='$textnode' where id='$id'"; 
    $db->query($query);
}
//Удаляем узел в дереве в БД
function deleteNode($db, $id) {
    $query = "delete from categories where id='$id'";
    //$query = "update categories set number = number + 1 where parent_id = $parentId and number >= $position";
    $db->query($query);
    //$query = "update categories set parent_id = $parentId, number = $position where id = $categoryId";
    //$db->query($query);
}
// Исключение категории по ее родителю и позиции number
function excludePosition($db, $parentId, $position) {
    $query = "update categories set number = number - 1 where parent_id = $parentId and number > $position";
    $db->query($query);
}

// Перемещение категории
function moveCategory($db, $params) {
    $categoryId = (int)$params['id'];
    $oldParentId = (int)$params['old_parent'];
    $newParentId = (int)$params['new_parent'];
    $oldPosition = (int)$params['old_position'] + 1;
    $newPosition = (int)$params['new_position'] + 1;

    excludePosition($db, $oldParentId, $oldPosition);
    includePosition($db, $categoryId, $newParentId, $newPosition);

    return json_encode(array(
        'code' => 'success'
    ));
}



try {
    // Подключаемся к базе данных
    $conn = connectDB();
    
    // Получаем данные из массива GET    
    $action = $_GET['action'];
    
    switch ($action) {
        // Получаем дерево категорий
        case 'get_categories':
            $result = getCategories($conn);
            header('Content-type:text/html');
            echo json_encode(array(
        'code' => 'success',
        'result' => $result
    ));
            break;
        
        
        // Получаем комментарии
        case 'get_comment':
            $result = getComment($conn);
            header('Content-type:text/html');
            echo json_encode(array(
        'code' => 'success',
        'result' => $result
    ));
            break;


        // Получаем последние данные о документах
        case 'get_lastdocument':
            $result = getLastDocument($conn);
            header('Content-type:text/html');
            echo json_encode(array(
        'code' => 'success',
        'result' => $result
    ));
            break;            
        
        // Добавляем комментарий
        case 'set_comment':
            $FIO=$_GET['FIO'];
            $text=$_GET['text'];
            $data=$_GET['data'];
            setComment($conn, $FIO, $text, $data);
            header('Content-type:text/html');
            echo json_encode(array(
        'code' => 'success'
    ));
            break;

            // Добавляем статистику
        case 'get_statistic':
            $id=$_GET['id'];
            $category=$_GET['category'];           
            getStatistic($conn, $id, $category);
            header('Content-type:text/html');
            echo json_encode(array(
        'code' => 'success'
    ));
            break;

        //Получаем теги
        case 'load_teg':
            $result = loadTegi($conn);
            header('Content-type:text/html');
            echo json_encode(array(
        'code' => 'success',
        'result' => $result
    ));
            break;

        //Получаем указания
        case 'get_instruction':
            $where=$_GET['where'];
            $result = getInstructions($conn, $where);
            header('Content-type:text/html');
            echo json_encode(array(
        'code' => 'success',
        'result' => $result
    ));
            break;


        // Добавляем узел к дереву
        case 'create_node':
            $idparent=$_GET['idparent'];
            $id=$_GET['id'];
            $textnode=$_GET['textnode'];
            setNode($conn, $idparent, $textnode, $id);
            header('Content-type:text/html');
            echo json_encode(array(
        'code' => 'success'
    ));
            break;
        // Добавляем картинку с формы
        case 'add_image':
            addimage($conn);
            header('Content-type:text/html');
            echo json_encode(array(
        'code' => 'success'
    ));
            break;
        
            case 'deletefrom':
            $id=$_GET['id'];
            deletefrom($conn, $id);
            header('Content-type:text/html');
            echo json_encode(array(
        'code' => 'success'
    ));
            
            break;
        // Переменовываем узел в дереве
        case 'rename_node':
            $id=$_GET['id'];
            $textnode=$_GET['textnode'];
            renameNode($conn, $id, $textnode);
            header('Content-type:text/html');
            echo json_encode(array(
        'code' => 'success'
    ));
            break;
        
        // Удаляем узел в дереве
        case 'delete_node':
            $id=$_GET['id'];
            deleteNode($conn, $id);
            header('Content-type:text/html');
            echo json_encode(array(
        'code' => 'success'
    ));
            break;
        
        // Получаем id добавленного нода
        //case 'get_idnode':
        //    $result=getidNode($conn);
        //    header('Content-type:text/html');
        //    echo json_encode(array(
        //'code' => 'success',
        //'result' => $result
    //));    
        //    break;

    // Получаем наличии фото в узле
        case 'get_imagecountry':
            $id=$_GET['id'];
            $result=get_imagecountry($conn, $id);
            //if ($result=="NULL")
            header('Content-type:image/*');
            echo $result;        
            break;    
        
        // выгружаем текст
        case 'load_text':
            $id=$_GET['id'];
            $result = loadtext($conn, $id);
            header('Content-type:text/html');
            echo json_encode(array(
        'code' => 'success',
        'result' => $result
    ));
            break;
        
        // выгружаем pdf
        case 'load_pdf':
            $id=$_GET['id'];
            $idpdf=$_GET['idpdf'];
            $position=$_GET['position'];
            $result = loadpdf($conn, $id, $idpdf, $position);
            header('Content-type:application/pdf');
            echo $result;
            break;

        // выгружаем фото
        case 'load_image':
            $id=$_GET['id'];
            $idimage=$_GET['idimage'];
            $position=$_GET['position'];
            $result = loadimage($conn, $id, $idimage, $position);
            header('Content-type:image/*');
            echo $result;
            break;
        
        //загрузка изображений икон
        case 'load_countryimage':
            $id=$_GET['id'];
            $result = loadcountryimage($conn, $id);
            if ($result=="NULL")
            //header('Content-type:text/html');
            header('Content-type:image/*');
            echo $result;
            break;
        
        // Действие по умолчанию, ничего не делаем
        default:
            $result = 'unknown action';
            break;
    }

    // Возвращаем клиенту успешный ответ
   
}
catch (Exception $e) {
    // Возвращаем клиенту ответ с ошибкой
    echo json_encode(array(
        'code' => 'error',
        'message' => $e->getMessage()
    ));
}
