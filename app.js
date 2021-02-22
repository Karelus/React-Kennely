"use strict";
const Joi = require('joi');
const express = require('express');
const app = express();

// importing necessary classes
var Pet = require('./model/pet');
var User = require('./model/user');

app.use(express.json());

// get frontpage
app.get('/', (req, res) => {
    res.send('Hello World');
});

// get all pets
app.get('/api/pets', (req, res) => {
    let user = new User();
    user.getPets(2).then((results) => {
        res.send(results);
    }).catch((err) => {
        res.status(404).send(err);
    })
});

// get single pet
app.get('/api/pets/:id', (req, res) => {
    let user = new User();
    user.getPet(req.params.id).then((results) => {
        res.send(results);
    }).catch((err) => {
        res.status(404).send(err);
    })
});

// create pet
app.post('/api/pets/create', (req, res) => {

    let petData = {
        owner_id: req.body.owner_id,
        animal: req.body.animal,
        petname: req.body.petname,
        color: req.body.color,
        avatar: req.body.avatar,
        food_storage: req.body.food_storage,
    }

    const schema = Joi.object({
        owner_id: Joi.number().required(),
        animal: Joi.string().required(),
        petname: Joi.string().min(3).max(20).required(),
        color: Joi.string().max(7),
        avatar: Joi.string().max(20),
        food_storage: Joi.number()
    });

    const result = schema.validate({ 
        owner_id: petData['owner_id'],
        animal: petData['animal'],
        petname: petData['petname'],
        color: petData['color'],
        avatar: petData['avatar'],
        food_storage: petData['food_storage']
     });

    if (result.error) {
        res.status(400).send(result.error.message);
        return;
    }

    // saving pet to the database
    let pet = new Pet(petData);
    pet.save();
    res.send(petData);
});

// update pet
app.put('/api/pets/update/:id', (req, res) => {

    let id = req.params.id;
    let updateData = {
        petname: req.body.petname,
        color: req.body.color,
        avatar: req.body.avatar
    }

    const schema = Joi.object({
        petname: Joi.string().min(3).max(20).required(),
        color: Joi.string().max(7),
        avatar: Joi.string().max(20)
    });

    const result = schema.validate({ 
        petname: updateData['petname'],
        color: updateData['color'],
        avatar: updateData['avatar']
     });

    if (result.error) {
        res.status(400).send(result.error.message);
        return;
    }

    // updating pet to the database
    var pet = new Pet(updateData);
    pet.update(id);
    res.send(pet);
});

// delete pet
app.delete('/api/pets/delete/:id', (req, res) => {

    let id = req.params.id;

    // deleting pet from the database
    var pet = new Pet();
    pet.delete(id);
    res.status(200).send("Deleted successfully!");
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});