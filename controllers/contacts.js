/* Name: Maria Macias
StudentId: 301290835
Date: June 18th 2023
File name: controllers/contacts.js */
let express = require('express');
// create a reference to the model
let Contacts = require('../models/contacts');

module.exports.displayContactList = (req, res, next) => {
    try {
        Contacts.find(function (err, contacts) {
          res.render('contacts.ejs', { ContactsList: contacts })
        }).sort({name: 1});
      } catch(e) {
        console.log(e)
      }
}

module.exports.displayAddContact = (req, res, next) => {
    res.render('contactCreate.ejs')         
}

module.exports.processAddContact = (req, res, next) => {
    try {
        Contacts.create({
          name: req.body.name,
          email: req.body.email,
          number: req.body.number
        })
        res.redirect('/contacts')
      } catch {
        res.redirect('/contactCreate')
      }
}

module.exports.displayEditContact = (req, res, next) => {
    let id = req.params.id;
    Contacts.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('contactUpdate.ejs', {contact: contactToEdit})
        }
    });
}

module.exports.processEditContact = (req, res, next) => {
    let id = req.params.id
  
    let updatedContact = Contacts({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email,
    });

    Contacts.updateOne({_id: id}, updatedContact, (err) => {
        if(err) console.log(err);
        else res.redirect('/contacts');
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Contacts.deleteOne({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the contacts list
             res.redirect('/contacts');
        }
    });
}