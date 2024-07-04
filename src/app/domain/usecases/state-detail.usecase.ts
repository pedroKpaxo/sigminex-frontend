import { StateRepository } from "@app/data/repositories/states.repository";
import { Decoder } from "../base/decoder";
import { StateModel } from "../models/state.model";
import { DetailUsecase } from "../base/detail.usecase";
import { HasId } from "@app/data/base/has-id";
import { Injectable } from "@angular/core";


@Injectable()
export class StateDetailUsecase extends DetailUsecase<StateModel> {
    protected decoder = StateModel.decoder as Decoder<StateModel, any>;
    constructor(protected override repository: StateRepository) {
        super();
    }
}