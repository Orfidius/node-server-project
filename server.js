const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); // app.use is used to use middleware, express.static is used to serve up static pages + folders. __dirname comes form the wrapper function

app.use((req, res, next) => {

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(`${now}: ${req.method} ${req.url}`);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // req stores information that comes in
    // res has methods to help respond to the HTTP request 
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Home page, sucker'
    });
});

app.get('/about', (req, res) => {

    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});
app.get('/bad', (req, res) => {


    res.send({
        errorMessage: "I Don't Know Mang, Its just bad"
    });
});



app.listen(3000);