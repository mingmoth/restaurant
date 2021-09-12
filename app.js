const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

const restaurantList = require('./restaurant.json')

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  console.log(restaurants)
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurants = restaurantList.results.filter((restaurants) => restaurants.id == req.params.restaurant_id)

  restaurants.forEach(restaurant => {
    // console.log(restaurant)
    res.render('show', {restaurant: restaurant})
  })
  
  
  // res.render('show', { restaurant: restaurant[0] })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})