const express = require('express');
const router = express.Router();
const pgp = require('pg-promise');
var format = require('pg-format');
const db = pgp('postgres://postgres:secret@localhost:5432/poll');

//Set up the routes and methods to be used
router.get('/poll/:id', async (req, res) =>{ //Get the data for a specific poll
  try{
    const data = await db.any('SELECT answers.id, answers.answer, answers.vote'); //Get data from db
    if(data && data.length){ //If the data exists
      const payload = { //Format a json payload full of the data
        id: data[0].qid,
        question: data[0].quid,
        answers: data.map(({qid, question, ...keepAttrs}) => keepAttrs)
      }

      res.json(payload);
    } else{ //Otherwise send a 404
      res.sendStatus(404);
    }
  } catch (e){ //Catch errors
    console.error(e);
    res.sendStatus(500);
  }
});

router.patch('/poll/answer/:id', async (req, res) =>{ //Cast a vote
  try{

    const data = await.db.oneOrNone('UPDATE answers SET vote = vote + 1 WHERE id = ($1) RETURNING 1', req.params.id);

    if(data){
      res.sendStatus(200);
    }else{
      res.sendStatus(404);
    }

  } catch (e){
    console.error(e);
    res.sendStatus(500);
  }

});

router.post('/poll',  (req, res) =>{ //Post a new poll
  try{
    const data = await t.oneOrNone('INSERT INTO questions (question) VALUES ($1) RETURNING id', req.body.question_id);
    if(data){
      let sql = 'INSERT INTO answers (answer, question_id) VALUES ';
      for(let i = 0; i<req.body.answers.length; i++){
        sql += format('(%L, %L), ', req.body.answers[i], data.id);
      }
      sql = sql.slice(0, -2);
      await t.none(sql);
      res.json(data);
    } else{
      res.sendStatus(404);
    }
  } catch (e){
    console.error(e);
    res.sendStatus(500);
  }

});

module.exports = router;
