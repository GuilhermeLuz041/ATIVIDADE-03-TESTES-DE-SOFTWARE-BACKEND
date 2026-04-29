const { criarUsuario, listarUsuarios, buscarUsuarioID, buscarUsuarioPorEmail, atualizarUsuario, deletarUsuario } = require('../services/usuarioService');

const criar = async (req, res) => {
    const { nome, email, senha, role } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: 'nome e email são obrigatórios' });
    }

    const emailExiste = await buscarUsuarioPorEmail(email);
    if (emailExiste) {
        return res.status(400).json({ erro: 'email já cadastrado' });
    }

    const novoUsuario = await criarUsuario(nome, email, senha, role);
    res.status(201).json(novoUsuario);
}

const listar = async (req, res) => {
    const usuarios = await listarUsuarios();
    res.status(200).json(usuarios);
}

const buscarPorId = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ erro: 'id é obrigatório' });
    }

    const usuario = await buscarUsuarioID(id);
    if (!usuario) return res.status(404).send();
    
    res.status(200).json(usuario);
}

const atualizar = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ erro: 'id é obrigatório' });
    }

    const usuarioExistente = await buscarUsuarioID(id);
    if (!usuarioExistente) return res.status(404).send();

    const usuarioAtualizado = await atualizarUsuario(id, req.body);
    res.status(200).json(usuarioAtualizado);
}

const remover = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ erro: 'id é obrigatório' });
    }

    const usuarioExistente = await buscarUsuarioID(id);
    if (!usuarioExistente) return res.status(404).send();

    await deletarUsuario(id);
    res.status(204).send();
}

module.exports = { criar, listar, buscarPorId, atualizar, remover };