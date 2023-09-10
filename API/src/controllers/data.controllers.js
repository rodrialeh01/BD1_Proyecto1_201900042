import fs from 'fs';
import { db } from '../db.js';
import { script_create_temptables } from '../scripts/scripts_bd.js';
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
        const partidos = filas6.map(fila => fila.split(',')
                            .map(columna => columna.trim()))
                            .filter(columnas => columnas.length > 1);
        partidos.shift()

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
        connection.release();
        //C. Carga los datos de las tablas temporales a las tablas del modelo
        res.send(salida)

    }catch(e){
        console.log(e)
        res.status(500).send({
            consulta: "cargartabtemp",
            res: false,
            message: 'Ocurrio un error: ', e
        })
    }
    

}