// swagger.js
const openApiSpec = {
    openapi: "3.0.0",
    info: {
        title: "Ciné API",
        version: "1.0.0",
        description: "API pour gérer les films et les reviews : création, lecture, mise à jour et suppression"
    },
    servers: [
        { url: "http://localhost:3000", description: "Serveur local" }
    ],
    paths: {
        "/films": {
            get: {
                summary: "Lister les films",
                description: "Retourne la liste des films avec pagination",
                parameters: [
                    {
                        name: "limit",
                        in: "query",
                        description: "Nombre maximum de films à retourner",
                        required: false,
                        schema: { type: "integer", default: 50 }
                    },
                    {
                        name: "offset",
                        in: "query",
                        description: "Décalage pour la pagination",
                        required: false,
                        schema: { type: "integer", default: 0 }
                    }
                ],
                responses: {
                    "200": {
                        description: "Liste des films",
                        content: {
                            "application/json": {
                                schema: { type: "array", items: { $ref: "#/components/schemas/Film" } }
                            }
                        }
                    }
                }
            },
            post: {
                summary: "Créer un film",
                description: "Ajoute un nouveau film à la base",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/FilmInput" }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Film créé avec succès",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Film" }
                            }
                        }
                    }
                }
            }
        },
        "/films/{id}": {
            get: {
                summary: "Récupérer un film par ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "ID du film à récupérer"
                    }
                ],
                responses: {
                    "200": {
                        description: "Film trouvé",
                        content: {
                            "application/json": { schema: { $ref: "#/components/schemas/Film" } }
                        }
                    },
                    "404": { description: "Film non trouvé" }
                }
            },
            patch: {
                summary: "Mettre à jour un film",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "ID du film à mettre à jour"
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/FilmInput" }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Film mis à jour",
                        content: {
                            "application/json": { schema: { $ref: "#/components/schemas/Film" } }
                        }
                    },
                    "404": { description: "Film non trouvé" }
                }
            },
            delete: {
                summary: "Supprimer un film",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "ID du film à supprimer"
                    }
                ],
                responses: {
                    "200": {
                        description: "Film supprimé",
                        content: {
                            "application/json": { schema: { $ref: "#/components/schemas/Film" } }
                        }
                    },
                    "404": { description: "Film non trouvé" }
                }
            }
        },
        "/reviews/film/{filmId}": {
            get: {
                summary: "Lister les reviews d'un film",
                parameters: [
                    {
                        name: "filmId",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "ID du film dont on veut les reviews"
                    },
                    {
                        name: "limit",
                        in: "query",
                        required: false,
                        schema: { type: "integer", default: 50 }
                    },
                    {
                        name: "offset",
                        in: "query",
                        required: false,
                        schema: { type: "integer", default: 0 }
                    }
                ],
                responses: {
                    "200": {
                        description: "Liste des reviews",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Review" }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                summary: "Créer une review pour un film",
                parameters: [
                    {
                        name: "filmId",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "ID du film à critiquer"
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": { schema: { $ref: "#/components/schemas/ReviewInput" } }
                    }
                },
                responses: {
                    "201": {
                        description: "Review créée avec succès",
                        content: {
                            "application/json": { schema: { $ref: "#/components/schemas/Review" } }
                        }
                    }
                }
            }
        },
        "/reviews/{id}": {
            delete: {
                summary: "Supprimer une review",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "ID de la review à supprimer"
                    }
                ],
                responses: {
                    "200": {
                        description: "Review supprimée",
                        content: {
                            "application/json": { schema: { $ref: "#/components/schemas/Review" } }
                        }
                    },
                    "404": { description: "Review non trouvée" }
                }
            }
        }
    },
    components: {
        schemas: {
            Film: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    title: { type: "string" },
                    director: { type: "string" },
                    year: { type: "integer" },
                    genre: { type: "string" }
                },
                required: ["id", "title", "director", "year", "genre"]
            },
            FilmInput: {
                type: "object",
                properties: {
                    title: { type: "string" },
                    director: { type: "string" },
                    year: { type: "integer" },
                    genre: { type: "string" }
                },
                required: ["title", "director", "year", "genre"]
            },
            Review: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    filmId: { type: "integer" },
                    author: { type: "string" },
                    rating: { type: "integer" },
                    comment: { type: "string" }
                },
                required: ["id", "filmId", "author", "rating", "comment"]
            },
            ReviewInput: {
                type: "object",
                properties: {
                    author: { type: "string" },
                    rating: { type: "integer" },
                    comment: { type: "string" }
                },
                required: ["author", "rating", "comment"]
            }
        }
    }
};

export { openApiSpec };
