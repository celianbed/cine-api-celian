import request from "supertest";
import app from "../src/app.js";


describe("Récupérer tous les films", () => {
  it("GET /films -> array (may be empty)", async () => {
    const res = await request(app).get("/films");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("Récupérer un seul film", () => {
    it("GET /films/{id} -> array (may be empty)", async () => {
        const res = await request(app).get("/films").send({
            id:1
        });
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

/*
describe("Créer un film", () => {
    it("POST /films -> array (may be empty)", async () => {

        jest.spyOn(db, "query").mockResolvedValueOnce({
            rows: [{ id: 1, title: "F1", director: "Joseph Kosinski", year: "2025", genre: "action" }],
        });


        const res = await request(app).post("/films").send({
            title:"F1",
            director:"Joseph Kosinski",
            year:"2025",
            genre:"action"
        });

        expect(res.statusCode).toBe(201);
        db.query.mockRestore();

    });
});


describe("Supprimer un film", () => {
    it("DELETE /films -> array (may be empty)", async () => {

        jest.spyOn(db, "query").mockResolvedValueOnce({
            rows: [{ id: 1, title: "F1", director: "Joseph Kosinski", year: "2025", genre: "action" }],
        });


        const res = await request(app).delete("/films").send({
            id:1
        });
        console.log(res.statusCode);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);

        db.query.mockRestore();

    });
});
*/

