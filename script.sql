-- *** CREA LA BASE DE DATOS ***
CREATE DATABASE IF NOT EXISTS bd_tse;

-- *** CREACION DE LAS TABLAS TEMPORALES ***
-- CREA LA TABLA TEMPORAL DE DEPARTAMENTO
CREATE TEMPORARY TABLE bd_tse.temp_departamento (
    id INT,
    nombre VARCHAR(15)
);

-- CREA LA TABLA TEMPORAL DE CARGO
CREATE TEMPORARY TABLE bd_tse.temp_cargo (
    id INT,
    cargo VARCHAR(40)
);

-- CREA LA TABLA TEMPORAL DE CIUDADANO
CREATE TEMPORARY TABLE bd_tse.temp_ciudadano (
    dpi VARCHAR(13),
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    direccion VARCHAR(100),
    telefono VARCHAR(10),
    edad INT,
    genero VARCHAR(1)
);

-- CREA LA TABLA TEMPORAL DE PARTIDO
CREATE TEMPORARY TABLE bd_tse.temp_partido (
    id INT,
    nombre_partido VARCHAR(50),
    siglas VARCHAR(20),
    fundacion DATE
);

-- CREA LA TABLA TEMPORAL DEL CANDIDATO
CREATE TEMPORARY TABLE bd_tse.temp_candidato (
    id INT,
    nombres VARCHAR(75),
    fecha_nacimiento DATE,
    partido_id INT,
    cargo_id INT
);

-- CREA LA TABLA TEMPORAL DE MESA
CREATE TEMPORARY TABLE bd_tse.temp_mesa (
    id_mesa INT,
    id_departamento INT
);

-- CREA LA TABLA TEMPORAL DE VOTACIONES
CREATE TEMPORARY TABLE bd_tse.temp_votacion (
    id_voto INT,
    id_candidato INT,
    dpi_ciudadano VARCHAR(13),
    mesa_id INT,
    fecha_hora DATETIME
);

-- ******* MODELO DE DATOS *******
-- CREA LA TABLA DE DEPARTAMENTO
CREATE TABLE IF NOT EXISTS bd_tse.DEPARTAMENTO (
    id INT NOT NULL,
    nombre VARCHAR(15) NOT NULL,
    PRIMARY KEY (id)
);

-- CREA LA TABLA DE CARGO
CREATE TABLE IF NOT EXISTS bd_tse.CARGO (
    id INT NOT NULL,
    cargo VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);

-- CREA LA TABLA DE CIUDADANO
CREATE TABLE IF NOT EXISTS bd_tse.CIUDADANO (
    dpi VARCHAR(13) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    edad INT NOT NULL,
    genero VARCHAR(1) NOT NULL,
    PRIMARY KEY(dpi)
);

-- CREA LA TABLA DE PARTIDO
CREATE TABLE IF NOT EXISTS bd_tse.PARTIDO (
    id INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    siglas VARCHAR(20) NOT NULL,
    fundacion DATE NOT NULL,
    PRIMARY KEY (id)
);

-- CREA LA TABLA DE MESA
CREATE TABLE IF NOT EXISTS bd_tse.MESA (
    id INT NOT NULL,
    id_departamento INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_departamento) REFERENCES bd_tse.DEPARTAMENTO(id)
);

-- CREA LA TABLA DE CANDIDATO
CREATE TABLE IF NOT EXISTS bd_tse.CANDIDATO (
    id INT NOT NULL,
    nombres VARCHAR(75) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    id_partido INT NOT NULL,
    id_cargo INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_partido) REFERENCES bd_tse.PARTIDO(id),
    FOREIGN KEY (id_cargo) REFERENCES bd_tse.CARGO(id)
);

-- CREA LA TABLA DE VOTO
CREATE TABLE IF NOT EXISTS bd_tse.VOTO (
    id INT NOT NULL AUTO_INCREMENT,
    voto_ejercido_id INT NOT NULL,
    dpi_ciudadano VARCHAR(13) NOT NULL,
    id_mesa INT NOT NULL,
    fecha_hora DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (dpi_ciudadano) REFERENCES bd_tse.CIUDADANO(dpi),
    FOREIGN KEY (id_mesa) REFERENCES bd_tse.MESA(id)
);

-- CREA LA TABLA VOTO_CANDIDATO
CREATE TABLE IF NOT EXISTS bd_tse.VOTO_CANDIDATO (
    id INT NOT NULL AUTO_INCREMENT,
    id_candidato INT NOT NULL,
    id_voto INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_candidato) REFERENCES bd_tse.CANDIDATO(id),
    FOREIGN KEY (id_voto) REFERENCES bd_tse.VOTO(id_voto)
);

-- ******* CARGA DE DATOS *******
-- CARGA DE DATOS DEPARTAMENTO
INSERT INTO bd_tse.DEPARTAMENTO (id, nombre) SELECT id, nombre FROM temp_departamento;

-- CARGA DE DATOS CARGO
INSERT INTO bd_tse.CARGO (id, cargo) SELECT id, cargo FROM temp_cargo;

-- CARGA DE DATOS CIUDADANO
INSERT INTO bd_tse.CIUDADANO (dpi, nombre, apellido, direccion, telefono, edad, genero) SELECT dpi, nombre, apellido, direccion, telefono, edad, genero FROM temp_ciudadano;

-- CARGA DE DATOS PARTIDO
INSERT INTO bd_tse.PARTIDO (id, nombre, siglas, fundacion) SELECT id, nombre_partido, siglas, fundacion FROM temp_partido;

-- CARGA DE DATOS MESA
INSERT INTO bd_tse.MESA (id, id_departamento) SELECT id_mesa, id_departamento FROM temp_mesa;

-- CARGA DE DATOS CANDIDATO
INSERT INTO bd_tse.CANDIDATO (id, nombres, fecha_nacimiento, id_partido, id_cargo) SELECT id, nombres, fecha_nacimiento, partido_id, cargo_id FROM temp_candidato;

-- CARGA DE DATOS VOTO
INSERT INTO bd_tse.VOTO (voto_ejercido_id, dpi_ciudadano, id_mesa, fecha_hora) SELECT id_voto, dpi_ciudadano, mesa_id, fecha_hora FROM temp_votacion;

-- CARGA DE DATOS VOTO_CANDIDATO
INSERT INTO bd_tse.VOTO_CANDIDATO (id_candidato, id_voto) SELECT id_candidato, id_voto FROM temp_votacion;


-- ******* ELIMINAR TABLAS TEMPORALES *******
DROP TEMPORARY TABLE bd_tse.temp_candidato, temp_departamento, temp_cargo, temp_ciudadano, temp_mesa, temp_partido, temp_votacion;

-- ******* ELIMINAR MODELO *********
DROP TABLE bd_tse.candidato, departamento, cargo, ciudadano, mesa, partido, voto, voto_candidato;

-- ***** CONSULTAS *****
-- CONSULTA 1
/*
    Obtiene todos los nombres de los presidenciables, viceprecidenciables y del partido al cual pertenecen.
*/
SELECT
    presidente.nombres AS 'nombre presidente',
    vicepresidente.nombres AS 'nombre vicepresidente',
    partido_presidente.nombre AS 'partido'
FROM
    bd_tse.CANDIDATO presidente
JOIN
    bd_tse.PARTIDO partido_presidente ON partido_presidente.id = presidente.id_partido
JOIN
    bd_tse.CARGO cargo_presidente ON cargo_presidente.id = presidente.id_cargo AND cargo_presidente.id = 1
JOIN
    bd_tse.CANDIDATO vicepresidente ON vicepresidente.id_cargo = 2
JOIN
    bd_tse.PARTIDO partido_vicepresidente ON partido_vicepresidente.id = vicepresidente.id_partido
WHERE
    partido_presidente.id = partido_vicepresidente.id;

-- CONSULTA 2
/*
    Obtiene la cantidad total de diputados por cada partido
*/
SELECT
    partido.nombre AS 'partido',
    COUNT(*) AS 'Cantidad de diputados'
FROM
    bd_tse.candidato candidato
JOIN
    bd_tse.partido partido ON partido.id = candidato.id_partido
JOIN
    bd_tse.cargo cargo ON cargo.id = candidato.id_cargo
WHERE
    cargo.id = 3 OR cargo.id = 4 OR cargo.id = 5
GROUP BY
    partido.nombre;

-- CONSULTA 3
/*
    Obtiene el nombre de los candidatos a alcalde por partido
*/
SELECT
    partido.nombre AS 'partido',
    candidato.nombres AS 'candidato'
FROM
    bd_tse.candidato candidato
JOIN
    bd_tse.cargo cargo ON cargo.id = candidato.id_cargo
JOIN
    bd_tse.partido partido on candidato.id_partido = partido.id
WHERE
    partido.id = candidato.id_partido AND cargo.id = 6;

-- CONSULTA 4
/*
    Obtiene la cantidad de candidatos por partido
*/
SELECT
    partido.nombre AS 'partido',
    COUNT(*) AS 'cantidad de candidatos'
FROM
    bd_tse.candidato candidato
JOIN
    bd_tse.partido partido on candidato.id_partido = partido.id
WHERE
    partido.id = candidato.id_partido
GROUP BY
    partido.nombre;

-- CONSULTA 5
/*
    Obtiene la cantidad de votos por cada departamento
*/
SELECT
    departamento.nombre AS 'departamento',
    COUNT(DISTINCT voto.dpi_ciudadano) AS 'Cantidad de Votos'
FROM
    bd_tse.voto voto
JOIN
    bd_tse.mesa mesa ON mesa.id = voto.id_mesa
JOIN
    bd_tse.departamento departamento ON departamento.id = mesa.id_departamento
GROUP BY
    departamento.nombre;

-- CONSULTA 6
/*
    Obtiene la cantidad de votos nulos
*/
SELECT
    COUNT(*) AS 'Cantidad de votos nulos'
FROM
    bd_tse.voto_candidato
WHERE
    id_candidato = -1;

-- CONSULTA 7
/*
    Obtiene el top 10 de edades que mas votaron
*/
SELECT
    ciudadano.edad AS 'Edad',
    COUNT(DISTINCT voto.dpi_ciudadano) AS 'Cantidad de votos'
FROM
    bd_tse.voto voto
JOIN
    bd_tse.ciudadano ciudadano ON ciudadano.dpi = voto.dpi_ciudadano
GROUP BY
    ciudadano.edad
ORDER BY 
    COUNT(DISTINCT voto.dpi_ciudadano) 
    DESC 
    LIMIT 10;

-- CONSULTA 8
/*
    Obtiene el top 10 de presidenciables y vicepresidenciales mas votados
*/
SELECT
    presidente.nombres AS 'Presidente',
    vicepresidente.nombres AS 'Vicepresidente',
    COUNT(*) AS 'Cantidad de votos'
FROM
    bd_tse.candidato presidente
JOIN
    bd_tse.cargo cargo ON presidente.id_cargo = cargo.id AND presidente.id_cargo = 1
JOIN
    bd_tse.candidato vicepresidente ON vicepresidente.id_cargo = 2
JOIN
    bd_tse.voto_candidato votoc ON votoc.id_candidato = presidente.id
WHERE
    presidente.id_partido = vicepresidente.id_partido
GROUP BY
    presidente.nombres, vicepresidente.nombres
ORDER BY
    COUNT(*)
    DESC
    LIMIT 10;

-- CONSULTA 9
/*
    Obtiene el top 5 de mesas más frecuentadas
*/
SELECT
    mesa.id AS 'No. mesa',
    departamento.nombre AS 'Departamento'
FROM
    bd_tse.voto voto
JOIN
    bd_tse.mesa mesa ON voto.id_mesa = mesa.id
JOIN
    bd_tse.departamento departamento ON departamento.id = mesa.id_departamento
GROUP BY
    mesa.id, departamento.nombre
ORDER BY
    COUNT(DISTINCT voto.dpi_ciudadano)
    DESC
    LIMIT 5;

-- CONSULTA 10
/*
    Obtiene el top 5 de horas mas frecuentadas
*/
SELECT
    DATE_FORMAT(voto.fecha_hora, '%H:%i') AS 'Hora',
    COUNT(DISTINCT voto.dpi_ciudadano) AS 'Cantidad'
FROM
    bd_tse.voto voto
GROUP BY
    DATE_FORMAT(voto.fecha_hora, '%H:%i')
ORDER BY
    COUNT(DISTINCT voto.dpi_ciudadano)
    DESC
    LIMIT 5;

-- CONSULTA 11
/*
    Obtiene la cantidad de votos por genero
*/
SELECT
    ciudadano.genero AS 'genero',
    COUNT(DISTINCT voto.dpi_ciudadano) AS 'Cantidad de votos'
FROM
    bd_tse.voto voto
JOIN
    bd_tse.ciudadano ciudadano ON voto.dpi_ciudadano = ciudadano.dpi
GROUP BY
    ciudadano.genero
;