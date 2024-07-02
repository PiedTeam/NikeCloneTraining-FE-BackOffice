import React, { FC } from "react";
import { Tabs, Tab } from "@nextui-org/react";
interface TabListProps {
  onRoleSelect: (role: string) => void;
}
const TabList: FC<TabListProps> = ({ onRoleSelect }): JSX.Element => {
  const handleSelectionChange = (key: React.Key): void => {
    onRoleSelect(key.toString());
  };
  return (
    <Tabs
      aria-label="Options"
      size="md"
      onSelectionChange={(key: React.Key) => handleSelectionChange(key)}
    >
      <Tab key="" title="All" />
      <Tab key="Designer" title="Employee" />
      <Tab key="CEO" title="Ceo" />
    </Tabs>
  );
};
export default TabList;
