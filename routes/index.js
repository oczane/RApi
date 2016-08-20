var express = require('express');
var router = express.Router();
var DocumentModel = require('../Model/DocumentModel');
var mongoose = require('mongoose');
var JsonDocument = require('../JsonDocument')

//Get uploaded json by ObectId
router.get('/:id', function(req, res, next) {
  //Check if correct object id
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(200).send({data: '', error: 1, errorMessage: 'Invalid document id' });
  }
  else {
    DocumentModel.findById(req.params.id, function(err, document) {
      if (err) {
        console.log(err);
        return;
      }
      res.status(200).send({data: document.JsonDocument, error: 0, errorMessage: '' });
    });
  }
});

//Post uploaded json
router.post('/', function(req, res, next) {
  var documentCustomUrl = req.protocol + '://' + req.headers.host + '/v1/api/doc/';

  if (!JsonDocument.IsValidJson(req.body.jsondocument)) {
    res.status(200).send({data: '', error: 1, errorMessage: 'Invalid JSON data' });
  }
  else {
    var document = new DocumentModel();

    document.JsonDocument  = JSON.parse(req.body.jsondocument);

    document.save(function(err) {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).send({msg: 'Document saved successfully.', documentUrl: documentCustomUrl + document._id });
  }
});

module.exports = router;
