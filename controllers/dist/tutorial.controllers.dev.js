"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = require("../models");

var Tutorial = db.tutorials;
var Op = db.Sequelize.Op; //Create and Save

exports.create = function (req, res) {
  //Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty"
    });
    return;
  } //Create a tutorial


  var tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  }; //Save Tutorial in database

  Tutorial.create(tutorial).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some eror occured while creating the Tutorial."
    });
  });
}; //Retrive all


exports.findAll = function (req, res) {
  var title = req.querry.title;
  var condition = title ? {
    title: _defineProperty({}, Op.iLike, '%${title}%')
  } : null;
  Tutorial.findAll({
    where: condition
  }).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some error occured while retrieving tutorials."
    });
  });
}; //Find a Single Tutorial with an id


exports.findOne = function (req, res) {
  var id = req.params.id;
  Tutorial.findByPk(id).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id
    });
  });
}; //Update a Tutorial by the Id


exports.update = function (req, res) {
  var id = req.params.id;
  Tutorial.update(req.body, {
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: "Tutorial was updated sucessfully."
      });
    } else {
      res.send({
        message: 'Cannot update e Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!'
      });
    }
  });
}; //Delete a Tutorial with specific Id


exports["delete"] = function (req, res) {
  var id = req.params.id;
  Tutorial.destroy({
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: "Tutorial was deleted successfully!"
      });
    } else {
      res.send({
        message: 'Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!'
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: "Could not delete Tutorial with id=" + id
    });
  });
}; //Delete all Tutorials from DataBase


exports.deleteAll = function (req, res) {
  Tutorial.destroy({
    where: {},
    truncate: false
  }).then(function (nums) {
    res.send({
      message: "".concat(nums, " Tutorials were deleted successfully!")
    });
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some error occured while removing all tutorials."
    });
  });
}; //FInd all published Tutorials


exports.findAllPublished = function (req, res) {
  Tutorial.findAll({
    where: {
      published: true
    }
  }).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  });
};