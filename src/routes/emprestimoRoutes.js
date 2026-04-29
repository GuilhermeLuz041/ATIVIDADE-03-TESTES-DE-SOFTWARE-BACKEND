const { Router } = require('express');
const router = Router();
const { criar, devolver, buscarPorId, listar, remover } = require('../controllers/emprestimoController');

router.post('/', criar);
router.post('/:id/devolver', devolver);
router.get('/:id', buscarPorId);
router.get('/', listar);
router.delete('/:id', remover);

module.exports = router;