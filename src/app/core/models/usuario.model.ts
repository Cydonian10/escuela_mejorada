export interface IRespUsuarios {
    message: string;
    data: IUsuario[];
}

export interface IRespUsuario {
    message: string;
    data: IUsuario;
}

export interface IUsuario {
    id: number,
    name: string,
    last_name: string,
    email: string,
    dni: string,
    rol: string,
    telefono: string,
    grado_seccion: string,
    password?: string;
    // created_at: Date,
    // updated_at: Date,
}

export interface CreateUsuarioDto extends Omit<IUsuario, 'id'> { }
export interface UpdateUsuarioDto extends Partial<CreateUsuarioDto> { }