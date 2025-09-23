import {
    createFilmServices,
    deleteFilmService,
    getFilmById,
    listFilmsServices,
    updateFilmServices
} from "../services/filmsServices.js";
// Import des fonctions du service filmsServices.js qui interagissent avec la base de données.
// Chaque fonction correspond à une opération CRUD (Create, Read, Update, Delete).

// TODO: lister les films
export async function listFilms(req, res) {
    try {
        // Appelle la fonction de service pour récupérer tous les films
        const films = await listFilmsServices({});
        // Retourne la liste des films avec le code HTTP 200 (OK)
        res.status(200).json(films);
    } catch (err) {
        // En cas d'erreur, retourne le code HTTP 500 (Internal Server Error) et un message
        res.status(500).json({ error: "Impossible de charger les films" + err });
    }
}

// TODO: récupérer un film par id
export async function getFilm(req, res) {
    try {
        // Récupère le paramètre 'id' de l'URL et le convertit en entier
        const film = await getFilmById(parseInt(req.params.id));
        // Retourne le film trouvé au format JSON
        res.json(film);
    } catch (err) {
        // En cas d'erreur (ex: id non trouvé), retourne un code 500
        res.status(500).json({ error: "Impossible de charger le film" });
    }
}

// TODO: créer un film
export async function createFilm(req, res) {
    try {
        // Récupère les informations du film depuis le corps de la requête
        const { title, director, year, genre } = req.body;
        // Appelle le service pour créer un nouveau film en base de données
        const film = await createFilmServices({ title, director, year, genre });
        // Retourne le film créé avec le code HTTP 201 (Created)
        res.status(201).json(film);
    } catch (err) {
        // En cas d'erreur, retourne un code 500
        res.status(500).json({ error: "Impossible de créer le film" });
    }
}

// TODO: mettre à jour un film
export async function updateFilm(req, res) {
    try {
        // Récupère les nouvelles données du film depuis le corps de la requête
        const { title, director, year, genre } = req.body;
        // Appelle le service pour mettre à jour le film correspondant à l'id
        const film = await updateFilmServices(parseInt(req.params.id), { title, director, year, genre });
        // Retourne le film mis à jour avec le code HTTP 200 (OK)
        res.status(200).json(film);
    } catch (err) {
        // Affiche l'erreur dans la console et retourne un code 500
        console.error(err);
        res.status(500).json({ erreur: "Impossible de mettre à jour le film: " + err.message });
    }
}

// TODO: supprimer un film
export async function deleteFilm(req, res) {
    try {
        // Appelle le service pour supprimer le film correspondant à l'id
        await deleteFilmService(req.params.id);
        // Retourne le code HTTP 204 (No Content) car la suppression est réussie et aucune donnée n'est retournée
        res.sendStatus(204);
    } catch (err) {
        // Affiche l'erreur dans la console et retourne un code 500
        console.error(err);
        res.status(500).json({ erreur: "Impossible de supprimer le film: " + err.message });
    }
}
