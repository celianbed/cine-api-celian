import {expect, jest} from "@jest/globals";
import supertest from "supertest";
import request from "supertest";

const listFilmsServicesMock = jest.fn();
const getFilmById = jest.fn();
const createFilmServicesMock = jest.fn().mockResolvedValue(
    {
        id: 15,
        title:"Film Mocké",
        director: "M. Mock",
        year: 2021,
        genre:"Mocké"
    });
const updateFilmServicesMock = jest.fn().mockResolvedValue({
        id: 15,
        title: "Film Modifié",
        director: "M. Modifié",
        year: 2022,
        genre: "Modifié"
    }
);
const deleteFilmServiceMock = jest.fn().mockResolvedValue(
    {
        id: 50,
        title:"Film Mocké",
        director: "M. Mock",
        year: 2021,
        genre:"Mocké"
    }
);

jest.unstable_mockModule('../src/services/filmsServices.js', () => ({
    listFilmsServices: listFilmsServicesMock,
    getFilmById: getFilmById,
    createFilmServices :createFilmServicesMock,
    updateFilmServices: updateFilmServicesMock,
    deleteFilmService: deleteFilmServiceMock
}) )


const appModule = await import('../src/app.js');
const app = appModule.default || appModule.app;


describe("Récupérer tous  les films", () => {
    it("GET /films ", async () => {
        const res = await request(app).get("/films")
        expect(res.statusCode).toBe(200);
    });
});

describe("Récupérer un seul film", () => {
    it("GET /films/{id} -> array (may be empty)", async () => {
        const res = await request(app).get("/films/1")
        expect(res.statusCode).toBe(200);
    });
});



describe("Créer un film", () => {

    it("POST /films -> mock création", async () => {


        const input = {title:"", director: "", year: 0, genre:""};
        const { statusCode, body } = await supertest(app)
            .post("/films")
            .send(input)
        expect(statusCode).toBe(201);
        expect(createFilmServicesMock).toHaveBeenCalledWith(input);
        expect(body).toEqual(expect.objectContaining({
            title:"Film Mocké",
            director: "M. Mock",
            year: 2021,
            genre:"Mocké"
        }));
    });
});




describe("Modifier un film", () => {

    it("PATCH /films/:id -> mock mise à jour", async () => {

        const patchData = { title: "Nouveau titre", director: "Nouveau réalisateur", year: 2022, genre: "Action" };

        const { statusCode, body } = await supertest(app)
            .put("/films/15")
            .send(patchData);

        // Vérifie que le status est correct
        expect(statusCode).toBe(200);

        // Vérifie que le service a été appelé avec le bon id et les bonnes données
        expect(updateFilmServicesMock).toHaveBeenCalledWith(15, patchData);

        // Vérifie que le body contient les champs principaux renvoyés par le mock
        expect(body).toEqual(expect.objectContaining({
            id: 15,
            title: "Film Modifié",
            director: "M. Modifié",
            year: 2022,
            genre: "Modifié"
        }));
    });

});


describe("Supprimer un film", () => {
    it("DELETE /films -> array (may be empty)", async () => {

        const { statusCode, body } = await supertest(app)
            .delete("/films/35")
            .send()
        expect(statusCode).toBe(204);
        expect(body).toEqual({});
    });
});
