// TODO: lister les critiques d'un film
import { createReviewServices, deleteReviewServices, listReviewsByFilmId } from "../services/reviewsServices.js";
// Import des fonctions du service reviewsServices.js qui interagissent avec la base de données pour les reviews

export async function listReviews(req, res) {
    try {
        // Récupère l'id du film depuis les paramètres d'URL
        // Appelle le service pour récupérer toutes les critiques liées à ce film
        const reviews = await listReviewsByFilmId(req.params.id);
        // Retourne la liste des critiques avec le code HTTP 200 (OK)
        res.status(200).json(reviews);
    } catch (err) {
        // En cas d'erreur, retourne le code HTTP 500 avec le message d'erreur
        res.status(500).json({ erreur: "Impossible de charger les reviews :" + err });
    }
}

// TODO: créer une critique liée à un film
export async function createReview(req, res) {
    try {
        // Récupère les données de la critique depuis le corps de la requête
        const { author, rating, comment } = req.body;
        // Crée la critique pour le film identifié par req.params.id
        // parseInt est utilisé pour convertir l'id en nombre
        const film = await createReviewServices(parseInt(req.params.id), { author, rating, comment });
        // Retourne la critique créée avec le code HTTP 201 (Created)
        res.status(201).json(film);
    } catch (err) {
        // Retourne une erreur 500 en cas de problème
        res.status(500).json({ erreur: "Impossible de créer la review :" + err });
    }
}

// TODO: supprimer une critique
export async function deleteReview(req, res) {
    try {
        // Supprime la critique identifiée par req.params.id
        const review = await deleteReviewServices(parseInt(req.params.id));
        // Retourne le code HTTP 204 (No Content) car la suppression a réussi
        res.sendStatus(204);
    } catch (err) {
        // Retourne une erreur 500 en cas de problème
        res.status(500).json({ erreur: "Impossible de supprimer la review :" + err });
    }
}
