import { Router } from 'express';
import mysql from 'mysql';
import fs from 'fs';
let props;
let pool;
if (fs.existsSync('database-properties.json')) {
    /* props= {
        "host":"localhost",
        "database":"chirpr",
        "user":"chirprapp",
        "password":"**********"
        }
*/
    props = JSON.parse(fs.readFileSync('database-properties.json'));
    pool = mysql.createPool(props);
} else {
    throw new Error(' Cannot find database properties file');
}

let router = Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err

        } else {
            let hasId = ((id) ? 'WHERE ch.id = ? ' : '');

            connection.query(
                `SELECT 
                    ch.id as id, 
                    ch._created as time,
                    users.name as user,
                    ch.text as content 
                FROM chirps ch 
                JOIN users ON userid =users.id
                ${hasId}`, id, (error, results, fields) => {
                        connection.release();

                        if (error) {
                            throw (error);
                        } else if (results.length === 0) {
                            res.sendStatus(404);
                            throw new Error('Invalid Chirp id')
                        }
                        res.json(results);

                });
        }

    });

});

router.post('/', (req, res) => {
    let time = req.body.time.slice(0, -1);
    let user = req.body.user;
    let content = req.body.content;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            `INSERT INTO chirps (_created,userid,text)  
            Values(?,?,?)`, [time, user, content], (error, results, fields) => {
                connection.release();
                if (error) {
                    throw (error);
                };
                res.json({ id:results.insertId,time, user, content });
            });



    });
    


});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let time = req.body.time.slice(0, -1);
    let user = req.body.user;
    let content = req.body.content;
    pool.getConnection((err, connection) => {
        if (err) throw err;


        connection.query(
            `UPDATE chirps
            SET _created = ?,userid=?,text= ? 
            WHERE id = ?`, [time, user, content, id], (error, results, fields) => {
                connection.release();
                if (error) {
                    throw (error);
                } else if (results.affectedRows === 0) {
                    res.sendStatus(404);
                    throw new Error('Invalid Chirp id')
                }
                res.sendStatus(200);

            });

    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    pool.getConnection((err, connection) => {
        if (err) throw err;


        connection.query(
            `DELETE FROM chirps
            WHERE id = ?`, id, (error, results, fields) => {
                connection.release();
                if (error) {
                    throw (error);
                } else if (results.affectedRows === 0) {
                    res.sendStatus(404);
                    throw new Error('Invalid Chirp id')
                }
                res.sendStatus(200);

            });

    });
});

router.post('/:id/user/:userid', (req, res) => {
    let chirpId = req.params.id;
    let userId = req.params.userid;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
            `INSERT INTO mentions (userid,chirpid)
            Values(?,?)`, [userId,chirpId], (error, results, fields) => {
                connection.release();
                if (error) {
                    res.sendStatus(404);
                    throw (error);
                };
                res.json({ userId,chirpId });
            });



    });
    


});

router.get('/user/:id', (req, res) => {
    let id = req.params.id;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err

        } else {
        

            connection.query(
                `CALL spUserMentions(?)`, id,
                 (error, results, fields) => {
                        connection.release();
                        if (error) {
                            throw (error);
                        } else if (results[0].length === 0) {
                            res.sendStatus(404);
                            throw new Error('Invalid user id')
                        }
                        res.json(results[0]);

                });
        }

    });

});


export { router as default, pool };

