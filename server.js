const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });


    next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});


app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenenace Page',
        welcomeMessage: 'Busy with maintenance',
        // currentYear: new Date().getFullYear()
    });
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
        // currentYear: new Date().getFullYear()
    });
    // res.send({
    //     name: 'Jurie',
    //     likes: [
    //         'biking',
    //         'Cities'
    //     ]
    // });
});

app.get('/about', (req, res) => {
    //res.send('<h1>About Page</h1>');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        // currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error message'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});