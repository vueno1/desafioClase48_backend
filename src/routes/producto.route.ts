import { Router } from "../../deps.ts";
import {
    guardarProducto,
    mostrarProductos, 
    buscarProducto,
    updateProducto,
    eliminarProducto
} from "../controllers/producto.controller.ts"

const router = new Router()

router  
    .get("/api/productos", mostrarProductos)
    .get("/api/productos/:productoId", buscarProducto)
    .post("/api/productos", guardarProducto)
    .put("/api/productos/:productoId", updateProducto)
    .delete("/api/productos/:id", eliminarProducto)

export default router