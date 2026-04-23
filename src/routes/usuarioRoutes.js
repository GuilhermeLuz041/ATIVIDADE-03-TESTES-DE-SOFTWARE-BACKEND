const { Router } = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = Router();

router.get('/', usuarioController.listar);
router.get('/:id', usuarioController.buscarPorId);
router.post('/', usuarioController.criar);
router.put('/:id', usuarioController.atualizar);
router.delete('/:id', usuarioController.remover);

module.exports = router;