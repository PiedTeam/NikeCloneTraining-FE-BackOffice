import {
  Button,
  DateInput,
  Divider,
  Image,
  Input,
  Select,
  SelectItem,
  Card,
} from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { CiImageOn, CiCalendar } from "react-icons/ci";
import { CalendarDate, parseDate } from "@internationalized/date";
import { useForm } from "react-hook-form";
import { createEmployeeSchema } from "../../constant/yup/Employee";
import { yupResolver } from "@hookform/resolvers/yup";
const roles = [
  {
    id: "sales",
    role: "Sales",
  },
  {
    id: "employee",
    role: "Employee",
  },
  {
    id: "admin",
    role: "Admin",
  },
];
const CreateEmployee = (): JSX.Element => {
  const [value, setValues] = React.useState<string>("");
  const [salary, setSalary] = React.useState<number>(0);
  const [file, setFile] = React.useState<File>();
  const [showFile, setShowFile] = React.useState<string>();
  const [contractFile, setContractFile] = React.useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileContractRef = useRef<HTMLInputElement>(null);
  const formatter = new Intl.NumberFormat("en-US");
  const { register, getValues, setValue } = useForm({
    resolver: yupResolver(createEmployeeSchema),
  });
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSalary(e.target.value ? parseInt(e.target.value.replace(/,/g, "")) : 0);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter" || event.key === " ") {
      handleDivClick();
    }
  };
  const handleKeyPressContract = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (event.key === "Enter" || event.key === " ") {
      handleDivContractClick();
    }
  };
  const handleDivClick = (): void => {
    fileInputRef.current?.click();
  };
  const handleDivContractClick = (): void => {
    fileContractRef.current?.click();
  };
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const target = e.target as HTMLInputElement;
    if (target?.files?.[0]?.size && target.files[0].size < 20e6) {
      setShowFile(URL.createObjectURL(target.files[0]));
      setFile(target.files[0]);
    }
  }
  function handleChangeContract(e: React.ChangeEvent<HTMLInputElement>): void {
    const target = e.target as HTMLInputElement;
    if (target?.files?.[0]) {
      setContractFile(URL.createObjectURL(target.files[0]));
    }
  }
  const handleSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setValues(e.target.value);
  };
  useEffect(() => {
    setValue("profileImg", file!);
    setValue("contractImg", contractFile!);
  }, [file, contractFile, getValues, setValue]);
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center">
        <Card className="grid w-96 grid-cols-2 gap-4 p-2">
          <div className="flex justify-end">
            <Image
              width={100}
              alt="NextUI hero Image"
              src="../../../public/logo-pied.jpg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-bold text-gray-600">
              BECOME A NIKELA EMPLOYEE
            </h1>
          </div>
        </Card>

        <Divider className="my-4" />
      </div>
      <div className="grid grid-cols-infomation gap-8">
        <div className="flex flex-col items-center">
          <h1 className="mb-2 text-2xl font-bold text-red-600">
            PERSONAL INFORMATION
          </h1>
          <Divider className="my-2" />
          <p className="mb-2 text-sm font-bold">PROFILE IMAGE</p>
          <Image width={300} alt="NextUI hero Image" src={showFile} />
          <div
            className="flex cursor-pointer items-center justify-center text-blue-600"
            onClick={handleDivClick}
            onKeyPress={handleKeyPress}
            tabIndex={0}
            role="button"
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleChange}
              accept="image/*"
            />
            <CiImageOn className="text-xl" />
            <p>Change Image</p>
          </div>
          <Divider className="my-6" />
          <div className="mt-4 flex h-96 flex-col justify-between">
            <p className="text-sm font-bold">EMPLOYEE DETAIL</p>
            <Input
              {...register("firstName")}
              labelPlacement="outside"
              size="lg"
              type="text"
              label="First Name"
              variant="bordered"
              className="max-w-xs"
              placeholder="Enter your last name"
            />
            <Input
              {...register("lastName")}
              labelPlacement="outside"
              size="lg"
              type="text"
              label="Last Name"
              variant="bordered"
              className="max-w-xs"
              placeholder="Enter your last name"
            />
            <Input
              {...register("email")}
              labelPlacement="outside"
              size="lg"
              type="email"
              label="Email"
              variant="bordered"
              className="max-w-xs"
              placeholder="Enter your phone email"
            />
            <Input
              {...register("phone")}
              labelPlacement="outside"
              size="lg"
              type="text"
              label="Phone Number"
              variant="bordered"
              className="max-w-xs"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-dashboard gap-4">
          <div className="">
            <h1 className="mb-2 text-center text-2xl font-bold text-red-600">
              INFOMATION AT THE COMPANY
            </h1>
            <Divider className="my-4" />
            <div>
              <p className="mb-6 text-sm font-bold">ROLE</p>
              <Select
                items={roles}
                label="Role"
                placeholder="Role"
                className="max-w-xs"
                selectedKeys={[value]}
                onChange={handleSelectionChange}
              >
                {(role) => <SelectItem key={role.id}>{role.role}</SelectItem>}
              </Select>
              <Divider className="my-4" />
            </div>
            <div className="mt-8 flex w-full flex-col gap-4">
              <p className="mb-2 text-sm font-bold">CONTRACT</p>
              <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
                <DateInput
                  label="Contract signing date"
                  defaultValue={parseDate("2024-04-04")}
                  placeholderValue={new CalendarDate(1995, 11, 6)}
                  labelPlacement="outside"
                  startContent={
                    <CiCalendar className="pointer-events-none text-2xl text-default-400" />
                  }
                />
                <DateInput
                  label="Contract termination date"
                  defaultValue={parseDate("2024-04-04")}
                  placeholderValue={new CalendarDate(1995, 11, 6)}
                  labelPlacement="outside"
                  endContent={
                    <CiCalendar className="pointer-events-none text-2xl text-default-400" />
                  }
                />
              </div>
              <Divider className="my-2" />
              <div>
                <p className="mb-2 text-sm font-bold">SALARY</p>
                {/* <Input type="text" label="Salary" placeholder="Salary" description={<h1 className='text-red-700 text-sm'>{"Salary is: "+salary}</h1>}
        onChange={handleSalaryChange} /> */}
                <Input
                  type="text"
                  size="lg"
                  classNames={{ input: ["text-lg"] }}
                  placeholder="Salary"
                  value={formatter.format(salary)}
                  onChange={handleSalaryChange}
                  endContent="VND"
                  className="max-w-xs"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="mb-2 text-2xl font-bold text-red-600">
                CONTACT DOCUMENT
              </h1>
              <Divider className="my-2" />
              <p className="mb-2 text-sm font-bold">CONTRACT IMAGE</p>
              <Image
                className=""
                width={"100%"}
                height={"100px"}
                alt="NextUI hero Image"
                src={contractFile}
              />
              <div
                className="flex cursor-pointer items-center justify-center text-blue-600"
                onClick={handleDivContractClick}
                onKeyPress={handleKeyPressContract}
                tabIndex={0}
                role="button"
              >
                <input
                  type="file"
                  ref={fileContractRef}
                  style={{ display: "none" }}
                  onChange={handleChangeContract}
                  accept="image/*"
                />
                <CiImageOn className="text-xl" />
                <p>Change Image</p>
              </div>
            </div>
          </div>
          <div>
            <Divider className="my-8" />
            <div className="flex justify-between">
              <Button className="w-2/5 max-w-lg" size="lg" color="primary">
                CREATE
              </Button>
              <Button className="w-2/5 max-w-lg" size="lg" color="danger">
                CANCEL
              </Button>
            </div>
          </div>
          <div>
            <Divider className="my-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
