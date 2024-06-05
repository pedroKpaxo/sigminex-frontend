import * as L from 'leaflet';
import { SigmineRecordEntity } from "@app/data/entities/sigmine-record.entity";
import { GeometricBaseModel } from "./model";

export class SigmineRecordModel extends GeometricBaseModel<SigmineRecordEntity> {
    public readonly nome: string;
    public readonly uso: string;
    public readonly subs: string;
    public readonly ano: number;
    public readonly dsProcesso: string;
    public readonly id: string;
    public readonly fase: string;
    public readonly estado: string;
    public readonly ultEvento: string;
    public readonly areaHa: number;

    static decoder(entity: SigmineRecordEntity): SigmineRecordModel {
        return new SigmineRecordModel(entity);
    }


    constructor(entity: SigmineRecordEntity) {
        super(entity);
        this.nome = entity.NOME;
        this.uso = entity.USO;
        this.subs = entity.SUBS;
        this.ano = entity.ANO;
        this.dsProcesso = entity.DSProcesso;
        this.id = entity.ID;
        this.fase = entity.FASE;
        this.estado = entity.UF;
        this.ultEvento = entity.ULT_EVENTO;
        this.areaHa = entity.AREA_HA;

    }
}


// Define the interface for feature properties
interface FeatureProperties {
    fase: string;
}

// Define styling options based on the phase
export function getRecordStyle(feature: GeoJSON.Feature): L.PathOptions {
    const phase = feature.properties!['fase'] as string;
    switch (phase) {
        case 'CONCESSÃO DE LAVRA':
            return { color: '#E6194B', weight: 2, opacity: 1, fillOpacity: 0.5 }; // Bright Red
        case 'REQUERIMENTO DE LAVRA':
            return { color: '#3CB44B', weight: 2, opacity: 1, fillOpacity: 0.5 }; // Green
        case 'AUTORIZAÇÃO DE PESQUISA':
            return { color: '#FFE119', weight: 2, opacity: 1, fillOpacity: 0.5 }; // Yellow
        case 'DISPONIBILIDADE':
            return { color: '#4363D8', weight: 2, opacity: 1, fillOpacity: 0.5 }; // Blue
        case 'REQUERIMENTO DE PESQUISA':
            return { color: '#F58231', weight: 2, opacity: 1, fillOpacity: 0.5 }; // Orange
        case 'APTO PARA DISPONIBILIDADE':
            return { color: '#911EB4', weight: 2, opacity: 1, fillOpacity: 0.5 }; // Purple
        case 'DIREITO DE REQUERER A LAVRA':
            return { color: '#46F0F0', weight: 2, opacity: 1, fillOpacity: 0.5 }; // Cyan
        case 'LICENCIAMENTO':
            return { color: '#F032E6', weight: 2, opacity: 1, fillOpacity: 0.5 }; // Magenta
        case 'REQUERIMENTO DE LICENCIAMENTO':
            return { color: '#BCF60C', weight: 2, opacity: 1, fillOpacity: 0.5 }; // Lime Green
        case 'REQUERIMENTO DE LAVRA GARIMPEIRA':
            return { color: '#FABEBE', weight: 2, opacity: 1, fillOpacity: 0.5 }; // Light Pink
        case 'LAVRA GARIMPEIRA':
            return { color: '#008080', weight: 2, opacity: 1, fillOpacity: 0.5 }; // Teal
        case 'REGISTRO DE EXTRAÇÃO':
            return { color: '#E6BEFF', weight: 2, opacity: 1, fillOpacity: 0.5 }; // Lavender
        case 'REQUERIMENTO DE REGISTRO DE EXTRAÇÃO':
            return { color: '#AA6E28', weight: 2, opacity: 1, fillOpacity: 0.5 }; // Brown
        case 'RECONHECIMENTO GEOLÓGICO':
            return { color: '#FFFAC8', weight: 2, opacity: 1, fillOpacity: 0.5 }; // Light Yellow
        case 'DADO NÃO CADASTRADO':
            return { color: '#800000', weight: 2, opacity: 1, fillOpacity: 0.5 }; // Maroon
        default:
            return { color: '#FFFFFF', weight: 2, opacity: 1, fillOpacity: 0.5 }; // White for unknown phases
    }
}


