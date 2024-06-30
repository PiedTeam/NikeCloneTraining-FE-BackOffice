import React, { ReactElement } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Input,
  DateInput,
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
    <div>
      <Card className="m-16">
        <CardHeader className="flex justify-center">
          <Image
            radius="full"
            isZoomed
            width={250}
            height={100}
            alt="NextUI Fruit Image with Zoom"
            src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
          />
        </CardHeader>
        <Divider />
        <CardBody className="grid grid-cols-2 gap-16 gap-y-8 p-16">
          <Input
            type="text"
            label="First Name"
            defaultValue="Tien"
            labelPlacement="outside"
            size="lg"
            description="We'll never share your email with anyone else."
            endContent={
              <FaUserCircle className="pointer-events-none shrink-0 text-2xl text-default-400" />
            }
          />
          <Input
            type="text"
            label="Last Name"
            defaultValue="Tien"
            labelPlacement="outside"
            size="lg"
            description="We'll never share your email with anyone else."
            endContent={
              <FaUserCircle className="pointer-events-none shrink-0 text-2xl text-default-400" />
            }
          />
          <Input
            type="email"
            defaultValue="trantien@gmail.com"
            labelPlacement="outside"
            classNames={{
              label: "w-[1000px]",
            }}
            label={
              <div className="flex w-full justify-between">
                <div>
                  <h1>Email</h1>
                </div>
                <div className="flex text-base text-[#16a34a]">
                  <FaCheckCircle className="m-2" />{" "}
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
            type="text"
            labelPlacement="outside"
            defaultValue="0489744312"
            size="lg"
            classNames={{
              label: "w-[1000px]",
            }}
            label={
              <div className="flex w-full justify-between">
                <div>
                  <h1>Email</h1>
                </div>
                <div className="flex text-base text-[#16a34a]">
                  <FaCheckCircle className="m-2" />{" "}
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
              labelPlacement="outside"
              size="lg"
              label="Contract Signing Date"
              value={date}
              onChange={setDate}
            />
          </I18nProvider>
          <I18nProvider locale="en-US">
            <DateInput
              labelPlacement="outside"
              size="lg"
              label="Contract End Date"
              value={date}
              onChange={setDate}
            />
          </I18nProvider>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
export default AccountDetail;
