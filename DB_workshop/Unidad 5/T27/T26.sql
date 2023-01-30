--Nombre: Abraham Jhared Flores Azcona
--#: 19211640

CREATE DATABASE T26
GO
USE T26

--creacion de las tablas auxiliares
CREATE TABLE Alumno
(
	Nombre varchar(50),
	Apellido varchar(50),
	NoAlumno int  identity primary key 
)
CREATE TABLE bitacora
(
	Gatillo_Ejecutado varchar(50),
	fecha_registro date,
	Usuario_servidor varchar(50)
)
go

--creacion de los gatillos
    --PARA 'INSERT'
CREATE TRIGGER altaAlumno ON Alumno
FOR INSERT
AS
    begin
        PRINT('Alumno agregado')
        INSERT INTO bitacora VALUES
        (
            'Inserción',
            CONVERT(date, getdate()),
            CURRENT_USER
        )
    end
GO
    --PARA 'DELETE'
CREATE TRIGGER bajaAlumno ON Alumno
FOR DELETE
AS
    begin
        PRINT('Alumno eliminado')
        INSERT INTO bitacora VALUES
        (
            'Eliminación',
            CONVERT(date, getdate()),
            CURRENT_USER
        )
    end
GO
        --PARA 'UPDATE'
CREATE TRIGGER modAlumno ON Alumno
FOR UPDATE
AS
    begin
        PRINT('Alumno modificado')
        INSERT INTO bitacora VALUES
        (
            'Modificación',
            CONVERT(date, getdate()),
            CURRENT_USER
        )
    end
GO

--PRUEBA DE LOS GATILLOS
INSERT INTO alumno VALUES 
(
    'Julio',
    'Preciado'
),
(
    'Andres',
    'Cortes'
)

SELECT * FROM alumno

DELETE FROM alumno WHERE noAlumno = 1
UPDATE alumno SET nombre = 'Hernan' WHERE noAlumno = 2

SELECT * FROM alumno

SELECT * FROM bitacora