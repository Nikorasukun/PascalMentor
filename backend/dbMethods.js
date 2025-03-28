const { request } = require('express');
const config = require('./dbconfig.js')
const sql = require('mssql')

async function AddNewStudent(body) {
    try {
        let pool = await sql.connect(config);
        
        let insertion = await pool.request()
            .input('name', sql.VarChar, body.nome)     
            .input('surname', sql.VarChar, body.cognome)
            .input('mail', sql.VarChar, body.email)
            .input('psw', sql.VarChar(50), body.password)
            .input('indirizzo', sql.VarChar, body.indirizzo)
            .input('dataNascita', sql.VarChar, body.dataNascita)  
            .query(
                'INSERT INTO Studenti (Nome, Cognome, Mail, Password, Indirizzo, DataDiNascita) values (@name, @surname, @mail, @psw, @indirizzo, CAST(@dataNascita AS DATE))'
            );
        
            console.log(insertion.rowsAffected)
        return insertion.rowsAffected; 
    } catch (error) {
        console.error("Errore durante l'inserimento nel database:", error);
        return undefined;
    }
    
}
async function AddNewTeacher(body) {
    try{
        let pool = await sql.connect(config);
        let insertion = await pool.request()
        .input('name', sql.VarChar, body.nome)
        .input('surname', sql.VarChar, body.cognome)
        .input('mail', sql.VarChar, body.email)
        .input('psw', sql.VarChar, body.password)
        .input('dataNascita', sql.VarChar, body.dataNascita)
        .query(
            'INSERT into Insegnanti(Nome, Cognome, Mail, Password, DataDiNascita) values(@name, @surname, @mail, @psw, CAST(@dataNascita AS DATE))'
        )
        return insertion.rowsAffected
        
    }
    catch (error){
        console.error(error)
        return undefined
    }
}

async function TryToLog(body, table) {
    try {
        let pool = await sql.connect(config);
        let insertion = await pool.request()
        .input('mail', sql.VarChar, body.email)
        .input('psw', sql.VarChar, body.password)
        .query(`SELECT * FROM ${table} WHERE mail=@mail AND password=@psw`)
        const variabileCheHoDovutoCrearePercheJSFaCagare = []
        if(insertion.recordset != variabileCheHoDovutoCrearePercheJSFaCagare.toString() || table === 'insegnanti')
            return insertion.recordset
        else
            TryToLog(body, 'insegnanti')
    } catch (error) {
        console.error(error)
        return undefined
    }
}

module.exports = {
    AddNewStudent: AddNewStudent,
    AddNewTeacher: AddNewTeacher,
    TryToLog: TryToLog
}