import { Restaurant } from "./restaurant";

export class Owner {
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdAt: Date;
    restaurant: Restaurant;
}