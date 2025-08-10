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
  }
  