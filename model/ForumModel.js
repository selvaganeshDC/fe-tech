const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;
const sequelize = require('../config/db');

const Forum = sequelize.define('Forum', {
    fid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    distributor_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
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
}, {
    tableName: 'forums',
    timestamps: true,
});

module.exports = Forum;
