export const script_create_temptables = `
-- CREA LA TABLA TEMPORAL DE DEPARTAMENTO
CREATE TEMPORARY TABLE temp_departamento (
    id INT,
    nombre VARCHAR(15)
);

-- CREA LA TABLA TEMPORAL DE CARGO
CREATE TEMPORARY TABLE temp_cargo (
    id INT,
    cargo VARCHAR(40)
);

-- CREA LA TABLA TEMPORAL DE CIUDADANO
CREATE TEMPORARY TABLE temp_ciudadano (
    dpi VARCHAR(13),
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    direccion VARCHAR(100),
    telefono VARCHAR(10),
    edad INT,
    genero VARCHAR(1)
);

-- CREA LA TABLA TEMPORAL DE PARTIDO
CREATE TEMPORARY TABLE temp_partido (
    id INT,
    nombre_partido VARCHAR(50),
    siglas VARCHAR(20),
    fundacion DATE
);

-- CREA LA TABLA TEMPORAL DEL CANDIDATO
CREATE TEMPORARY TABLE temp_candidato (
    id INT,
    nombres VARCHAR(75),
    fecha_nacimiento DATE,
    partido_id INT,
    cargo_id INT
);

-- CREA LA TABLA TEMPORAL DE MESA
CREATE TEMPORARY TABLE temp_mesa (
    id_mesa INT,
    id_departamento INT
);

-- CREA LA TABLA TEMPORAL DE VOTACIONES
CREATE TEMPORARY TABLE temp_votacion (
    id_voto INT,
    id_candidato INT,
    dpi_ciudadano VARCHAR(13),
    mesa_id INT,
    fecha_hora DATETIME
);
`;

export const script_create_modeltables = `
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
    FOREIGN KEY (id_voto) REFERENCES bd_tse.VOTO(id)
);
`;