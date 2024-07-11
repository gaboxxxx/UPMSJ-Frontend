import { Donante } from "./donante";

export class Producto {
    idProducto: number;
    nombreProducto: string;
    categoria: string;
    unidadMedida: string;
    personaRecibe: string;
    personaRegistro: string;
    cantidad: number;
    observaciones: string; 
    fechaRegistro: Date; 
    fechaEntrega: Date;
    fechaActualizacion: Date;
    estado: boolean;
    estadoEntrega: boolean;
    idDonante : number;
    donante: Donante;
    [key: string]: any;

    
}