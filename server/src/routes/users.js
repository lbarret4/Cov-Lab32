import { Router } from 'express';
import {pool} from './chirps';

let router = Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err

        } else {
            let hasId = ((id) ? 'WHERE u.id = ? ' : '');

            connection.query(
                `SELECT
                    id,  
                    name as user
                FROM users as u
                ${hasId}`, id, (error, results, fields) => {
                        connection.release();

                        if (error) {
                            throw (error);
                        } else if (results.length === 0) {
                            res.sendStatus(404);
                            throw new Error('Invalid User id')
                        }
                        res.json(results);

                });
        }

    });

});

export default router;