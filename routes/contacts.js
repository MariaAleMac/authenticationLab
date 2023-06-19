/* Name: Maria Macias
StudentId: 301290835
Date: June 18th 2023
File name: routes/contacts.js */
let express = require('express');
let router = express.Router();

let contactsController = require('../controllers/contacts');

/* GET Route for the Contacts List page - READ Operation */
router.get('/', checkAuthenticated, contactsController.displayContactList);

/* GET Route for the Contacts List page - READ Operation */
router.get('/add', checkAuthenticated, contactsController.displayAddContact);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', checkAuthenticated, contactsController.processAddContact);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', checkAuthenticated, contactsController.displayEditContact);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', checkAuthenticated, contactsController.processEditContact);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', checkAuthenticated, contactsController.performDelete);
  
function checkNotAuthenticated(req, res, next) {
if (req.isAuthenticated()) {
    return res.redirect('/')
}
next()
}

function checkAuthenticated(req, res, next) {
if (req.isAuthenticated()) {
    return next()
}
res.redirect('/login')
}


module.exports = router;