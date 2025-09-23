// TODO: écrire les requêtes SQL et la logique
import { query } from "../db.js";
// Import de la fonction query qui permet d'interagir avec la base de données PostgreSQL

// ------------------------
// Service pour lister les films avec pagination
// ------------------------
export async function listFilmsServices({ limit = 50, offset = 0 } = {}) {
    try {
        // Requête SQL pour récupérer tous les films avec un LIMIT et un OFFSET
        const requete = "SELECT * FROM films LIMIT $1 OFFSET $2";
        // Exécution de la requête avec les paramètres
        const resultat = await query(requete, [limit, offset]);

        // Retourne toutes les lignes récupérées
        return resultat.rows;
    } catch (erreur) {
        // En cas d'erreur, lance une exception avec un message explicite
        throw new Error("Erreur lors de la récupération des films" + erreur.message);
    }
}

// ------------------------
// Service pour récupérer un film par son ID
// ------------------------
export async function getFilmById(id) {
    try {
        // Requête SQL pour récupérer le film correspondant à l'id
        const requete = "SELECT * FROM films WHERE id = $1";
        const resultat = await query(requete, [id]);

        // Retourne les lignes correspondantes (tableau)
        return resultat.rows;
    } catch (erreur) {
        throw new Error("Erreur lors de la récupération du film" + erreur.message);
    }
}

// ------------------------
// Service pour créer un nouveau film
// ------------------------
export async function createFilmServices({ title, director, year, genre }) {
    try {
        // Requête SQL pour insérer un nouveau film
        const requete = `
            INSERT INTO films (title, director, year, genre)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        // Exécution de la requête avec les valeurs passées
        const resultat = await query(requete, [title, director, year, genre]);

        // Retourne le premier élément du tableau retourné (le film créé)
        return resultat.rows[0];
    } catch (erreur) {
        throw new Error("Erreur lors de la création du film" + erreur.message);
    }
}

// ------------------------
// Service pour mettre à jour un film existant
// ------------------------
export async function updateFilmServices(id, patch) {
    try {
        const { title, director, year, genre } = patch;

        // Tableau des valeurs à passer à la requête SQL
        // Utilise null si une valeur n'est pas fournie
        const values = [
            title ?? null,
            director ?? null,
            year ?? null,
            genre ?? null,
            id
        ];

        // Affichage dans la console pour debug
        console.log(values);

        // Requête SQL pour mettre à jour un film
        // COALESCE permet de garder l'ancienne valeur si le paramètre est null
        const requete = `
            UPDATE films
            SET title    = COALESCE($1, title),
                director = COALESCE($2, director),
                year     = COALESCE($3, year),
                genre    = COALESCE($4, genre)
            WHERE id = $5
            RETURNING *
        `;

        // Exécution de la requête avec les valeurs
        const resulat = await query(requete, values);

        // Retourne le film mis à jour, ou null si aucun film trouvé
        return resulat.rows[0] || null;
    } catch (erreur) {
        throw new Error("Erreur lors de la mise à jour du film: " + erreur.message);
    }
}

// ------------------------
// Service pour supprimer un film
// ------------------------
export async function deleteFilmService(id) {
    // Requête SQL pour supprimer un film par son id et retourner les données supprimées
    const requete = "DELETE FROM films WHERE id = $1 RETURNING *";
    const resultat = await query(requete, [id]);

    // Retourne le film supprimé
    return resultat.rows[0];
}
