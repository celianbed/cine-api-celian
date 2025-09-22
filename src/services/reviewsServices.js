import {query} from "../db.js";

export async function listReviewsByFilmId(
  filmId,
  { limit = 50, offset = 0 } = {}) {

    try {
        const queryText = "SELECT * FROM reviews  WHERE film_id = $1";
        const result = await query(queryText, [filmId]);

        return result.rows;
    } catch (err) {
        console.error("Erreur listFilmsServices:", err);
        throw new Error("Erreur lors de la récupération des films");
    }
}
export async function createReviewServices(filmId, { author, rating, comment }) {
    try {
        const queryText = `
            INSERT INTO reviews (film_id, author, rating, comment, created_at)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

        const result = await query(queryText, [filmId, author, rating, comment, Date.now().toString()]);
        return result.rows[0];
    } catch (err) {
        throw new Error("Erreur lors de la création du film" +err);
    }
}
export async function deleteReview(id) {}
