const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const pets = [
    { id: 1, name: 'Rover'},
    { id: 2, name: 'Whiskers'},
    { id: 3, name: 'Tipi'}
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/pets', (req, res) => {
    res.send(pets);
});

app.get('/api/pets/:id', (req, res) => {
    const pet = pets.find(p => p.id === parseInt(req.params.id));
    if (!pet) res.status(404).send('The pet of the given ID was not found');
    res.send(pet);
});

app.post('/api/pets', (req, res) => {

    let owner_id = req.body.owner_id;
    let animal = req.body.animal;
    let petname = req.body.petname;
    let color = req.body.color;
    let avatar = req.body.avatar;
    let food_storage = req.body.food_storage;

    const schema = Joi.object({
        owner_id: Joi.number().required(),
        animal: Joi.string().required(),
        petname: Joi.string().min(3).max(20).required(),
        color: Joi.string().max(7),
        avatar: Joi.string().max(10),
        food_storage: Joi.number()
    });

    const result = schema.validate({ 
        owner_id: owner_id,
        animal: animal,
        petname: petname,
        color: color,
        avatar: avatar,
        food_storage: food_storage
     });

    if (result.error) {
        res.status(400).send(result.error.message);
        return;
    }

    const pet = {
        id: pets.length + 1,
        owner_id: owner_id,
        animal: animal,
        petname: petname,
        color: color,
        avatar: avatar,
        food_storage: food_storage
    };
    
    pets.push(pet);
    res.send(pet);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});