import fs from 'fs';
import { parseCSVcomilla } from '../controllers/csv_comillas_parser.js';
import { db } from '../db.js';
import { script_create_modeltables, script_create_temptables } from '../scripts/scripts_bd.js';
const fdidr = '../TSEdatasets'

export const getInicio = (req, res) => {
    res.send({
        message: "Api levantada correctamente"
    })
}

export const cargarbtemp = async (req, res) => {

    //Elimina comentarios del script
    let script = script_create_temptables.replace(/--.*\n/g, '')
    let salida = []

    try{

        const connection = await db.getConnection();
        //A. Crea las tablas temporales
        //Ejecuta el script1 sin comentarios
        const sqlCommands1 = script.split(";").map(command => command.trim());

        for(let i = 0; i < sqlCommands1.length; i++){
            if(sqlCommands1[i].length === 0){
                continue;
            }
            console.log(sqlCommands1[i])
            await connection.query(sqlCommands1[i])
        }

        let respuesta = {
            consulta: "cargartabtemp",
            res: true,
            message: 'Tablas temporales creadas correctamente'
        }
        salida.push(respuesta)

        //B. Carga los datos de los archivos csv
        // 1. Candidatos
        const contenido1 = fs.readFileSync(fdidr + '/candidatos.csv', 'utf8')
        const filas1 = contenido1.split('\n');
        const candidatos = filas1.map(fila => fila.split(',')
        .map(columna => columna.trim()))
        .filter(columnas => columnas.length > 1);

        candidatos.shift()

        candidatos.forEach(async columnas => {
            columnas[0] = Number(columnas[0])
            columnas[3] = Number(columnas[3])
            columnas[4] = Number(columnas[4])
            const col_fecha = columnas[2].split('/')
            const fecha = col_fecha[2] + '-' + col_fecha[1] + '-' + col_fecha[0]
            columnas[2] = fecha
            const sql = `INSERT INTO temp_candidato (id, nombres, fecha_nacimiento, partido_id, cargo_id) VALUES (?,?,?,?,?)`
            await connection.query(sql, columnas)
        })


        // 2. Cargos
        const contenido2 = fs.readFileSync(fdidr + '/cargos.csv', 'utf8')
        const filas2 = contenido2.split('\n');
        const cargos = filas2.map(fila => fila.split(',')
                            .map(columna => columna.trim()))
                            .filter(columnas => columnas.length > 1);
        
        cargos.shift()

        cargos.forEach(async columnas => {
            const sql = `INSERT INTO temp_cargo (id, cargo) VALUES (?,?)`
            await connection.query(sql, columnas)
        })


        // 3. Ciudadanos
        const contenido3 = fs.readFileSync(fdidr + '/ciudadanos.csv', 'utf8')
        const filas3 = contenido3.split('\n');
        const ciudadanos = filas3.map(fila => fila.split(',')
                            .map(columna => columna.trim()))
                            .filter(columnas => columnas.length > 1);
        ciudadanos.shift()

        ciudadanos.forEach(async columnas => {
            columnas[5] = Number(columnas[5])
            const sql = `INSERT INTO temp_ciudadano (dpi, nombre, apellido, direccion, telefono, edad, genero) VALUES (?,?,?,?,?,?,?)`
            await connection.query(sql, columnas)
        })
        

        // 4. Departamentos
        const contenido4 = fs.readFileSync(fdidr + '/departamentos.csv', 'utf8')
        const filas4 = contenido4.split('\n');
        const departamentos = filas4.map(fila => fila.split(',')
                            .map(columna => columna.trim()))
                            .filter(columnas => columnas.length > 1);
        departamentos.shift()

        departamentos.forEach(async columnas => {
            columnas[0] = Number(columnas[0])
            const sql = `INSERT INTO temp_departamento (id, nombre) VALUES (?,?)`
            await connection.query(sql, columnas)
        })

        

        // 5. Mesas
        const contenido5 = fs.readFileSync(fdidr + '/mesas.csv', 'utf8')
        const filas5 = contenido5.split('\n');
        const mesas = filas5.map(fila => fila.split(',')
                            .map(columna => columna.trim()))
                            .filter(columnas => columnas.length > 1);
        mesas.shift()
        mesas.forEach(async columnas => {
            columnas[0] = Number(columnas[0])
            columnas[1] = Number(columnas[1])
            const sql = `INSERT INTO temp_mesa (id_mesa, id_departamento) VALUES (?,?)`
            await connection.query(sql, columnas)
        })

        

        // 6. Partidos
        const contenido6 = fs.readFileSync(fdidr + '/partidos.csv', 'utf8')
        const filas6 = contenido6.split('\n');
        const partidos = filas6.map(fila => parseCSVcomilla(fila))
                            .filter(columnas => columnas.length > 1);
        partidos.shift()
        console.log(partidos)

        partidos.forEach(async columnas => {
            columnas[0] = Number(columnas[0])
            console.log(columnas[2])
            const col_fecha = columnas[3].split('/')
            const fecha = col_fecha[2] + '-' + col_fecha[1] + '-' + col_fecha[0]
            columnas[3] = fecha
            const sql = `INSERT INTO temp_partido (id, nombre_partido, siglas, fundacion) VALUES (?,?,?,?)`
            await connection.query(sql, columnas)
        })
        

        //7. Votaciones
        const contenido7 = fs.readFileSync(fdidr + '/votaciones.csv', 'utf8')
        const filas7 = contenido7.split('\n');
        const votaciones = filas7.map(fila => fila.split(',')
                            .map(columna => columna.trim()))
                            .filter(columnas => columnas.length > 1);
        votaciones.shift()
        
        votaciones.forEach(async columnas => {
            columnas[0] = Number(columnas[0])
            columnas[1] = Number(columnas[1])
            columnas[3] = Number(columnas[3])
            const [fecha, hora] = columnas[4].split(' ');
            const [dia, mes, anio] = fecha.split('/');
            const [horaNum, minutos] = hora.split(':');
            columnas[4] = `${anio}-${mes}-${dia} ${horaNum}:${minutos}`;
            const sql = `INSERT INTO temp_votacion (id_voto, id_candidato, dpi_ciudadano, mesa_id, fecha_hora) VALUES (?,?,?,?,?)`
            await connection.query(sql, columnas)
        })        

        respuesta = {
            consulta: "cargartabtemp",
            res: true,
            message: 'Datos cargados correctamente a las tablas temporales'
        }
        salida.push(respuesta)

        //C. Carga los datos de las tablas temporales a las tablas del modelo

        // 1. Departamento
        const sql1 = `INSERT INTO bd_tse.DEPARTAMENTO (id, nombre) SELECT id, nombre FROM temp_departamento`
        await connection.query(sql1)

        // 2. Cargo
        const sql2 = `INSERT INTO bd_tse.CARGO (id, cargo) SELECT id, cargo FROM temp_cargo`
        await connection.query(sql2)

        // 3. Ciudadano
        const sql3 = `INSERT INTO bd_tse.CIUDADANO (dpi, nombre, apellido, direccion, telefono, edad, genero) SELECT dpi, nombre, apellido, direccion, telefono, edad, genero FROM temp_ciudadano`
        await connection.query(sql3)

        // 4. Partido
        const sql4 = `INSERT INTO bd_tse.PARTIDO (id, nombre, siglas, fundacion) SELECT id, nombre_partido, siglas, fundacion FROM temp_partido`
        await connection.query(sql4)

        // 5. Mesa
        const sql5 = `INSERT INTO bd_tse.MESA (id, id_departamento) SELECT id_mesa, id_departamento FROM temp_mesa`
        await connection.query(sql5)

        // 6. Candidato
        const sql6 = `INSERT INTO bd_tse.CANDIDATO (id, nombres, fecha_nacimiento, id_partido, id_cargo) SELECT id, nombres, fecha_nacimiento, partido_id, cargo_id FROM temp_candidato`
        await connection.query(sql6)

        // 7. Voto
        const sql7 = `INSERT INTO bd_tse.VOTO (voto_ejercido_id,id_candidato, dpi_ciudadano, id_mesa, fecha_hora) SELECT id_voto, id_candidato, dpi_ciudadano, mesa_id, fecha_hora FROM temp_votacion`
        await connection.query(sql7)

        // 8. Voto_Candidato
        const sql8 = `INSERT INTO bd_tse.VOTO_CANDIDATO (id_candidato, id_voto) SELECT id_candidato, id_voto FROM temp_votacion`
        await connection.query(sql8)

        respuesta = {
            consulta: "cargartabtemp",
            res: true,
            message: 'Datos cargados correctamente a las tablas del modelo'
        }
        salida.push(respuesta)

        //D. Elimina las tablas temporales
        const sql9 = `DROP TEMPORARY TABLE temp_candidato, temp_departamento, temp_cargo, temp_ciudadano, temp_mesa, temp_partido, temp_votacion`
        await connection.query(sql9)

        respuesta = {
            consulta: "cargartabtemp",
            res: true,
            message: 'Tablas temporales eliminadas correctamente'
        }
        salida.push(respuesta)

        connection.release();
        //C. Carga los datos de las tablas temporales a las tablas del modelo
        res.status(200).send(salida)

    }catch(e){
        console.log(e)
        res.status(500).send({
            consulta: "cargartabtemp",
            res: false,
            message: 'Ocurrio un error: ', e
        })
    }
    

}

export const cargarmodelo = async (req, res) => {
    //Elimina comentarios del script
    let script = script_create_modeltables.replace(/--.*\n/g, '')

    try{

        const connection = await db.getConnection();
        //A. Crea las tablas temporales
        //Ejecuta el script1 sin comentarios
        const sqlCommands1 = script.split(";").map(command => command.trim());

        for(let i = 0; i < sqlCommands1.length; i++){
            if(sqlCommands1[i].length === 0){
                continue;
            }
            console.log(sqlCommands1[i])
            await connection.query(sqlCommands1[i])
        }
        connection.release();

        res.status(200).send({
            consulta: "cargarmodelo",
            res: true,
            message: 'Modelo creado con éxito',
            tablas_modelo:[
                'bd_tse.DEPARTAMENTO',
                'bd_tse.CARGO',
                'bd_tse.CIUDADANO',
                'bd_tse.PARTIDO',
                'bd_tse.MESA',
                'bd_tse.CANDIDATO',
                'bd_tse.VOTO',
                'bd_tse.VOTO_CANDIDATO'
            ]
        })

    }catch(e){
        console.log(e)
        res.status(500).send({
            consulta: "cargarmodelo",
            res: false,
            message: 'Ocurrio un error: ', e
        })
    }
}

export const eliminarmodelo = async (req, res) => {
    
    let script = 'DROP TABLE bd_tse.candidato, departamento, cargo, ciudadano, mesa, partido, voto, voto_candidato;'
    try{
        await db.query(script)
        res.status(200).send({
            consulta: "eliminarmodelo",
            res: true,
            message: 'Modelo eliminado con éxito'
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            consulta: "eliminarmodelo",
            res: false,
            message: 'Ocurrio un error: ', e
        })
    }
}