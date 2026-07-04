const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
  }
);

const Property = sequelize.define('Property', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // 'flats', 'land', 'rent'
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
  },
  bedrooms: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  bathrooms: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  zone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  access: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.STRING,
  }
});

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  avatar: { type: DataTypes.STRING, allowNull: true },
  kycStatus: { type: DataTypes.STRING, defaultValue: 'Unverified' },
  nidNumber: { type: DataTypes.STRING, allowNull: true },
  nidFrontUrl: { type: DataTypes.STRING, allowNull: true },
  nidBackUrl: { type: DataTypes.STRING, allowNull: true }
});

const Document = sequelize.define('Document', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  fileUrl: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: true },
  size: { type: DataTypes.STRING, allowNull: true }
});

const Contact = sequelize.define('Contact', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING },
  size: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  message: { type: DataTypes.TEXT, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false } // 'client' or 'landowner'
});

module.exports = { sequelize, Property, User, Contact, Document };
