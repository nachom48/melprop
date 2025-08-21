import { Property } from "./property.interface";

export interface PropertiesResponse {
    limit: number;
    count: number;
    objects: Property[];
}