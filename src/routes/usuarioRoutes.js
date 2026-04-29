const { Router } = require('express');
const { criar, listar, buscarPorId, atualizar, remover } = require('../controllers/usuarioController');

const router = Router();

router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/', criar);
router.put('/:id', atualizar);
router.delete('/:id', remover);

module.exports = router;