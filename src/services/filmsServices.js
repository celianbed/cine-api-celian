// TODO: écrire les requêtes SQL et la logique
import {query} from "../db.js";

export async function listFilmsServices({ limit = 50, offset = 0 } = {}) {
    try {
        const queryText = "SELECT * FROM films LIMIT $1 OFFSET $2";
        const result = await query(queryText, [limit, offset]);

        return result.rows;
    } catch (err) {
        console.error("Erreur listFilmsServices:", err);
        throw new Error("Erreur lors de la récupération des films");
    }
}
export async function getFilmById(id) {
    try {
        const queryText = "SELECT * FROM films WHERE id = $1";
        const result = await query(queryText, [id]);
        return result.rows;
    } catch (err) {
        throw new Error("Erreur lors de la récupération du film");
    }

}

export async function createFilmServices({ title, director, year, genre }) {
    try {
        const queryText = `
            INSERT INTO films (title, director, year, genre)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await query(queryText, [title, director, year, genre]);
        return result.rows[0];
    } catch (err) {
        throw new Error("Erreur lors de la création du film");
    }
}

export async function updateFilmServices(id, patch) {
        try {
            const { title, director, year, genre } = patch;

            const values = [
                title ?? null,
                director ?? null,
                year ?? null,
                genre ?? null,
                id
            ];


            console.log(values);
            const queryText = `
                UPDATE films
                SET title    = COALESCE($1, title),
                    director = COALESCE($2, director),
                    year     = COALESCE($3, year),
                    genre    = COALESCE($4, genre)
                WHERE id = $5
                RETURNING *
            `;

            const result = await query(queryText, values);


        return result.rows[0] || null;
    } catch (err) {
        console.error("Erreur updateFilmServices:", err);
        throw new Error("Erreur lors de la mise à jour du film: " + err.message);
    }
}
export async function deleteFilmService(id) {
    const deleteQuery = "DELETE FROM films WHERE id = $1 RETURNING *";
    const result = await query(deleteQuery, [id]);

    // RETURNING * renvoie le film supprimé, si tu veux juste savoir si ça a marché, tu peux renvoyer result.rowCount
    return result.rows[0];
}
