import { userEntity } from '../user/user.entity.js';

export class ContactEntity {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  userId: number;
  user?: userEntity;
  createdAt: Date;
}
