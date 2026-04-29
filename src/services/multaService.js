const { Multa, Emprestimo } = require('../models');

const criarMulta = async (valor, emprestimo_id) => {
    const emprestimo = await Emprestimo.findByPk(emprestimo_id);
    if (!emprestimo) {
        throw new Error('Emprestimo não encontrado');
    }
    
    const multa = await Multa.create({
        valor,
        emprestimo_id,
        status: 'pendente'
    });
    
    return multa;
}

const buscarMultaId = async (id) => {
    const multa = await Multa.findByPk(id);
    if (!multa) {
        throw new Error('Multa não encontrada');
    }
    return multa;
}

const listarMultas = async () => {
    const multas = await Multa.findAll();
    return multas;
}

const pagarMulta = async (id) => {
    const multa = await Multa.findByPk(id);
    if (!multa) {
        throw new Error('Multa não encontrada');
    }
    
    if (multa.status === 'paga') {
        throw new Error('Multa já está paga');
    }

    await multa.update({ 
        status: 'paga',
        data_pagamento: new Date()
    });
    
    return multa;
}

const deletarMulta = async (id) => {
    const multa = await Multa.findByPk(id);
    if (!multa) {
        throw new Error('Multa não encontrada');
    }
    await multa.destroy();
    return multa;
}

module.exports = { criarMulta, buscarMultaId, listarMultas, pagarMulta, deletarMulta };
