const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const Category = require('../../models/category')
// display new page
router.get('/new', (req, res) => {
  Category.find().lean()
    .then(categories => res.render('new', {categories}))
})

// Save create restaurant
router.post('/', (req, res) => {
  const { name, name_en, category, rating, location, google_map, phone, image, description } = req.body
  // return Restaurant.create({ name, name_en, category, rating, location, google_map, phone, image, description })

  // 因為 req.body 物件的屬性和 Restaurant 的 Schema 一樣，所以可以直接將 req.body 當作參數塞給 Restaurant.create ()，不需要先解構再塞回去
  return Restaurant.create(req.body)
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
  Category.find().lean()
    .then(categories => {
      Restaurant.findById(id).lean()
      .then(restaurant => res.render('edit', {restaurant, categories}))
    })
    .catch(err => console.log(err))
})

// Save edit results
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, rating, location, google_map, phone, image, description } = req.body
  Restaurant.findById(id)
    .then((restaurant) => {
      // restaurant.name = name
      // restaurant.name_en = name_en
      // restaurant.category = category
      // restaurant.image = image
      // restaurant.location = location
      // restaurant.phone = phone
      // restaurant.google_map = google_map
      // restaurant.rating = rating
      // restaurant.description = description

      // 透過 Object.assign 來將 req.body 當中的資料跟 restaurant 當中有同樣 key 的資料做合併 
      restaurant = Object.assign(restaurant, req.body)
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
