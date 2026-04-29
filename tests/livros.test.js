const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

describe('Testes de Livros', () => {
  let livroID;
  let livroPostID;

  beforeAll(async () => {
    const res = await axios.post(`${api}/livros`, { 
      titulo: 'Clean Code', 
      autor: 'Robert Martin', 
      disponibilidade: true 
    });
    livroID = res.data.id;
  });

  afterAll(async () => {
    try {
      if (livroPostID) await axios.delete(`${api}/livros/${livroPostID}`);
    } catch (e) {
      console.log("Falha ao limpar banco", e.message);
    }
  });

  test('POST /livros cria um livro', async () => {
    const res = await axios.post(`${api}/livros`, { titulo: 'Design Patterns', autor: 'Gang of Four', disponibilidade: true });
    expect(res.status).toBe(201);
    expect(res.data.titulo).toBe('Design Patterns');
    expect(res.data.autor).toBe('Gang of Four');
    expect(res.data.disponibilidade).toBe(true);
    livroPostID = res.data.id;
  });

  test('GET /livro/:id busca um livro por id', async () => {
    const res = await axios.get(`${api}/livros/${livroID}`);
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('id');
    expect(res.data).toHaveProperty('titulo');
    expect(res.data).toHaveProperty('autor');
    expect(res.data).toHaveProperty('disponibilidade');
  });

  test('PUT /livro/:id atualiza um livro', async () => {
    const res = await axios.put(`${api}/livros/${livroID}`, { 
      titulo: 'Clean Code', 
      autor: 'Robert Martin', 
      disponibilidade: false 
    });
    expect(res.status).toBe(200);
    expect(res.data.titulo).toBe('Clean Code');
    expect(res.data.disponibilidade).toBe(false);
  });

  test('GET /livros/disponiveis lista livros disponiveis', async () => {
    const res = await axios.get(`${api}/livros/disponiveis`);
    expect(res.status).toBe(200);
  });

  test('DELETE /delete/:id deleta um livro', async () => {
    const res = await axios.delete(`${api}/livros/${livroID}`);
    expect(res.status).toBe(204);
  });
});