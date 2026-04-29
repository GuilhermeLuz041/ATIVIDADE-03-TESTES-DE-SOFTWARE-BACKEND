const { criarMulta, buscarMultaId, listarMultas, pagarMulta, deletarMulta } = require('../services/multaService');

const criar = async (req, res) => {
    try {
        const { valor, emprestimo_id } = req.body;
        const multa = await criarMulta(valor, emprestimo_id);
        res.status(201).json(multa);
    } catch (error) {
        if (error.message === 'Emprestimo não encontrado') {
            return res.status(404).json({ erro: error.message });
        }
        res.status(400).json({ erro: error.message });
    }
}

const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const multa = await buscarMultaId(id);
        res.status(200).json(multa);
    } catch (error) {
        if (error.message === 'Multa não encontrada') {
            return res.status(404).json({ erro: error.message });
        }
        res.status(500).json({ erro: error.message });
    }
}

const listar = async (req, res) => {
    try {
        const multas = await listarMultas();
        res.status(200).json(multas);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

const pagar = async (req, res) => {
    try {
        const { id } = req.params;
        const multa = await pagarMulta(id);
        res.status(200).json(multa);
    } catch (error) {
        if (error.message === 'Multa não encontrada') {
            return res.status(404).json({ erro: error.message });
        }
        if (error.message === 'Multa já está paga') {
            return res.status(400).json({ erro: error.message });
        }
        res.status(500).json({ erro: error.message });
    }
}

const remover = async (req, res) => {
    try {
        const { id } = req.params;
        await deletarMulta(id);
        res.status(204).send();
    } catch (error) {
        if (error.message === 'Multa não encontrada') {
            return res.status(404).json({ erro: error.message });
        }
        res.status(500).json({ erro: error.message });
    }
}

module.exports = { criar, buscarPorId, listar, pagar, remover };
