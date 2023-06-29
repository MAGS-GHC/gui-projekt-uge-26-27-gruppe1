Create TABLE sektion(
    id INT,
    sektionsnavn VARCHAR(20)
);
CREATE TABLE reakke (
    id INT,
    pris FLOAT,
    sektionid INT
);
CREATE TABLE saede(
    id INT,
    raekkeid INT,
    status VARCHAR(100),
    ordreid INT
);
CREATE TABLE ordre(
    id INT,
    kundeid INT,
    navn VARCHAR(100),
    /*
     antal INT,
     madbillet boolean,
     status VARCHAR(150)*/
);
/*CREATE TABLE kunde(
 id INT,
 brugernavn VARCHAR(150) ?,
 password VARCHAR(100) ?,
 navn VARCHAR(100),
 adresse VARCHAR(100),
 postnr INT,
 email VARCHAR(255),
 mobil INT ?
 );*/