import { PrismaClient } from "@prisma/client";

declare global {
    namespace globalThis {
        var prisma: PrismaClient
    }
}

export interface EstacionesProps {
  id: number;
  nombre: string;
  orden: string;
}
  
export interface TrenProps {
  id: number;
  idLinea: number;
  idEstActual: number;
  vagon: {
    id: number;
    personas: string;
    temp: number;
    hum: number;
    idTren: number;
  }[];
}
  
export interface VagonHARDProps {
  temp: number;
  hum: number;
  idVagon: number;
  idTren: number;
}
  
export interface VagonIAProps {
  personas: string;
  idVagon: number;
  idTren: number;
}

export type Vagon = {
  id: number
  personas: string
  temp: number
  hum: number
  idTren: number
}