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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(people => {
      response.json(people);
    });
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) response.json(person)
      else response.status(404).end()
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

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

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(result => {
    Person
      .find({})
      .then(people => {
        response.json(people);
      });
  })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});