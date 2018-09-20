CREATE TABLE users
(
    id INT NOT NULL auto_increment PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(254) NOT NULL,
    password TEXT NULL,
    _created DATETIME DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE chirps
(
        id INT NOT NULL auto_increment PRIMARY KEY,
        userid INT NOT NULL,
            CONSTRAINT fk_userid
                FOREIGN KEY (userid)
                REFERENCES users(id),
    text TEXT NULL,
    _created DATETIME DEFAULT CURRENT_TIMESTAMP
   
);

CREATE TABLE mentions
(
    userid INT NOT NULL,
    chirpid INT NOT NULL,
    PRIMARY KEY (userid,chirpid),
    CONSTRAINT fk_mn_userid 
        FOREIGN KEY(userid)
        REFERENCES users(id),
    CONSTRAINT fk_mn_chirpid
        FOREIGN KEY (chirpid)
         REFERENCES chirps(id)
);

INSERT INTO users
    (name,email,password)
values( 'Charles', 'test@email.com', 'LdWedugh'),
    ('Jemma', 'test1@email.com', 'easTErIO');
    -- ( 'Kim', 'test2@email.com', 'berJoIDN'),
    -- ('Amanda', 'test3@email.com', 'XYrItIma'),
    -- ('Kenji', 'test4@email.com', 'iNAPAUSt'),
    -- ('John', 'test5@email.com', 'RANAugAD'),
    -- ('Candice', 'test6@email.com', 'ieWREBap'),
    -- ('Robert', 'test7@email.com', 'abLeABow'),
    -- ('Tina', 'test8@email.com', 'hiETRumV'),
    -- ('Patricia', 'test9@email.com', 'ndBoLiaB');

INSERT INTO chirps(userid, text)
values
    (1,'Hello Everybody'),
    (2, 'Hello @Charles'),
    (1,'I hope we have a nice day today'),
    (1, '@Jemma did you find what you were looking for yesterday?'),
    (2, 'No, sadly @Charles'),
    (2, 'Cofee bar in 15 mins');


INSERT INTO mentions (userid,chirpid)
VALUES
	(1,2),
    (2,4),
    (1,5);
            

         

