const { Router } = require("express");
const livroRoutes = require("./livroRoutes");

const router = Router();
router.use("/livros", livroRoutes);
router.use('/usuarios', require('./usuarioRoutes'));

module.exports = router;