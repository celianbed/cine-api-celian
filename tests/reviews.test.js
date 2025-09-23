import {expect, jest} from "@jest/globals";
import supertest from "supertest";
import request from "supertest";


const createReviewServicesMock = jest.fn().mockResolvedValue({
    id: 42,
    film_id: 4,
    author: "Célian",
    rating: 5,
    comment: "Super",
    created_at: "2025-09-23T08:33:24.000Z"
});
const deleteReviewServicesMock = jest.fn().mockResolvedValue({});
const listReviewsByFilmIdMock = jest.fn();

jest.unstable_mockModule('../src/services/reviewsServices.js', () => ({
    createReviewServices: createReviewServicesMock,
    deleteReviewServices: deleteReviewServicesMock,
    listReviewsByFilmId:listReviewsByFilmIdMock
}) )

const appModule = await import('../src/app.js');
const app = appModule.default || appModule.app;


describe("Récupérer toutes les reviews d'un film", () => {
    it("GET /reviews/films/{id} -> array (may be empty)", async () => {
        const res = await request(app).get("/reviews/films/15")
        expect(res.statusCode).toBe(200);
    });
});

describe("Créer une review", () => {

    it("POST /reviews/films/:id -> mock création", async () => {

        // données fictives envoyées (optionnel)
        const input = { author: "", rating: 0, comment: "" };

        const { statusCode, body } = await supertest(app)
            .post("/reviews/films/4")
            .send(input); // envoi JSON fictif

        expect(statusCode).toBe(201);

        // Vérifie que notre mock a bien été appelé avec le bon film_id et input
        expect(createReviewServicesMock).toHaveBeenCalledWith(4, input);

        // Vérifie que le body contient les champs principaux
        expect(body).toEqual(expect.objectContaining({
            author: "Célian",
            rating: 5,
            comment: "Super",
        }));
    });
});

describe("Supprimer une review", () => {

    it("DELETE /reviews/:id -> mock suppression", async () => {

        const { statusCode, body } = await supertest(app)
            .delete("/reviews/42");

        expect(statusCode).toBe(204);
        expect(deleteReviewServicesMock).toHaveBeenCalledWith(42);

        expect(body).toEqual({});
    });
});