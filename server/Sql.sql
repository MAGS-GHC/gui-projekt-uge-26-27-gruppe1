/*create database vffmojcdb;
CREATE USER 'vffmojc'@'localhost' IDENTIFIED BY 'vffMOJC-2023';
GRANT ALL PRIVILEGES ON vffmojcdb.* TO 'vffmojc'@'localhost';
FLUSH PRIVILEGES;*/

Create TABLE vffmojcdb.sektion(
    `id` INT primary key NOT NULL AUTO_INCREMENT,
    `sektionnavn` VARCHAR(20) NOT NULL
);
CREATE TABLE vffmojcdb.raekke(
    `id` INT primary key NOT NULL,
    `pris` FLOAT NOT NULL,
    `sektionid` INT NOT NULL
);
CREATE TABLE vffmojcdb.saede(
    `id` INT primary key NOT NULL,
    `raekkeid` INT NOT NULL,
    `saedestatus` VARCHAR(100) NOT NULL,
    `ordreid` INT
);
CREATE TABLE vffmojcdb.ordre(
    `id` INT primary key NOT NULL AUTO_INCREMENT,
    `navn` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `antal` INT NOT NULL,
    `madbillet` boolean NOT NULL,
    `beloeb` float NOT NULL,
    `ordrestatus` VARCHAR(150) NOT NULL
);
insert into vffmojcdb.sektion(`sektionsnavn`) values("M");
insert into vffmojcdb.raekke(`id`, `pris`, `sektionid`) values(1, 100, 1),(2, 100, 1),(3, 100, 1);
insert into vffmojcdb.saede(`id`, `raekkeid`, `saedestatus`, `ordreid`) values(11, 1, "ledig", null),(12, 1, "ledig", null),(13, 1, "ledig", null),(14, 1, "ledig", null),(25, 2, "ledig", null),(26, 2, "optaget", 1),(27, 2, "ødelagt", null),(28, 2, "ledig", null),(29, 2, "ledig", null),(30, 3, "ledig", null);
/*kundeid INT NOT NULL,
 CREATE TABLE kunde(
 id INT,
 navn VARCHAR(100),
 email VARCHAR(255),
 brugernavn VARCHAR(150) NULL,
 password VARCHAR(100) NULL,
 adresse VARCHAR(100) NOT NULL,
 postnr INT NOT NULL,
 mobil INT NULL
 );*/