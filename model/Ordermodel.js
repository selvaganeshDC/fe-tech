const { Sequelize } = require('sequelize');
const db = require('../config/db');
const { DataTypes } = Sequelize;

const Order = db.define('orders', {
    oid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    order_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'orders',
    timestamps: true, 
});

module.exports = Order;