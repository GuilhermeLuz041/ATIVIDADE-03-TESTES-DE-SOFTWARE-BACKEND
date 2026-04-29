const { criarEmprestimo, devolverEmprestimo, buscarEmprestimoId, listarEmprestimos, deletarEmprestimo } = require('../services/emprestimoService');

const criar = async (req, res) => {
    try {
        const { data_emprestimo, data_devolucao, usuario_id, livro_id } = req.body;
        const emprestimo = await criarEmprestimo(data_emprestimo, data_devolucao, usuario_id, livro_id);
        res.status(201).json(emprestimo);
    } catch (error) {
        if (error.message === 'Livro não encontrado') {
            return res.status(404).json({ erro: error.message });
        }
        if (error.message === 'Livro indisponível') {
            return res.status(400).json({ erro: error.message });
        }
        return res.status(500).json({ erro: error.message });
    }
}

const devolver = async (req, res) => {
    const { id } = req.params;
    const emprestimo = await devolverEmprestimo(id);
    res.status(200).json(emprestimo);
}

const buscarPorId = async (req, res) => {
    const { id } = req.params;
    const emprestimo = await buscarEmprestimoId(id);
    res.status(200).json(emprestimo);
}

const listar = async (req, res) => {
    const emprestimos = await listarEmprestimos();
    res.status(200).json(emprestimos);
}

const remover = async (req, res) => {
    const { id } = req.params;
    const emprestimo = await deletarEmprestimo(id);
    res.status(204).json(emprestimo);
}

module.exports = { criar, devolver, buscarPorId, listar, remover };
