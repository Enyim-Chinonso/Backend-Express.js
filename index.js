const express = require('express');
const dotenv = require('dotenv');


const app = express();

dotenv.config(); 
const port = process.env.PORT;

app.get("/users", (req, res) => {
    res.send("Express server is up!");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// route param
app.get("/users/:id", (req, res) => {
    const userId = req.params.id;

    res.send(`The user id sent is ${userId}`);
});

// Query
app.get("/search", (req, res) => {
    const name = req.query.name;
    res.send(`Searching for ${name}`)
});
