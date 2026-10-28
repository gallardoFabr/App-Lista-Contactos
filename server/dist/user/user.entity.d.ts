import { ContactEntity } from '../contact/contact.entity.js';
export declare class userEntity {
    id: number;
    name: string;
    username: string;
    password?: string;
    createdAt: Date;
    contacts?: ContactEntity[];
}
