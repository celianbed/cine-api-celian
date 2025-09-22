import request from "supertest";
import app from "../src/app.js";


describe("Récupérer tous les films", () => {
    it("GET /films -> array (may be empty)", async () => {
        const res = await request(app).get("/reviews/films");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});