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
  Pagination,
  Selection,
  ChipProps,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { SearchIcon } from "../../components/SearchIcon";
import { users, columns, statusOptions } from "./data";
import TabList from "../../components/TabList";

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
const perRow = [
  {
    key: "5",
    count: "5",
  },
  {
    key: "20",
    count: "20",
  },
  {
    key: "50",
    count: "50",
  },
  {
    key: 100,
    count: 100,
  },
];
export default function Account(): JSX.Element {
  const [filterRole, setFilterRole] = React.useState("");
  const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<Selection>(
    new Set(["all"]),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState<string>("5");

  const [pages, setPages] = React.useState(
    Math.ceil(users.length / parseInt(rowsPerPage)),
  );
  const handleSelectionStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setStatusFilter(new Set(e.target.value.split(",")));
  };

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
      !Array.from(statusFilter).includes("all") &&
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
    const start = (page - 1) * parseInt(rowsPerPage);
    const end = start + parseInt(rowsPerPage);
    setPages(Math.ceil(filteredItems.length / parseInt(rowsPerPage)));
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
  const total = React.useMemo(() => {
    return filteredItems.length;
  }, [filteredItems]);

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
  // const onRowsPerPageChange = React.useCallback(
  //   (e: Selection) => {
  //     console.log(e);

  //     setPage(1);
  //   },
  //   [],
  // );
  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(e.target.value);
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
        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <div className="flex w-5/12 justify-between">
              <TabList onRoleSelect={setFilterRole} />
              <div className="w-32 gap-2">
                <Select
                  size="sm"
                  label="Status"
                  selectionMode="multiple"
                  selectedKeys={statusFilter}
                  className="max-w-xs"
                  onChange={handleSelectionStatusChange}
                >
                  {statusOptions.map((status) => (
                    <SelectItem key={status.uid}>{status.name}</SelectItem>
                  ))}
                </Select>
              </div>
              {/* <Dropdown className="ml-16">
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
              </Dropdown> */}
            </div>
            <Select
              selectedKeys={[rowsPerPage]}
              size="sm"
              label="Users per row"
              className="ml-2 w-32 bg-transparent text-default-600 outline-none"
              onChange={onRowsPerPageChange}
            >
              {perRow.map((item) => (
                <SelectItem key={item.key}>{item.count.toString()}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex justify-between gap-3">
            <span className="flex text-small text-default-400">
              Total {total} users
            </span>

            <Input
              isClearable
              classNames={{
                base: "w-full h-full sm:max-w-[44%] ",
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

            {/* <select
                    className="ml-2 bg-transparent text-default-600 outline-none "
                    onChange={onRowsPerPageChange}
                  >
                    <option value="5">
                      <p className="text-xl font-bold "> 5</p>
                    </option>

                    <option className="p-96" value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select> */}
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onSearchChange,
    total,
    rowsPerPage,
    onRowsPerPageChange,
  ]);

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
