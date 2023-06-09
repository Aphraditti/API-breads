const express = require('express')
const breads_router = express.Router()
const Bread = require('../models/bread.js')

// New
breads_router.get('/new', (req, res) => {
    res.render('new')
})

// Edit
breads_router.get('/:arrayIndex/edit', (req, res) => {
  res.render('edit', {
    bread: Bread[req.params.arrayIndex],
    index: req.params.arrayIndex,
  })
})

// Show
breads_router.get('/:arrayIndex', (req, res) => {
   // res.send(Bread[req.params.arrayIndex])
    if (Bread[req.params.arrayIndex]) {
        res.render('show', {
            bread: Bread[req.params.arrayIndex],
            index: req.params.arrayIndex,
        })
    } else {
        res.send('This index does not exist --> 404')
    }
})

// Update
breads_router.put('/:arrayIndex', (req, res) => {
  req.body.hasGluten = req.body.hasGluten === 'on'
  Bread[req.params.arrayIndex]= req.body
  res.redirect(`/breads/${req.params.arrayIndex}`)
})

// Delete
breads_router.delete('/:arrayIndex', (req, res) => {
  Bread.splice(req.params.arrayIndex, 1)
  res.status(303).redirect('/breads')
})


//Index
breads_router.get('/', (req, res) => {
    res.render('index', { 
        breads: Bread,
        title: 'Index'
    })
       
    // res.send(Bread)
})

// Create
breads_router.post('/', (req, res) => {
    if (!req.body.image) { // req.body.image === false || req.body.image === ""
      req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    }
    req.body.hasGluten = req.body.hasGluten === 'on'
    Bread.push(req.body)
    // res.send(Bread)
    res.redirect('/breads')  
  })

module.exports = breads_router