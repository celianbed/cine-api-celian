import {query} from "../db.js"; // On importe la fonction query pour interagir avec la base de données

export async function listReviewsByFilmId(filmId,
                                          { limit = 50, offset = 0 } = {}
) {
    try {
        const requete = "SELECT * FROM reviews  WHERE film_id = $1"; // Requête pour récupérer toutes les reviews d'un film
        const resultat = await query(requete, [filmId]); // Exécution de la requête avec le filmId

        return resultat.rows; // Retourne les résultats sous forme de tableau
    } catch (erreur) {
        throw new Error("Erreur lors de la récupération des films :" + erreur.message); // Gestion des erreurs
    }
}

export async function createReviewServices(filmId, { author, rating, comment }) {
    try {
        const dateAjd = new Date(); // Date actuelle
        const formatte = dateAjd.toISOString().slice(0, 19).replace('T', ' '); // Format SQL

        const requete = `
            INSERT INTO reviews (film_id, author, rating, comment, created_at)
            VALUES ($1, $2, $3, $4,$5)
            RETURNING *;` // Requête pour créer une review

        const resultat = await query(requete, [filmId, author, rating, comment, formatte]); // Exécution
        return resultat.rows[0]; // Retourne la review créée
    } catch (erreur) {
        throw new Error("Erreur lors de la création du film" + erreur.message); // Gestion des erreurs
    }
}

export async function deleteReviewServices(id) {
    const requete = "DELETE FROM reviews WHERE id = $1 RETURNING *"; // Requête pour supprimer une review
    const resultat = await query(requete, [id]); // Exécution

    return resultat.rows[0]; // Retourne la review supprimée
}
