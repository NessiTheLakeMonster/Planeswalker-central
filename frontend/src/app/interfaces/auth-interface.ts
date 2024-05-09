export interface UsuarioLogin {
    email: string;
    password: string;
}

export interface UsuarioRegistro {
    nombre: string;
    apellidos: string;
    email: string;
    nick: string;
    password: string;
}

export interface UsuarioAcceso {
    ok?: boolean;
    usuario: Usuario;
    token?: string;
}

export interface Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    nick: string;
    password: string;
    puntos: number;
    foto_perfil: string;
}