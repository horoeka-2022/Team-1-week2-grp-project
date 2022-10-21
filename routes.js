const express = require('express')
const router = express.Router()
module.exports = router
const fs = require('node:fs/promises')
const path = require('path')

const filePath = path.join(__dirname, 'data.json')

router.get('/:id', (req, res) => {
  fs.readFile(filePath, 'utf-8')
    .then((data) => {
      // console.log(data)
      const viewData = JSON.parse(data)
      const newData = viewData.movies.find((info) => info.id === +req.params.id)
      // console.log(newData)
      res.render('details', newData)
    })
    .catch((err) => {
      console.error(err)
    })
})

router.post('/:id', async (req, res) => {
  const movieId = req.params.id
  const newComment = `${req.body.name}: ${req.body.comment}`
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    const jsonData = JSON.parse(data)
    let selectedMovie = jsonData.movies.find((el) => el.id == movieId)
    const remainingMovie = jsonData.movies.filter((el) => el.id != movieId)
    selectedMovie.comments.push(newComment)
    const newObj = {
      movies: [...remainingMovie],
    }
    newObj.movies.push(selectedMovie)
    const dataStringify = JSON.stringify(newObj, null, 2)
    try {
      await fs.writeFile(filePath, dataStringify, 'utf-8')
    } catch (error) {
      console.log(error.message)
    }
    res.redirect(`/movies/${movieId}`)
  } catch (error) {
    console.log(error.message)
  }
})
