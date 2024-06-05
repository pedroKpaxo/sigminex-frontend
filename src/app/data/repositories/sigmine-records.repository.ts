import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BaseRepository } from "../base/base-repository";
import { SigmineRecordEntity } from "../entities/sigmine-record.entity";
import { Injectable } from "@angular/core";
import { Decoder } from "@app/domain/base/decoder";
import { BaseModel } from "@app/domain/models/model";
import { AppError } from "@app/shared/util/errors/error";
import { Success, Failure } from "@app/shared/util/types/task";
import { environment } from "@environments/environment";
import { lastValueFrom, NotFoundError } from "rxjs";
import { Task } from "@app/shared/util/types/task";

@Injectable(
    { providedIn: 'root' }
)
export class SigmineRecordsReposiory extends BaseRepository<SigmineRecordEntity> {

    indexUrl = 'sigmine_records';
    showUrl = 'sigmine_records/:id';
    editUrl = 'sigmine_records/:id';
    createUrl = 'sigmine_records';
    deleteUrl = 'sigmine_records/:id';

    constructor(protected readonly http: HttpClient) {
        super();
    }


}