<?php

    header('Content-Type: application/json');
    require_once('../enviroment.php');
    require_once('../config/conexion.php');
    require_once('../models/Directorio.php');
    require_once('../models/Links.php');

    $body = json_decode(file_get_contents('php://input'), true);

    Conectar::initialize();
    $prueba = new Directorio();
    $links = new Links();

    
    switch($_GET['op']){
       
        case 'getDirectorioLinks':
            $data = $prueba->getDirectorioLinks();
            echo json_encode($data);
            break;

        case 'getDirectorioLink':
            $data = $prueba->getDirectioLink($body['id']);
            if(count($data)>0){
                echo json_encode($data);
            }else{
                echo json_encode(array('resp'=>'false'));
            }
            break;
        
        case 'postDirectorioLinks':
            $res = $prueba->insertDirectorio($body['name'], $body['desc'], $body['icon']);
            forEach($body['links'] as $link){
                $links->insertLinks($link['name'], 
                                $link['link'], 
                                $link['requerimients'],
                                $res[0]['last_insert_rowid()']);
            }
            echo json_encode(array('resp'=>'ok'));
            break;
        
        case 'putDirectorioLinks':
            // todo editar el directorio y el link
            $icon = '';
            if($body['icon'] == ""){
                $data = $prueba->getIconDirectorio($body['id']);
                $icon = $data[0]['icon'];
            }else{
                $icon = $body['icon'];
            }

            $prueba->putDirectorio($body['name'], $body['desc'], $icon, $body['id']);
            foreach($body['links'] as $link){
                $links->putLinks($link['name'],
                                $link['link'],
                                $link['requerimients'],
                                $link['id']);
            }
            echo json_encode(array('resp'=>'ok'));

            break;

        case 'deleteDirectorioLinks':
            $icon = $prueba->deleteFile($body['id']);
            $links->deleteLinks($body['id']);
            $prueba->deleteDirectorio($body['id']);
            
            echo json_encode(array('resp'=>'ok'));
            break;

        case 'postFile':
            $img =  $_FILES['icon'];
            $extencion = pathinfo($img['name'], PATHINFO_EXTENSION);
            $file = basename($img['tmp_name']).".".$extencion;
            $direccion = $FILE_PATH_ROOT."/public/img/".$file;
            if(!file_exists($direccion)){
                if(move_uploaded_file( $img['tmp_name'], $direccion)){
                    echo json_encode(array('resp'=>'ok', 'icon'=>$file));
                }else{
                    echo json_encode(array('resp'=>'error create img'));
                }
            }else{
                echo json_encode(array('resp'=>'error exist img'));
            }
            break;

        case 'postLinks':
            forEach($body['links'] as $link){
                $links->insertLinks($link['name'], 
                                $link['link'], 
                                $link['requerimients'],
                                $link['id']);
            }
            echo json_encode(array('resp'=>'ok'));
            break;
        
        case 'getLinksId':
            $data = Links::getLinksId($body['id']);
            echo json_encode($data);
            break;

        case 'deleteLink':
            $links->deleteLink($body['id']);
            echo json_encode(array('resp'=>'ok'));
            break;
    }
?>