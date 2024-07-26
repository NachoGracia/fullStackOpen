const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const PersonSchema = require("./models/person").schema;
const errorHandler = require("./middlewares/errorHandler");

app.use(express.static("dist"));
app.use(cors());

app.use(bodyParser.json());
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(morgan("tiny"));

app.use(morgan(":body"));

//!------------------MONGO------------------!//

const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const PhoneNumber = mongoose.model("PhoneNumber", PersonSchema);

//!------------------MONGO------------------!//

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/info", (request, response) => {
  let totalPersons = persons.length;
  const responseDate = new Date();

  response.send(
    `<p>Phonebook has info for ${totalPersons} people</p>
    <p>${responseDate}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  PhoneNumber.find({}).then((persons) => {
    response.json(persons);
  });
});

const generateId = () => {
  return Math.floor(Math.random() * 10000000);
};

app.post(`/api/persons`, async (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "name missing" });
  } else if (!body.number) {
    return response.status(400).json({ error: "number missing" });
  } else {
    try {
      const samePerson = await PhoneNumber.findOne({ name: body.name });

      if (samePerson) {
        return response.status(404).json({ error: "name must be unique" });
      }

      const person = new PhoneNumber({
        name: body.name,
        number: body.number,
      });

      const savedPerson = await person.save();

      response.json(savedPerson);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }
});

app.get("/api/persons/:id", (request, response, next) => {
  PhoneNumber.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })

    .catch((error) => next(error));
});

app.delete(`/api/persons/:id`, (request, response) => {
  const id = request.params.id;

  PhoneNumber.findByIdAndDelete(id)
    .then((deletedPerson) => {
      if (deletedPerson) {
        response.status(204).end();
      } else {
        response.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => {
      response.status(500).json({ error: "Server error" });
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.use(errorHandler);
