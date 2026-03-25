const { Livro } = require('../models');

const criarLivro = async (titulo, autor, disponibilidade) => {
  const livro = await Livro.create({ titulo, autor, disponibilidade });
  return {
    id: livro.id,
    titulo: livro.titulo,
    autor: livro.autor,
    disponibilidade: livro.disponibilidade
  };
};

const listarLivros = async () => {
  const livros = await Livro.findAll();
  return livros;
};

const listarLivrosDisponiveis = async () => {
  const livros = await Livro.findAll({
    where: { disponibilidade: true }
  });
  return livros;
};

const deletarLivro = async (id) => {
  await Livro.destroy({ where: { id } });
}

const buscarLivroID = async (id) => {
  const livro = await Livro.findByPk(id);
  return livro;
}

const atualizarLivro = async (id, titulo, autor, disponibilidade) => {
  const livro = await Livro.findByPk(id);
  await livro.update({ titulo, autor, disponibilidade });
  return livro;
};

module.exports = { criarLivro, listarLivros, listarLivrosDisponiveis, deletarLivro, buscarLivroID, atualizarLivro };