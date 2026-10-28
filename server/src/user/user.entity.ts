import { ContactEntity } from '../contact/contact.entity.js';

export class userEntity {
  id: number;
  name: string;
  username: string;
  password?: string;
  createdAt: Date;
  contacts?: ContactEntity[];
}
