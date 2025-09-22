import {
    createFilmServices,
    deleteFilmService,
    getFilmById,
    listFilmsServices,
    updateFilmServices
} from "../services/filmsServices.js";

// TODO: lister les films

export async function listFilms(req, res) {
    try {

        const films = await listFilmsServices({});
        res.json(films);
    } catch (err) {
        res.status(500).json({ error: "Impossible de charger les films" });
    }
}

// TODO: récupérer un film par id
export async function getFilm(req, res) {

    try {
        const film = await getFilmById(parseInt(req.params.id));
        res.json(film);
    } catch (err) {
        res.status(500).json({ error: "Impossible de charger le film" });
    }

}
// TODO: créer un film
export async function createFilm(req, res) {
    try {
        const{title, director, year, genre} = req.body;

        const film = await createFilmServices({title, director, year, genre});
        res.status(201).json(film);
    } catch (err) {
        res.status(500).json({ error: "Impossible de créer le film" });
    }

}
// TODO: mettre à jour un film
export async function updateFilm(req, res) {
    try {
        const{title, director, year, genre} = req.body;
        const film = await updateFilmServices(req.params.id, {title, director, year, genre});

        res.status(200).json(film);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Impossible de mettre à jour le film: " + err.message });
    }
}
// TODO: supprimer un film
export async function deleteFilm(req, res) {
    try {
        const film = await deleteFilmService(req.params.id);

        if (!film) {
            return res.status(404).json({ error: "Film non trouvé" });
        }

        res.status(200).json({ message: "Film supprimé", film });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Impossible de supprimer le film: " + err.message });
    }
}

