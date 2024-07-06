import React, { ReactElement } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Input,
  DateInput,
  Breadcrumbs,
  BreadcrumbItem,
  Button,
} from "@nextui-org/react";
import { FaUserCircle, FaPhoneAlt, FaCheckCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";

function AccountDetail(): ReactElement {
  const [date, setDate] = React.useState<DateValue>(
    parseAbsoluteToLocal("2021-04-07T18:45:22Z"),
  );
  return (
    <div className="">
      <Card className="mx-6 mt-6">
        <CardHeader className="grid grid-cols-3">
          <Breadcrumbs size="md">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Employee</BreadcrumbItem>
            <BreadcrumbItem>Employee Detail</BreadcrumbItem>
          </Breadcrumbs>
          <div>
            <div className="flex justify-center">
              <Image
                isZoomed
                width={250}
                height={150}
                alt="NextUI Fruit Image with Zoom"
                src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button size="sm" color="success" className="text-white">
              ACTIVE
            </Button>
            <div className="mt-4 flex h-5 items-center space-x-4 text-small">
              <div className="font-bold">Employee</div>
              <Divider orientation="vertical" />
              <div className="font-bold">Sales</div>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="grid grid-cols-2 gap-16 p-8">
          <div className="grid grid-cols-2 gap-8">
            <Input
              readOnly
              type="text"
              defaultValue="Tien"
              labelPlacement="outside"
              size="lg"
              classNames={{
                label: "font-bold",
              }}
              label={
                <div className="flex w-full justify-between">
                  <div>
                    <h1 className="text-red-600">First Name</h1>
                  </div>
                </div>
              }
              endContent={
                <FaUserCircle className="pointer-events-none shrink-0 text-2xl text-default-400" />
              }
            />
            <Input
              type="text"
              readOnly
              defaultValue="Tran"
              labelPlacement="outside"
              size="lg"
              classNames={{
                label: "font-bold",
              }}
              label={
                <div className="flex w-full justify-between">
                  <div>
                    <h1 className="text-red-600">Last Name</h1>
                  </div>
                </div>
              }
              endContent={
                <FaUserCircle className="pointer-events-none shrink-0 text-2xl text-default-400" />
              }
            />
            <Input
              type="email"
              readOnly
              defaultValue="trantien@gmail.com"
              labelPlacement="outside"
              description="We'll never share your phone with anyone else."
              classNames={{
                label: "w-[1000px] font-bold",
              }}
              label={
                <div className="flex w-full justify-between">
                  <div>
                    <p className="text-red-600">Email</p>
                  </div>
                  <div className="flex text-base text-[#16a34a]">
                    <FaCheckCircle className="m-2" />
                    <p className="flex items-center">Verified</p>
                  </div>
                </div>
              }
              size="lg"
              endContent={
                <MdEmail className="pointer-events-none shrink-0 text-2xl text-default-400" />
              }
            />
            <Input
              readOnly
              type="text"
              labelPlacement="outside"
              defaultValue="0489744312"
              description="We'll never share your phone with anyone else."
              size="lg"
              classNames={{
                label: "w-[1000px] font-bold",
              }}
              label={
                <div className="flex w-full justify-between">
                  <div>
                    <h1 className="text-red-600">Phone</h1>
                  </div>
                  <div className="flex text-base text-[#16a34a]">
                    <FaCheckCircle className="m-2" />
                    <p className="flex items-center">Verified</p>
                  </div>
                </div>
              }
              endContent={
                <FaPhoneAlt className="pointer-events-none shrink-0 text-2xl text-default-400" />
              }
            />
            <I18nProvider locale="en-US">
              <DateInput
                isReadOnly
                labelPlacement="outside"
                size="lg"
                classNames={{
                  label: "font-bold",
                }}
                label={
                  <div className="flex w-full justify-between">
                    <div>
                      <h1 className="text-base text-red-600">
                        Contract Signing Date
                      </h1>
                    </div>
                  </div>
                }
                value={date}
                onChange={setDate}
              />
            </I18nProvider>
            <I18nProvider locale="en-US">
              <DateInput
                labelPlacement="outside"
                isReadOnly
                classNames={{
                  label: "font-bold",
                }}
                label={
                  <div className="flex w-full justify-between">
                    <div>
                      <h1 className="text-base text-red-600">
                        Contract End Date
                      </h1>
                    </div>
                  </div>
                }
                size="lg"
                value={date}
                onChange={setDate}
              />
            </I18nProvider>
            <Input
              type="text"
              readOnly
              defaultValue="1200,000,000"
              labelPlacement="outside"
              size="lg"
              classNames={{
                label: "font-bold",
              }}
              label={
                <div className="flex w-full justify-between">
                  <div>
                    <h1 className="text-red-600">Salary</h1>
                  </div>
                </div>
              }
              endContent={<h1>VND</h1>}
            />
          </div>

          <div className="grid grid-cols-2 gap-16">
            <div>
              <h1 className="pb-2 text-base font-bold text-red-600">
                Contract File
              </h1>
              <Image
                isZoomed
                width={250}
                height={250}
                alt="NextUI Fruit Image with Zoom"
                src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
              />
            </div>
            <div>
              <h1 className="mb-4 text-base font-bold text-red-600">Shift</h1>
              <p>comming soon</p>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex w-full items-center justify-center">
            <Image
              isZoomed
              width={70}
              height={50}
              alt="NextUI Fruit Image with Zoom"
              src="../../../public/logo-pied.jpg"
            />
            <h1 className="ml-4 font-bold">
              You are part of the Nikela organization
            </h1>
          </div>

          {/* <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            Visit source code on GitHub.
          </Link> */}
        </CardFooter>
      </Card>
    </div>
  );
}
export default AccountDetail;
