<?php
    require_once('../config/conexion.php');
    
    class Links{
        function __construct(){
            Conectar::gcSchemaLinks();
        }

        public function getLinks(){
            $conexion = Conectar::getInstance();
            $sql = 'SELECT * FROM Links WHERE estado = 1';
            $sql = $conexion->prepare($sql);
            $sql->execute();
            return $res = $sql->fetchAll(PDO::FETCH_ASSOC); 
        }

        public static function getLinksId( $id ){
            $conexion = Conectar::getInstance();
            $sql = 'SELECT * FROM links WHERE id_directorio=? AND estado = 1';
            $sql = $conexion->prepare($sql);
            $sql->bindValue(1, $id);
            $sql->execute();
            return $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        public function insertLinks($name, $link, $requerimients, $idDirectorio){
            $conexion = Conectar::getInstance();
            $sql = 'INSERT INTO links (name, link, requerimients, id_directorio) VALUES (?,?,?,?)';
            $sql = $conexion->prepare($sql);
            $sql->bindValue(1, $name);
            $sql->bindValue(2, $link);
            $sql->bindValue(3, $requerimients);
            $sql->bindValue(4, $idDirectorio);
            $sql->execute();
        }

        public function putLinks($name, $link, $requerimients, $idDirectorio){
            $conexion = Conectar::getInstance();
            $sql = 'UPDATE links SET name=?, link=?, requerimients=? WHERE id = ? AND estado = 1';
            $sql = $conexion->prepare($sql);
            $sql->bindValue(1, $name);
            $sql->bindValue(2, $link);
            $sql->bindValue(3, $requerimients);
            $sql->bindValue(4, $idDirectorio);
            $sql->execute();
        }

        public function deleteLink($id){
            $conexion = Conectar::getInstance();
            $sql = 'UPDATE links SET estado = 0 WHERE id = ?';
            $sql = $conexion->prepare($sql);
            $sql->bindValue(1, $id);
            $sql->execute();
        }

        public function deleteLinks($id){
            $conexion = Conectar::getInstance();
            $sql = 'UPDATE links SET estado = 0 WHERE id_directorio = ?';
            $sql = $conexion->prepare($sql);
            $sql->bindValue(1, $id);
            $sql->execute();
        }
    }

?>