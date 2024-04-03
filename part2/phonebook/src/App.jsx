import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} already exists`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterName = (event) => {
    const enteredName = event.target.value.toLowerCase();
    if (
      persons.map((person) => person.name.toLowerCase()).includes(enteredName)
    ) {
      setFilterName(enteredName);
    } else {
      setFilterName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter: <input type="text" onChange={handleFilterName} />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input type="text" value={newName} onChange={handleNewName} />
        </div>
        <div>
          number:
          <input type="text" value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>
          name: {person.name} number: {person.number}
        </p>
      ))}
      <div>debug filter name: {filterName}</div>
    </div>
  );
};

export default App;
