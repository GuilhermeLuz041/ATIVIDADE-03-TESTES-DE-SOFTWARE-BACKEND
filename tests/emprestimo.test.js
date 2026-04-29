const axios = require("axios");
const { describe, test, expect, beforeAll } = require("@jest/globals");
require("dotenv").config();
const api = `http://localhost:${process.env.PORT || 3000}`;

describe("Testes de Empréstimo", () => {
    let emprestimoID;
    let livroID;
    let livro2ID;
    let usuarioID;
    let emprestimoPostID;

    beforeAll(async () => {
        const resLivro = await axios.post(`${api}/livros`, {
            titulo: "Clean Code",
            autor: "Robert Martin",
            disponibilidade: true,
        });
        livroID = resLivro.data.id;

        const resLivro2 = await axios.post(`${api}/livros`, {
            titulo: "Design Patterns",
            autor: "Gang of Four",
            disponibilidade: true,
        });
        livro2ID = resLivro2.data.id;

        const resUsuario = await axios.post(`${api}/usuarios`, {
            nome: "Guilherme",
            email: `guilherme_${Date.now()}@email.com`,
            senha: "123",
            role: "admin",
        });
        usuarioID = resUsuario.data.id;

        const resEmprestimo = await axios.post(`${api}/emprestimos`, {
            data_emprestimo: new Date(),
            data_devolucao: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
            usuario_id: usuarioID,
            livro_id: livroID,
        });
        emprestimoID = resEmprestimo.data.id;
    });

    afterAll(async () => {
        try {
            if (emprestimoPostID) await axios.delete(`${api}/emprestimos/${emprestimoPostID}`);
            await axios.delete(`${api}/livros/${livroID}`);
            await axios.delete(`${api}/livros/${livro2ID}`);
            await axios.delete(`${api}/usuarios/${usuarioID}`);
        } catch (e) {
            console.log("Falha ao limpar o banco", e.message);
        }
    });

    test("POST /emprestimos cria um empréstimo", async () => {
        const res = await axios.post(`${api}/emprestimos`, {
            data_emprestimo: new Date(),
            data_devolucao: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
            usuario_id: usuarioID,
            livro_id: livro2ID, 
        });
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty("id");
        emprestimoPostID = res.data.id; 
    });

    test("GET /emprestimos/:id busca um empréstimo por id", async () => {
        const res = await axios.get(`${api}/emprestimos/${emprestimoID}`);
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty("id");
        expect(res.data).toHaveProperty("data_emprestimo");
        expect(res.data).toHaveProperty("data_devolucao");
        expect(res.data).toHaveProperty("usuario_id");
        expect(res.data).toHaveProperty("livro_id");
    });

    test("POST /emprestimos/:id/devolver devolve um empréstimo", async () => {
        const res = await axios.post(`${api}/emprestimos/${emprestimoID}/devolver`);
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty("id");
        expect(res.data).toHaveProperty("data_devolucao");
    });

    test("GET /emprestimos lista todos os empréstimos", async () => {
        const res = await axios.get(`${api}/emprestimos`);
        expect(res.status).toBe(200);
    });

    test("DELETE /emprestimos/:id deleta um empréstimo", async () => {
        const res = await axios.delete(`${api}/emprestimos/${emprestimoID}`);
        expect(res.status).toBe(204);
    });

    test("POST /emprestimos falha ao tentar emprestar livro indisponível", async () => {
        try {
            await axios.post(`${api}/emprestimos`, {
                data_emprestimo: new Date(),
                data_devolucao: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
                usuario_id: usuarioID,
                livro_id: livroID, 
            });
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });

    test("POST /emprestimos falha ao tentar emprestar livro inexistente", async () => {
        try {
            await axios.post(`${api}/emprestimos`, {
                data_emprestimo: new Date(),
                data_devolucao: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
                usuario_id: usuarioID,
                livro_id: 873645, 
            });
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });
});