import { Injectable } from '@angular/core';
import { IndexUseCase } from '../base/index.usecase';
import { DEFAULT_QUERY } from '@app/shared/const';
import { Decoder } from '../base/decoder';
import { StateModel } from '../models/state.model';
import { StateRepository } from '@app/data/repositories/states.repository';

@Injectable()
export class StatesListUsecase extends IndexUseCase<StateModel> {
    constructor(protected override repository: StateRepository) {
        super({
            initialQuery: { ...DEFAULT_QUERY },
            decoder: StateModel.decoder as Decoder<StateModel, any>,
            repository,
        });
        this.busy = false;
    }


}