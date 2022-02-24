import { useEffect, useState } from 'react';

const usePagination = (data = [], pageLimit?: number, page?: number) => {
  const [perPageLimit, setPerPageLimit] = useState(pageLimit);
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [pageData, setPageData] = useState([]);
  const totalPages = perPageLimit ? Math.ceil(data.length / perPageLimit) : 1;

  useEffect(() => {
    const offset = perPageLimit ? currentPage * perPageLimit - perPageLimit : 0;
    const pageData = perPageLimit ? data.slice(offset, offset + perPageLimit) : data;
    setPageData(pageData);
  }, [currentPage, setPageData, data, perPageLimit, setPerPageLimit]);
  return { currentPage, setCurrentPage, pageData, perPageLimit, setPerPageLimit, totalPages };
};

export default usePagination;
