export interface DevelopmentSearchFilters {
    operation?: string;
    properties?: string;
    page?: number;
    locations?: string;
    rooms?: string;
    min_price?: string;
    max_price?: string;
    currency?: string;
    characteristics?: string;
    status?: string;
    sort?: string;
    order_by?: string;
    [key: string]: any;
}