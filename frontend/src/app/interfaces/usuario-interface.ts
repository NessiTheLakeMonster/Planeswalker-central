export interface UsuarioSessionStorage {
    uid: number;
    usuario: Usuario;
    token: string;
    roles: Usuario[];
}

export interface Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    nick: string;
    email: string;
    roles: Rol[];
}

export interface Rol {
    nombre: string;
}

export interface RolesUsuario {
    roles: Rol[];
}