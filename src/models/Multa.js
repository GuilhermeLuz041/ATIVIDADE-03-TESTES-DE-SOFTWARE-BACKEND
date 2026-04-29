const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Multa = sequelize.define('Multa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 'pendente',
  },
  data_pagamento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  emprestimo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'multas',
  timestamps: true,
  underscored: false,
});

module.exports = Multa;