// const express = require("express");
// const ejs = require("ejs");
// const bodyParser = require("body-parser");

// const app = express();
// const port = 8000;
// app.use(express.static('views'));
// app.use(bodyParser.urlencoded({ extended: true }));
// const path = require('path');
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// const secrets = [];

// app.get("/", (req, res) => {
//     res.render("home", { input: { name: "Tabish", secret: "I like nothing ", id: "0" } });
// });

// app.post('/', (req, res) => {
//     const name = req.body.name;
//     const secret = req.body.secret;
//     const input = {
//         id: secrets.length + 1,
//         name: name,
//         secret: secret
//     };

//     secrets.push(input);
//     res.render('home', { secrets: secrets }); // Pass the input object to the "home.ejs" template
// });


// app.get('/read/:id', (req, res) => {
//     const id = req.params.id;
//     if (secrets[id]) {
//         res.render('read', { secret: secrets[id] });
//     } else {
//         res.status(404).send('Secret not found');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));


// Define the secrets array in the global scope

app.get("/", (req, res) => {
  
    res.render("login");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
