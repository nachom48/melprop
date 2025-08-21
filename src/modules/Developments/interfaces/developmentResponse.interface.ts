import { Development } from "./development.interface";

export interface DevelopmentsResponse {
    objects: Development[];
    total: number;        // Mapeado desde "count" del backend
    page: number;         // Calculado desde la respuesta
    pages: number;        // Calculado desde "count" y "limit"
    limit: number;        // Agregado para cálculos
    count: number;        // Original del backend
}