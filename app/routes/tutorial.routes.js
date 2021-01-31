module.exports = app => {
    const tutorials = require("../../controllers/tutorial.controllers")

    var router = require("express").Router();

    //Create New Tutorial
    router.post("/", tutorials.create);

    //Retrieve all Tutorials
    router.get("/", tutorials.findAll);

    //Retrieve all published Tutorials
    router.get("/", tutorials.findAllPublished)

    //Retrieve a single Tutorial with id
    router.put("/:id", tutorials.findOne);

    //Update a Tutorial with id
    router.put("/:id", tutorials.update);

    //Delete a Tutorials with id
    router.delete("/:id" , tutorials.delete);

    //Create a new Tutorials
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
};
