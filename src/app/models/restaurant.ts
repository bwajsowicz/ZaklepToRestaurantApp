import { Table } from "./table";

export class Restaurant {
    id: string;
    name: string;
    description: string;
    cuisine: string;
    localization: string;
    representativePhotoUrl: string;
    tables: Table[];
}