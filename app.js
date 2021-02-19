const express = require('express');
const app = express();

app.use(express.json());

const pets = [
    { id: 1, name: 'Rover'},
    { id: 2, name: 'Whiskers'},
    { id: 3, name: 'Tipi'}
]
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
    const pet = {
        id: pets.length + 1,
        name: req.body.name
    };
    pets.push(pet);
    res.send(pet);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});