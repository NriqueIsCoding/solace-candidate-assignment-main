// Two possible sort orders
export type SortOrder = "asc" | "desc";

export interface Advocate {
    id: number;
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: string[];
    yearsOfExperience: number;
    phoneNumber: bigint;
}

export interface AdvocateTableProps {
    advocates: Advocate[];
    isTableLoading: boolean;
    sortColumn: string;
    sortOrder: SortOrder;
    onSort: (column: string) => void;
    isSpecialtySearch: boolean;
    searchTerm: string;
}

export interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleResetSearch: () => void;
}

export interface PaginationControlsProps {
    currentPage: number;
    totalCount: number;
    itemsPerPage: number;
    setCurrentPage: (page: number) => void;
}

export interface FetchAdvocatesArgs {
    searchTerm: string;
    page: number;
    limit: number;
    sortColumn: string;
    sortOrder: SortOrder;
}

export interface AdvocateRowProps {
    advocate: Advocate;
    index: number;
    isSpecialtySearch: boolean;
    searchTerm: string;
}

