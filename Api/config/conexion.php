<?php

    class Conectar{
        private static $db = null;

        public static function initialize() {
            if(empty(self::$db)) {
                try {
                    self::$db = new PDO('sqlite:database.sqlite');
                    self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    self::$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
                } catch (PDOException $e) {
                    die($e->getMessage());
                }
            }
        }

        public static function getInstance() {
            return self::$db;
        }

        public static function gSchemaDirectorio(){
            $sql = "CREATE TABLE IF NOT EXISTS directorio (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                desc TEXT NOT NULL,
                icon TEXT NOT NULL,
                estado INTEGER DEFAULT 1)";
            try{
                self::$db->exec($sql);
            }catch(Exception $err){
                die($e->getMessage());
            }
        }

        public static function gcSchemaLinks(){
            $sql = "CREATE TABLE IF NOT EXISTS links (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                estado INTEGER DEFAULT 1,
                name TEXT NOT NULL,
                link TEXT NOT NULL,
                requerimients TEXT NOT NULL,
                id_directorio INTEGER,
                FOREIGN KEY ( id_directorio ) REFERENCES directorio ( id ))";
            try{
                self::$db->exec($sql);
            }catch(Exception $err){
                die($e->getMessage());
            }
        }

    }
    
?>