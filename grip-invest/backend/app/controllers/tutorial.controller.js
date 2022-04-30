const db = require("../models");
const Loan = db.LOAN;
const UserLocation = db.UserLocation;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({
      message: "UserId can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const loan = {
    userId: req.body.userId,
    amount: req.body.amount,
    duration: req.body.duration,
    interest: req.body.interest,
  };

  // Save Tutorial in the database
  Loan.create(loan)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Loan.",
      });
    });
};

// Create and Save a new Tutorial
exports.location = (req, res) => {
  // Create a Tutorial
  const loan = req.body;
  console.log(loan);
  // Save Tutorial in the database
  UserLocation.create(loan)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Loan.",
      });
    });
};

// // Find a all loan with an id
exports.findOne = (req, res) => {
  const id = req.params.userId;

  Loan.findAll({
    where: {
      userId: id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Loan with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const amount = req.params.amount;

  Loan.update(
    { amount: amount },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Loan was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Loan with id=${id}. Maybe Loan was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Loan with id=" + id,
      });
    });
};
