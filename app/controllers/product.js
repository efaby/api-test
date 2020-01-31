'use strict'

const Product = require('../models/product')
const Client = require('../models/client')

function getProduct (req, res) {
  let productId = req.params.productId
  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `Error making the request: ${err}`})
    if (!product) return res.status(404).send({message: `The product does not exist!`})
    res.status(200).send({ product })
  })
}

function getProducts (req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({message: `Error making the request: ${err}`})
    if (!products) return res.status(404).send({message: 'There are no products'})
    res.status(200).send({ products })
  })
}

function saveProduct (req, res) {
  let product = new Product()
  setData(product, req);
  product.save((err, productStored) => {
    if (err) return res.status(500).send({message: `Error saving in the database: ${err} `})
    res.status(200).send({ product: productStored })
  })
}

function updateProduct (req, res) {
  let productId = req.params.productId
  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `Error making the request: ${err}`})
    if (!product) return res.status(404).send({message: `The product does not exist!`})
    setData(product, req);
    product.save((err, productStored) => {
    if (err) return res.status(500).send({message: `Error updating the product: ${err}`})
      res.status(200).send({ product: productStored })
    })
  })
}

function registerSale (req, res) {
  let productId = req.params.productId
  Product.findByIdAndUpdate(
      productId,
      { $push: { sales: req.body.clientId } },
      { new: true, useFindAndModify: false }
    ).then((productStored) => {
      res.status(200).send({ product: productStored })
    })
}

function getSales (req, res) {
  let productId = req.params.productId
  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `Error making the request: ${err}`})
    if (!product) return res.status(404).send({message: `The product does not exist!`})
      var counts = {};
      product.sales.forEach((x) => { counts[x] = (counts[x] || 0)+1; });
      let salesData = []
      let promises = []
      for (var key in counts) {
        let promise = Client.findById(key)
        promises.push(promise)
        promise.then((client) => {
          salesData.push({id: client._id, age: client.age, times: counts[client._id] })
        });
      }
      Promise.all(promises).then(() => {
        res.status(200).send({ product: {salesData, name: product.name, id: product._id} })
      })
    
  })
}

function setData(product, req) {
  if(!req.body) {
      return res.status(400).send({
          message: "Product content can not be empty"
      });
  }
  product.name = req.body.name
  product.category = req.body.category
  product.description = req.body.description
}

function deleteProduct (req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `Error deleting the product: ${err}`})
    if (!product) return res.status(404).send({message: `The product does not exist!`})
    product.remove(err => {
      if (err) return res.status(500).send({message: `Error deleting the product: ${err}`})
      res.status(200).send({message: 'Product successfully deleted!'})
    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
  registerSale,
  getSales
}