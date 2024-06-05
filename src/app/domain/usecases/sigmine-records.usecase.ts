import { Injectable } from '@angular/core';
import { IndexUseCase } from '../base/index.usecase';
import { SigmineRecordModel } from '../models/simine-record.model';
import { SigmineRecordsReposiory } from '@app/data/repositories/sigmine-records.repository';
import { DEFAULT_QUERY } from '@app/shared/const';
import { Decoder } from '../base/decoder';

@Injectable()
export class SigmineRecordsUseCase extends IndexUseCase<SigmineRecordModel> {
    constructor(protected override repository: SigmineRecordsReposiory) {
        super({
            initialQuery: { ...DEFAULT_QUERY },
            decoder: SigmineRecordModel.decoder as Decoder<SigmineRecordModel, any>,
            repository,
        });
        this.busy = false;
    }
}