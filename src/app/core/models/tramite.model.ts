export enum ITramiteNombre {
    matricula = "matricula",
    notas = "notas",
    permiso = "permiso",
    vacante = "vacante",
    otro = "otro"
}

export enum ITramiteEstado {
    pendiente = "pendiente",
    proceso = "proceso",
    rechazado = "rechazado",
    aprobado = "aprobado"
}

export interface RespuestaTramite {
    message: string;
    data: ITramite;
}

export interface RespuestaTramites {
    message: string;
    data: DataTramite;
}


export interface Link {
    url: null | string;
    label: string;
    active: boolean;
}

export interface DataTramite {
    current_page: number;
    data: ITramite[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}



export interface ITramite {
    id: number,
    name: string,
    apellidos: string;
    dni: string,
    email: string,
    descriptcion_padre: string,
    tramite_nombre: ITramiteNombre,
    telefono: string,
    archivo_padre: string,
    fecha: Date,
    tramite_estado: ITramiteEstado,

    archivo_descargar_admin?: string,
    visto?: boolean,
    descriptcion_recepcionista?: string,
    created_at?: string,
    updated_at?: Date,
}

export interface CreateTramiteDto extends Omit<ITramite, 'id'> { }

export interface UpdateTramiteDto extends Partial<CreateTramiteDto> { }