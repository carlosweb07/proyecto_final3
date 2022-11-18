DROP DATABASE IF EXISTS epale1;
CREATE DATABASE IF NOT EXISTS epale1;

USE epale1;

DROP TABLE IF EXISTS registro1;
CREATE TABLE IF NOT EXISTS registro1( 

    -- Columnas
    id_usuario INT UNSIGNED AUTO_INCREMENT,
    nombre_usuario TEXT NOT NULL,
    correo_usuario VARCHAR(80) NOT NULL,
    pais_usuario TEXT NOT NULL,
    contraseña_usuario VARCHAR(100) NOT NULL,
    confirmar_clave VARCHAR(100) NOT NULL,
    token VARCHAR(500),
    nivel_acceso ENUM('invitado', 'usuario', 'administrador') DEFAULT 'invitado',
    cafe_usuario TEXT NOT NULL,
    pan_usuario TEXT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Llaves
    PRIMARY KEY(id_usuario),
    CONSTRAINT UNIQUE(correo_usuario)

);


DROP TABLE IF EXISTS logeo1;
CREATE TABLE logeo1(
	
    -- Columnas
    id_logeo INT UNSIGNED AUTO_INCREMENT,
	correo_logeo VARCHAR(50) NOT NULL,
    token VARCHAR(500),
	fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
	
    -- Llaves
    PRIMARY KEY(id_logeo)
);


DROP TABLE IF EXISTS paises1;
CREATE TABLE IF NOT EXISTS paises1(
    
    -- Columnas
    id_pais INT UNSIGNED NOT NULL,
    pais_usuario TEXT NOT NULL,

    -- Llaves
    FOREIGN KEY(id_pais) REFERENCES registro1(id_usuario)
);


DROP TABLE IF EXISTS pan1;
CREATE TABLE IF NOT EXISTS pan1(
    
    -- Columnas
    id_pan INT UNSIGNED NOT NULL,
    pan_usuario TEXT NOT NULL,

    -- Llaves
    FOREIGN KEY(id_pan) REFERENCES registro1(id_usuario)
);


DROP TABLE IF EXISTS cafe1;
CREATE TABLE IF NOT EXISTS cafe1(
    
    -- Columnas
    id_cafe INT UNSIGNED NOT NULL,
    cafe_usuario TEXT NOT NULL,

    -- Llaves
    FOREIGN KEY(id_cafe) REFERENCES registro1(id_usuario)
);
