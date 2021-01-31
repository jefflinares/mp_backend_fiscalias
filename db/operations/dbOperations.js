const config = require('../dbconfig');
const async = require('express-async-handler');

const sql = require('mssql');
let pool = null;
/**
 * Funcion Asíncrona para conectar a la DB
 */
const conectar = async( async() => {
    try {
        pool = await sql.connect(config);
        return true;
    }catch{
        console.log('Error');
    }
});

/**
 * Función para obtener todas las fiscalías
 */
async function getFiscalias() {
    try {
        if(!pool) {
            let conectado = await conectar();
            console.log('Connected to the sql');
        }
        let fiscalias = await pool.request().execute("getFiscalias");
        return fiscalias.recordsets;
    }
    catch(err){
        console.log(err);
    }
}
/**
 * Retorna la información de esa fiscalía
 * @param {Id de la fiscalía} id 
 */
async function getFiscalia(id) {
    try {
        if(!pool) {
            let conectado = await conectar();
            console.log('Connected to the sql');
        }
        let fiscalias = await pool.request()
        .input('input_parameter', sql.Int, id).query("SELECT * FROM FISCALIA WHERE id = @input_parameter" );
        return fiscalias.recordsets;
    }
    catch(err){
        console.log(err);
    }
}

/**
 * Función para crear una nueva fiscalía.
 * @param {Objeto que contiene la información de la fiscalía} fiscalia 
 */
async function addFiscalia(fiscalia){
    try{
        if(!pool){
            let conectado = await conectar();
        }

        let insertFiscalia = await pool.request()
            .input('Nombre', sql.VarChar(200), fiscalia.Nombre)
            .input('Ubicacion', sql.VarChar(500), fiscalia.Ubicacion)
            .execute('addFiscalia');

        return insertFiscalia.recordsets;

    }catch (err){
        console.log(err);
    }
}

/**
 * Función para actualizar la información de una fiscalía.
 * @param {Objeto que contiene la información actualizada de la fiscalía} fiscalia 
 */
async function updateFiscalia(fiscalia){
    try{
        if(!pool){
            let conectado = await conectar();
        }

        let updateFiscalia = await pool.request()
            .input('Id', sql.Int, fiscalia.Id)
            .input('Nombre', sql.VarChar(200), fiscalia.Nombre)
            .input('Ubicacion', sql.VarChar(500), fiscalia.Ubicacion)
            .execute('updateFiscalia');

        return updateFiscalia.recordsets;

    }catch (err){
        console.log(err);
    }
}

async function deleteFiscalia(id) {
    try {
        if(!pool) {
            let conectado = await conectar();
        }
        let fiscalias = await pool.request()
            .input('Id', sql.Int, id)
            .execute("deleteFiscalia");
        return fiscalias.recordsets;
    }
    catch(err){
        console.log(err);
    }
}



module.exports = {
    getFiscalias: getFiscalias,
    getFiscalia: getFiscalia,
    addFiscalia: addFiscalia,
    updateFiscalia: updateFiscalia,
    deleteFiscalia: deleteFiscalia
}