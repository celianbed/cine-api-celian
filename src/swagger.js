// swagger.js
const openApiSpec = {
    openapi: "3.0.0",
    info: {
        title: "Movies API",
        version: "1.0.0",
    },
    paths: {
        "/": {
            get: {
                summary: "Lister les films",
                responses: {
                    "200": { description: "Liste des films" },
                },
            },
        },
    },
};

export { openApiSpec };
