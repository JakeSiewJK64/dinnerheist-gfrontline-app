import Flex from "@react-css/flex";
import "./settings.css";

import Divider from "@mui/material/Divider/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CategoriesDetails } from "./categories-details/categories-details";
import { useState } from "react";
import { ManageCountries } from "./countries/manage-countries";

const UserSettings = () => {
  const [fragmentView, setFragmentView] = useState(null);
  const [activeLink, setActiveLink] = useState("");

  const [menuItems] = useState([
    {
      title: "Account",
      fragmentView: <div></div>,
    },
    {
      title: "Categories",
      fragmentView: <CategoriesDetails />,
    },
    {
      title: "Countries",
      fragmentView: <ManageCountries />,
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
              <AccountCircleIcon fontSize="large" className="me-2" />
              {x.title}
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
