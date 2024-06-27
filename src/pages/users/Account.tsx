import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  User,
  Chip,
  Dropdown,
  Pagination,
  Selection,
  ChipProps,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Card,
} from "@nextui-org/react";
import { SearchIcon } from "../../components/SearchIcon";
import { users, columns, statusOptions } from "./data";
import TabList from "../../components/TabList";
import { ChevronDownIcon } from "../../components/ChevronDownIcon";
import { capitalize } from "../../utils/utils";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  blocked: "danger",
  paused: "warning",
};
export interface TableListProps {
  list: User[];
  role?: React.Key;
}

type User = (typeof users)[0];

export default function Account(): JSX.Element {
  const [filterRole, setFilterRole] = React.useState("");
  const [filterValue, setFilterValue] = React.useState("");

  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [pages, setPages] = React.useState(
    Math.ceil(users.length / rowsPerPage),
  );
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const hasFilterRole = Boolean(filterRole);
  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];
    if (hasFilterRole) {
      filteredUsers = users.filter((user) =>
        user.role.toLowerCase().includes(filterRole.toLowerCase()),
      );
    }
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.phone.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.mail.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      setPage(1);
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }
    return filteredUsers;
  }, [hasFilterRole, hasSearchFilter, filterRole, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    setPages(Math.ceil(filteredItems.length / rowsPerPage));
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-small capitalize">{cellValue}</p>
          </div>
        );
      case "name":
        return (
          <User
            // avatarProps={{radius: "lg", src: user.avatar}}
            description={user.name}
            name={cellValue}
          >
            {user.name}
          </User>
        );
      case "phone":
        return (
          <div className="flex flex-col">
            <p className="text-small capitalize">{cellValue}</p>
          </div>
        );
      case "mail":
        return (
          <div className="flex flex-col">
            <p className="text-small capitalize">{cellValue}</p>
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-small capitalize">{cellValue}</p>
            <p className="text-tiny capitalize text-default-400">{user.role}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );

        return cellValue;
    }
  }, []);
  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="">
        <div className="flex flex-col gap-4 pr-8">
          <div className="flex items-end justify-between">
            <div className="flex w-1/3 justify-between">
              <TabList onRoleSelect={setFilterRole} />
              <Dropdown className="ml-16">
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    size="md"
                    variant="flat"
                  >
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>

            <Input
              isClearable
              classNames={{
                base: "w-full sm:max-w-[44%] pt-2",
                inputWrapper: "border-1",
              }}
              placeholder="Search..."
              size="sm"
              startContent={<SearchIcon className="text-default-300" />}
              value={filterValue}
              variant="bordered"
              onClear={() => setFilterValue("")}
              onValueChange={onSearchChange}
            />
          </div>
          <div className="flex justify-between gap-3">
            <span className="flex text-small text-default-400">
              Total {users.length} users
            </span>
            <Card>
              <div className="flex items-center justify-between p-2">
                <label className="flex items-center text-sm text-default-600">
                  Users per page:
                  <select
                    className="ml-2 bg-transparent text-default-600 outline-none"
                    onChange={onRowsPerPageChange}
                  >
                    <option value="5">
                      <p className="text-xl font-bold"> 5</p>
                    </option>

                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </label>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }, [filterValue, statusFilter, onSearchChange, onRowsPerPageChange]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between p-2">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      className="static left-5 p-8"
      checkboxesProps={{
        classNames: {
          wrapper:
            "after:bg-foreground after:text-background text-background  ",
        },
      }}
      classNames={classNames}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody className="m-20" emptyContent={"No users found"} items={items}>
        {(item: User) => (
          <TableRow key={item.id} className="hover:bg-slate-100">
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
