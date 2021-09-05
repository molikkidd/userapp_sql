// set up local server
const express =  require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const ejsLayouts = require('express-ejs-layouts');
// allows us to use POST AND DELETE in HTML5
const methodOverride = require('method-override');
// select Port entry 
const PORT = process.env.PORT || 8001;

// render ejs pages
app.set('view engine', 'ejs');
app.use(ejsLayouts);
// add css styling and images to application
app.use(express.static(__dirname + '/public'));
// allows us to store form data in the req.body so it can be use on the page
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
// IMPORT USERS FROM DATABASE
const { user } = require('./models');

app.get('/', (req,res) => {
    res.send('User app Connecting Sequelize and Express')
})

// findall users from the database
app.get('/users', async (req,res) => {
  // you have to map thru the array first then toJSON each object
    try {
        const allUsers = await user.findAll({});
        const parsedUsers = allUsers.map(u => u.toJSON());
        // console.log(parsedUsers);
        res.render('./users/index', {users: parsedUsers});
    } catch (error) {
        console.log(error)
    }
});

app.listen(PORT, function() {
    console.log('You are Docked at PORT:', PORT);
});