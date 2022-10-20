const express = require('express')
const router = express.Router()
module.exports = router
const fs = require('node:fs/promises')
const path = require('path')

router.get('/:id', (req, res) => {
  const filePath = path.join(__dirname, 'data.json')
  fs.readFile(filePath, 'utf-8')
    .then((data) => {
      console.log(data)
      const viewData = JSON.parse(data)
      const newData = viewData.movies.find((info) => info.id === +req.params.id)
      console.log(newData)
      res.render('details', newData)
    })
    .catch((err) => {
      console.error(err)
    })
})

// router.get('/:id/edit', (req, res) => {
//   const filePath = path.join(__dirname, 'data.json')
//   fs.readFile(filePath, 'utf-8')
//     .then((data) => {
//       const viewData = JSON.parse(data)
//       const newData = viewData.movies.find((info) => info.id === +req.params.id)
//       console.log(newData)
//       res.render('edit', newData)
//     })
//     .catch((err) => {
//       console.error(err)
//     })
// })
//res.se
