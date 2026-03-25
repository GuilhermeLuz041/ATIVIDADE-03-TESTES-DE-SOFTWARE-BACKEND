const { Router } = require('express');
const { criar, listar, deletar, listarDisponiveis, buscarID, update } = require('../controllers/livroController');

const router = Router();

router.get("/:id", buscarID)
router.post("/", criar);
router.put("/:id", update);
router.delete('/:id', deletar);
router.get("/", listarDisponiveis)

module.exports = router;