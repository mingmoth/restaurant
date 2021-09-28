const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// display new page
router.get('/new', (req, res) => {
  res.render('new')
})

// Save create restaurant
router.post('/', (req, res) => {
  const { name, name_en, category, rating, location, google_map, phone, image, description} = req.body
  return Restaurant.create({ name, name_en, category, rating, location, google_map, phone, image, description })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// display detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  // console.log(id)
  Restaurant.findById(id).lean()
    .then((restaurant) => {
      // console.log(restaurant)
      res.render('show', { restaurant })
    })
    .catch(err => console.log(err))
})

// display edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id).lean()
    .then(restaurant => res.render('edit', {restaurant}))
    .catch(err => console.log(err))
})

// Save edit results
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, rating, location, google_map, phone, image, description } = req.body
  Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

// Delete restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
