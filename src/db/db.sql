CREATE DATABASE company WITH
OWNER = 'postgres'
ENCODING = 'UTF8';

\c company
--Eliminacion de tablas---
DROP TABLE IF EXISTS departamento;
DROP TABLE IF EXISTS empleados;

CREATE SEQUENCE departamento_codigo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE;

CREATE TABLE departamento(
    codigo_departamento INTEGER NOT NULL DEFAULT NEXTVAL('departamento_codigo_seq'),
    nombre VARCHAR(100) NOT NULL,
    presupuesto float,
     PRIMARY KEY (codigo_departamento));

INSERT INTO departamento(nombre,presupuesto) VALUES('Financiero', 2000.1);     
INSERT INTO departamento (nombre,presupuesto) VALUES('Recursos Humanos',3020.2);
INSERT INTO departamento (nombre,presupuesto) VALUES('Comercial',4054.2);
INSERT INTO departamento (nombre,presupuesto) VALUES('Compras', 5467.1);

  \d departamento

CREATE SEQUENCE empleados_codigo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE;

    CREATE TABLE empleados(
        codigo_empleados  INTEGER NOT NULL DEFAULT NEXTVAL('empleados_codigo_seq'),
        nit VARCHAR(9),
        nombre VARCHAR(100)DEFAULT NULL,
        apellido1 VARCHAR(100) NOT NULL,
        apellido2 VARCHAR(100) NOT NULL,
        fk_departamento SERIAL NOT NULL,

        PRIMARY KEY (codigo_empleados),
        FOREIGN KEY (fk_departamento)
        REFERENCES departamento(codigo_departamento)ON DELETE RESTRICT ON UPDATE CASCADE
    );


INSERT INTO empleados (nit,nombre,apellido1,apellido2,fk_departamento) 
VALUES ('807.890-7','Ryan','ruiz' ,'contreras','1');

INSERT INTO empleados (nit,nombre,apellido1,apellido2,fk_departamento) 
VALUES ('102.897-3','joe ','peres','gelvez','2');

INSERT INTO empleados (nit,nombre,apellido1,apellido2,fk_departamento) 
VALUES ('104-345-4','johan','leal','gonzales','3');

INSERT INTO empleados (nit,nombre,apellido1,apellido2,fk_departamento) 
VALUES ('800-567-8','carlos','leon' ,'castro','2');

INSERT INTO empleados (nit,nombre,apellido1,apellido2,fk_departamento) 
VALUES ('102-678-7','jose ','garcia','quintero','3');

INSERT INTO empleados (nit,nombre,apellido1,apellido2,fk_departamento) 
VALUES ('104.876-9','brando','colmenares','osorio','1');

INSERT INTO empleados (nit,nombre,apellido1,apellido2,fk_departamento) 
VALUES ('102.456-2','juan ','lizarazo','velez','4');

INSERT INTO empleados (nit,nombre,apellido1,apellido2,fk_departamento) 
VALUES ('104.567-6','cristian','zapata','duque','4');