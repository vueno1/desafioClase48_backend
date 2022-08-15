export type Uuid = string
export interface Producto {
    uuid: Uuid,
    nombre: string,
    descripcion: string,
    codigo: number,
    foto:string,
    precio:number,
    stock:number
}
