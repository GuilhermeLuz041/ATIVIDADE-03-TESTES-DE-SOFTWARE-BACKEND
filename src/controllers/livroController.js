const { criarLivro, listarLivros, listarLivrosDisponiveis, deletarLivro, buscarLivroID, atualizarLivro } = require('../services/livroService');

const criar = async (req, res) => {
    const { titulo, autor, disponibilidade } = req.body;

    if (!titulo || !autor) return res.status(400)
        .json({ erro: 'titulo e autor são obrigatórios' })

    const livro = await criarLivro(titulo, autor, disponibilidade);
    res.status(201).json(livro);
}

const listar = async (req, res) => {
    const livros = await listarLivros();
    res.status(200).json(livros);
}

const deletar = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ erro: 'id é obrigatório' });
    }

    await deletarLivro(id);
    res.status(204).send();
}

const listarDisponiveis = async (req, res) => {
    const livros = await listarLivrosDisponiveis();
    res.status(200).json(livros);
}

const buscarID = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ erro: 'id é obrigatório' });
    }

    const livro = await buscarLivroID(id);
    res.status(200).json(livro);
}

const update = async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, disponibilidade } = req.body;

    if (!id) {
        return res.status(400).json({ erro: 'id é obrigatório' });
    }

    const livro = await atualizarLivro(id, titulo, autor, disponibilidade);
    res.status(200).json(livro);
}

module.exports = { criar, listar, deletar, listarDisponiveis, buscarID, update };