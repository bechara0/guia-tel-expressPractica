const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "3476-664650",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "3476-664651",
  },
  {
    id: 3,
    name: "Danb Abramov",
    number: "3476-664652",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "3476-664653",
  },
];

// Hacer get a persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// Haciendo el info
const info = persons.length;
const date = new Date();

app.get("/api/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${info} people</p><p>${date}<p>`);
});

// buscando por id
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// borrar por id
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

// agregar una persona
newId = Math.floor(Math.random() * 1000000);
app.post("/api/persons", (req, res) => {
  const body = req.body;
  const nameFilter = persons.find((person) => person.name === body.name);

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "content missing" });
  } else if (nameFilter) {
    return res.status(400).json({ error: "name must be unique" });
  }
  const person = {
    id: newId,
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  res.json(persons);
});

// configuracion express
const PORT = 3001;
app.listen(PORT);
console.log("Server running on port " + PORT);
