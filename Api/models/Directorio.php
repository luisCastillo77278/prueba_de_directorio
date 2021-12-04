<?php 

    require_once('../config/conexion.php');

    class Directorio{
        
        function __construct(){
            Conectar::gSchemaDirectorio();
        }

        public function getDirectorios(){
            $conexion = Conectar::getInstance();
            //* si el directorio esta en estado = 1
            $sql = 'SELECT * FROM directorio WHERE estado = 1';
            $sql = $conexion->prepare($sql);
            $sql->execute();
            return $res = $sql->fetchAll(PDO::FETCH_ASSOC);        
        }

        public function getDirectiorio($id){
            $conexion = Conectar::getInstance();
            $sql = 'SELECT * FROM directorio WHERE id = ? AND estado = 1';
            $sql = $conexion->prepare($sql);
            $sql->bindValue(1, $id);
            $sql->execute();
            return $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        public function getDirectorioLinks(){
            
            $res = $this->getDirectorios();
            $arrayDirectory = array();
            foreach($res as $row){        
                $res_link = Links::getLinksId($row['id']);
                $arrayLink = array();
                foreach($res_link as $l){
                    $arrayLink[] = array( 
                        'id'=>$l['id'],
                        'name'=>$l['name'], 
                        'link'=>$l['link'], 
                        'estado'=>$l['estado'],
                        'id_directorio'=>$l['id_directorio'],
                        'requerimients'=>$l['requerimients'] );
                }
                $arrayDirectory[] = array( 
                    'id'=>$row['id'],
                    'estado'=>$row['estado'],
                    'name'=>$row['name'], 
                    'desc'=>$row['desc'], 
                    'icon'=>$row['icon'], 
                    'links'=>$arrayLink);
            }
            return $arrayDirectory;
        }

        public function getDirectioLink($id){
            $res = $this->getDirectiorio($id);
            $arrayDirectory = array();
            foreach($res as $row){        
                $res_link = Links::getLinksId($row['id']);
                $arrayLink = array();
                foreach($res_link as $l){
                    $arrayLink[] = array( 
                        'id'=>$l['id'],
                        'name'=>$l['name'], 
                        'link'=>$l['link'], 
                        'estado'=>$l['estado'],
                        'id_directorio'=>$l['id_directorio'],
                        'requerimients'=>$l['requerimients'] );
                }
                $arrayDirectory = array( 
                    'id'=>$row['id'],
                    'estado'=>$row['estado'],
                    'name'=>$row['name'], 
                    'desc'=>$row['desc'], 
                    'icon'=>$row['icon'], 
                    'links'=>$arrayLink);
            }
            
            return $arrayDirectory;
            
        }

        public function insertDirectorio($name, $desc, $icon){
            $conexion = Conectar::getInstance();
            $sql = 'INSERT INTO directorio (name, desc, icon) VALUES (?,?,?)';
            $sql = $conexion->prepare($sql);
            $sql->bindValue(1, $name);
            $sql->bindValue(2, $desc);
            $sql->bindValue(3, $icon);
            $sql->execute();
            $sql = 'SELECT last_insert_rowid()';
            $sql = $conexion->prepare($sql);
            $sql->execute();
            return $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        public function deleteDirectorio($id){
            $conexion = Conectar::getInstance();
            $sql = 'UPDATE directorio SET estado = 0 WHERE id = ?';
            $sql = $conexion->prepare($sql);
            $sql->bindValue(1, $id);
            $sql->execute();
        }

        public function deleteFile($id){
            $conexion = Conectar::getInstance();
            $sql = 'SELECT icon FROM directorio WHERE id = ?';
            $sql = $conexion->prepare($sql);
            $sql->bindValue(1,$id);
            $sql->execute();
            return $res = $sql->fetchAll(PDO::FETCH_ASSOC);
        }

        public function putDirectorio($name, $desc, $icon, $id){
            $conexion = Conectar::getInstance();
            $sql = 'UPDATE directorio SET name=?, desc=?, icon=? WHERE id = ? AND estado = 1';
            $sql = $conexion->prepare($sql);
            $sql->bindValue(1, $name);
            $sql->bindValue(2, $desc);
            $sql->bindValue(3, $icon);
            $sql->bindValue(4, $id);
            $sql->execute();
        }

        public function getIconDirectorio($id){
            $conexion = Conectar::getInstance();
            //* si el directorio esta en estado = 1
            $sql = 'SELECT icon FROM directorio WHERE id=? AND estado = 1';
            $sql = $conexion->prepare($sql);
            $sql->bindValue(1, $id);
            $sql->execute();
            return $res = $sql->fetchAll(PDO::FETCH_ASSOC); 
        }
    }
?>