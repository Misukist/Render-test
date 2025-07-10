import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    axios.post('http://localhost:3001/api/persons', newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (person && window.confirm(`Poistetaanko ${person.name}?`)) {
      axios.delete(`${'http://localhost:3001/api/persons'}/${id}`)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <form onSubmit={addPerson}>
        <div>
          nimi: <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          numero: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>

      <h2>Numerot</h2>
      <ul>
        {persons.map(person =>
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>poista</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App

