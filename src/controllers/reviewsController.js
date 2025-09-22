// TODO: lister les critiques d'un film
import {createReviewServices, deleteReviewServices, listReviewsByFilmId} from "../services/reviewsServices.js";
export async function listReviews(req, res) {

    const filmId = req.params.id;
        try {
            const reviews = await listReviewsByFilmId(filmId);
            res.status(200).json(reviews);
        } catch (err) {
            res.status(500).json({ erreur: "Impossible de charger les reviews" });
        }
}
// TODO: créer une critique liée à un film
export async function createReview(req, res) {
    try {
        const{author, rating, comment} = req.body;
        const film = await createReviewServices(req.params.id,{author, rating, comment});
        res.status(201).json(film);
    } catch (err) {
        res.status(500).json({ erreur: "Impossible de créer la review" + err});
    }


}
// TODO: supprimer une critique
export async function deleteReview(req, res) {
    try {
        const film = await deleteReviewServices(req.params.id);
        res.status(201).json(film);
    } catch (err) {
        res.status(500).json({ erreur: "Impossible de supprimer la review" + err});
    }

}
