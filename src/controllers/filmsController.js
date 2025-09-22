import{listFilmsServices} from "../services/filmsServices.js";

// TODO: lister les films

// controller
export async function listFilms(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;

        // Appel du service
        const films = await listFilmsServices({ limit, offset });
        res.json(films);
    } catch (err) {
        res.status(500).json({ error: "Impossible de charger les films" });
    }
}

// TODO: récupérer un film par id
export async function getFilm(req, res) {

    try {
        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;

        // Appel du service
        const films = await listFilmsServices({ limit, offset });
        res.json(films);
    } catch (err) {
        console.error("Erreur listFilms controller:", err);
        res.status(500).json({ error: "Impossible de charger les films" });
    }

}
// TODO: créer un film
export async function createFilm(req, res) {
}
// TODO: mettre à jour un film
export async function updateFilm(req, res) {
}
// TODO: supprimer un film
export async function deleteFilm(req, res) {
}
