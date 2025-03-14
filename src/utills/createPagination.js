export default function createPagination(pageSize, currentPage, totalCount) {
    if (!pageSize || !currentPage || !totalCount) {
      console.warn("Invalid arguments passed to createPagination:", {
        pageSize,
        currentPage,
        totalCount,
      });
      return {
        currentPage: 1,
        pageSize: 0,
        totalPages: 0,
        totalCount: 0,
        from: 0,
        to: 0,
      };
    }
  
    const totalPages = Math.ceil(totalCount / pageSize);
    const from = (currentPage - 1) * pageSize + 1;
    const to = Math.min(currentPage * pageSize, totalCount);
  
    return {
      currentPage,
      pageSize,
      totalPages,
      totalCount,
      from,
      to,
    };
  }
  