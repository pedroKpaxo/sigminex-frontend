import { environment } from 'src/environments/environment';
import { Failure, Success, Task } from 'src/app/shared/util/types/task';
import { HasId } from './has-id';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Decoder } from 'src/app/domain/base/decoder';
import { BaseModel } from 'src/app/domain/models/model';
import { AppError, NotFoundError } from 'src/app/shared/util/errors/error';
import { snakeCase } from 'snake-case';


/**
 * Utility interface for converting a query object to a query string.
 */
interface QueryParams {
    [key: string]: string | string[];
}


export abstract class BaseRepository<
    Entity extends HasId,
    SaveArgs extends HasId = HasId,
> {

    /**
     * The http client to use for requests.
     */
    protected abstract readonly http: HttpClient;
    /**
     * The url to use for fetching a single entity.
     */
    protected abstract readonly showUrl: string;
    /**
     * The url to use for fetching a list of entities.
     */
    protected abstract readonly indexUrl: string;
    /**
     * The url to use for saving an entity.
     */
    protected abstract readonly editUrl: string;
    /**
     * The url to use for creating an entity.
     */
    protected abstract readonly createUrl: string;
    /**
     * The url to use for deleting an entity.
     */
    protected abstract readonly deleteUrl: string;



    /**
     * Method to fetch a single entity from the backend.
     * @param id The id of the entity to fetch.
     * @param decode The model decoder to use.
     * @returns A task with the result of the request.
     * @throws An error if the entity could not be fetched.
     */
    async show<Model extends BaseModel>(
        id: number,
        decode: Decoder<Model>,
    ): Promise<Task<Model>> {
        try {
            const baseUrl = environment.api;
            const showUrl = this.showUrl.replace(/:id/g, id.toString());
            let res = await lastValueFrom(this.http.get(`${baseUrl}/${showUrl}/`));

            // workaround for MirageJs
            if (Object.keys(res).length === 1 && res.hasOwnProperty('data')) {
                res = (res as { data: Entity }).data;
            }

            return new Success(decode(res as Entity));
        } catch (error) {
            return new Failure(AppError.parse(error as HttpErrorResponse));
        }
    }

    /**
     * The index method fetches a list of entities from the backend.
     * It also accepts a query object to filter the results.
     * @param query A query object to filter the results.
     * @param decode The model decoder to use.
     * @returns A task with the result of the request.
     * @throws An error if the entities could not be fetched.
     */
    async index<Model extends BaseModel>(
        query: Object,
        decode: Decoder<Model>,
    ): Promise<Task<Array<Model>>> {
        try {
            const res = await lastValueFrom(
                this.http.get<Array<Entity>>(
                    `${environment.api}/${this.indexUrl}/`,
                    { params: this.queryToParams(query) },
                ),
            );
            return new Success(res.map(decode));
        } catch (e) {
            const error = AppError.parse(e as HttpErrorResponse);
            if (error instanceof NotFoundError)
                return new Success([]);
            return new Failure(error);
        }
    }

    /**
     * A method to save an entity to the backend.
     * @param form The form data to save.
     * @param decode The model decoder to use.
     * @returns A task with the result of the request.
     * @throws An error if the entity could not be saved.
     */
    async save<Model extends BaseModel>(
        form: SaveArgs,
        decode: Decoder<Model>,
    ): Promise<Task<Model>> {
        try {
            const isEdit = form._id != null;
            let request, url;

            if (isEdit) {
                url = `${environment.api}/${this.editUrl}/`.replace(
                    /:id/g,
                    form._id.toString(),
                );
                request = this.http.patch<Entity>(url, form);
            } else {
                url = `${environment.api}/${this.createUrl}/`;
                request = this.http.post<Entity>(url, form);
            }

            let res = await lastValueFrom(request);

            // workaround for MirageJs
            if (Object.keys(res).length === 1 && res.hasOwnProperty('data'))
                res = res;

            return new Success(decode(res));
        } catch (error) {
            return new Failure(AppError.parse(error as HttpErrorResponse));
        }
    }


    /**
     * A method to delete an entity from the backend.
     * @param id The id of the entity to delete.
     * @returns A task with the result of the request.
     * @throws An error if the entity could not be deleted.
     * @throws An error if the entity could not be found.
     */
    async delete(id: string | number): Promise<Task> {
        try {
            await lastValueFrom(
                this.http.delete(
                    `${environment.api}/${this.deleteUrl.replace(
                        /:id/g,
                        id.toString(),
                    )}/`,
                ),
            );
            return new Success(null);
        } catch (error) {
            return new Failure(AppError.parse(error as HttpErrorResponse));
        }
    }

    /**
     * The queryToParams method converts a query object to a QueryParams interface
     * @param query A query object to convert.
     * @returns A QueryParams interface.
     */
    protected queryToParams(query: Object): QueryParams {
        if (query == null) return {};
        return Object.entries(query).reduce((acc: any, [key, value]) => {
            if (value == null || value === '') return acc;

            key = snakeCase(key);
            if (Array.isArray(value) && value.length > 0) {
                acc[key] = value.map(this.valueToString).join(',');
            } else {
                if (key === 'sort') value = snakeCase(value);
                if (key === 'page') value = value + 1; // backend expects page=1 as the start

                acc[key] = value;
            }
            return acc;
        }, {});
    }

    /**
     * The valueToString method converts a value to a string.
     * @param v A unknown value to convert.
     * @returns A string representation of the value.
     */
    private valueToString(v: unknown): string | null {
        if (v == null) return null;
        if (typeof v === 'string') return v;
        if (v.toString != null) return v.toString();
        return null;
    }
}