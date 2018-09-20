import {Router} from 'express';
// import cs from '../chirpstore';

let router = Router();

// router.get('/:id?', (req,res) => {
//     let id = req.params.id;
//     if(id === "nextid" ){
//         res.json(cs.GetChirps().nextid);
//     }else if(id){
//         res.json(cs.GetChirp(id))
//     }
//     else{
//         res.send(cs.GetChirps());
//     }
// });

router.post('/',(req,res) => {
    cs.CreateChirp(req.body);
    res.json(cs.GetChirps());
   

});

router.put('/:id',(req,res) => {
    let id = req.params.id;
    cs.UpdateChirp(id,req.body);
    res.sendStatus(200);
});

router.delete('/:id',(req,res) => {
    let id = req.params.id;
    cs.DeleteChirp(id);
    res.sendStatus(200);
});



module.exports = router;

