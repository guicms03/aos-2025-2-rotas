// api/models/message.js
export default (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Message;
};
