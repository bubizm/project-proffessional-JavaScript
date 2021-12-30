const express = require('express')
const path = require('path')
const fs = require('fs')
const { resolve } = require('path')
const app = express()

const port = 3000
const catalog_path = path.resolve(__dirname, './data/showcase.json')
const cart_path = path.resolve(__dirname, './data/cart.json')
const addToBasket_path = path.resolve(__dirname, './data/addToBasket.json')
const deleteFromBasket_path = path.resolve(__dirname, './data/deleteFromBasket.json')
const static_dir = path.resolve(__dirname, './public/')

app.use(express.static(static_dir))
app.use(express.json())

app.get('/api/v1/showcase', (req, res) => {
  new Promise((resolve, reject) => {
    fs.readFile(catalog_path, 'utf-8', (reject, resolve) => {
      if (!reject) {
        res.send(resolve);
      } else {
        res.status(500).send(reject);
      }
    })
    })
})

app.get('/api/v1/cart', (req, res) => {
  new Promise((resolve, reject) => {
    fs.readFile(cart_path, 'utf-8', (reject, resolve) => {
      if (!reject) {
        res.send(resolve);
      } else {
        res.status(500).send(reject);
      }
    })
  })
})

app.post('/api/v1/cart', (req, res) => {
  new Promise((resolve, reject) => {
    fs.readFile(cart_path, 'utf-8', (reject, resolve) => {
      if(!reject) {
        console.log(req.body)
        const cart = JSON.parse(resolve);
        cart.push(req.body);
        fs.writeFile(cart_path, JSON.stringify(cart), 'utf-8', (reject, resolve) => {
          res.sendStatus(201)
        })
      } else {
        res.status(500).send(reject)
      }
  })
})
})

app.get('/api/v1/addToBasket', (req, res) => {
  new Promise((resolve, reject) => {
    fs.readFile(addToBasket_path, 'utf-8', (reject, resolve) => {
      if(!reject) {
          res.send(resolve);
      }
      else {
        res.status(500).send(reject)
      }
  })
  })
})

app.get('/api/v1/deleteFromBasket', (req, res) => {
  new Promise((resolve, reject) => {
    fs.readFile(deleteFromBasket_path, 'utf-8', (reject, resolve) => {
      if(!reject) {
          res.send(resolve);
      }
      else {
        res.status(500).send(reject)
      }
  })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
