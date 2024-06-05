/**
 * Base interface to use in models that have id.
 */
export interface HasId {
  _id: string;
}

/**
 * Base interface to use in models that have id and geometry.
 */
export interface GeometricEntity extends HasId {
  geometry: Object;
}
