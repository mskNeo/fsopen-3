const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/info', (request, response) => {
  Person
    .find({})
    .then(people => {
      response.send(`There are ${people.length} entries in phonebook at ${new Date()}`)
    })
})

personsRouter.get('/', (request, response) => {
  Person
    .find({})
    .then(people => {
      response.json(people)
    })
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) response.json(person)
      else response.status(404).end()
    })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  // eslint-disable-next-line no-unused-vars
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body

  // if (!body.name || !body.number) {
  // 	return response.status(400).json({ error: 'missing content' })
  // }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      // response.json(result)
      Person
        .find({})
        .then(people => {
          response.json(people)
        })
    })
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  console.log(request.params.id)

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

module.exports = personsRouter