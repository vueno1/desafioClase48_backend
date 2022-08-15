import { Application } from "./deps.ts";
import  router  from "./src/routes/producto.route.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
console.log(`Server on http://localhost:8000/`);
