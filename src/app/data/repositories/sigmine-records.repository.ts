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

interface GneralData {
    FASE: string[];
    PROCESSO: string[];
    SUBS: string[];
    USO: string[];
}

@Injectable(
    { providedIn: 'root' }
)
export class SigmineRecordsReposiory extends BaseRepository<SigmineRecordEntity> {

    indexUrl = 'sigmine_records/sigmine_records';
    filters = 'sigmine_records/filters';
    showUrl = 'sigmine_records/sigmine_records/:id';
    editUrl = 'sigmine_records/:id';
    createUrl = 'sigmine_records';
    deleteUrl = 'sigmine_records/:id';

    protected apiUrl = environment.api;

    constructor(protected readonly http: HttpClient) {
        super();
    }


    async getFilters(uf: string): Promise<Task<GneralData>> {
        try {
            const response = await lastValueFrom(this.http.get<GneralData>(`${this.apiUrl}/${this.filters}`, { params: { uf } }));
            return new Success(response);
        } catch (error) {
            return new Failure(error as AppError);
        }
    }


}