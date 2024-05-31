export interface MazosResponse {
    ok: boolean;
    mazos: Mazo[];
}

export interface Mazo {
    id: number;
    nombre: string;
    activo: number;
    id_usuario: number;
    formato: string;
}

export interface CartasMazoResponse {
    ok: boolean;
    cartas: CartasMazoDetalle[];
}

export interface CartasMazoDetalle {
    id_mazo: number;
    id_carta: number;
    createdAt: string;
    updatedAt: string;
    carta: CartaMazo;
}

export interface CartaMazo {
    id: number;
    id_api: number;
    nombre_es: string;
    nombre_en: string;
    foto_es: string;
    foto_en: string;
    createdAt: string;
    updatedAt: string;
}