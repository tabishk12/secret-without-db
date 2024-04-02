const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 8000;

app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

function requireLogin(req, res, next) {
    if (req.path === '/login' || req.path === '/logout') {
        return next();
    }

    if (req.session.loggedIn) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

app.use(requireLogin);

const email = "yourEmail@gmail.com";
const password = "yourpassword";

// Define the secrets array in the global scope
const secrets = [{
    id: uuidv4(),
    name: "Tabish",
    secret: "I like nothing "
}];

app.get("/", (req, res) => {
    res.render("home", { loggedIn: req.session.loggedIn, secrets: secrets });
});

app.post('/', requireLogin, (req, res) => {
    const name = req.body.name;
    const secret = req.body.secret;

    const input = {
        id: uuidv4(),
        name: name,
        secret: secret
    };
    secrets.push(input);
    res.redirect('/');
});

app.get("/login", (req, res) => {
    res.render("home");
});

app.post('/login', (req, res) => {
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;

    if (inputEmail === email && inputPassword === password) {
        console.log('Login successful');
        req.session.loggedIn = true;
        res.redirect('/');
    } else {
        console.log('Login failed');
        req.session.loggedIn = false;
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

app.get('/read/:id', (req, res) => {
    const id = req.params.id;
    const secret = secrets.find(s => s.id === id);
    if (secret) {
        res.render('read', { secret: secret });
    } else {
        res.status(404).send('Secret not found');
    }
});

app.get('/delete/:id', (req, res) => {
    const secretIdToDelete = req.params.id;
    const secretIndex = secrets.findIndex(secret => secret.id === secretIdToDelete);

    if (secretIndex !== -1) {
        secrets.splice(secretIndex, 1);
    } else {
      res.render("error");
    }
});

app.post('/delete/:id', (req, res) => {
    const secretIdToDelete = req.params.id;
    const secretIndex = secrets.findIndex(secret => secret.id === secretIdToDelete);

    if (secretIndex !== -1) {
        secrets.splice(secretIndex, 1);
        return res.redirect("/");
    } else {
        res.render("error");    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
