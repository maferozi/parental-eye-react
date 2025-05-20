import { useSearchParams } from "react-router-dom";
import { deleteInvitedUser, getAllInvitedUser } from "../../api/invitedUser";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/DataTable";
import Skeleton from "react-loading-skeleton";
import { Dropdown } from "react-bootstrap";

export default function UserManagement(){
     const [searchParams, setSearchParams] = useSearchParams();
    
      const pageNoChild = Number(searchParams.get("pageNoChild")) || 1;
      const pageSizeChild = Number(searchParams.get("pageSizeChild")) || 5;
    
      const childSearchQuery = searchParams.get("childSearchQuery") || "";

    
      // Fetch paired users
      const {
        data: childData,
        isLoading: childLoading,
        refetch: refetchChild,
      } = useQuery({
        queryKey: ["childData", pageNoChild, pageSizeChild],
        queryFn: () =>
          getAllInvitedUser({
            pageNo: pageNoChild,
            limit: pageSizeChild,
            role: 4,
            search: childSearchQuery,
          }),
      });

  const handleChildPageChange = (newPageNo) => {
    setSearchParams({ pageNoChild: newPageNo, pageNoDriver,pageNoGardian });
    refetchChild();
  };

    const columnChild = [
    {
      key: "id",
      title: "ID",
      accessorKey: "id",
      header: "ID",
    },
    {
      key: "fullName",
      title: "Name",
      accessorKey: "fullName",
      header: "User Name",
    },
    { key: "type", title: "Type", accessorKey: "type", header: "User Type" },
    {
      key: "action",
      title: "Action",
      accessorKey: "action",
      header: "Actions",
    },
  ];


    const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        {item.id}
      </td>
      <td>
        {item.firstName} {item.lastName}
      </td>
      <td>{item.role === 2 ? "ADMIN" : "NULL"}</td>
      <td>
        <Dropdown>
          <Dropdown.Toggle variant="light">
            <i className="ti ti-dots"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              className="text-danger"
              onClick={async () => {
                // await deleteInvitedUser(item.id);
              }}
            >
              Delete
            </Dropdown.Item>
           
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );

    return (
        
              <div className="row justify-content-around mt-5">
        <div className="col-12  p-4 border rounded-5 shadow-md">
          <div className="d-flex justify-content-between align-items-center">
            <h4>Admin User</h4>
            <input
              className="form-control rounded-pill"
              style={{ width: "10rem" }}
              type="text"
              placeholder="Search"
              onChange={async (e) => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set("childSearchQuery", e.target.value);
                await setSearchParams(newParams);
                refetchChild();
              }}
            />
          </div>
          {childData && (
            <DataTable
              loading={childLoading}
              columns={columnChild}
              data={childData.data}
              renderRow={renderRow}
              pageSize={childData.limit}
              pageNo={childData.pageNo}
              totalCount={childData.count}
              onPageChange={handleChildPageChange}
              noDataTitle="No paired users available."
            />
          )}
          {childLoading && (
            <div className="w-100">
              <Skeleton count={1} height={50} />
              <Skeleton count={5} height={40} />
            </div>
          )}
        </div>
      </div>
        
    );
}