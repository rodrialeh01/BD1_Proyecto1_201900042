import { db } from '../db.js';
import { script_create_temptables } from './scripts_db.js';
const fdidr = '../../TSEdatasets'
const fs = require('fs')
const csv = require('fast-csv');

export const getInicio = (req, res) => {
    res.send({
        message: "Api levantada correctamente"
    })
}

export const cargarbtemp = async (req, res) => {

    //Elimina comentarios del script
    let script = script_create_temptables.replace(/--.*\n/g, '')
    salida = []

    try{
        //A. Crea las tablas temporales
        //Ejecuta el script1 sin comentarios
        const sqlCommands1 = script.split(";").map(command => command.trim());

        for(let i = 0; i < sqlCommands1.length; i++){
            if(sqlCommands1[i].length === 0){
                continue;
            }

            await db.query(sqlCommands1[i])
        }

        respuesta = {
            consulta: "cargartabtemp",
            res: true,
            message: 'Tablas temporales creadas correctamente'
        }
        salida.push(respuesta)

        //B. Carga los datos de los archivos csv
        // 1. Candidatos
        candidatos = []
        fs.createReadStream(fdidr + '/candidatos.csv')
        .pipe(csv.parse({ headers: true }))
        .on('data', (data) => candidatos.push(data))
        .on('end', () => {
            db.query('INSERT INTO temp_candidato (id, nombres, fecha_nacimiento, partido_id, cargo_id) VALUES ( ?, ? , ? , ? , ? )', [candidatos.map(candidato => [candidato.id, candidato.nombres, candidato.fecha_nacimiento, candidato.partido_id, candidato.cargo_id])], (err, result) => {
                if(err){
                    console.log(err)
                    res.status(500).send({
                        consulta: "cargartabtemp",
                        res: false,
                        message: 'Ocurrio un error: ', err
                    })
                }
            })
        })

        // 2. Cargos
        cargos = []
        fs.createReadStream(fdidr + '/cargos.csv')
        .pipe(csv.parse({ headers: true }))
        .on('data', (data) => cargos.push(data))
        .on('end', () => {
            db.query('INSERT INTO temp_cargo (id, cargo) VALUES ( ?, ? )', [cargos.map(cargo => [cargo.id, cargo.cargo])], (err, result) => {
                if(err){
                    console.log(err)
                    res.status(500).send({
                        consulta: "cargartabtemp",
                        res: false,
                        message: 'Ocurrio un error: ', err
                    })
                }
            })
        })

        // 3. Ciudadanos
        ciudadanos = []
        fs.createReadStream(fdidr + '/ciudadanos.csv')
        .pipe(csv.parse({ headers: true }))
        .on('data', (data) => ciudadanos.push(data))
        .on('end', () => {
            db.query('INSERT INTO temp_ciudadano (dpi, nombre, apellido, direccion, telefono, edad, genero) VALUES ( ? , ? , ? , ? , ? , ? , ? )', [ciudadanos.map(ciudadano => [ciudadano.DPI, ciudadano.Nombre, ciudadano.Apellido, ciudadano.Direccion, ciudadano.Telefono, ciudadano.Edad, ciudadano.Genero])], (err, result) => {
                if(err){
                    console.log(err)
                    res.status(500).send({
                        consulta: "cargartabtemp",
                        res: false,
                        message: 'Ocurrio un error: ', err
                    })
                }
            })
        })

        // 4. Departamentos
        departamentos = []
        fs.createReadStream(fdidr + '/departamentos.csv')
        .pipe(csv.parse({ headers: true }))
        .on('data', (data) => departamentos.push(data))
        .on('end', () => {
            db.query('INSERT INTO temp_departamento (id, nombre) VALUES ( ? , ? )', [departamentos.map(departamento => [departamento.id, departamento.nombre])], (err, result) => {
                if(err){
                    console.log(err)
                    res.status(500).send({
                        consulta: "cargartabtemp",
                        res: false,
                        message: 'Ocurrio un error: ', err
                    })
                }
            })
        })

        // 5. Mesas
        mesas = []
        fs.createReadStream(fdidr + '/mesas.csv')
        .pipe(csv.parse({ headers: true }))
        .on('data', (data) => mesas.push(data))
        .on('end', () => {
            db.query('INSERT INTO temp_mesa (id_mesa, id_departamento) VALUES ( ? , ? )', [mesas.map(mesa => [mesa.id_mesa, mesa.departamento_id])], (err, result) => {
                if(err){
                    console.log(err)
                    res.status(500).send({
                        consulta: "cargartabtemp",
                        res: false,
                        message: 'Ocurrio un error: ', err
                    })
                }
            })
        })

        // 6. Partidos
        partidos = []
        fs.createReadStream(fdidr + '/partidos.csv')
        .pipe(csv.parse({ headers: true }))
        .on('data', (data) => partidos.push(data))
        .on('end', () => {
            db.query('INSERT INTO temp_partido (id_partido, nombre_partido, siglas, fundacion) VALUES ( ? , ? , ? , ? )', [partidos.map(partido => [partido.id_partido, partido.nombrePartido, partido.Siglas, partido.Fundacion])], (err, result) => {
                if(err){
                    console.log(err)
                    res.status(500).send({
                        consulta: "cargartabtemp",
                        res: false,
                        message: 'Ocurrio un error: ', err
                    })
                }
            })
        })

        //7. Votaciones
        votaciones = []
        fs.createReadStream(fdidr + '/votaciones.csv')
        .pipe(csv.parse({ headers: true }))
        .on('data', (data) => votaciones.push(data))
        .on('end', () => {
            db.query('INSERT INTO temp_votacion (id_voto, id_candidato, dpi_ciudadano, mesa_id, fecha_hora) VALUES ( ? , ? , ? , ? , ? )', [votaciones.map(votacion => [votacion.id_voto, votacion.id_candidato, votacion.dpi_ciudadano, votacion.mesa_id, votacion.fecha_hora])], (err, result) => {
                if(err){
                    console.log(err)
                    res.status(500).send({
                        consulta: "cargartabtemp",
                        res: false,
                        message: 'Ocurrio un error: ', err
                    })
                }
            })
        })

        salida = {
            consulta: "cargartabtemp",
            res: true,
            message: 'Datos cargados correctamente a las tablas temporales'
        }
        salida.push(respuesta)

        //C. Carga los datos de las tablas temporales a las tablas del modelo


    }catch(e){
        console.log(e)
        res.status(500).send({
            consulta: "cargartabtemp",
            res: false,
            message: 'Ocurrio un error: ', e
        })
    }
    

}