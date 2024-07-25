import { useEffect, useState } from "react";
import axios from "axios";
import { createPerson, deletePerson, updateNumber } from "./services/persons";
import { NotificationError, NotificationOk } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const samePerson = persons.find((person) => person.name === newName);

    if (samePerson) {
      const confirmUpdate = window.confirm(
        `${newName} already exists, do you want to update the number ?`
      );
      if (confirmUpdate) {
        updateNumber(samePerson.id, newNumber)
          .then((updatedPerson) => {
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            setMessage(`${newNumber} updated to ${samePerson.name}`);
            setTimeout(() => {
              setMessage("");
            }, 3000);
          })
          .catch((error) => {
            setPersons(persons.filter((n) => n.id !== samePerson.id));
            setErrorMessage(
              `${samePerson.name} was already deleted from database`
            );
            setTimeout(() => {
              setErrorMessage("");
            }, 3000);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString(),
      };
      setPersons(persons.concat(personObject));
      createPerson(personObject);
      setMessage(`${newName} added to phoneBook`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }

    setNewName("");
    setNewNumber("");
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

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${personToDelete.name} from phonebook ?`)) {
      deletePerson(id);
      setPersons(persons.filter((persons) => persons.id !== id));
    }
  };

  useEffect(() => {
    axios.get("/api/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter: <input type="text" onChange={handleFilterName} />
      </div>
      <div>filtered name: {filterName}</div>
      <h2>add a new</h2>
      {message != "" ? <NotificationOk message={message} /> : null}
      {errorMessage != "" ? <NotificationError message={errorMessage} /> : null}

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
          <button onClick={() => handleDeletePerson(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default App;
