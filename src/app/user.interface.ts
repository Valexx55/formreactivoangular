export interface Usuario {
    nombre: string;
    direccion?: {
      calle?: string;
      numero?: string;
    }
    telefonos? : number[];
  }