const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(morgan("tiny"));

app.use(morgan(":body"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/info", (request, response) => {
  let totalPersons = persons.length;
  const responseDate = new Date();

  response.send(
    `<p>Phonebook has info for ${totalPersons} people</p>
    <p>${responseDate}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get(`/api/persons/:id`, (request, response) => {
  const id = Number(request.params.id);

  const person = persons.find((person) => person.id === id);

  person ? response.json(person) : response.status(404).end();
});

app.delete(`/api/delete/:id`, (request, response) => {
  const id = Number(request.params.id);
  const personsNotDeleted = persons.filter((person) => person.id !== id);
  personsNotDeleted
    ? response.json(personsNotDeleted)
    : response.status(404).end();
});

const generateId = () => {
  return Math.floor(Math.random() * 10000000);
};

app.post(`/api/persons`, (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "name missing" });
  } else if (!body.number) {
    return response.status(400).json({ error: "number missing" });
  } else {
    const samePerson = persons.find((person) => person.name === body.name);
    if (samePerson) {
      return response.status(404).json({ error: "name must be unique" });
    }
    const newPerson = {
      name: body.name,
      number: body.number,
      id: generateId(),
    };
    persons = persons.concat(newPerson);
    response.json(persons);
  }
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
