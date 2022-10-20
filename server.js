const express = require('express')
const hbs = require('express-handlebars')
const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))

//path setup
const path = require('path')

//require fs
const fs = require('node:fs/promises')

const movieRoute = require('./routes.js')

server.set('view engine', 'hbs')
server.use('/movies', movieRoute)

server.get('/', (req, res) => {
  // res.send('Pupparazzi')
  const filepath = path.join(__dirname, 'data.json')
  fs.readFile(filepath, 'utf-8')
    .then((data) => {
      console.log(typeof data)
      const viewData = JSON.parse(data)
      res.render('home', viewData)
    })
    .catch((err) => {
      console.error(err)
    })
})

module.exports = server
