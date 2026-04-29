const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

describe("Testes de Multas", () => {
    let usuarioID;
    let livroID;
    let emprestimoID;
    let multaID;
    let multaPostID;

    beforeAll(async () => {
        const resLivro = await axios.post(`${api}/livros`, {
            titulo: "Livro Atrasado",
            autor: "Autor Teste",
            disponibilidade: true,
        });
        livroID = resLivro.data.id;

        const resUsuario = await axios.post(`${api}/usuarios`, {
            nome: "Devedor",
            email: `devedor_${Date.now()}@email.com`,
            senha: "123",
            role: "aluno",
        });
        usuarioID = resUsuario.data.id;

        const resEmprestimo = await axios.post(`${api}/emprestimos`, {
            data_emprestimo: new Date(),
            data_devolucao: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
            usuario_id: usuarioID,
            livro_id: livroID,
        });
        emprestimoID = resEmprestimo.data.id;

        const resMulta = await axios.post(`${api}/multas`, {
            valor: 15.50,
            emprestimo_id: emprestimoID
        });
        multaID = resMulta.data.id;
    });

    afterAll(async () => {
        try {
            if (multaPostID) await axios.delete(`${api}/multas/${multaPostID}`);
            
            await axios.delete(`${api}/emprestimos/${emprestimoID}`);
            await axios.delete(`${api}/livros/${livroID}`);
            await axios.delete(`${api}/usuarios/${usuarioID}`);
        } catch (e) {
            console.log("Falha ao limpar banco de multas:", e.message);
        }
    });

    test("POST /multas cria uma nova multa", async () => {
        const res = await axios.post(`${api}/multas`, {
            valor: 5.00,
            emprestimo_id: emprestimoID
        });
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty("id");
        expect(Number(res.data.valor)).toBe(5.00);
        expect(res.data.status).toBe("pendente");
        multaPostID = res.data.id;
    });

    test("GET /multas/:id busca uma multa por id", async () => {
        const res = await axios.get(`${api}/multas/${multaID}`);
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty("id");
        expect(res.data).toHaveProperty("valor");
        expect(res.data.status).toBe("pendente");
    });

    test("GET /multas retorna uma lista de multas", async () => {
        const res = await axios.get(`${api}/multas`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("POST /multas/:id/pagar paga uma multa", async () => {
        const res = await axios.post(`${api}/multas/${multaID}/pagar`);
        expect(res.status).toBe(200);
        expect(res.data.status).toBe("paga");
        expect(res.data.data_pagamento).not.toBeNull();
    });

    test("POST /multas/:id/pagar falha ao tentar pagar multa já paga", async () => {
        try {
            await axios.post(`${api}/multas/${multaID}/pagar`);
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });

    test("DELETE /multas/:id deleta uma multa", async () => {
        const res = await axios.delete(`${api}/multas/${multaID}`);
        expect(res.status).toBe(204);
    });

    test("POST /multas falha se emprestimo não existe", async () => {
        try {
            await axios.post(`${api}/multas`, {
                valor: 10.00,
                emprestimo_id: 85548
            });
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });
});
