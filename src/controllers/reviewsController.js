// TODO: lister les critiques d'un film
import {createReviewServices, listReviewsByFilmId} from "../services/reviewsServices.js";
import {createFilmServices} from "../services/filmsServices.js";

export async function listReviews(req, res) {

    const filmId = req.params.id;
    console.log(filmId)

        try {
            const reviews = await listReviewsByFilmId(filmId);
            res.json(reviews);
        } catch (err) {
            res.status(500).json({ error: "Impossible de charger les films" });
        }
}
// TODO: créer une critique liée à un film
export async function createReview(req, res) {
    try {
        // Appel du service
        const{author, rating, comment} = req.body;
        const film = await createReviewServices(req.params.id,{author, rating, comment});
        res.status(201).json(film);
    } catch (err) {
        res.status(500).json({ error: "Impossible de créer le film" + err});
    }


}
// TODO: supprimer une critique
export async function deleteReview(req, res) {
}
