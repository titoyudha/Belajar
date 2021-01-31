const db = require ("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

//Create and Save
exports.create = (req, res) => {
    //Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }

    //Create a tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    //Save Tutorial in database
    Tutorial.create(tutorial)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some eror occured while creating the Tutorial."
        });
    });
};

//Retrive all
exports.findAll = (req, res) => {
    const title = req.querry.title;
    var condition = title ? {title: { [Op.iLike]: '%${title}%'} } : null;

    Tutorial.findAll({where: condition})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving tutorials."
        });
    });
};

//Find a Single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Tutorial with id=" + id
        });
    });
};

//Update a Tutorial by the Id
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: {id: id}
    })
    .then(num => {
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
};

//Delete a Tutorial with specific Id
exports.delete = (req, res) => {
    const id = req.params.id

    Tutorial.destroy({
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Tutorial was deleted successfully!"
            });
        } else {
            res.send({
                message: 'Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
        });
    });
};

//Delete all Tutorials from DataBase
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message:`${nums} Tutorials were deleted successfully!`});
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while removing all tutorials."
        });
    });
};

//FInd all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};