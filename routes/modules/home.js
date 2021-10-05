const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const Sort = require('../../models/sort.json')

const options = Sort.results
const sortOption = {
  nameAsc: { name: 'asc' },
  nameDesc: { name: 'desc' },
  rating: { rating: 'desc'}
}

router.get('/', (req, res) => {
  Restaurant.find().lean().sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants, options}))
    .catch(err => console.log(err))
})

router.get('/search', (req, res) => {
  const { sort,keyword } = req.query
  Restaurant.find().lean().sort(sortOption[sort])
    .then(restaurants => {
      restaurants = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })
      return res.render('index', { restaurants, keyword, sort, options })
    })
    .catch(err => console.log(err))
})

module.exports = router
