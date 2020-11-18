require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();
app.use(express.static('build'));
app.use(express.json());
app.use(cors());

morgan.token('body', (req) => {
  if (req.method === 'POST') return JSON.stringify(req.body);
  else return '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(people => {
      response.json(people);
    });
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(p => p.id === id);

  if (person) response.json(person)
  else response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(p => p.id === id);
  
  if (person) {
    persons = [...persons.filter(p => p.id !== id)];
    response.json(persons)
  }
  else response.status(400).end();
})

// post data functions
const generateID = () => {
  const maxID = persons.length > 0
    ? Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    : 0
  return maxID + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'missing name'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'missing number'
    })
  }

  if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateID()
  }

  persons = persons.concat(person);

  response.json(persons);
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});