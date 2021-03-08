

const express = require('express');
const router = express.Router();
const passport = require('passport');
const Carnet = require('../models/carnet');

//Add New Carnet(Todo)
router.post('/add', passport.authenticate('jwt', { session : false}),  (req, res, next) => {
    const carnet = new Carnet({
      owner: req.body.owner,
      nom: req.body.nom,
      age: req.body.age,
      famille: req.body.famille,
      race: req.body.race,
    });

    carnet.save((err, carnet) => {
      if (err) {
        // throw err;
        return res.send({
          success: false,
          message: 'Error while saving, please try again'
        });
      }

      return res.send({
        success: true,
        carnet,
        message: 'Carnet Saved'
      });

    });
});

//Lister les carnets
router.post('/list', passport.authenticate('jwt', { session : false}), (req, res, next) => {
  const owner = req.body.owner;
  Carnet.find({ owner }, (err, carnets)=>{
    if (err) {
      return res.send({
        success: false,
        message: 'Error while listing les carnets'
      });
    }

    return res.send({
      success: true,
      carnets
    });
  });
});

//supprimer carnet
router.delete('/remove/:id', passport.authenticate('jwt', { session : false}), (req, res, next) => {


  const carnetId = req.params.id;
  Carnet.remove({ _id: carnetIdId }, (err) => {
      if(err) {
        return res.send({
          success: false,
          message: 'Failed to delete the carnet'
        });
      }

      return res.send({
        success: true,
        message: 'carnet deleted'
      });
  });
});

module.exports = router;
