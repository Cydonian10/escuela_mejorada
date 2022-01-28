export interface IAsistencia {
    id: number,
    hora_salida: Date,
    hora_entrada: Date,
    fecha: Date,
    asistio: number,
    description: string,
    description_salida: string,
    name?: string;
    lastName?: string;
    user_id?: number;
    //   createAt: "2021 - 11 - 17T19: 06: 25.546Z",
    //   updateAt: "2021 - 11 - 17T19: 06: 25.546Z",
}

export interface IAsitenciasResponse {
    message: string;
    data: IAsistencia[];
}

export interface IAsitenciaResponse {
    message: string;
    data: IAsistencia;
}

export interface CreateAsistenciaDto {
    user_id: number;
    hora_entrada: Date;
    description: string;
    fecha: Date;
}

export interface UpdateAsisteciaDto {
    hora_salida?: Date,
    hora_entrada?: Date,
    fecha?: Date,
    asistio?: number,
    description?: string,
    description_salida?: string,
}

export interface IAsitenciaLocalStorage {
    name: string;
    lastName: string;
    id: number,
    hora_salida: Date,
    hora_entrada: Date,
    fecha: Date,
    asistio: number,
    description: string,
    description_salida: string,
}