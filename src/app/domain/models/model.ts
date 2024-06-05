import { GeometricEntity, HasId } from "src/app/data/base/has-id";
import { Feature, GeoJSON } from "geojson";

export abstract class BaseModel<Entity extends HasId = HasId> implements HasId {

  get _id(): string {
    return this.entity._id as string;
  }

  public readonly entity: Partial<Entity>;

  constructor(entity: Partial<Entity>) {
    this.entity = entity;
  }
}


export class GeometricBaseModel<
  Geometric extends GeometricEntity = GeometricEntity,
> extends BaseModel {
  public readonly geometry!: GeoJSON;

  constructor(entity: Partial<Geometric>) {
    super(entity);
    this.geometry = entity.geometry! as GeoJSON;
  }

  asFeature(): Feature {
    return this.geometry as Feature;
  }
}