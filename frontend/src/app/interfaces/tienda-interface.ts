export interface ArticuloTienda {
    id : number;
    id_carta : number;
    id_vendedor : number;
    precio : number;
    estado : string;
    carta : CartaTienda;
    vendedor : Vendedor;
}

export interface Tienda {
    id : number;
    articulos : ArticuloTienda[];
}

export interface CartaTienda {
    nombre_es : string;
    nombre_en : string;
    foto_es : string;
    foto_en : string;
}

export interface Vendedor {
    nomnbre : string;
    apellidos : string;
    nick : string;
}