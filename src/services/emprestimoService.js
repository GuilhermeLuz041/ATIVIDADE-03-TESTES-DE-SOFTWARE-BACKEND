const { Emprestimo } = require('../models');
const { Livro } = require('../models');

const criarEmprestimo = async (data_emprestimo, data_devolucao, usuario_id, livro_id) => {
    const livro = await Livro.findByPk(livro_id);
    if (!livro) {
        throw new Error('Livro não encontrado');
    }
    if (livro.disponibilidade == false) {
        throw new Error('Livro indisponível');
    }
    const emprestimo = await Emprestimo.create({
        data_emprestimo,
        data_devolucao,
        usuario_id,
        livro_id,
    });
    await livro.update({ disponibilidade: false });
    return emprestimo;
}

const devolverEmprestimo = async (id) => {
    const emprestimo = await Emprestimo.findByPk(id);
    if (!emprestimo) {
        throw new Error('Emprestimo não encontrado');
    }
    await emprestimo.update({ data_devolucao: new Date() });
    const livro = await Livro.findByPk(emprestimo.livro_id);
    await livro.update({ disponibilidade: true });
    return emprestimo;
}

const buscarEmprestimoId = async (id) => {
    const emprestimo = await Emprestimo.findByPk(id);
    if (!emprestimo) {
        throw new Error('Emprestimo não encontrado');
    }
    return emprestimo;
}

const listarEmprestimos = async () => {
    const emprestimos = await Emprestimo.findAll();
    return emprestimos;
}

const deletarEmprestimo = async (id) => {
    const emprestimo = await Emprestimo.findByPk(id);
    if (!emprestimo) {
        throw new Error('Emprestimo não encontrado');
    }
    const livro = await Livro.findByPk(emprestimo.livro_id);
    await livro.update({ disponibilidade: true });
    await emprestimo.destroy();
    return emprestimo;
}

module.exports = { criarEmprestimo, devolverEmprestimo, buscarEmprestimoId, listarEmprestimos, deletarEmprestimo };