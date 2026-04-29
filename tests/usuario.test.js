const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

describe("Testes de Usuários", () => {
  let usuarioID;
  let usuarioPostID;
  let usuarioDuplicadoID;
  const emailPadrao = `padrao_${Date.now()}@email.com`;

  beforeAll(async () => {
    const res = await axios.post(`${api}/usuarios`, {
      nome: "Usuário Padrão",
      email: emailPadrao,
      senha: "123",
      role: "aluno"
    });
    usuarioID = res.data.id;
  });

  afterAll(async () => {
    try {
      if (usuarioPostID) await axios.delete(`${api}/usuarios/${usuarioPostID}`);
      if (usuarioDuplicadoID) await axios.delete(`${api}/usuarios/${usuarioDuplicadoID}`);
    } catch (e) {
      console.log("Falha ao limpar banco", e.message);
    }
  });

  test("POST /usuarios cria um novo usuário", async () => {
    const res = await axios.post(`${api}/usuarios`, {
      nome: "João Silva",
      email: `joao_${Date.now()}@email.com`,
      senha: "123456",
      role: "aluno",
    });
    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty("id");
    expect(res.data.nome).toBe("João Silva");
    expect(res.data.role).toBe("aluno");
    usuarioPostID = res.data.id;
  });

  test("GET /usuarios/:id busca um usuário por id", async () => {
    const res = await axios.get(`${api}/usuarios/${usuarioID}`);
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("id");
    expect(res.data).toHaveProperty("nome");
    expect(res.data).toHaveProperty("email");
  });

  test("GET /usuarios retorna uma lista de usuários", async () => {
    const res = await axios.get(`${api}/usuarios`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  test("PUT /usuarios/:id atualiza um usuário", async () => {
    const res = await axios.put(`${api}/usuarios/${usuarioID}`, { nome: "Usuário Atualizado" });
    expect(res.status).toBe(200);
    expect(res.data.nome).toBe("Usuário Atualizado");
  });

  test("DELETE /usuarios/:id deleta um usuário", async () => {
    const res = await axios.delete(`${api}/usuarios/${usuarioID}`);
    expect(res.status).toBe(204);
  });

  test("deve retornar 404 para usuário inexistente no GET", async () => {
    try {
      await axios.get(`${api}/usuarios/99999`);
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });

  test("deve retornar 400 ao criar usuário sem nome", async () => {
    try {
      await axios.post(`${api}/usuarios`, {
        email: "semnome@email.com",
        senha: "123456",
        role: "aluno",
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("deve retornar 400 ao criar usuário sem email", async () => {
    try {
      await axios.post(`${api}/usuarios`, {
        nome: "Sem Email",
        senha: "123456",
        role: "aluno",
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("deve retornar 400 ao criar usuário com email já cadastrado", async () => {
    const email = `duplicado_${Date.now()}@email.com`;
    const res = await axios.post(`${api}/usuarios`, { nome: "Maria Souza", email, senha: "123", role: "aluno" });
    usuarioDuplicadoID = res.data.id;

    try {
      await axios.post(`${api}/usuarios`, { nome: "Carlos Lima", email, senha: "456", role: "aluno" });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("deve retornar 404 ao atualizar usuário inexistente", async () => {
    try {
      await axios.put(`${api}/usuarios/99999`, { nome: "Ninguém" });
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });

  test("deve retornar 404 ao deletar usuário inexistente", async () => {
    try {
      await axios.delete(`${api}/usuarios/99999`);
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });
});