import React from "react";
import SimpleBar from "simplebar-react";


import Skeleton from "react-loading-skeleton";
import createPagination from "../utills/createPagination";



const DataTable = ({
  loading,
  columns,
  data,
  renderRow,
  pageSize,
  pageNo,
  totalCount,
  onPageChange,
  maxHeight = "98vh",
  height,
  noDataTitle
}) => {
  const pagination = createPagination(pageSize, pageNo, totalCount);
  const body = () => {
    if (loading)
      return [1, 2, 3, 4, 5].map((key, index) => (
        <tr key={row.id || index}>
          <td colSpan={columns?.length} className="text-center">
            <Skeleton height={30} />
          </td>
        </tr>
      ));
    if (!data.length)
      return (
        <tr>
          <td colSpan={columns?.length} className="text-center">
            <NoData title={noDataTitle} />
          </td>
        </tr>
      );

    return data.map((item, index) => renderRow(item, index));
  };
  return (
    <div className="w-100">
      <SimpleBar style={{ height, maxHeight, overflowX: "auto" }} className="scrollbar--custom">
        <table className="table table-responsive border-0 text-nowrap mb-0 align-middle">
          {columns?.length ? (
            <thead className="text-dark fs-4 thead-dark sticky-top">
  <tr>
    {columns.map((column) => (
      <th key={column.accessorKey || column.header}> {/* Use accessorKey or header */}
        <h6 className="fs-4 fw-semibold mb-0">{column.header}</h6>
      </th>
    ))}
  </tr>
</thead>
          ) : (
            <></>
          )}
          <tbody key={"tbody-12"}>{body()}</tbody>
        </table>
      </SimpleBar>

      {totalCount ? (
        <nav className="px-4 d-flex justify-content-between align-items-center my-2">
          <span className="fs-4 fw-semibold mb-0">
            {`Show ${pagination.from} to ${pagination.to} of ${pagination.totalCount}`}
          </span>
          <ul className="pagination  m-0">
            <li
              className={`page-item ${pagination.currentPage === 1 ? "disabled" : ""}`}
            >
              <button
                className="page-link rounded-circle mx-1"
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
              >
                <i className="ti ti-chevron-left"></i>
              </button>
            </li>
            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${pagination.currentPage === i + 1 ? "active" : ""
                  }`}
              >
                <button
                  className="page-link rounded-circle mx-1"
                  onClick={() => onPageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${pagination.currentPage === pagination.totalPages
                ? "disabled"
                : ""
                }`}
            >
              <button
                className="page-link rounded-circle mx-1"
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                <i className="ti ti-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DataTable;
