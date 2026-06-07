const express = require("express");
const dotenv = require("dotenv");

const app = express();
// const PORT = 3000;
dotenv.config();
const PORT = process.env.PORT;

// My middleware code
app.use(express.json());

let students = [
  { id: 1, name: "Chinonso", track: "Fullstack" },
  { id: 2, name: "John", track: "Frontend" },
  { id: 3, name: "Amara", track: "UI/UX" },
];

// GET /
app.get("/", (req, res) => {
  res.send("Welcome to My first Express Student API");
});

// GET /students
app.get("/students", (req, res) => {
  res.send(students);
});

// GET /students/:id
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find((u) => u.id === id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.send(student);
});

// POST /students
app.post("/students", (req, res) => {
  const { name, track } = req.body;

  if (!name || !track) {
    return res.status(400).json({ error: "Name and track are required" });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    track,
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



