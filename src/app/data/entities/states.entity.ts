import { GeometricEntity } from "../base/has-id";


export interface StateEntity extends GeometricEntity {
    nome: string;
    sigla: string;
}