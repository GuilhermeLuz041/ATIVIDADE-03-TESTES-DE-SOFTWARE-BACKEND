const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');

const criarUsuario = async (nome, email, senha, role) => {
  const hashSenha = await bcrypt.hash(senha, 10);
  const usuario = await Usuario.create({ nome, email, senha: hashSenha, role });
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    role: usuario.role
  };
};

const listarUsuarios = async () => {
  const usuarios = await Usuario.findAll({
    attributes: ['id', 'nome', 'email', 'role']
  });
  return usuarios;
};

const buscarUsuarioID = async (id) => {
  const usuario = await Usuario.findByPk(id, {
    attributes: ['id', 'nome', 'email', 'role']
  });
  return usuario;
};

const buscarUsuarioPorEmail = async (email) => {
  const usuario = await Usuario.findOne({ where: { email } });
  return usuario;
}

const atualizarUsuario = async (id, dadosAtualizados) => {
  const usuario = await Usuario.findByPk(id);
  
  if (dadosAtualizados.senha) {
    dadosAtualizados.senha = await bcrypt.hash(dadosAtualizados.senha, 10);
  }
  
  await usuario.update(dadosAtualizados);
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    role: usuario.role
  };
};

const deletarUsuario = async (id) => {
  await Usuario.destroy({ where: { id } });
};

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioID,
  buscarUsuarioPorEmail,
  atualizarUsuario,
  deletarUsuario
};
