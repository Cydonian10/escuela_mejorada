export interface IRptaConfig {
    message: string;
    data: IConfig;
}

export interface IConfig {
    id: number;
    nombre_escuela: string;
    telefono_escuela: string;
    facebook_esculea: string;
    frase_escuela: string;
    description: string;
}

export interface CreateConfigDto extends Omit<IConfig, 'id'> { }

export interface UpdateDtoConfig extends Partial<CreateConfigDto> { }