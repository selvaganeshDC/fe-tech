const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;
const sequelize = require('../config/db');
const User = require('./Usermodel');

const UserProfile = sequelize.define('UserProfile', {
  profile_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique : true,
    references: {
      model: User,
      key: 'uid'
    }
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  credit_limit: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    defaultValue: 0.00
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  landmark: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'user_profiles',
  timestamps: true,
  indexes: [
    {
      unique: false,
      fields: ['user_id']
    }
  ]
});

// Associations
User.hasOne(UserProfile, { 
  foreignKey: 'user_id', 
  as: 'profile', 
  onDelete: 'CASCADE' 
});
UserProfile.belongsTo(User, { 
  foreignKey: 'user_id', 
  as: 'user' 
});

module.exports = UserProfile;