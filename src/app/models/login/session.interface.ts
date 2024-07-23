export interface ISession {
  usuarioId: number;
  usuario: string;
  contrasena: string;
  tema: string;
  plazaId: string;
  estado: boolean;
  fechaVencimiento: string;
  perfiles: IPerfil[];
  links: ILink[];
  expire: string;
}

export interface IPerfil {
  perfilId: number;
  sistema: ISistema;
  nombre: string;
  descripcion: string;
  estado: boolean;
}

export interface ISistema {
  sistemaId: number;
  nombre: string;
  estado: boolean;
}

export interface ILink {
  modulo_id: string;
  moduloNombre: string;
  nombre: string;
  url: string;
  estado: boolean;
  usuarioLinks: any[]; // Puedes definir una interfaz específica si es necesario
  perfilLinks: any[]; // Puedes definir una interfaz específica si es necesario
}
