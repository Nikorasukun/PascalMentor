CREATE DATABASE PascalMentor
go
USE PascalMentor
go 

CREATE TABLE Materie(
	Id int identity(1,1) PRIMARY KEY,
	Nome VARCHAR(40)
)
CREATE TABLE Utenti(
	ID int identity(1,1) PRIMARY KEY,
	Nome VARCHAR(20) NOT NULL,
	Cognome VARCHAR(20) NOT NULL,
	Tipo CHAR(1) DEFAULT('S'),
	Mail VARCHAR(50) UNIQUE NOT NULL,
	Password VARCHAR(64) NOT NULL,
	RatingMedio FLOAT DEFAULT(0),
	DataDiNascita DATE NOT NULL,
	DataIscrizione DATE NOT NULL,
	IndirizzoDiStudio VARCHAR(20)
	)


CREATE TABLE Ripetizioni(
	Id int identity(1,1) PRIMARY KEY,
	Data DATE NOT NULL,
	OraInizio TIME NOT NULL,
	OraFine TIME,
	NumeroMassimoPartecipanti INT DEFAULT(1),
	NumeroIscritti INT DEFAULT(0),
	Insegnante INT REFERENCES Utenti(Id) NOT NULL,
	Materia INT REFERENCES Materie(Id) NOT NULL,
	Note VARCHAR(150))

CREATE TABLE Partecipazioni(
	Studente INT REFERENCES Utenti(Id),
	Ripetizione INT REFERENCES Ripetizioni(Id)
	PRIMARY KEY(Studente, Ripetizione))

CREATE TABLE Feedbacks(
	Id int identity(1,1) PRIMARY KEY,
	Rating FLOAT,
	Descrizione VARCHAR(150),
	Studente INT REFERENCES Utenti(Id),
	Ripetizione INT REFERENCES Ripetizioni(Id))
