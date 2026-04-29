const sequelize = require('../database/sequelize');
const Usuario = require('./Usuario');
const Livro = require('./Livro');
const Emprestimo = require('./Emprestimo');
const Multa = require('./multa');

Emprestimo.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Emprestimo.belongsTo(Livro, { foreignKey: 'livro_id' });
Multa.belongsTo(Emprestimo, { foreignKey: 'emprestimo_id' });

Usuario.hasMany(Emprestimo, { foreignKey: 'usuario_id' });
Livro.hasMany(Emprestimo, { foreignKey: 'livro_id' });
Emprestimo.hasMany(Multa, { foreignKey: 'emprestimo_id' });

module.exports = {
    sequelize,
    Usuario,
    Livro,
    Emprestimo,
    Multa
};