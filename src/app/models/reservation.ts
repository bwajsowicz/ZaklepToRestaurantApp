import { Table } from "./table";
import { Restaurant } from "./restaurant";
import { Customer } from "./customer";

export class Reservation {
    id: string;
    restaurant: Restaurant;
    dateStart: Date;
    DateEnd: Date;
    table: Table;
    customer: Customer;
    isConfirmed: boolean;
    isActive: boolean;
}