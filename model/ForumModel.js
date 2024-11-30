const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;
const sequelize = require('../config/db');
const User = require('./UserModel');
const Forum = sequelize.define('Forum', {
    fid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'uid'
        }
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [10, 15],
        },
    },
    status: {
        type: DataTypes.ENUM('Not Taken', 'Taken'),
        allowNull: false,
        defaultValue: 'Not Taken'
    }
}, {
    tableName: 'forums',
    timestamps: true,
});

User.hasMany(Forum, {
    foreignKey: 'user_id',
    as: 'forums'
  });

  Forum.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
  });

module.exports = Forum;
