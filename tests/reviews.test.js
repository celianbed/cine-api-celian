import { expect, jest } from "@jest/globals";
import supertest from "supertest";
import request from "supertest";
// Import des outils pour les tests : jest pour les mocks et assertions, supertest pour simuler les requêtes HTTP

// ------------------------
// Définition des mocks
// ------------------------
const createReviewServicesMock = jest.fn().mockResolvedValue({
    id: 42,
    film_id: 4,
    author: "Célian",
    rating: 5,
    comment: "Super",
    created_at: "2025-09-23T08:33:24.000Z"
});// Mock de la création de review : renvoie toujours une review simulée

const deleteReviewServicesMock = jest.fn().mockResolvedValue({});// Mock de la suppression : renvoie un objet vide (204 No Content)

const listReviewsByFilmIdMock = jest.fn();// Mock pour la récupération des reviews par film (sera utilisé pour GET)

// ------------------------
// Remplacement du module réel par nos mocks
// ------------------------
jest.unstable_mockModule('../src/services/reviewsServices.js', () => ({
    createReviewServices: createReviewServicesMock,
    deleteReviewServices: deleteReviewServicesMock,
    listReviewsByFilmId: listReviewsByFilmIdMock
}));

// ------------------------
// Import de l'app Express après les mocks
// ------------------------
const appModule = await import('../src/app.js');
const app = appModule.default || appModule.app;

// ------------------------
// Tests des endpoints
// ------------------------

// Test récupération de toutes les reviews d’un film
describe("Récupérer toutes les reviews d'un film", () => {
    it("GET /reviews/films/{id} -> array (may be empty)", async () => {
        const res = await request(app).get("/reviews/films/15");// Envoie une requête GET à /reviews/films/15
        expect(res.statusCode).toBe(200);// Vérifie que le code HTTP est 200
    });
});

// Test création d’une review
describe("Créer une review", () => {
    it("POST /reviews/films/:id -> mock création", async () => {
        const input = { author: "", rating: 0, comment: "" };// Données fictives envoyées (optionnel)
        const { statusCode, body } = await supertest(app)
            .post("/reviews/films/4")
            .send(input);// Envoie la requête POST avec les données fictives
        expect(statusCode).toBe(201);// Vérifie que le status est 201 Created
        expect(createReviewServicesMock).toHaveBeenCalledWith(4, input);// Vérifie que le service a été appelé avec le bon film_id et le bon corps
        expect(body).toEqual(expect.objectContaining({
            author: "Célian",
            rating: 5,
            comment: "Super",
        }));
        // Vérifie que la réponse contient les champs principaux du mock
    });
});

// Test suppression d’une review
describe("Supprimer une review", () => {
    it("DELETE /reviews/:id -> mock suppression", async () => {
        const { statusCode, body } = await supertest(app)
            .delete("/reviews/42");// Envoie la requête DELETE pour supprimer la review 42

        expect(statusCode).toBe(204);// Vérifie que le status est 204 No Content
        expect(deleteReviewServicesMock).toHaveBeenCalledWith(42);// Vérifie que le service de suppression a bien été appelé avec le bon id
        expect(body).toEqual({});// Vérifie que le corps de la réponse est vide (comme attendu pour 204)
    });
});
