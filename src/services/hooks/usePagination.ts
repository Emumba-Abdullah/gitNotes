import { useState } from 'react';
import { IGistsdata } from '../../types/types';

export const usePagination = (data: IGistsdata[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages: number = Math.ceil(data.length / itemsPerPage);

  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const selectedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return {
    currentPage,
    totalPages,
    selectedData,
    handlePrevPage,
    handleNextPage,
    setCurrentPage,
  };
};
