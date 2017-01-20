var express = require('express');
var router = express.Router();
var DocumentModel = require('../Model/DocumentModel');
var mongoose = require('mongoose');
var JsonDocument = require('../JsonDocument')
var Client = require('node-rest-client').Client;

router.post('/', function(req, res, next) {
  //console.log(req.body.short_description);

  var options_auth = { user: "sajva", password: "Sajva@123" };
  var client = new Client(options_auth);
  var curDate = new Date();

  var args = {
      data: { short_description: req.body.short_description + ". Message sent @ " + curDate.toString() },
      headers: { "Content-Type": "application/json", "Accept": "application/json" }
  };

  client.post("https://dev19739.service-now.com/api/now/v2/table/incident", args, function (data, response) {
      res.status(200).send({msg: 'Document saved successfully.', result: data});
  });
});

module.exports = router;
