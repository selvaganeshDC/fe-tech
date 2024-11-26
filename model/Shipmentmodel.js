const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const Order = require('./Ordermodel');
const Product = require('./Productmodel');

const Shipment = sequelize.define('Shipment', {
    sid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    shipment_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Order,
            key: 'order_id'
        }
    },
    product_id: { 
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Product,
            key: 'product_id'
        }
    },
    distributor_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    dispatch_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dispatch_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    transport: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'shipments',
    timestamps: true,  
});

// Define associations
Shipment.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
Shipment.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

module.exports = Shipment;
