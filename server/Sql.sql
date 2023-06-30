Create TABLE sektion(
    id INT NOT NULL AUTO_INCREMENT,
    sektionsnavn VARCHAR(20)
);
CREATE TABLE reakke (id INT, pris FLOAT, sektionid INT);
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
    antal INT,
    madbillet boolean,
    status VARCHAR(150)
);
CREATE TABLE kunde(
    id INT,
    navn VARCHAR(100),
    email VARCHAR(255)
    /*,
     brugernavn VARCHAR(150) NULL,
     password VARCHAR(100) ?,
     adresse VARCHAR(100),
     postnr INT,
     mobil INT ?*/
);