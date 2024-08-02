require("dotenv").config();
const app = require("./app");

const bodyParser = require("body-parser");
const morgan = require("morgan");

const PersonSchema = require("./models/person").schema;

app.use(bodyParser.json());
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(morgan("tiny"));

app.use(morgan(":body"));

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
