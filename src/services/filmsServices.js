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
export async function getFilmById(id) {}
export async function createFilm({ title, director, year, genre }) {}
export async function updateFilm(
  id,
  patch /* { title?, director?, year?, genre? } */
) {}
export async function deleteFilm(id) {}
