export interface UserGym {
  id?: string;
  cedula: string;
  telefono: string;
  nombres: string;
  apellidos: string;
  EPS: string;
  RH: string;
  plan?: string;
  ciudad: string;
  estado: string;
  direccion: string;
  fechaNacimiento?: Date;
  vencimiento?: Date;
  inicio?: Date;
  sexo?: string;
  userImage?: string;
  clave?: string;
}
