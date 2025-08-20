// =====================================================
// BARRIO MODULE - INTERFACES
// =====================================================

export interface BarrioDTO {
    id: number;
    neighborhood: string;
    count?: number;
    description?: string;
    [key: string]: any;
}

export interface BarriosResponseDTO {
    barrios: BarrioDTO[];
    total: number;
    [key: string]: any;
}
