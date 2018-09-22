import { Router } from 'express';
import {pool} from './chirps';

let router = Router();

router.get('/:name?', (req, res) => {
    let name = req.params.name;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err

        } else {
            let hasName = ((name) ? 'WHERE u.name = ? ' : '');

            connection.query(
                `SELECT
                    id,  
                    name as user
                FROM users as u
                ${hasName}`, name, (error, results, fields) => {
                        connection.release();

                        if (error) {
                            throw (error);
                        } else if (results.length === 0) {
                            res.sendStatus(404);
                            throw new Error('Invalid User name')
                        }
                        res.json(results);

                });
        }

    });

});

export default router;