const router = require('express').Router();
const fs= require('fs');
const { v4: uuidv4 } = require('uuid');


router.get('/notes', (req, res) =>{
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err
   let notes = JSON.parse (data)
   console.log(notes);
   res.json(notes);
  })
});

router.post ('/notes', (req,res) => {
    fs.readFile("./db/db.json",(err, data) => {
        if (err) throw err
        let notes = JSON.parse (data)
        console.log(req.body);
       req.body.id= uuidv4 ();
       console.log(req.body);
       notes.push (req.body);
       console.log(notes);
       fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
        if (err) throw err
        res.json(notes);

       })
       
    })
})

router.delete('/notes/:id', (req, res) => {
    fs.readFile("./db/db.json",(err, data) => { 
        if (err) throw err
        let notes = JSON.parse (data)
        console.log(req.params.id);
        let updatedNotes = notes.filter(note => note.id != req.params.id);
        console.log(updatedNotes);
        fs.writeFile("./db/db.json", JSON.stringify(updatedNotes), (err, data) => {
            if (err) throw err
            res.json(updatedNotes);
    
           })

    })
})
module.exports= router;