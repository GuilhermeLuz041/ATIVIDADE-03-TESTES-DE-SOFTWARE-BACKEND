const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Emprestimo = sequelize.define('Emprestimo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data_emprestimo: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_devolucao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  livro_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'emprestimos',
  timestamps: true,
  underscored: false,
});

module.exports = Emprestimo;
