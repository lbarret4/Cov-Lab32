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
        ON DELETE CASCADE
);

INSERT INTO users
    (name)
values( 'Charles'),
    ('Jemma'),
    ('Kim'),
    ('Amanda'),
    ('Kenji'),
    ('John'),
    ('Candice'),
    ('Robert'),
    ('Tina'),
    ('Patricia');

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
            

         

