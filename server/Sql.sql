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
    `sid` INT primary key AUTO_INCREMENT NOT NULL,
    `id` INT NOT NULL,
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
/*kundeid INT NOT NULL,*/
 CREATE TABLE vffmojcdb.kunde(
 id INT primary key NOT NULL AUTO_INCREMENT,
 navn VARCHAR(100) NOT NULL,
 email VARCHAR(255) NOT NULL,
 brugernavn VARCHAR(150) NULL,
 password VARCHAR(100) NULL,
 adresse VARCHAR(100) NOT NULL,
 postnr INT NOT NULL,
 mobil INT NULL
 );
/* ALTER TABLE `vffmojcdb`.`saede` 
CHANGE COLUMN `id` `sid` INT NOT NULL AUTO_INCREMENT ;
ALTER TABLE `vffmojcdb`.`saede` 
ADD COLUMN `id` INT NULL AFTER `sid`;
UPDATE `vffmojcdb`.`saede` SET `sid` = '1', `id` = '11' WHERE (`sid` = '11');
UPDATE `vffmojcdb`.`saede` SET `sid` = '2', `id` = '12' WHERE (`sid` = '12');
UPDATE `vffmojcdb`.`saede` SET `sid` = '3', `id` = '13' WHERE (`sid` = '13');
UPDATE `vffmojcdb`.`saede` SET `sid` = '4', `id` = '14' WHERE (`sid` = '14');
UPDATE `vffmojcdb`.`saede` SET `sid` = '5', `id` = '25' WHERE (`sid` = '25');
UPDATE `vffmojcdb`.`saede` SET `sid` = '6', `id` = '26' WHERE (`sid` = '26');
UPDATE `vffmojcdb`.`saede` SET `sid` = '7', `id` = '27' WHERE (`sid` = '27');
UPDATE `vffmojcdb`.`saede` SET `sid` = '8', `id` = '28' WHERE (`sid` = '28');
UPDATE `vffmojcdb`.`saede` SET `sid` = '9', `id` = '29' WHERE (`sid` = '29');
UPDATE `vffmojcdb`.`saede` SET `sid` = '10', `id` = '30' WHERE (`sid` = '30');
UPDATE `vffmojcdb`.`saede` SET `sid` = '11', `id` = '13' WHERE (`sid` = '31');
ALTER TABLE `vffmojcdb`.`saede` 
CHANGE COLUMN `id` `id` INT NOT NULL ;
 */