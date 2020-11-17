import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import './style.css'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(people => {
        setPersons(people)
      })
  }, [])

  const handleNotification = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const deletePerson = (id) => {
    const willDelete = persons.find(person => person.id === id)
    
    if (window.confirm(`Delete ${willDelete.name}?`)) {
      personService.deletePerson(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          handleNotification(`Deleted ${willDelete.name}`)
        })
        .catch(() => {
          setPersons(persons.filter(p => p.id !== id))
          handleNotification(`${willDelete.name} not found in server`, 'error')
        })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNum
    }

    // check if name is in list already
    let namePresent = persons.find((d) => d.name === newName)

    if (namePresent) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = persons.find((d) => d.name === newName)
        personService
          .update(updatedPerson.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : updatedPerson))
            handleNotification(`${updatedPerson.name} has a new number!`)
            setNewName('')
            setNewNum('')
          })
          .catch(error => {
            console.log(error.response.data)
            handleNotification(`${updatedPerson.name} not found in server`, 'error')
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          handleNotification(`Added ${personObject.name}`)
          setNewName('')
          setNewNum('')
        })
        .catch(error => {
          console.log(error)
          handleNotification(`Make sure to run the database server`, 'error')
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumChange = (event) => setNewNum(event.target.value)

  const handleFilterChange = (event) => setFilter(event.target.value)

  
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

      <Filter 
        filter={filter} 
        handleChange={handleFilterChange} 
      />

      <h2>add a new</h2>
      <PersonForm
        submit={handleSubmit}
        name={newName}
        nameChange={handleNameChange}
        num={newNum}
        numChange={handleNumChange}
      />

      <h2>Numbers</h2>
      <Persons people={persons} filter={filter} deleteFunc={deletePerson} />
    </div>
  )
}

export default App