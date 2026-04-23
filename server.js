const express = require("express");
const fs = require("fs");
const path = require("path");
const dotenv = require('dotenv');
const bcrypt = require("bcrypt");

dotenv.config(); 

const app = express();

const port = process.env.PORT || 7000;

// Middleware
app.use(express.json());

const userfile = path.join(__dirname, "users.json");

// function to load users from user.json
function loadUsers() {
    if(!fs.existsSync(userfile)) {
        return [];
    }
    const data = fs.readFileSync(userfile, "utf-8");
    return data ? JSON.parse(data) : [];
}

// function to save users to user.json
function saveUsers(users) {
    fs.writeFileSync(userfile, JSON.stringify(users, null, 2));
}

app.get("/", (req, res) => {
    res.send("Welcome to user management system")
});

// Register a new user
app.post("/register", (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    const users = loadUsers();

    const userExists = users.find(user => user.email === email);

    if(userExists) {
        return res.status(409).json({message: "User already exists"});
    }

    // Harsh password
    const hashedPassword = bcrypt.hashSync(password, 10)

    // const saltRounds = 10;
//    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword
    };
//     const saltRounds = 10;
//    const hashedPassword = bcrypt.hashSync(password, saltRounds);


    // const newUser = {
    //     id: users.length + 1,
    //     name,
    //     email,
    //     password
    // }

    users.push(newUser);
    saveUsers(users);

    res.status(201).json({message: "User registration was successful", user: newUser})
    });


    // update user
    app.patch("/users/:id", (req, res) => {
        const {id} = req.params;

        const {name, email} = req.body;

        const users = loadUsers();

        let user = users.find(u => u.id === id)

        if(!user) {
            return res.status(404).json({message: `User with this id: ${id} does not exist`});
        }

        if(name) user.name = name;
        if(email) user.email = email;

        saveUsers(users);

        res.status(200).json({message: "User updated successfully", user});
    });


    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
