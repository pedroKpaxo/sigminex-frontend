import { StateEntity } from "@app/data/entities/states.entity";
import { GeometricBaseModel } from "./model";


export class StateModel extends GeometricBaseModel<StateEntity> {
    public readonly nome: string;
    public readonly sigla: string;

    static decoder(entity: StateEntity): StateModel {
        return new StateModel(entity);
    }

    constructor(entity: StateEntity) {
        super(entity);
        this.nome = entity.nome;
        this.sigla = entity.sigla;
    }
}