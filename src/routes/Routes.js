const { Router } = require("express");
const livroRoutes = require("./livroRoutes");

const router = Router();
router.use("/livros", livroRoutes);
router.use('/usuarios', require('./usuarioRoutes'));
router.use('/emprestimos', require('./emprestimoRoutes'));
router.use('/multas', require('./multaRoutes'));

module.exports = router;