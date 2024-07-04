import { Injectable } from "@angular/core";
import { BaseRepository } from "../base/base-repository";
import { StateEntity } from "../entities/states.entity";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";


@Injectable(
    { providedIn: 'root' }
)
export class StateRepository extends BaseRepository<StateEntity> {

    indexUrl = 'states';
    showUrl = 'states/:id';
    editUrl = 'states/:id';
    createUrl = 'states';
    deleteUrl = 'states/:id';

    protected apiUrl = environment.statesAndCitiesApi;

    constructor(protected readonly http: HttpClient) {
        super();
    }
}