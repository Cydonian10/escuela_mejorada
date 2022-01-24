export interface IRespUsuarios {
    message: string;
    data: IUsuario[];
}

export interface IRespUsuario {
    message: string;
    data: IUsuario;
}

export interface IUsuario {
    id: string,
    name: string,
    last_name: string,
    email: string,
    dni: string,
    rol: string,
    telefono: string,
    grado_seccion: string,
    // created_at: Date,
    // updated_at: Date,
}

export interface CreateUsuarioDto extends Omit<IUsuario, 'id'> { }
export interface UpdateTramiteDto extends Partial<CreateUsuarioDto> { }