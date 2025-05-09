const config = require("./dbconfig.js");
const sql = require("mssql");

async function AddNewUser(body) {
  try {
    let query = body.tipo === "I" ?  
    `INSERT INTO Utenti 
    (Nome, Cognome, Tipo, Mail, Password, DataDiNascita, DataIscrizione, IndirizzoDiStudio) 
    VALUES 
    (@name, @surname, @tipo, @mail, @psw, CAST(@dataNascita AS DATE), GETDATE())`
    : 
    `INSERT INTO Utenti 
    (Nome, Cognome, Tipo, Mail, Password, DataDiNascita, DataIscrizione, IndirizzoDiStudio) 
    VALUES 
    (@name, @surname, @tipo, @mail, @psw, CAST(@dataNascita AS DATE), GETDATE(), @indirizzo)`
    ;
    let pool = await sql.connect(config);
    let insertion = await pool
      .request()
      .input("name", sql.VarChar, body.nome)
      .input("surname", sql.VarChar, body.cognome)
      .input("mail", sql.VarChar, body.email)
      .input("psw", sql.VarChar, body.password)
      .input("dataNascita", sql.VarChar, body.dataNascita)
      .input("indirizzo", sql.VarChar, body.indirizzoDiStudio || null)
      .input("tipo", sql.Char, body.tipo) 
      .query(query)
    return insertion.rowsAffected;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function TryToLog(body) {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool
      .request()
      .input("mail", sql.VarChar, body.email)
      .input("psw", sql.VarChar, body.password)
      .query(
        `SELECT ID, Nome, Cognome, Tipo, Mail, RatingMedio, DataDiNascita, DataIscrizione, IndirizzoDiStudio 
        FROM Utenti 
        WHERE mail=@mail AND password=@psw`
      );
    return insertion.recordset

  } catch (error) {
    console.log(error)
    return undefined
  }
}
async function CreateNewEvent(form) {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool
      .request()
      .input("subject", sql.VarChar, form.subject)
      .input("date", sql.Date, form.date)
      .input("startTime", sql.VarChar, form.startTime)
      .input("endTime", sql.VarChar, form.endTime)
      .input("notes", sql.VarChar, form.notes)
      .input("nrMaxPartecipants", sql.Int, form.nrMaxPartecipants)
      .input("teacher", sql.Int, form.teacher)
      .query(
        `INSERT into Ripetizioni(Insegnante, Data, OraInizio, OraFine, NumeroMassimoPartecipanti, Materia, Note) 
        values (@teacher, CAST(@date as DATE), CAST(@startTime AS TIME), CAST(@endTime AS TIME), @nrMaxPartecipants, @subject, @notes)`
      );

    return insertion.rowsAffected;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function FetchAllRipetitions() {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool.request().query('SELECT Nome, Cognome, Ripetizioni.Id, Data, OraInizio, OraFine, NumeroMassimoPartecipanti, Note FROM Ripetizioni JOIN Insegnanti ON Insegnante = Insegnanti.Id')
    return insertion.recordsets
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

module.exports = {
  FetchAllRipetitions: FetchAllRipetitions,
  AddNewUser: AddNewUser,
  TryToLog: TryToLog,
  CreateEvent: CreateNewEvent,
};
