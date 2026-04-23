let usuarios = [
  { id: 1, nome: "Usuário Padrão", email: "padrao@email.com", senha: "123", tipo: "aluno" }
];
let proximoId = 2;

const usuarioController = {
  listar: (req, res) => {
    return res.status(200).json(usuarios);
  },

  buscarPorId: (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.status(404).send();
    return res.status(200).json(usuario);
  },

  criar: (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email) {
      return res.status(400).send();
    }

    const emailExiste = usuarios.some(u => u.email === email);
    if (emailExiste) {
      return res.status(400).send();
    }

    const novoUsuario = { id: proximoId++, nome, email, senha, tipo };
    usuarios.push(novoUsuario);
    return res.status(201).json(novoUsuario);
  },

  atualizar: (req, res) => {
    const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send();

    usuarios[index] = { ...usuarios[index], ...req.body };
    return res.status(200).json(usuarios[index]);
  },

  remover: (req, res) => {
    const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send();

    usuarios.splice(index, 1);
    return res.status(204).send();
  }
};

module.exports = usuarioController;