import { useState, ReactNode, FC } from "react";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import { MdDashboard, MdPermMedia } from "react-icons/md";
import SubMenu from "../../src/components/SubMenu";
import { FaDiagramProject } from "react-icons/fa6";
import { SiPowerpages } from "react-icons/si";
import { FaUserAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Button, Card, CardHeader, Image } from "@nextui-org/react";
import { IoLogOut } from "react-icons/io5";

interface SideBarProps {
  CustomComponent?: ReactNode;
}
export interface SubMenuItem {
  title: string;
  icon: ReactNode;
  link: string;
}

export interface MenuItem {
  title: string;
  icon: ReactNode;
  submenu?: boolean;
  submenuItems?: SubMenuItem[];
  spacing?: boolean;
  link: string;
}
const SideBar: FC<SideBarProps> = () => {
  const path = useLocation().pathname;

  const [open, setOpen] = useState(true);
  const [openSubMenus, setOpenSubMenus] = useState<number[]>([]);
  const Menu: MenuItem[] = [
    { title: "Dashboard", icon: <MdDashboard />, link: "hi" },
    { title: "Pages", icon: <SiPowerpages />, link: "hi" },
    {
      title: "Media",
      icon: <MdPermMedia />,
      submenu: true,
      spacing: true,
      submenuItems: [
        { title: "Submenu 1", icon: <MdDashboard />, link: "sub1" },
        { title: "Submenu 2", icon: <SiPowerpages />, link: "sub2" },
        { title: "Submenu 3", icon: <MdPermMedia />, link: "sub3" },
      ],
      link: "hi",
    },
    {
      title: "User",
      icon: <FaUserAlt />,
      spacing: true,
      submenu: true,
      submenuItems: [
        { title: "Submenu 1", icon: <MdDashboard />, link: "sub1" },
        { title: "Submenu 2", icon: <SiPowerpages />, link: "sub2" },
        { title: "Submenu 3", icon: <MdPermMedia />, link: "sub3" },
      ],
      link: "user",
    },

    {
      title: "Projects",
      submenu: true,
      icon: <FaDiagramProject />,
      spacing: true,
      submenuItems: [
        { title: "Submenu 1", icon: <MdDashboard />, link: "sub1" },
      ],
      link: "hi",
    },
  ];

  const toggleSubMenu = (index: number): void => {
    setOpenSubMenus((prevOpenSubMenus) =>
      prevOpenSubMenus.includes(index)
        ? prevOpenSubMenus.filter((i) => i !== index)
        : [...prevOpenSubMenus, index],
    );
  };

  return (
    <div className={`mr-16 flex ${open ? "mr-36 w-96" : "w-28"} duration-300`}>
      <div
        className={`fixed flex h-screen flex-col justify-between bg-slate-50 p-5 pt-8 ${open ? "w-96 p-8" : "w-28"} duration-300`}
      >
        <BsArrowLeftShort
          className={`absolute -right-8 top-9 cursor-pointer rounded-full border bg-white text-5xl font-black ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />

        <Card className={`mt-4 ${!open && "w-16"}`}>
          <CardHeader className={`flex gap-3 ${!open && "gap-0 p-0"}`}>
            <Image
              alt="nextui logo"
              disableSkeleton={true}
              radius="sm"
              src="https://i.pravatar.cc/150?u=a048581f4e29026701d"
              className={`w-20 ${!open && "w-16"}`}
            />
            <div className="flex flex-col">
              <p className={` ${!open && "hidden scale-0"}`}>Trần Ngọc Tiến</p>
              <p
                className={`text-xs font-bold text-red-600 ${!open && "hidden scale-0"} duration-1000`}
              >
                Admin
              </p>
              <p
                className={`text-xs text-default-500 ${!open && "hidden scale-0"} duration-300`}
              >
                <i>tranngoctien29112003@gmail.com</i>
              </p>
            </div>
          </CardHeader>
        </Card>

        <ul className="mt-8 h-[500px]">
          {Menu.map((item, index) => (
            <div key={index} className={`${!open && "w-16"}`}>
              {item.spacing ? (
                <hr
                  className={`${open ? "mt-2 w-72 font-extrabold" : "w-16"}`}
                />
              ) : (
                ""
              )}
              <li
                key={index}
                className={` ${path.includes(item.link) ? "my-2 rounded-md bg-neutral-300 text-black" : ""} mt-2 grid cursor-pointer grid-cols-sidebar items-center gap-x-4 rounded-md p-2 px-5 text-sm hover:bg-neutral-300`}
              >
                <div>
                  {" "}
                  <span
                    className={`text-xl ${path.includes(item.link) && "bg-neutral-300"} `}
                  >
                    {item.icon}
                  </span>{" "}
                </div>

                <div>
                  <Link to={item.link}>
                    <b
                      className={`flex-1 text-custom font-bold ${!open && "hidden"} ${path.includes(item.link) && "text-black"}`}
                    >
                      {item.title}
                    </b>
                  </Link>
                </div>

                {item.submenu && open && (
                  <div>
                    <BsChevronDown
                      className={`m-0 ml-24 text-2xl ${openSubMenus.includes(index) ? "rotate-180" : ""}`}
                      onClick={() => toggleSubMenu(index)}
                    />
                  </div>
                )}
              </li>
              {item.submenu && open && (
                <SubMenu
                  data={item.submenuItems!}
                  subMenuOpen={openSubMenus.includes(index)}
                />
              )}
            </div>
          ))}
        </ul>
        <div className="flex justify-center">
          <Button color="danger" variant="bordered" className={` `}>
            <Link
              to={"cc"}
              className={`grid cursor-pointer grid-cols-sidebar items-center text-sm text-black ${!open ? "gap-0" : "gap-4"} `}
            >
              <IoLogOut className="text-3xl" />
              <b
                className={`flex-1 text-custom font-bold ${!open && "hidden"}`}
              >
                Logout
              </b>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
