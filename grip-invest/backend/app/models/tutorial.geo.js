module.exports = (sequelize, Sequelize) => {
  const UserLocation = sequelize.define("location", {
    country_code: {
      type: Sequelize.STRING,
    },
    country_name: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    postal: {
      type: Sequelize.STRING,
    },
    latitude: {
      type: Sequelize.STRING,
    },
    longitude: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    IPv4: {
      type: Sequelize.STRING,
    },
  });

  return UserLocation;
};
