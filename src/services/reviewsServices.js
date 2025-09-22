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

        const now = new Date();
        const formatted = now.toISOString().slice(0, 19).replace('T', ' ');

        const queryText = `
            INSERT INTO reviews (film_id, author, rating, comment, created_at)
            VALUES ($1, $2, $3, $4,$5)
            RETURNING *
        `;

        const result = await query(queryText, [filmId, author, rating, comment, formatted]);
        return result.rows[0];
    } catch (err) {
        throw new Error("Erreur lors de la création du film" +err);
    }
}
export async function deleteReviewServices(id) {

        const deleteQuery = "DELETE FROM reviews WHERE id = $1 RETURNING *";
        const result = await query(deleteQuery, [id]);

        return result.rows[0];
}
