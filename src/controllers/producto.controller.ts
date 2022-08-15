import { Context, helpers } from "../../deps.ts";
import {Producto} from "../types/producto.type.ts"
import dbConn from "../middlewares/mongo.ts";
const productos = dbConn.collection<Producto>("productos")
//------------------------------------------------------------------------

///FUNCIONES///
export const mostrarProductos = async (ctx: Context) => {
    try {
        ctx.response.status = 200;
        console.log(`status: ${ctx.response.status} method: GET buscar todos`);

        const resProductos = await productos.find({}).toArray();
        ctx.response.body = await {code: '00', data: resProductos};
    } catch (error) {
        ctx.response.status = 500;

        console.log(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const guardarProducto = async (ctx: Context ) => {
    try {
        ctx.response.status = 201;
        console.log(`status: ${ctx.response.status} method: POST guardar producto`);

        const { nombre, descripcion, codigo, foto, precio, stock  } = await ctx.request.body().value;
        
        const resProductos = await productos.find({}).toArray();

        let newId = 0;
        if (resProductos.length > 0) {
            newId = Number(resProductos[resProductos.length - 1].uuid) + 1;                   
        } else {
            newId = 1;
        }

        const producto: Producto = {
            uuid: newId.toString(),
            nombre: nombre,
            descripcion: descripcion,
            codigo: codigo,
            foto: foto,
            precio: precio,
            stock: stock         
        }
        await productos.insertOne(producto);

        ctx.response.body = await {code: '00', data: producto};
    } catch (error) {
        ctx.response.status = 500;

        console.log(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const buscarProducto = async (ctx: Context) =>{
    try {
        //esto es lo que viene x parametro
        const { productoId } = helpers.getQuery(ctx, {mergeParams: true});
        const producto = await productos.findOne({uuid:productoId})

        if (producto) {
            ctx.response.body = await {code: '00', data: producto};
        } else {
            ctx.response.body = await {code: '01', msg: `Usuario con id ${productoId} no encontrado`};
        }
    } catch (error) {
        ctx.response.status = 500;
        console.log(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const updateProducto = async (ctx: Context) =>{
    try{
        ctx.response.status = 202
        console.log(`status: ${ctx.response.status} method: PUT updated`)

        const {productoId } = helpers.getQuery(ctx, {mergeParams:true})
        const producto = await productos.findOne({uuid: productoId})

        if(producto) {
            const { nombre, descripcion, codigo, foto, precio, stock  } = await ctx.request.body().value;
            
            await productos.updateOne({uuid: productoId}, {$set:{
                nombre:nombre,
                descripcion: descripcion,
                codigo: codigo, 
                foto: foto,
                precio: precio, 
                stock: stock
            }})
            ctx.response.body = {code: "00", data: {uuid: productoId, nombre, descripcion, codigo,foto, precio,stock}}
        } else{
            ctx.response.body = {code: "01", msg: `usuario id ${productoId} no encontrado`}
        }
    } catch(error) {
        ctx.response.status = 500;
        console.log(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {msg: error};
    }
}


export const eliminarProducto = async(ctx: Context) =>{
    try {
        ctx.response.status = 202
        console.log(`status: ${ctx.response.status} method: DELELTE Eliminado`)

        const {productoId } = helpers.getQuery(ctx, {mergeParams:true})
        const producto = await productos.findOne({uuid: productoId})
        
        if (producto) {
            await productos.deleteOne({
                uuid: productoId
            })
            ctx.response.body = {code: "01", msg: `usuario ${productoId} eliminado!`}


        } else {
            ctx.response.body = {code: "01", msg: `usuario ${productoId} no encontrado`}
        }
    } catch (error) {
        ctx.response.status = 500;
        console.log(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {msg: error};
    }
}