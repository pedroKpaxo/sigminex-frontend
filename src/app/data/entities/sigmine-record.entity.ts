

import { GeometricEntity } from "../base/has-id";

interface SigmineChanges {
    field: string;
    oldValue: string;
    newValue: string;
}


export interface SigmineRecordEntity extends GeometricEntity {

    NOME: string;
    USO: string;
    SUBS: string;
    ANO: number;
    DSProcesso: string;
    ID: string;
    AREA_HA: number;
    FASE: string;
    ULT_EVENTO: string;
    NUMERO: number;
    PROCESSO: string;
    UF: string;

    history?: SigmineChanges[];

}