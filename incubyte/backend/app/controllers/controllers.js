const db = require("../models");
const Incubyte = db.incubyte;

// Create and Save a new Word
exports.create = (req, res) => {
  // Validate request
  if (!req.body.word) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Word
  const incubyte = new Incubyte({
    word: req.body.word,
  });
  // Save Word in the database
  incubyte
    .save(incubyte)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the data.",
      });
    });
};

// Retrieve all Words from the database.
exports.findAll = (req, res) => {
  const word = req.query.word;
  var condition = word
    ? { word: { $regex: new RegExp(word), $options: "i" } }
    : {};

  Incubyte.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

// Find a single Word with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Incubyte.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found data with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving data with id=" + id });
    });
};

// Update a Word by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Incubyte.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update word with id=${id}. Maybe word was not found!`,
        });
      } else res.send({ message: "Word was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating word with id=" + id,
      });
    });
};

// Delete a Word with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Incubyte.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete word with id=${id}. Maybe word was not found!`,
        });
      } else {
        res.send({
          message: "Word was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete word with id=" + id,
      });
    });
};

// Delete all Words from the database.
exports.deleteAll = (req, res) => {
  Incubyte.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} word were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all words.",
      });
    });
};
