const express = require('express');
const router = express.Router();
const { criar, buscarPorId, listar, pagar, remover } = require('../controllers/multaController');

router.post('/', criar);
router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/:id/pagar', pagar);
router.delete('/:id', remover);

module.exports = router;
