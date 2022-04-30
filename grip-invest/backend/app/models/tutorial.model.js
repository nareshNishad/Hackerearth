module.exports = (sequelize, Sequelize) => {
  const LOAN = sequelize.define("loan", {
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    interest: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "10%",
    },
  });

  return LOAN;
};
