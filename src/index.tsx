import { serve } from "bun";
import index from "./index.html";
import MainIndex from "./pages/main/index.html";

import { getUsuarioById, usuariosHandler } from './api/routes/usuarios';
import { preguntasHandler } from './api/routes/preguntas';
import { getPreguntaByIdWithRespuestas, respuestasHandler } from './api/routes/respuestas';

const server = serve({
  routes: {
    "/": MainIndex,
    // Serve index.html for all unmatched routes.
    "/index": index,

    "/img/:pathname": {
      async GET(req) {
        try {
          const url = new URL(req.url);
          const pathname = req.params.pathname;
          const filePath = `./public/img/${pathname}`;
          return new Response(Bun.file(filePath));
        } catch (error) {
          return new Response('Not Found', { status: 404 });
        }
      }
    },

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    // TODO: ROUTES: Modificar las rutas para construirlos de esta manera
    "/api/usuario/:id": {
      async GET(req) {
        return await getUsuarioById(req.params.id)
      }
    },

    "/api/pregunta/:id/respuestas": {
      async GET(req) {
        return await getPreguntaByIdWithRespuestas({params: req.params, req: req})
      }
    }
  },

  development: process.env.NODE_ENV !== "production",

  // port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname.startsWith('/usuarios')) {
      return usuariosHandler(req);
    }

    if (url.pathname.startsWith('/preguntas')) {
      return preguntasHandler(req);
    }

    if (url.pathname.startsWith('/respuestas')) {
      return respuestasHandler(req);
    }

    return new Response('Not Found', { status: 404 });
  },
});

console.log(`🚀 Server running at ${server.url}`);
console.log(`Server running at http://localhost:${server.port}`);
