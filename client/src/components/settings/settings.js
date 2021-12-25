import Flex from "@react-css/flex";
import "./settings.css";

import Divider from "@mui/material/Divider/Divider";
import Icon from "@mdi/react";
import { CategoriesDetails } from "./categories-details/categories-details";
import { useState } from "react";
import { ManageCountries } from "./countries/manage-countries";
import { mdiAccount, mdiEarth, mdiPistol } from "@mdi/js";

const UserSettings = () => {
  const [fragmentView, setFragmentView] = useState(null);
  const [activeLink, setActiveLink] = useState("");

  const [menuItems] = useState([
    {
      title: "Account",
      fragmentView: <div></div>,
      icon: mdiAccount,
    },
    {
      title: "Categories",
      fragmentView: <CategoriesDetails />,
      icon: mdiPistol,
    },
    {
      title: "Countries",
      fragmentView: <ManageCountries />,
      icon: mdiEarth,
    },
  ]);

  return (
    <Flex row gap={10} className="m-3">
      <div className="w-25 card mb-auto shadow">
        <div className="card-body">Settings</div>
        <Divider />
        <Flex column>
          {menuItems.map((x) => (
            <div
              className={
                "card-body settings-menu-list" +
                (x.title === activeLink
                  ? "card-body settings-menu-list active-link"
                  : "card-body settings-menu-list mt-auto")
              }
              onClick={() => {
                setFragmentView(x.fragmentView);
                setActiveLink(x.title);
              }}
              key={x.title}
            >
              <Flex row gap={5}>
                <Icon path={x.icon} size={1} />
                {x.title}
              </Flex>
            </div>
          ))}
        </Flex>
      </div>
      <div className="w-75 card m-auto shadow">
        <div className="card-body flex-fill">{fragmentView}</div>
      </div>
    </Flex>
  );
};

export default UserSettings;
