export interface BarrioDTO {
    id: number;
    neighborhood: string;
    count?: number;
    description?: string;
    [key: string]: any;
}