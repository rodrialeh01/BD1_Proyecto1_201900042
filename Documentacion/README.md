# Proyecto 1

```JSON
{
    "Universidad": "Universidad de San Carlos de Guatemala",
    "Facultad": "Facultad de Ingeniería",
    "Escuela": "Escuela de Ciencias y Sistemas",
    "Curso": "Sistema de Bases de Datos 1",
    "Sección": "A",
    "Periodo":"Segundo Semestre 2023"
}
```

| Carnet    | Nombre                            |
|-----------|-----------------------------------|
| 201900042 |Rodrigo Alejandro Hernández de León|

# Manual Técnico

## Índice
1. [Requerimientos](#Requerimientos)
    - [Tecnologías](#Tecnologías)
    - [Herramientas](#Herramientas)
2. [Modelos de bases de datos](##Modelos-de-bases-de-datos)
    - [Modelo Conceptual](#Modelo-Conceptual)
    - [Modelo Lógico](#Modelo-Lógico)
    - [Modelo Físico](#Modelo-Físico)
3. [Creación de la base de datos](#Creación-de-la-base-de-datos)
    - [Requisitos Previos](#Requisitos-Previos)
    - [Creación de la base de datos](#Creación-de-la-base-de-datos)
4. [Endpoints a la API](#Endpoints-a-la-API)

## Requerimientos

### Tecnologías
- nodejs: v18.17.0
- npm 9.6.7
- mysql 8.1.0

### Herramientas
- Visual Studio Code
- MySQL Workbench / DataGrip
- Postman

## Modelos de bases de datos

En la siguiente sección se mostrarán los modelos de bases de datos utilizados para el proyecto.

- ### Modelo Conceptual

Ante al creación del modelo conceptual se contempló lo siguiente:
- Entidades importantes:
    - #### Partido: 
        Entidad la cual se registran los partidos políticos que participan en las elecciones.
    - #### Candidato:
        Entidad la cual se registran los candidatos de los diferentes cargos que participan en las elecciones.
    - #### Cargo:
        Entidad la cual se registran los cargos que participan en las elecciones.
    - #### Voto:
        Entidad la cual se registran los votos que realizan los ciudadanos de los diferentes cargos.
    - #### Ciudadano:
        Entidad la cual se registran los ciudadanos que participan en las elecciones.
    - #### Mesa:
        Entidad la cual se registran las mesas que participan en las elecciones.
    - #### Departamento:
        Entidad la cual se registran los departamentos que participan en las elecciones.
    - #### Voto_Candidato:
        Entidad la cual se registran los votos que realizan los ciudadanos a los diferentes candidatos y se crea esta entidad ya que se repiten los ID de los votos de cada ciudadano.

- Relaciones importantes:

    - #### Candidato - Partido:
        Relación la cual se registra los candidatos que pertenecen a un partido.
    - #### Candidato - Cargo:
        Relación la cual se registra los candidatos que pertenecen a un cargo.
    - #### Voto - Ciudadano:
        Relación la cual se registra los votos que realizan los ciudadanos.
    - #### Voto - Mesa:
        Relación la cual se registra los votos que realizan los ciudadanos en una mesa.
    - #### Mesa - Departamento:
        Relación la cual se registra las mesas que se ubican en los diferentes departamentos.
    - #### Candidato - Voto_Candidato:
        Relación la cual se registra los votos para cada candidato.
    - #### Voto - Voto_Candidato:
        Relación la cual se registra los votos que realizan los ciudadanos a los diferentes candidatos.

![Modelo Conceptual](./../Modelos/Imagenes/Modelo_Conceptual.png)

- ### Modelo Lógico

En la creación del modelo lógico se contempló lo siguiente:

- Entidad Partido:
    - `id_partido`: Identificador del partido.
    - `nombre_partido`: Nombre del partido.
    - `siglas`: Siglas del partido.
    - `fundacion`: Fecha de fundación del partido.

- Entidad Cargo:
    - `id_cargo`: Identificador del cargo.
    - `nombre_cargo`: Nombre del cargo.

- Entidad Candidato:
    - `id_candidato`: Identificador del candidato.
    - `nombres`: Nombre completo del candidato.
    - `fecha_nacimiento`: Fecha de nacimiento del candidato.
    - `id_partido`: Identificador del partido al que pertenece el candidato.
    - `id_cargo`: Identificador del cargo al que pertenece el candidato.

- Entidad Departamento:
    - `id_departamento`: Identificador del departamento.
    - `nombre`: Nombre del departamento.

- Entidad Mesa:
    - `id_mesa`: Identificador de la mesa.
    - `nombre`: Nombre de la mesa.
    - `id_departamento`: Identificador del departamento al que pertenece la mesa.

- Entidad Ciudadano:
    - `dpi`: Identificador del ciudadano.
    - `nombre`: Nombre completo del ciudadano.
    - `apellido`: Apellido completo del ciudadano.
    - `direccion`: Dirección del ciudadano.
    - `telefono`: Teléfono del ciudadano.
    - `edad`: Edad del ciudadano.
    - `genero`: Género del ciudadano.

- Entidad voto:
    - `id`: Identificador del voto.
    - `voto_ejercido_id`: Identificador del voto por cada ciudadano.
    - `fecha_hora`: Fecha y hora en la que se realizó el voto.
    - `id_mesa`: Identificador de la mesa en la que se realizó el voto.
    - `dpi`: Identificador del ciudadano que realizó el voto.

- Entidad voto_candidato:
    - `id`: Identificador del voto.
    - `id_candidato`: Identificador del candidato al que se le realizó el voto.
    - `id_voto`: Identificador del voto.

Donde:

- `#` Es la llave primaria
- `*` Son los atributos obligatorios

![Modelo Lógico](./../Modelos/Imagenes/Modelo_Logico.png)

- ### Modelo Físico

Este es el modelo ER que se utilizó para la creación de la base de datos.Donde:

- #### Departamento
|Atributo|Tipo|PRIMARY KEY|FOREIGN KEY|
|--------|----|-----------|-----------|
|`id_departamento`|`INT`|✅|  |
|`nombre`|`VARCHAR(15)`|  |  |

- #### Mesa
|Atributo|Tipo|PRIMARY KEY|FOREIGN KEY|
|--------|----|-----------|-----------|
|`id_mesa`|`INT`|✅|  |
|`id_departamento`|`INT`|  |✅|	

- #### Partido
|Atributo|Tipo|PRIMARY KEY|FOREIGN KEY|
|--------|----|-----------|-----------|
|`id_partido`|`INT`|✅|  |
|`nombre_partido`|`VARCHAR(50)`|  |  |
|`siglas`|`VARCHAR(10)`|  |  |
|`fundacion`|`DATE`|  |  |

- #### Cargo
|Atributo|Tipo|PRIMARY KEY|FOREIGN KEY|
|--------|----|-----------|-----------|
|`id_cargo`|`INT`|✅|  |
|`cargo`|`VARCHAR(40)`|  |  |

- #### Candidato
|Atributo|Tipo|PRIMARY KEY|FOREIGN KEY|
|--------|----|-----------|-----------|
|`id_candidato`|`INT`|✅|  |
|`nombres`|`VARCHAR(75)`|  |  |
|`fecha_nacimiento`|`DATE`|  |  |
|`id_partido`|`INT`|  |✅|
|`id_cargo`|`INT`|  |✅|

- #### Ciudadano
|Atributo|Tipo|PRIMARY KEY|FOREIGN KEY|
|--------|----|-----------|-----------|
|`dpi`|`VARCHAR(13)`|✅|  |
|`nombre`|`VARCHAR(50)`|  |  |
|`apellido`|`VARCHAR(50)`|  |  |
|`direccion`|`VARCHAR(100)`|  |  |
|`telefono`|`VARCHAR(10)`|  |  |
|`edad`|`INT`|  |  |
|`genero`|`VARCHAR(1)`|  |  |

- #### Voto
|Atributo|Tipo|PRIMARY KEY|FOREIGN KEY|
|--------|----|-----------|-----------|
|`id`|`INT`|✅|  |
|`voto_ejercido_id`|`INT`|  |  |
|`fecha_hora`|`DATETIME`|  |  |
|`id_mesa`|`INT`|  |✅|
|`dpi`|`VARCHAR(13)`|  |✅|

- #### Voto_Candidato
|Atributo|Tipo|PRIMARY KEY|FOREIGN KEY|
|--------|----|-----------|-----------|
|`id`|`INT`|✅|  |
|`id_candidato`|`INT`|  |✅|
|`id_voto`|`INT`|  |✅|

![Modelo Físico](./../Modelos/Imagenes/Modelo_Fisico.png)

## Creación de la base de datos

Para la creación de la base de datos se realizo lo siguiente:

#### Requisitos Previos
Se necesita la siguiente estructura de csv para poder cargar los datos a la base de datos:

- Archivo [`departamento.csv`](../TSEdatasets/departamentos.csv) con la siguiente estructura:

```CSV
id,nombre
```

- Archivo [`cargo.csv`](../TSEdatasets/cargos.csv) con la siguiente estructura:

```CSV
id,cargo
```

- Archivo [`ciudadano.csv`](../TSEdatasets/ciudadanos.csv) con la siguiente estructura:

```CSV
DPI,Nombre,Apellido,Direccion,Telefono,Edad,Genero
```

- Archivo [`partido.csv`](../TSEdatasets/partidos.csv) con la siguiente estructura:

```CSV
id_partido,nombrePartido,Siglas,Fundacion
```

- Archivo [`candidato.csv`](../TSEdatasets/candidatos.csv) con la siguiente estructura:

```CSV
id,nombres,fecha_nacimiento,partido_id,cargo_id
```

- Archivo [`mesa.csv`](../TSEdatasets/mesas.csv) con la siguiente estructura:

```CSV
id_mesa,id_departamento
```

- Archivo [`votacion.csv`](../TSEdatasets/votaciones.csv) con la siguiente estructura:

```CSV
id_voto,id_candidato,dpi_ciudadano,mesa_id,fecha_hora
```
#### Creación de la base de datos

1. Se uso el siguiente script para crear la base de datos:

```SQL
CREATE DATABASE IF NOT EXISTS bd_tse;
```

2. Se uso el siguiente script para crear las tablas del modelo:

```SQL
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
```

3. Se uso el siguiente script para crear las tablas temporales para la carga de datos:

```SQL
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
```

4. Se uso el siguiente script para cargar los datos de las tablas temporales a las tablas del modelo:

```SQL
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
```

## Endpoints a la API

Para poder hacer pruebas de las consultas a la base de datos, puede utilizarla ruta`http://localhost:3000` con los siguientes endpoints:

|Endpoint| Tipo | Descripción |
|--------|------|-------------|
|`/`|`GET`|Retorna un mensaje de bienvenida|
|`/cargarmodelo`|`GET`| Crea las tablas del modelo de la base de datos|
|`/cargartabtemp`|`GET`| Crea las tablas temporales de la base de datos, posteriormente carga los datos de las tablas temporales a las tablas del modelo y por último se eliminan las tablas temporales |
|`/eliminarmodelo`|`DELETE`| Elimina las tablas del modelo de la base de datos|
|`/consulta1`|`GET`|Muestra el nombre de los candidatos a presidentes y vicepresidentes por partido.|
|`/consulta2`|`GET`|Muestra el número de candidatos a diputados por cada partido.|
|`/consulta3`|`GET`|Muestra el nombre de los candidatos a alcalde por partido|
|`/consulta4`|`GET`|Muestra la cantidad de candidatos por partido|
|`/consulta5`|`GET`|Muestra la cantidad de votos por departamentos|
|`/consulta6`|`GET`|Muestra la cantidad de votos nulos|
|`/consulta7`|`GET`|Muestra el top 10 de edad de ciudadanos que realizaron su voto.|
|`/consulta8`|`GET`|Muestra el top 10 de candidatos más votados para presidente y vicepresidente|
|`/consulta9`|`GET`|Muestra el top 5 de mesas más frecuentadas|
|`/consulta10`|`GET`|Muestra el top 5 la hora más concurrida en que los ciudadanos fueron a votar.|
|`/consulta11`|`GET`|Muestra la cantidad de votos por genero donde `F` es Femenino y `M` es Masculino|