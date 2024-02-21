export interface IPagination {
  pagesArray: number[];
  changePage: (page: number) => void;
  currentPage: number;
}