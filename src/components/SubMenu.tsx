import { FC, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
interface SubMenuItem {
  title: string;
  icon: ReactNode;
  link: string;
}
interface SubMenuProps {
  subMenuOpen: boolean;
  data: SubMenuItem[];
}
const SubMenu: FC<SubMenuProps> = ({ data, subMenuOpen }) => {
  const path = useLocation().pathname;
  return (
    <div>
      {subMenuOpen && (
        <ul className="bg-transparent transition duration-1000 ease-in-out">
          {data.map((subItem, subIndex) => (
            <div
              key={subIndex}
              className={`mt-2 flex w-72 rounded-md hover:bg-neutral-300 ${path.includes(subItem.link) ? "rounded-md bg-neutral-300 text-black" : ""}`}
            >
              <span className="my-2 h-full pl-8 text-xl">{subItem.icon}</span>
              <Link to={subItem.link}>
                {" "}
                <li className="my-2 rounded-md pl-8 text-sm font-bold">
                  {subItem.title}
                </li>
              </Link>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubMenu;
