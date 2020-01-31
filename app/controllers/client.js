'use strict'

const Client = require('../models/client')

function getClient (req, res) {
  let clientId = req.params.clientId
  Client.findById(clientId, (err, client) => {
    if (err) return res.status(500).send({message: `Error making the request: ${err}`})
    if (!client) return res.status(404).send({message: `The client does not exist!`})
    res.status(200).send({ client })
  })
}

function getClients (req, res) {
  Client.find({}, (err, clients) => {
    if (err) return res.status(500).send({message: `Error making the request: ${err}`})
    if (!clients) return res.status(404).send({message: 'There are no clients'})
    res.status(200).send({ clients })
  })
}

function saveClient (req, res) {
  let client = new Client()
  setData(client, req);
  client.save((err, clientStored) => {
    if (err) return res.status(500).send({message: `Error saving in the database: ${err} `})
    res.status(200).send({ client: clientStored })
  })
}

function updateClient (req, res) {
  let clientId = req.params.clientId
  Client.findById(clientId, (err, client) => {
    if (err) return res.status(500).send({message: `Error making the request: ${err}`})
    if (!client) return res.status(404).send({message: `The client does not exist!`})
    setData(client, req);
    client.save((err, clientStored) => {
    if (err) return res.status(500).send({message: `Error updating the client: ${err}`})
      res.status(200).send({ client: clientStored })
    })
  })
}

function setData(client, req) {
  if(!req.body) {
      return res.status(400).send({
          message: "Client content can not be empty"
      });
  }
  client.name = req.body.name
  client.age = req.body.age
}

function deleteClient (req, res) {
  let clientId = req.params.clientId

  Client.findById(clientId, (err, client) => {
    if (err) return res.status(500).send({message: `Error deleting the client: ${err}`})
    if (!client) return res.status(404).send({message: `The client does not exist!`})
    client.remove(err => {
      if (err) return res.status(500).send({message: `Error deleting the client: ${err}`})
      res.status(200).send({message: 'Client successfully deleted!'})
    })
  })
}

module.exports = {
  getClient,
  getClients,
  saveClient,
  updateClient,
  deleteClient
}