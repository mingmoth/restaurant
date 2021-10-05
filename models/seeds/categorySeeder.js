const Category = require('../category')
const db = require('../../config/mongoose')

const categories = [
  {
    "name": "中東料理",
  },
  {
    "name": "日本料理",
  },
  {
    "name": "義式餐廳",
  },
  {
    "name": "美式餐廳",
  },
  {
    "name": "酒吧",
  },
  {
    "name": "咖啡廳",
  }
]

db.once('open', () => {
  Category.create(categories)
    .then(() => {
      console.log('Category Seed Done')
    })
    .catch(err => console.log(err))
})
