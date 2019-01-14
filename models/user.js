module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, { underscored: true });

  // User.associate = (models) => {
  //   // associations can be defined here
  // };
  return User;
};
