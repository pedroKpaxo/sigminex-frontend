import { HasId } from "../base/has-id";


export interface UserEntity extends HasId {
  email: string;
  name: string;
  is_active?: boolean;
  is_staff?: boolean;
  picture?: string;
}
