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
