import { expect, jest } from "@jest/globals";
import supertest from "supertest";
import request from "supertest";
// Import des outils de test : jest pour les mocks et assertions, supertest pour simuler les requêtes HTTP

// Création des mocks pour les services de films
const listFilmsServicesMock = jest.fn(); // Mock de la fonction listFilmsServices
const getFilmByIdMock = jest.fn().mockResolvedValue({
        id: 15,
        title: "Film Mocké",
        director: "M. Mock",
        year: 2021,
        genre: "Mocké"
    }
); // Mock de la fonction getFilmById
const createFilmServicesMock = jest.fn().mockResolvedValue({
    id: 15,
    title: "Film Mocké",
    director: "M. Mock",
    year: 2021,
    genre: "Mocké"
}); // Mock de la création d'un film : renvoie toujours ce film simulé

const updateFilmServicesMock = jest.fn().mockResolvedValue({
    id: 15,
    title: "Film Modifié",
    director: "M. Modifié",
    year: 2022,
    genre: "Modifié"
}); // Mock de la mise à jour d'un film : renvoie un film modifié simulé

const deleteFilmServiceMock = jest.fn().mockResolvedValue({
    id: 50,
    title: "Film Mocké",
    director: "M. Mock",
    year: 2021,
    genre: "Mocké"
}); // Mock de la suppression d'un film : renvoie le film supprimé simulé

// On remplace le module réel services 'filmsServices' par nos mocks
jest.unstable_mockModule('../src/services/filmsServices.js', () => ({
    listFilmsServices: listFilmsServicesMock,
    getFilmById: getFilmByIdMock,
    createFilmServices: createFilmServicesMock,
    updateFilmServices: updateFilmServicesMock,
    deleteFilmService: deleteFilmServiceMock
}));

// On importe l'app express après avoir mocké les services
const appModule = await import('../src/app.js');
const app = appModule.default || appModule.app;


///---
///Test des endpoints
///---

// Test pour récupérer tous les films
describe("Récupérer tous  les films", () => {
    it("GET /films ", async () => {
        const res = await request(app).get("/films");// Envoie une requête GET à /films
        expect(res.statusCode).toBe(200);// Vérifie que le code HTTP est 200
    });
});

// Test pour récupérer un film par id
describe("Récupérer un film par id", () => {

    it("GET /films/:id -> film existant (mock)", async () => {
        const inputId = 15; // id envoyé dans la requête
        const { statusCode, body } = await supertest(app).get(`/films/${inputId}`);
        expect(statusCode).toBe(200); // Vérifie que le code HTTP est 200
        expect(getFilmByIdMock).toHaveBeenCalledWith(inputId); // Vérifie que le service a été appelé avec le bon id
        expect(body).toEqual({
            id: 15,
            title: "Film Mocké",
            director: "M. Mock",
            year: 2021,
            genre: "Mocké"
        }); // Vérifie que la réponse correspond au mock
    });

    it("GET /films/:id -> film non trouvé (mock)", async () => {
        // On redéfinit le mock pour retourner null ou undefined afin de simuler un film inexistant
        getFilmByIdMock.mockResolvedValue([]);

        const inputId = 999; // id qui n'existe pas
        const { statusCode, body } = await supertest(app).get(`/films/${inputId}`);

        expect(statusCode).toBe(404); // Vérifie que le code HTTP est 404
        expect(getFilmByIdMock).toHaveBeenCalledWith(inputId); // Vérifie que le service a été appelé avec le bon id
        expect(body).toEqual({ erreur: "Film non trouvé" }); // Vérifie le corps de la réponse
    });
});

// Test pour créer un film
describe("Créer un film", () => {
    it("POST /films -> mock création", async () => {
        const input = { title: "", director: "", year: 0, genre: "" };
        // Données envoyées dans le corps de la requête
        const { statusCode, body } = await supertest(app)
            .post("/films")
            .send(input);// Envoie une requête POST avec les données

        expect(statusCode).toBe(201);// Vérifie que le status est 201 (Created)
        expect(createFilmServicesMock).toHaveBeenCalledWith(input);// Vérifie que le service de création a bien été appelé avec les bonnes données
        expect(body).toEqual(expect.objectContaining({
            title: "Film Mocké",
            director: "M. Mock",
            year: 2021,
            genre: "Mocké"
        }));// Vérifie que le corps de la réponse correspond au mock
    });
});

// Test pour modifier un film
describe("Modifier un film", () => {
    it("PATCH /films/:id -> mock mise à jour", async () => {
        const patchData = { title: "Nouveau titre", director: "Nouveau réalisateur", year: 2022, genre: "Action" };
        const { statusCode, body } = await supertest(app)
            .put("/films/15")
            .send(patchData);
        expect(statusCode).toBe(200);
        expect(updateFilmServicesMock).toHaveBeenCalledWith(15, patchData); // Vérifie que le service de mise à jour a été appelé correctement
        expect(body).toEqual(expect.objectContaining({
            id: 15,
            title: "Film Modifié",
            director: "M. Modifié",
            year: 2022,
            genre: "Modifié"
        }));// Vérifie que la réponse correspond au mock
    });
});

// Test pour supprimer un film
describe("Supprimer un film", () => {
    it("DELETE /films -> array (may be empty)", async () => {
        const { statusCode, body } = await supertest(app)
            .delete("/films/35")
            .send();
        expect(statusCode).toBe(204);// Vérifie que la suppression retourne le code HTTP 204 (No Content)
        expect(body).toEqual({});// Le corps de la réponse doit être vide
    });
});
